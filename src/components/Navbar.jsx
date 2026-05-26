import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { 
    setIsOpen(false); 
  }, [location.pathname]);

  const navItems = [
    { to: '/work', label: 'WORK' },
    { to: '/services', label: 'SERVICES' },
    { to: '/about', label: 'ABOUT' },
  ];

  // Dynamic background based on scroll and page
  const isTransparent = isHomePage && !scrolled && !isOpen;
  const textColor = 'text-black';
  const logoFilter = 'brightness-0';
  const hamburgerBg = 'bg-black';

  const NavLink = ({ to, label }) => {
    const isActive = location.pathname === to || (label === 'SERVICES' && location.pathname.startsWith('/services'));
    return (
      <Link
        to={to}
        onClick={() => setIsOpen(false)}
        className={`text-[0.75rem] font-bold uppercase tracking-widest relative overflow-hidden transition-all duration-300 hover:opacity-100 ${
          isActive ? `opacity-100 ${textColor}` : `opacity-60 ${textColor}`
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full h-24 px-6 md:px-[3vw] flex justify-between items-center z-[2000] transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/5' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <div className="logo relative z-[2005]">
          <Link to="/" className="flex items-center gap-3 no-underline group pointer-events-auto">
            <img
              src="/mind-wobbler-icon.png"
              alt="M"
              className={`h-6 w-auto transition-transform duration-500 group-hover:scale-110 ${logoFilter}`}
            />
            <span className={`font-bold tracking-[0.3em] uppercase text-[0.8rem] transition-colors duration-500 ${textColor}`}>
              MIND WOBBLER
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12 whitespace-nowrap">
          {navItems.map(({ to, label }) => (
            <NavLink key={label} to={to} label={label} />
          ))}
          <Link 
            to="/contact" 
            className={`px-8 py-3.5 text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-all rounded-sm bg-black text-white hover:bg-black/80`}
          >
            WORK WITH US
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden relative z-[2005] w-10 h-10 pointer-events-auto focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute left-1/2 transition-all duration-500 ${hamburgerBg}`}
            style={{
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              top: '50%',
              transform: isOpen
                ? 'translate(-50%, -50%) rotate(45deg)'
                : 'translate(-50%, calc(-50% - 6px))',
              transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), background-color 0.5s ease',
            }}
          />
          <span
            className={`absolute left-1/2 transition-all duration-500 ${hamburgerBg}`}
            style={{
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: isOpen ? 0 : 1,
              transition: 'opacity 0.25s ease, background-color 0.5s ease',
            }}
          />
          <span
            className={`absolute left-1/2 transition-all duration-500 ${hamburgerBg}`}
            style={{
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              top: '50%',
              transform: isOpen
                ? 'translate(-50%, -50%) rotate(-45deg)'
                : 'translate(-50%, calc(-50% + 6px))',
              transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), background-color 0.5s ease',
            }}
          />
        </button>
      </header>

      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-white z-[1999] flex flex-col items-center justify-center gap-8 md:hidden"
        style={{
          clipPath: isOpen ? 'circle(150% at calc(100% - 2.5rem) 2.5rem)' : 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
          transition: 'clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {navItems.map(({ to, label }, i) => {
          const isActive = location.pathname === to || (label === 'SERVICES' && location.pathname.startsWith('/services'));
          return (
            <Link
              key={label}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`text-[1.8rem] font-bold uppercase tracking-wider text-black no-underline relative overflow-hidden transition-all duration-300 hover:after:scale-x-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-black after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left ${
                isActive ? 'after:scale-x-100 after:origin-left' : 'after:scale-x-0 after:origin-right'
              }`}
              style={{
                transform: isOpen ? 'translateY(0) skewY(0deg)' : 'translateY(20px) skewY(1.5deg)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.23,1,0.32,1) ${0.15 + i * 0.07}s, opacity 0.4s ease ${0.12 + i * 0.07}s`,
              }}
            >
              {label}
            </Link>
          );
        })}
        
        <Link 
          to="/contact" 
          onClick={() => setIsOpen(false)}
          className="mt-6 px-10 py-5 text-[0.8rem] font-black tracking-[0.25em] uppercase bg-black text-white rounded-sm shadow-xl active:scale-95 transition-transform"
          style={{
            transform: isOpen ? 'translateY(0) skewY(0deg)' : 'translateY(20px) skewY(1.5deg)',
            opacity: isOpen ? 1 : 0,
            transition: `transform 0.5s cubic-bezier(0.23,1,0.32,1) ${0.15 + navItems.length * 0.07}s, opacity 0.4s ease ${0.12 + navItems.length * 0.07}s`,
          }}
        >
          WORK WITH US
        </Link>
      </div>
    </>
  );
};

export default Navbar;
