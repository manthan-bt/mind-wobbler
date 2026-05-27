import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import AnimatedNumber from '../components/AnimatedNumber';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  const heroRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Hero Parallax
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let observer;
    const timeoutId = setTimeout(() => {
      const observerOptions = { threshold: 0.1 };
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      }, observerOptions);

      document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, []);

  const topProjects = Object.values(projectsData).slice(0, 3);

  const servicePreviews = [
    { title: 'BRAND IDENTITY', path: '/services', num: '01', img: 'https://images.unsplash.com/photo-1633533451638-32f1e337d254?auto=format&fit=crop&q=80&w=1200' },
    { title: 'DIGITAL PRODUCTS', path: '/services', num: '02', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200' },
    { title: 'AI INTEGRATION', path: '/services', num: '03', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200' }
  ];

  return (
    <div className="bg-white text-black min-h-screen overflow-x-hidden">
      {/* 01. HERO */}
      <section ref={heroRef} className="hero relative h-screen flex flex-col justify-center px-6 md:px-[3vw] overflow-hidden bg-white">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="hero-bg absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-white/20 z-10" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src="https://www.youtube.com/embed/8zZe4gTxtY0?autoplay=1&mute=1&controls=0&loop=1&playlist=8zZe4gTxtY0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
              className={`iframe-cover transition-opacity duration-1000 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
              allow="autoplay; encrypted-media"
              onLoad={() => setIframeLoaded(true)}
            />
            <div className="absolute inset-0 z-20" style={{ pointerEvents: 'all', background: 'transparent' }} />
          </div>
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-20" />
        </motion.div>
        <div className="hero-content relative z-30 text-center px-6 md:px-[3vw] fade-in">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-black mb-10 tracking-tighter text-black uppercase">
            MIND <br /> WOBBLER
          </h1>
          <p className="text-[0.65rem] md:text-[0.75rem] tracking-[0.5em] text-black/60 uppercase fade-in delay-300 font-bold">
            Strategic Creative Direction • Est. 2023
          </p>
        </div>

        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 fade-in delay-500">
          <span className="text-[0.6rem] tracking-[3px] opacity-70 font-bold text-black uppercase">SCROLL</span>
          <div className="line w-[1px] h-[50px] bg-black/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black origin-top animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* 02. STATS */}
      <ScrollReveal 
        type="slide"
        className="px-6 md:px-[3vw] py-32 border-b border-black/5 bg-white"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:border-r border-black/10 px-4">
            <span className="text-black text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-none mb-4 uppercase">
              <AnimatedNumber value={2023} />
            </span>
            <p className="text-[0.6rem] tracking-[0.3em] text-black/40 uppercase font-bold">Established</p>
          </div>
          <div className="flex flex-col lg:border-r border-black/10 px-4">
            <span className="text-black text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-none mb-4 uppercase">
              <AnimatedNumber value={50} suffix="+" />
            </span>
            <p className="text-[0.6rem] tracking-[0.3em] text-black/40 uppercase font-bold">Projects</p>
          </div>
          <div className="flex flex-col lg:border-r border-black/10 px-4">
            <span className="text-black text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-none mb-4 uppercase">
              <AnimatedNumber value={15} suffix="+" />
            </span>
            <p className="text-[0.6rem] tracking-[0.3em] text-black/40 uppercase font-bold">Clients</p>
          </div>
          <div className="flex flex-col px-4">
            <span className="text-black text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-none mb-4 uppercase">
              0<AnimatedNumber value={7} />
            </span>
            <p className="text-[0.6rem] tracking-[0.3em] text-black/40 uppercase font-bold">Services</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 03. CAPABILITIES */}
      <section className="px-6 md:px-[3vw] py-32 overflow-hidden bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 fade-in">
            <div className="w-full">
              <h2 className="text-[0.7rem] tracking-[0.4em] text-black/40 mb-8 uppercase font-bold">WHAT WE DO</h2>
              <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-black uppercase tracking-tighter leading-[0.9]">
                STRATEGIC DESIGN <br /> & TECHNOLOGY.
              </h3>
            </div>
            {/* Desktop: VIEW ALL link aligned with title */}
            <Link to="/services" className="hidden lg:flex group items-center gap-3 text-black border-b border-black/20 pb-2 hover:border-black transition-all hover-target mb-4 shrink-0">
              <span className="text-[0.65rem] tracking-[0.4em] font-bold uppercase">VIEW ALL</span>
              <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePreviews.map((service, index) => (
              <ScrollReveal 
                key={service.title} 
                type="clip"
              >
                <Link to={service.path} className="group block relative aspect-[4/5] overflow-hidden bg-zinc-100 hover-target shadow-xl">
                  <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute bottom-10 left-10 z-20">
                    <span className="text-white/40 text-[0.6rem] font-bold block mb-3 tracking-[0.3em] uppercase">{service.num}</span>
                    <h4 className="text-white font-bold tracking-tighter text-2xl uppercase leading-none">{service.title}</h4>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: VIEW ALL below the cards */}
          <div className="lg:hidden flex justify-center mt-12">
            <Link to="/services" className="group flex items-center gap-3 text-black border-b border-black/20 pb-2 hover:border-black transition-all hover-target">
              <span className="text-[0.65rem] tracking-[0.4em] font-bold uppercase">VIEW ALL</span>
              <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 04. WORK */}
      <section className="px-6 md:px-[3vw] py-32 bg-black/[0.005] border-y border-black/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 fade-in">
            <div className="w-full">
              <h2 className="text-[0.7rem] tracking-[0.4em] text-black/40 mb-8 uppercase font-bold">PORTFOLIO</h2>
              <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-black uppercase tracking-tighter leading-[0.9]">
                SELECTED <br /> WORK.
              </h3>
            </div>
            {/* Desktop: VIEW MORE link aligned with title */}
            <Link to="/work" className="hidden lg:flex group items-center gap-3 text-black border-b border-black/20 pb-2 hover:border-black transition-all hover-target mb-4 shrink-0">
              <span className="text-[0.65rem] tracking-[0.4em] font-bold uppercase">VIEW MORE</span>
              <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topProjects.map((project, index) => (
              <ScrollReveal 
                key={project.id} 
                type="clip"
              >
                <ProjectCard {...project} />
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: VIEW MORE below the cards */}
          <div className="lg:hidden flex justify-center mt-12">
            <Link to="/work" className="group flex items-center gap-3 text-black border-b border-black/20 pb-2 hover:border-black transition-all hover-target">
              <span className="text-[0.65rem] tracking-[0.4em] font-bold uppercase">VIEW MORE</span>
              <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 05. CONTACT */}
      <section className="px-6 md:px-[3vw] py-48 text-center bg-white">
        <ScrollReveal 
          type="slide"
          className="max-w-[1600px] mx-auto"
        >
          <p className="text-[0.7rem] tracking-[0.4em] text-black/40 mb-10 uppercase font-bold">READY TO BEGIN?</p>
          <h3 className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-black mb-16 tracking-tighter uppercase leading-[0.9]">
            LET'S BUILD <br /> THE FUTURE.
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-md mx-auto">
            <Link to="/contact" className="inline-block bg-black text-white py-6 px-16 text-[0.75rem] font-black tracking-[0.4em] uppercase hover:bg-black/80 transition-all hover-target shadow-2xl w-full sm:w-auto rounded-sm">
              WORK WITH US
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
