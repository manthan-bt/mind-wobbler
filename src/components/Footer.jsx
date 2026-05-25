import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-32 pb-12 px-[5vw] border-t border-white/5">
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
          <p className="text-gray text-[0.65rem] leading-loose max-w-[280px] uppercase tracking-wider font-medium">
            A PREMIER CREATIVE STUDIO SPECIALIZING IN HIGH-IMPACT VISUAL STORYTELLING, STRATEGIC BRANDING, AND CINEMATIC PRODUCTION.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-bold text-[0.6rem] tracking-[0.3em] mb-8 uppercase opacity-40">SITEMAP</h4>
          <ul className="flex flex-col gap-4">
            {['WORK', 'SERVICES', 'ABOUT', 'CONTACT'].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-white hover:opacity-100 opacity-60 text-[0.65rem] tracking-[0.2em] transition-opacity uppercase font-bold"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Brief */}
        <div>
          <h4 className="text-white font-bold text-[0.6rem] tracking-[0.3em] mb-8 uppercase opacity-40">EXPERTISE</h4>
          <ul className="flex flex-col gap-4 text-white opacity-60 text-[0.65rem] tracking-[0.2em] leading-relaxed uppercase font-bold">
            <li>VISUAL IDENTITY</li>
            <li>CINEMATIC PRODUCTION</li>
            <li>STRATEGIC DESIGN</li>
            <li>ARCHITECTURAL CAPTURE</li>
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
            <li className="flex gap-6 mt-4">
              {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-white hover:opacity-100 opacity-40 text-[0.6rem] tracking-[0.2em] transition-opacity uppercase font-bold"
                >
                  {platform}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[0.6rem] text-white/20 tracking-[0.3em] uppercase font-bold">
          © {currentYear} MIND WOBBLER STUDIO. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8 text-[0.55rem] text-white/10 tracking-[0.2em] uppercase font-bold">
          <span className="hover:text-white/40 cursor-pointer transition-colors">PRIVACY POLICY</span>
          <span className="hover:text-white/40 cursor-pointer transition-colors">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
