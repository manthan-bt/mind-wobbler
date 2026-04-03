import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const NavLink = ({ to, label }) => {
    const href = isHome ? to : `/${to}`;
    return (
      <a
        href={href}
        onClick={() => setIsOpen(false)}
        className="text-[1.8rem] md:text-[0.9rem] font-bold md:font-medium uppercase tracking-wider relative overflow-hidden transition-all duration-300 hover:after:scale-x-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left"
      >
        {label}
      </a>
    );
  };

  return (
    <header className="fixed top-0 w-full h-20 px-[5vw] flex justify-between items-center z-[2000] bg-transparent">
      <div className="logo relative z-[2005]">
        <Link to="/" className="flex items-center gap-3 no-underline group pointer-events-auto">
          <img
            src="/mind-wobbler-icon.png"
            alt="M"
            className="h-6 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-110"
          />
          <span className="text-white font-bold tracking-[0.3em] text-shadow-premium uppercase">
            MIND WOBBLER
          </span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-10 whitespace-nowrap">
        <NavLink to="#work" label="WORK" />
        <NavLink to="#services" label="SERVICES" />
        <NavLink to="#about" label="ABOUT" />
        <NavLink to="#contact" label="CONTACT" />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden relative z-[2005] text-white p-2 pointer-events-auto transition-transform duration-300 active:scale-90"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 bg-black z-[2000] transition-transform duration-[0.6s] ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col items-center justify-center gap-10 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <NavLink to="#work" label="WORK" />
        <NavLink to="#services" label="SERVICES" />
        <NavLink to="#about" label="ABOUT" />
        <NavLink to="#contact" label="CONTACT" />
      </div>
    </header>
  );
};

export default Navbar;
