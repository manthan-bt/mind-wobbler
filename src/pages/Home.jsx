import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import AnimatedNumber from '../components/AnimatedNumber';

const Home = () => {
  const heroRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const topProjects = Object.values(projectsData).slice(0, 3);

  const servicePreviews = [
    { title: 'BRAND IDENTITY', path: '/services/branding', num: '01', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000' },
    { title: 'CINEMATOGRAPHY', path: '/services/cinematography', num: '02', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000' },
    { title: 'PHOTOGRAPHY', path: '/services/photography', num: '03', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000' }
  ];

  return (
    <div className="bg-black">
      {/* 01. HERO */}
      <section ref={heroRef} className="hero relative h-screen flex flex-col justify-center px-[5vw] overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0 grayscale">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://img.youtube.com/vi/8zZe4gTxtY0/maxresdefault.jpg"
            alt="Hero Placeholder"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${iframeLoaded ? 'opacity-0' : 'opacity-100'}`}
          />
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <iframe
              src="https://www.youtube.com/embed/8zZe4gTxtY0?autoplay=1&mute=1&controls=0&loop=1&playlist=8zZe4gTxtY0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
              className={`iframe-cover transition-opacity duration-1000 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
              allow="autoplay; encrypted-media"
              onLoad={() => setIframeLoaded(true)}
            />
            <div className="absolute inset-0 z-20" style={{ pointerEvents: 'all', background: 'transparent' }} />
          </div>
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-20" />
        </div>

        <div className="hero-content relative z-30 text-center px-[5vw]">
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] font-black mb-6 tracking-tighter fade-in text-shadow-premium uppercase">
            MIND <br /> WOBBLER
          </h1>
          <p className="text-[0.65rem] tracking-[0.5em] text-white/50 uppercase fade-in delay-300 font-bold">
            STRATEGIC CREATIVE STUDIO • ESTABLISHED 2023
          </p>
        </div>

        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 fade-in delay-500">
          <span className="text-[0.6rem] tracking-[3px] opacity-70 font-bold">SCROLL</span>
          <div className="line w-[1px] h-[50px] bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* 02. STATS */}
      <section className="px-[5vw] py-32 border-b border-white/5 fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          <div className="flex flex-col lg:border-r border-white/10 px-4">
            <span className="text-white text-[clamp(2rem,4vw,3rem)] font-bold tracking-tighter leading-none mb-4">
              <AnimatedNumber value={2023} />
            </span>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">ESTABLISHED</p>
          </div>
          <div className="flex flex-col lg:border-r border-white/10 px-4">
            <span className="text-white text-[clamp(2rem,4vw,3rem)] font-bold tracking-tighter leading-none mb-4">
              <AnimatedNumber value={50} suffix="+" />
            </span>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">COMMISSIONS</p>
          </div>
          <div className="flex flex-col lg:border-r border-white/10 px-4">
            <span className="text-white text-[clamp(2rem,4vw,3rem)] font-bold tracking-tighter leading-none mb-4">
              <AnimatedNumber value={15} suffix="+" />
            </span>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">GLOBAL PARTNERS</p>
          </div>
          <div className="flex flex-col px-4">
            <span className="text-white text-[clamp(2rem,4vw,3rem)] font-bold tracking-tighter leading-none mb-4">
              0<AnimatedNumber value={5} />
            </span>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">STUDIO VERTICALS</p>
          </div>
        </div>
      </section>

      {/* 03. CAPABILITIES */}
      <section className="px-[5vw] py-32 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 fade-in">
          <div className="max-w-2xl">
            <h2 className="text-[0.6rem] tracking-[0.5em] text-white/30 mb-8 uppercase font-bold">CAPABILITIES</h2>
            <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white uppercase tracking-tighter leading-none">
              DEFINING THE <br /> VISUAL FRONTIER.
            </h3>
          </div>
          <Link to="/services" className="group flex items-center gap-3 text-white border-b border-white/20 pb-2 hover:border-white transition-all hover-target mb-4">
            <span className="text-[0.65rem] tracking-[0.4em] font-bold uppercase">INDEX</span>
            <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicePreviews.map((service, index) => (
            <Link key={service.title} to={service.path} className="group block relative aspect-[3/4] overflow-hidden bg-gray-dark rounded-sm fade-in-up hover-target" style={{ transitionDelay: `${index * 100}ms` }}>
              <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <span className="text-white/40 text-[0.6rem] font-bold block mb-3 tracking-[0.3em] uppercase">{service.num}</span>
                <h4 className="text-white font-bold tracking-tighter text-2xl uppercase leading-none">{service.title}</h4>
              </div>
              <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                <span className="text-xl">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 04. WORK */}
      <section className="px-[5vw] py-32 bg-white/[0.01] border-y border-white/5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 fade-in">
          <div className="max-w-2xl">
            <h2 className="text-[0.6rem] tracking-[0.5em] text-white/30 mb-8 uppercase font-bold">WORK</h2>
            <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white uppercase tracking-tighter leading-none">
              SELECTED <br /> PRODUCTIONS.
            </h3>
          </div>
          <Link to="/work" className="group flex items-center gap-3 text-white border-b border-white/20 pb-2 hover:border-white transition-all hover-target mb-4">
            <span className="text-[0.65rem] tracking-[0.4em] font-bold uppercase">ARCHIVE</span>
            <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      {/* 05. CONTACT */}
      <section className="px-[5vw] py-32 text-center fade-in">
        <p className="text-[0.6rem] tracking-[0.5em] text-white/30 mb-8 uppercase font-bold">START A PROJECT</p>
        <h3 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white mb-10 tracking-tighter uppercase leading-none">
          LET'S BUILD <br /> THE FUTURE.
        </h3>
        <Link to="/contact" className="inline-block bg-white text-black py-5 px-16 text-[0.7rem] font-black tracking-[0.4em] uppercase hover:bg-gray-light transition-all hover-target shadow-2xl">
          GET IN TOUCH
        </Link>
      </section>
    </div>
  );
};

export default Home;
