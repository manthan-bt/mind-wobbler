import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const NavLink = ({ to, label }) => {
    // If on home page, use hash links. If not, use root-relative links.
    const href = isHome ? to : `/${to}`;
    
    return (
      <a
        href={href}
        className="ml-10 text-[0.9rem] uppercase tracking-wider relative overflow-hidden transition-all duration-300 hover:after:scale-x-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left"
        style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
      >
        {label}
      </a>
    );
  };

  return (
    <header className="fixed top-0 w-full h-20 px-[5vw] flex justify-between items-center z-[2000] bg-transparent">
      <div className="logo">
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <img
            src="/mind-wobbler-icon.png"
            alt="MIND WOBBLER"
            className="h-6 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-110"
          />
          <span className="text-white font-bold tracking-widest text-shadow-premium">
            MIND WOBBLER
          </span>
        </Link>
      </div>
      <nav className="flex items-center whitespace-nowrap">
        <NavLink to="#work" label="WORK" />
        <NavLink to="#services" label="SERVICES" />
        <NavLink to="#about" label="ABOUT" />
        <NavLink to="#contact" label="CONTACT" />
      </nav>
    </header>
  );
};

export default Navbar;
