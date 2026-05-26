import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

// A Vite plugin to execute serverless API handlers locally
function localApiPlugin() {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/')) {
          const url = new URL(req.url, `http://${req.headers.host}`);
          const apiPath = url.pathname;
          
          // Match JS files in /api
          const filePath = resolve(__dirname, `.${apiPath}.js`);
          if (fs.existsSync(filePath)) {
            try {
              // Parse POST body if applicable
              let body = '';
              if (req.method === 'POST') {
                body = await new Promise((resolveBody) => {
                  let chunk = '';
                  req.on('data', (c) => chunk += c);
                  req.on('end', () => resolveBody(chunk));
                });
                try {
                  req.body = JSON.parse(body);
                } catch {
                  req.body = body;
                }
              } else {
                req.body = {};
              }

              // Mock Vercel serverless request/response objects
              const mockRes = {
                status(code) {
                  res.statusCode = code;
                  return this;
                },
                json(data) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return this;
                },
                send(data) {
                  res.end(data);
                  return this;
                },
                setHeader(name, value) {
                  res.setHeader(name, value);
                  return this;
                }
              };

              // Dynamically import the API handler. Add timestamp query to bypass ESM cache.
              const fileUrl = pathToFileURL(filePath).href;
              const { default: handler } = await import(`${fileUrl}?t=${Date.now()}`);
              await handler(req, mockRes);
              return;
            } catch (err) {
              console.error('Error running local API handler:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'INTERNAL SERVER ERROR', error: err.message }));
              return;
            }
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});

