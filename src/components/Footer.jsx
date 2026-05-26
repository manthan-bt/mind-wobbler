import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-32 pb-12 px-6 md:px-[3vw] border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <img
              src="/mind-wobbler-icon.png"
              alt="M"
              className="h-6 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-110"
            />
            <span className="text-white font-bold tracking-[0.3em] uppercase">
              MIND WOBBLER
            </span>
          </Link>
          <p className="text-gray text-[0.8rem] leading-relaxed max-w-[320px] tracking-tight font-medium mb-8">
            A premier creative collective specializing in high-impact visual storytelling, strategic branding, and cinematic production.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-black py-4 px-8 text-[0.65rem] font-bold tracking-[0.3em] uppercase hover:bg-white/80 transition-all rounded-sm shadow-xl active:scale-95 transition-transform"
          >
            WORK WITH US
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-bold text-[0.6rem] tracking-[0.3em] mb-8 uppercase opacity-40">SITEMAP</h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/work" className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold">WORK</Link>
            </li>
            <li>
              <Link to="/services" className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold">SERVICES</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold">ABOUT</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold">WORK WITH US</Link>
            </li>
          </ul>
        </div>

        {/* Services Brief */}
        <div>
          <h4 className="text-white font-bold text-[0.6rem] tracking-[0.3em] mb-8 uppercase opacity-40">EXPERTISE</h4>
          <ul className="flex flex-col gap-4 text-white opacity-60 text-[0.65rem] tracking-[0.2em] leading-relaxed uppercase font-bold">
            <li>BRAND IDENTITY</li>
            <li>GRAPHIC DESIGN</li>
            <li>WEB & APP SOLUTIONS</li>
            <li>AI SOLUTIONS & MCP</li>
            <li>SOCIAL MEDIA MANAGEMENT</li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h4 className="text-white font-bold text-[0.6rem] tracking-[0.3em] mb-8 uppercase opacity-40">CONNECT</h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="mailto:mindwobblerstudios@gmail.com" className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold">
                MINDWOBBLERSTUDIOS@GMAIL.COM
              </a>
            </li>
            <li>
              <a href="tel:+918105176785" className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold">
                +91 81051 76785
              </a>
            </li>
            <li className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
              {[
                { label: 'INSTAGRAM', href: 'https://www.instagram.com/mind_wobbler' },
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/manthan-bt-268610295/' },
                { label: 'BEHANCE', href: 'https://www.behance.net/mind_wobbler' },
                { label: 'YOUTUBE', href: 'https://www.youtube.com/@mind_wobbler' },
                { label: 'WHATSAPP', href: 'https://wa.me/918105176785' }
              ].map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-100 opacity-40 text-[0.6rem] tracking-[0.2em] transition-opacity uppercase font-bold"
                >
                  {platform.label}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[0.6rem] text-white/20 tracking-[0.3em] uppercase font-bold">
          © {currentYear} MIND WOBBLER. ALL RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[0.55rem] text-white/10 tracking-[0.2em] uppercase font-bold">
          <Link to="/privacy-policy" className="hover:text-white/40 transition-colors">PRIVACY POLICY</Link>
          <Link to="/terms-of-service" className="hover:text-white/40 transition-colors">TERMS OF SERVICE</Link>
          <Link to="/cookies" className="hover:text-white/40 transition-colors">COOKIES</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
