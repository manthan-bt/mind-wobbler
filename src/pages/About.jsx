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
    <div className="bg-white pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen relative overflow-hidden">
      

      
      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        
        {/* Editorial Hero Header Section */}
        <section className="px-6 md:px-[3vw] mb-32 md:mb-48 fade-in">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
              AN INDEPENDENT, <br className="hidden md:block" />
              PARTNER-LED FIRM.
            </h1>
            <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium">
              Established in 2023, Mind Wobbler operates at the intersection of brand strategy, cinematic narrative, and digital innovation. We believe in minimalism as a tool for impact.
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
                What started as a personal passion for cinematography and design has matured into a systematic pursuit of excellence. We translate ambitious concepts into functional art.
              </p>
              <p className="text-black/70 text-[1rem] md:text-[1.1rem] leading-relaxed max-w-xl font-medium">
                Our journey is defined by a relentless pursuit of visual clarity. We strip away the superfluous to reveal the core essence of every brand we touch.
              </p>
            </ScrollReveal>
            <ScrollReveal 
              type="clip"
              className="lg:col-span-4 lg:col-start-9 relative group overflow-hidden bg-zinc-50 border border-black/[0.06] shadow-xl"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src="/hosp-hero.png" 
                  alt="Studio Architecture"
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
                  PARTNERS
                </h2>
                <div>
                  <h3 className="text-xl font-bold tracking-tight uppercase mb-2">MANTHAN B T</h3>
                  <p className="text-sm font-bold tracking-[0.2em] text-black/40 uppercase mb-8">Director & Founder</p>
                  <p className="text-black/70 text-[1rem] md:text-[1.1rem] leading-relaxed font-medium">
                    By combining technical mastery with artistic intuition, we deliver solutions that are both functional and profoundly cinematic. Every pixel serves a purpose.
                  </p>
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
                  alt="Manthan B T"
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
