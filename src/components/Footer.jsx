import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const Footer = () => {
  const [theme, setTheme] = useState(() => {
    return getCookie('theme') || 'system';
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const applyTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setCookie('theme', selectedTheme);
    
    if (selectedTheme === 'black') {
      document.documentElement.classList.add('dark');
    } else if (selectedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (selectedTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
              className="h-5 md:h-6 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-110"
            />
            <span className="text-white font-bold tracking-[0.3em] uppercase text-[0.7rem] md:text-[0.8rem]">
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
        
        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[0.55rem] text-white/10 tracking-[0.2em] uppercase font-bold">
          <Link to="/privacy-policy" className="hover:text-white/40 transition-colors">PRIVACY POLICY</Link>
          <Link to="/terms-of-service" className="hover:text-white/40 transition-colors">TERMS OF SERVICE</Link>
          <Link to="/cookies" className="hover:text-white/40 transition-colors">COOKIES</Link>
        </div>

        {/* Theme Dropdown */}
        <div className="relative font-montserrat" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-[0.6rem] text-white/40 hover:text-white transition-opacity tracking-[0.2em] font-bold uppercase focus:outline-none group"
          >
            THEME: {theme} 
            <ChevronDown 
              size={11} 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} opacity-60 group-hover:opacity-100`} 
            />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 bottom-full mb-3 bg-black border border-white/10 z-[100] min-w-[120px] shadow-2xl flex flex-col">
              {['SYSTEM', 'LIGHT', 'BLACK'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    applyTheme(t.toLowerCase());
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-[0.55rem] tracking-[0.2em] font-bold text-left hover:bg-white/10 transition-colors uppercase ${
                    theme === t.toLowerCase() ? 'text-white bg-white/5' : 'text-white/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
