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
        <div className="hero-bg absolute inset-0 -z-10 grayscale">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="w-full h-full scale-[2.5] md:scale-[1.33] pointer-events-none origin-center">
            <iframe
              src="https://www.youtube.com/embed/8zZe4gTxtY0?autoplay=1&mute=1&controls=0&loop=1&playlist=8zZe4gTxtY0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
            />
          </div>
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
        </div>

        <div className="hero-content relative z-10 text-center px-[5vw]">
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] font-black mb-6 tracking-tighter fade-in text-shadow-premium uppercase">
            MIND <br /> WOBBLER
          </h1>
          <p className="text-[clamp(0.6rem,0.9vw,0.75rem)] tracking-[0.5em] text-gray uppercase fade-in delay-300">
            PERSONAL PASSION PROJECT • BY MANTHAN B T
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
      <section id="work" className="work-section py-24 px-[5vw]">
        <h2 className="section-tag">SELECTED PROJECTS</h2>
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-16">
          {Object.values(projectsData).map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
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
          <div className="about-text text-center lg:text-left">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-bold text-white mb-[30px] tracking-tight uppercase fade-in">
              MANTHAN B T
            </h2>
            <p className="text-[1.2rem] md:text-[1.8rem] leading-tight font-medium text-gray-light mb-[40px] tracking-tight fade-in-up lowercase">
              I’m a creative designer and videographer based in Bangalore. Mind Wobbler is my personal playground where I explore visual storytelling as a passion and a hobby.
            </p>
            <p className="text-lg leading-relaxed text-gray max-w-[650px] mx-auto lg:mx-0 mb-6 lowercase fade-in-up delay-[200ms]">
              What started as a hobby has evolved into a curated digital showcase. I focus on branding, cinematic video content, and experimental visual design, always pushing the boundaries of clarity and impact.
            </p>
            <p className="text-lg leading-relaxed text-gray max-w-[650px] mx-auto lg:mx-0 lowercase fade-in-up delay-[400ms]">
              While this is my passion project, I approach every output with professional-grade standards. If you're looking for high-impact visual design or cinematic production, this portfolio represents my expertise and dedication to the craft.
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

            <div className="social-links mt-16 flex flex-wrap gap-8">
              <a href="https://www.linkedin.com/in/manthan-bt-268610295/" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-widest text-[1.1rem]">LINKEDIN</a>
              <a href="https://www.youtube.com/@mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-widest text-[1.1rem]">YOUTUBE</a>
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
