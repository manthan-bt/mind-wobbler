/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          DEFAULT: "#888888",
          dark: "#111111",
          light: "#dddddd"
        }
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      spacing: {
        'nav': '100px',
        'lg': '12vh',
        'md': '8vh',
      },
      animation: {
        'hero-pulse': 'heroPulse 10s infinite alternate ease-in-out',
        'scroll-line': 'scrollLine 2s infinite cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      keyframes: {
        heroPulse: {
          '0%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.2)' },
        },
        scrollLine: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
