import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('category') || 'ALL';
  const sidebarRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));

    // Throttled scroll tracker for footer clearance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const aside = sidebarRef.current;
          if (!aside) {
            ticking = false;
            return;
          }

          const footer = document.querySelector('footer');
          const sidebarHeight = aside.offsetHeight;
          const footerHeight = footer ? footer.offsetHeight : 450;
          
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;
          
          const sidebarBottom = window.scrollY + clientHeight / 2 + sidebarHeight / 2;
          const footerTop = scrollHeight - footerHeight - 80;
          
          const excess = sidebarBottom - footerTop;
          aside.style.transform = excess > 0 
            ? `translateY(calc(-50% - ${excess}px))` 
            : 'translateY(-50%)';
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const timeoutId = setTimeout(handleScroll, 50);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [selectedFilter]);

  const projects = Object.values(projectsData);

  const filters = [
    { label: 'All Work', value: 'ALL' },
    { label: 'Branding', value: 'BRANDING' },
    { label: 'Cinematography', value: 'CINEMATOGRAPHY' },
    { label: '3D & Motion', value: '3D & MOTION' },
    { label: 'Graphic Design', value: 'GRAPHIC DESIGN' }
  ];

  const getFilteredProjects = () => {
    if (selectedFilter === 'ALL') return projects;
    return projects.filter(p => p.category === selectedFilter);
  };

  const filteredProjects = getFilteredProjects();

  return (
    <div className="bg-white pt-[32vh] md:pt-48 xl:pt-64 pb-32 md:pb-48 text-black selection:bg-black selection:text-white min-h-screen relative overflow-hidden">

      {/* Fixed Left-Side Category Navigation (Desktop Overlay, does not squeeze page content) */}
      <aside 
        ref={sidebarRef}
        className="fixed left-6 top-1/2 z-[1000] hidden xl:flex flex-col gap-3 items-start mix-blend-difference"
      >
        {filters.map((filter) => {
          const isActive = selectedFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => {
                window.scrollTo(0, 0);
                setSearchParams({ category: filter.value });
              }}
              className="group flex items-center gap-4 py-1 focus:outline-none"
            >
              {/* Line Indicator */}
              <div 
                className={`h-[1.5px] transition-all duration-300 ${
                  isActive 
                    ? 'w-6 bg-white' 
                    : 'w-3 bg-white/20 group-hover:w-5 group-hover:bg-white'
                }`} 
              />
              
              {/* Text Label without container */}
              <span 
                className={`text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/30 group-hover:text-white'
                }`}
              >
                {filter.label}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="max-w-[1800px] mx-auto relative z-10 w-full">
        
        {/* Editorial Header Section */}
        <section className="px-6 md:px-[5vw] xl:pl-64 xl:pr-[5vw] mb-24 fade-in">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
              PORTFOLIO.
            </h1>
            <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium">
              A collection of projects across branding, film, and digital design for global brands and creative partners.
            </p>
          </div>
        </section>


        {/* Unified 2-Column Grid */}
        <section className="px-6 md:px-[5vw] xl:pl-64 xl:pr-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-start">
            {filteredProjects.map((project, index) => (
              <ScrollReveal 
                key={`${selectedFilter}-${project.id}`}
                type="clip"
              >
                <ProjectCard {...project} />
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32 border border-black/5 bg-black/[0.01]">
              <p className="text-black/40 text-[0.7rem] tracking-[0.3em] uppercase font-bold">No projects found in this discipline</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Work;
