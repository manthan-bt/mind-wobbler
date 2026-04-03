import React, { useEffect, useRef } from 'react';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const Home = () => {
  const heroRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="hero relative h-screen flex flex-col justify-center px-[5vw] overflow-hidden">
        <div className="hero-bg absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 w-full h-full scale-[1.1] animate-hero-pulse">
            <iframe 
              src="https://www.youtube.com/embed/8zZe4gTxtY0?autoplay=1&mute=1&controls=0&loop=1&playlist=8zZe4gTxtY0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1"
              className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 object-cover aspect-video"
              allow="autoplay; encrypted-media"
              loading="lazy"
            />
          </div>
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
        </div>

        <div className="hero-content relative z-10 text-center max-w-[90vw] mx-auto">
          <h1 className="text-[clamp(2.5rem,4.5vw,4.8rem)] leading-none font-extrabold mb-8 mt-12 tracking-tighter">
            TRANSFORMING VISIONS<br />INTO CINEMATIC REALITIES
          </h1>
          <p className="text-lg font-light text-gray-light tracking-widest fade-in delay-200">
            BRANDING, VIDEO PRODUCTION & VISUAL STORYTELLING
          </p>
        </div>

        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 fade-in delay-500">
          <span className="text-[0.7rem] tracking-[3px] opacity-70">SCROLL</span>
          <div className="line w-[1px] h-[50px] bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="work bg-black py-lg px-[2vw]">
        <div className="section-header px-[3vw] mb-md fade-in">
          <span className="section-tag">SELECTED PROJECTS</span>
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-normal">CRAFTING DIGITAL LEGACIES</h2>
        </div>

        <div className="work-grid columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {Object.values(projectsData).map((project) => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              media={project.hero}
              youtubeId={project.youtubeId}
              externalLink={project.externalLink}
              aspectRatio={['sytletics', 'wali', 'habitec'].includes(project.id) ? '1/1' : 'auto'}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services bg-gray-dark py-lg px-[5vw]">
        <div className="section-header mb-md fade-in">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-normal uppercase">SERVICES</h2>
        </div>
        <div className="service-grid grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="service-item border-t border-white/20 pt-10 fade-in-up">
            <h3 className="text-2xl font-light mb-5">BRANDING</h3>
            <p className="text-gray leading-loose">LOGO DESIGN<br />IDENTITY SYSTEMS<br />BRAND GUIDELINES</p>
          </div>
          <div className="service-item border-t border-white/20 pt-10 fade-in-up delay-200">
            <h3 className="text-2xl font-light mb-5">VIDEO PRODUCTION</h3>
            <p className="text-gray leading-loose">CINEMATIC VIDEOGRAPHY<br />EDITING & COLOR GRADING<br />EVENT COVERAGE</p>
          </div>
          <div className="service-item border-t border-white/20 pt-10 fade-in-up delay-[400ms]">
            <h3 className="text-2xl font-light mb-5">PHOTOGRAPHY</h3>
            <p className="text-gray leading-loose">ARCHITECTURAL PHOTOGRAPHY<br />INTERIOR SHOOTS<br />EVENT COVERAGE</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about py-lg px-[5vw]">
        <div className="about-grid grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-[60px] lg:gap-[100px] items-center">
          <div className="about-image relative w-full max-w-[450px] mx-auto aspect-[4/5] bg-gray-dark overflow-hidden border border-white/10 rounded-sm fade-in group">
            <img 
              src="/manthan.jpg" 
              alt="Manthan" 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          </div>
          <div className="about-text">
            <h2 className="text-[0.8rem] tracking-[4px] text-gray mb-[30px] uppercase fade-in">ABOUT ME</h2>
            <p className="text-[clamp(1.4rem,2.5vw,2.1rem)] leading-tight font-medium text-white mb-[30px] tracking-tight fade-in-up">
              I’m Manthan, a creative designer and videographer based in Bangalore, and the founder of Mind Wobbler — a creative studio focused on branding, cinematic storytelling, and visual design.
            </p>
            <p className="text-lg leading-relaxed text-gray max-w-[650px] mb-5 lowercase fade-in-up delay-[200ms]">
              Through Mind Wobbler, I work on building complete visual identities, producing cinematic video content, and
              crafting modern, minimal experiences for digital platforms. My work spans brand systems, event coverage, and
              architectural visuals, with a strong focus on clarity, storytelling, and impact.
            </p>
            <p className="text-lg leading-relaxed text-gray max-w-[650px] lowercase fade-in-up delay-[400ms]">
              I approach every project with a balance of design thinking and visual narrative — ensuring that each output
              is not just aesthetically strong, but also meaningful and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact py-lg px-[5vw]">
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="contact-info fade-in">
            <h2 className="text-[clamp(2rem,4vw,4rem)] font-normal uppercase leading-tight">LET’S WORK TOGETHER.</h2>
            <p className="text-xl text-gray mt-5 mb-16 lowercase">WE ARE ALWAYS LOOKING FOR NEW CHALLENGES AND VISIONARY CLIENTS.</p>
            <a href="mailto:manthan.bt@gmail.com" className="cta-link text-[clamp(1.5rem,3vw,2.5rem)] text-white border-b-2 border-white pb-1 hover-target tracking-wide">manthan.bt@gmail.com</a>
            
            <div className="social-links mt-16 flex gap-8">
              <a href="https://www.instagram.com/mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-widest text-[1.1rem]">INSTAGRAM</a>
              <a href="https://www.behance.net/mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-widest text-[1.1rem]">BEHANCE</a>
            </div>
          </div>

          <div className="contact-form fade-in-up delay-200">
            <form className="flex flex-col gap-10">
              <div className="input-group">
                <input type="text" placeholder="NAME" required className="w-full bg-transparent border-b border-white/30 text-white text-xl py-4 outline-none focus:border-white transition-colors" />
              </div>
              <div className="input-group">
                <input type="email" placeholder="EMAIL" required className="w-full bg-transparent border-b border-white/30 text-white text-xl py-4 outline-none focus:border-white transition-colors" />
              </div>
              <div className="input-group">
                <input type="text" placeholder="MESSAGE" required className="w-full bg-transparent border-b border-white/30 text-white text-xl py-4 outline-none focus:border-white transition-colors" />
              </div>
              <button type="submit" className="bg-white text-black py-5 px-10 text-[1.1rem] font-bold uppercase tracking-widest self-start transition-transform hover:-translate-y-1 hover-target">SEND INQUIRY</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
