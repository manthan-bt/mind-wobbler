import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navItems = [
    { to: '#work', label: 'WORK' },
    { to: '#services', label: 'SERVICES' },
    { to: '#about', label: 'ABOUT' },
    { to: '#contact', label: 'CONTACT' },
  ];

  const NavLink = ({ to, label }) => {
    const href = isHome ? to : `/${to}`;
    return (
      <a
        href={href}
        onClick={() => setIsOpen(false)}
        className="text-[0.9rem] font-medium uppercase tracking-wider relative overflow-hidden transition-all duration-300 hover:after:scale-x-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left"
      >
        {label}
      </a>
    );
  };

  return (
    <>
      <header className="fixed top-0 w-full h-20 px-[5vw] flex justify-between items-center z-[2000] bg-transparent">
        {/* Logo / Back */}
        <div className="logo relative z-[2005]">
          {isHome ? (
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
          ) : (
            <Link to="/" className="flex items-center gap-2 no-underline group pointer-events-auto text-white hover:opacity-60 transition-opacity duration-300 py-2">
              <span className="font-bold tracking-[0.2em] text-[0.8rem] uppercase">
                ← BACK TO WORK
              </span>
            </Link>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 whitespace-nowrap">
          {navItems.map(({ to, label }) => (
            <NavLink key={label} to={to} label={label} />
          ))}
        </nav>

        {/* Hamburger — absolute-positioned bars for precise control */}
        <button
          className="md:hidden relative z-[2005] w-10 h-10 pointer-events-auto focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {/* Top bar */}
          <span
            className="absolute left-1/2 bg-white"
            style={{
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              top: '50%',
              transform: isOpen
                ? 'translate(-50%, -50%) rotate(45deg)'
                : 'translate(-50%, calc(-50% - 6px))',
              transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
          {/* Middle bar */}
          <span
            className="absolute left-1/2 bg-white"
            style={{
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: isOpen ? 0 : 1,
              transition: 'opacity 0.25s ease',
            }}
          />
          {/* Bottom bar */}
          <span
            className="absolute left-1/2 bg-white"
            style={{
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              top: '50%',
              transform: isOpen
                ? 'translate(-50%, -50%) rotate(-45deg)'
                : 'translate(-50%, calc(-50% + 6px))',
              transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
        </button>
      </header>

      {/* Mobile Overlay — clip-path circle reveal from hamburger corner, same centered design */}
      <div
        className="fixed inset-0 bg-black z-[1999] flex flex-col items-center justify-center gap-10 md:hidden"
        style={{
          clipPath: isOpen ? 'circle(150% at calc(100% - 2.5rem) 2.5rem)' : 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
          transition: 'clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {navItems.map(({ to, label }, i) => {
          const href = isHome ? to : `/${to}`;
          return (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="text-[1.8rem] font-bold uppercase tracking-wider text-white no-underline relative overflow-hidden transition-all duration-300 hover:after:scale-x-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left"
              style={{
                transform: isOpen ? 'translateY(0) skewY(0deg)' : 'translateY(20px) skewY(1.5deg)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.23,1,0.32,1) ${0.15 + i * 0.07}s, opacity 0.4s ease ${0.12 + i * 0.07}s`,
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
