import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [searchParams, setSearchParams] = useSearchParams();
  const isWorkPage = location.pathname === '/work';
  const isServicesPage = location.pathname === '/services';

  const [mobileSubDropdownOpen, setMobileSubDropdownOpen] = useState(false);
  const [activeServiceSection, setActiveServiceSection] = useState('overview');

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
    setMobileSubDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isServicesPage) return;
    const handleActiveSection = (e) => {
      setActiveServiceSection(e.detail);
    };
    window.addEventListener('active-service-section', handleActiveSection);
    return () => window.removeEventListener('active-service-section', handleActiveSection);
  }, [isServicesPage]);

  const navItems = [
    { to: '/work', label: 'WORK' },
    { to: '/services', label: 'SERVICES' },
    { to: '/about', label: 'ABOUT' },
  ];

  // Dynamic background based on scroll and page
  const isTransparent = isHomePage && !scrolled && !isOpen;
  const textColor = isTransparent ? 'text-white' : 'text-black';
  const logoFilter = isTransparent ? 'brightness-0 invert' : 'brightness-0';
  const hamburgerBg = isTransparent ? 'bg-white' : 'bg-black';

  const workFilters = [
    { label: 'All Work', value: 'ALL' },
    { label: 'Branding', value: 'BRANDING' },
    { label: 'Cinematography', value: 'CINEMATOGRAPHY' },
    { label: '3D & Motion', value: '3D & MOTION' },
    { label: 'Graphic Design', value: 'GRAPHIC DESIGN' }
  ];

  const serviceSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'branding', label: 'Branding' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'digital-products', label: 'Digital Products' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'web-presence', label: 'Web Presence' },
    { id: 'ongoing-support', label: 'Ongoing Support' },
    { id: 'why-choose-us', label: 'Why Choose Us' }
  ];

  const activeWorkFilter = searchParams.get('category') || 'ALL';

  const handleWorkFilterClick = (value) => {
    window.scrollTo(0, 0);
    setSearchParams({ category: value });
    setMobileSubDropdownOpen(false);
  };

  const handleServiceSectionClick = (id) => {
    setMobileSubDropdownOpen(false);
    const event = new CustomEvent('scroll-to-service', { detail: id });
    window.dispatchEvent(event);
  };

  const NavLink = ({ to, label }) => {
    const isActive = location.pathname === to || (label === 'SERVICES' && location.pathname.startsWith('/services'));
    return (
      <Link
        to={to}
        onClick={() => {
          setIsOpen(false);
          window.scrollTo(0, 0);
        }}
        className={`text-[0.75rem] font-bold uppercase tracking-widest relative overflow-hidden transition-all duration-300 hover:opacity-100 ${
          isActive ? `opacity-100 ${textColor}` : `opacity-60 ${textColor}`
        }`}
      >
        {label}
      </Link>
    );
  };

  const getHeaderClass = () => {
    const base = "w-full h-24 px-6 md:px-[3vw] flex justify-between items-center pointer-events-auto transition-all duration-500 bg-transparent border-b-0";
    
    if (isWorkPage || isServicesPage) {
      if (scrolled) {
        return `${base} md:bg-white/80 md:backdrop-blur-md md:border-b md:border-black/5`;
      } else {
        return `${base} md:border-transparent`;
      }
    } else {
      if (scrolled) {
        return `${base} bg-white/80 backdrop-blur-md border-b border-black/5`;
      } else {
        return `${base} border-transparent`;
      }
    }
  };

  return (
    <>
      {/* Unified Fixed Parent Wrapper Container to absolutely prevent any mobile rendering gaps */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[2000] flex flex-col transition-all duration-500 ${
          (isWorkPage || isServicesPage)
            ? 'bg-white/80 backdrop-blur-md border-b border-black/5 md:bg-transparent md:backdrop-blur-none md:border-b-0 md:pointer-events-none pointer-events-auto'
            : 'pointer-events-none'
        }`}
      >
        
        {/* Main Navbar Header */}
        <header className={getHeaderClass()}>
          {/* Logo */}
          <div className="logo relative z-[2005]">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 no-underline group pointer-events-auto">
              <img
                src="/mind-wobbler-icon.png"
                alt="M"
                className={`h-5 md:h-6 w-auto transition-transform duration-500 group-hover:scale-110 ${logoFilter}`}
              />
              <span className={`font-bold tracking-[0.3em] uppercase text-[0.7rem] md:text-[0.8rem] transition-colors duration-500 ${textColor}`}>
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
              onClick={() => window.scrollTo(0, 0)}
              className={`px-8 py-3.5 text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-all rounded-sm ${
                isTransparent 
                  ? 'bg-white text-black hover:bg-white/80' 
                  : 'bg-black text-white hover:bg-black/80'
              }`}
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

        {/* Sticky Mobile Subbar for Work & Services Pages Only */}
        {(isWorkPage || isServicesPage) && (
          <div className="md:hidden w-full pointer-events-auto bg-transparent border-t border-black/5 flex flex-col">
            
            {/* The Toggle Button */}
            <button
              onClick={() => setMobileSubDropdownOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-6 py-3"
            >
              <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-black/40">
                {isWorkPage ? 'Category' : 'Disciplines'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-black">
                  {isWorkPage 
                    ? (workFilters.find(f => f.value === activeWorkFilter)?.label || 'All Work')
                    : (serviceSections.find(s => s.id === activeServiceSection)?.label || 'Overview')
                  }
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={2.5}
                  className={`text-black/50 transition-transform duration-300 ${mobileSubDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {/* Floating Dropdown Panel */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-black/5 bg-transparent ${
                mobileSubDropdownOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              {isWorkPage 
                ? workFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => handleWorkFilterClick(filter.value)}
                      className={`w-full flex items-center gap-4 px-6 py-3 border-b border-black/5 text-left transition-colors ${
                        activeWorkFilter === filter.value
                          ? 'bg-black/[0.03] text-black'
                          : 'text-black/40 hover:text-black hover:bg-black/[0.02]'
                      }`}
                    >
                      <div className={`h-[1px] shrink-0 transition-all duration-300 ${
                        activeWorkFilter === filter.value ? 'w-5 bg-black' : 'w-2 bg-black/20'
                      }`} />
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                        {filter.label}
                      </span>
                    </button>
                  ))
                : serviceSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleServiceSectionClick(item.id)}
                      className={`w-full flex items-center gap-4 px-6 py-3 border-b border-black/5 text-left transition-colors ${
                        activeServiceSection === item.id
                          ? 'bg-black/[0.03] text-black'
                          : 'text-black/40 hover:text-black hover:bg-black/[0.02]'
                      }`}
                    >
                      <div className={`h-[1px] shrink-0 transition-all duration-300 ${
                        activeServiceSection === item.id ? 'w-5 bg-black' : 'w-2 bg-black/20'
                      }`} />
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                        {item.label}
                      </span>
                    </button>
                  ))
              }
            </div>
          </div>
        )}
      </div>

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
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
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
          onClick={() => {
            setIsOpen(false);
            window.scrollTo(0, 0);
          }}
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
