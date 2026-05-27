import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedNumber from '../components/AnimatedNumber';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white pt-[35vh] xl:pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen relative overflow-hidden">
      

      
      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        
        {/* Editorial Hero Header Section */}
        <section className="px-6 md:px-[3vw] mb-32 md:mb-48 fade-in">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(1.8rem,5.5vw,4.5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
              SHAPING IDEAS <br />
              BUILDING BRANDS.
            </h1>
            <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium">
              ESTABLISHED IN 2023, MIND WOBBLER IS A CREATIVE STUDIO SPECIALIZING IN BRAND IDENTITY, FILMMAKING, AND DIGITAL DESIGN. WE STRIP AWAY THE CLUTTER TO REVEAL THE TRUE ESSENCE OF YOUR BRAND.
            </p>
          </div>
        </section>

        {/* Narrative / Philosophy Section (Side-by-Side Style) */}
        <section className="px-6 md:px-[3vw] space-y-32 md:space-y-48 pb-32">
          
          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <ScrollReveal 
              type="slide"
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[0.7rem] font-mono font-bold tracking-widest text-black/20">
                  [001]
                </span>
                <div className="h-[1px] w-12 bg-black/10" />
              </div>

              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-[0.9] text-black mb-8 uppercase">
                THE STORY
              </h2>
              <p className="text-black/70 text-[1rem] md:text-[1.1rem] leading-relaxed mb-8 max-w-xl font-medium">
                WE STARTED IN 2023 AS A PASSION DESIGN AND VIDEO EDITING PAGE. OUR GOAL WAS TO BRING MODERN, CLEAN EDITING AND CINEMATOGRAPHY TO PEOPLE. OVER TIME, AS WE GAINED THE TRUST OF MORE CLIENTS, WE EXPANDED OUR VISION.
              </p>
              <p className="text-black/70 text-[1rem] md:text-[1.1rem] leading-relaxed max-w-xl font-medium">
                TODAY, WE HAVE GROWN INTO A FULL-SERVICE CREATIVE COMPANY OFFERING 7 CORE DISCIPLINES ACROSS DESIGN, FILM, AND TECHNOLOGY. WE PARTNER WITH AMBITIOUS BRANDS TO BUILD COHESIVE VISUAL IDENTITIES AND CINEMATIC EXPERIENCES.
              </p>
            </ScrollReveal>
            <ScrollReveal 
              type="clip"
              className="lg:col-span-4 lg:col-start-9 relative group overflow-hidden bg-zinc-50 border border-black/[0.06] shadow-xl"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
                  alt="MINIMALIST STUDIO WORKSPACE"
                  className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Partners */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <ScrollReveal 
              type="slide"
              className="lg:col-span-7 lg:order-2 lg:col-start-6 flex flex-col lg:items-end justify-center"
            >
              <div className="w-full max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[0.7rem] font-mono font-bold tracking-widest text-black/20">
                    [002]
                  </span>
                  <div className="h-[1px] w-12 bg-black/10" />
                </div>

                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-[0.9] text-black mb-8 uppercase">
                  FOUNDER
                </h2>
                <div>
                  <h3 className="text-xl font-bold tracking-tight uppercase mb-2">MANTHAN B T</h3>
                  <p className="text-sm font-bold tracking-[0.2em] text-black/40 uppercase mb-6">DIRECTOR & CREATIVE HEAD</p>
                  <div className="bg-zinc-50 text-black p-8 md:p-10 border border-black/10 shadow-md rounded-sm mt-8 relative overflow-hidden group">
                    <blockquote className="text-[clamp(1.1rem,1.4vw,1.35rem)] leading-relaxed font-black tracking-wide uppercase">
                      “WE DO NOT DECORATE. WE SHAPE CINEMATIC STORIES AND CLEAN DESIGN SYSTEMS THAT BUILD LASTING LEGACIES.”
                    </blockquote>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal 
              type="clip"
              className="lg:col-span-4 lg:order-1 lg:col-start-1 relative group overflow-hidden bg-zinc-50 border border-black/[0.06] shadow-xl"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src="/manthan.jpg" 
                  alt="MANTHAN B T"
                  className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>

        </section>

      </div>
    </div>
  );
};

export default About;
