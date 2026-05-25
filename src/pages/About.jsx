import React, { useEffect } from 'react';
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
    <div className="bg-black pt-40 pb-32">
      {/* Narrative Section */}
      <section className="px-[5vw] mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-20 items-center">
          <div className="fade-in">
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-tighter leading-none mb-12">
              FROM PASSION <br /> TO PRECISION.
            </h1>
            <div className="space-y-10 max-w-2xl">
              <p className="text-white text-lg md:text-xl leading-tight tracking-tight uppercase font-bold">
                ESTABLISHED IN 2023, MIND WOBBLER BEGAN AS A RAW EXPLORATION OF VISUAL NARRATIVE. TODAY, IT STANDS AS A REFINED CREATIVE STUDIO SERVICING CLIENTS GLOBALLY.
              </p>
              <div className="space-y-6 text-gray text-[0.7rem] tracking-[0.15em] leading-loose uppercase font-medium">
                <p>
                  WHAT STARTED AS A PERSONAL PASSION FOR CINEMATOGRAPHY AND DESIGN HAS MATURED INTO A SYSTEMATIC PURSUIT OF EXCELLENCE. WE OPERATE AT THE INTERSECTION OF ART AND STRATEGY, TRANSLATING AMBITIOUS CONCEPTS INTO FUNCTIONAL ART.
                </p>
                <p>
                  OUR JOURNEY IS DEFINED BY A RELENTLESS PURSUIT OF VISUAL CLARITY. WE BELIEVE IN MINIMALISM AS A TOOL FOR IMPACT, STRIPPING AWAY THE SUPERFLUOUS TO REVEAL THE CORE ESSENCE OF EVERY BRAND WE TOUCH.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] overflow-hidden bg-gray-dark rounded-sm shadow-2xl fade-in-up delay-300 border border-white/5">
              <img 
                src="/manthan.jpg" 
                alt="Manthan B T" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105"
              />
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-bold tracking-[0.4em] text-[0.55rem] uppercase mb-1 opacity-60">DIRECTOR</p>
                <p className="text-white font-bold tracking-[0.2em] text-sm uppercase">MANTHAN B T</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-[5vw] py-24 border-y border-white/5 mb-32 fade-in bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h4 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white mb-2 uppercase tracking-tighter">
              <AnimatedNumber value={2023} />
            </h4>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">FOUNDED</p>
          </div>
          <div>
            <h4 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white mb-2 uppercase tracking-tighter">
              <AnimatedNumber value={50} suffix="+" />
            </h4>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">PROJECTS</p>
          </div>
          <div>
            <h4 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white mb-2 uppercase tracking-tighter">
              <AnimatedNumber value={15} suffix="+" />
            </h4>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">CLIENTS</p>
          </div>
          <div>
            <h4 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white mb-2 uppercase tracking-tighter">
              0<AnimatedNumber value={5} />
            </h4>
            <p className="text-[0.55rem] tracking-[0.4em] text-white/30 uppercase font-bold">DISCIPLINES</p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-[5vw] mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <div className="fade-in-up">
            <h2 className="text-[0.6rem] tracking-[0.5em] text-white/30 mb-8 uppercase font-bold">THE PHILOSOPHY</h2>
            <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white mb-8 tracking-tight uppercase leading-tight">
              WE DON'T JUST DESIGN; <br /> WE ARCHITECT INTUITION.
            </h3>
            <p className="text-gray text-[0.7rem] leading-loose tracking-[0.15em] uppercase max-w-lg font-medium">
              BY COMBINING TECHNICAL MASTERY WITH ARTISTIC INTUITION, WE DELIVER SOLUTIONS THAT ARE BOTH FUNCTIONAL AND PROFOUNDLY CINEMATIC. EVERY PIXEL SERVES A PURPOSE.
            </p>
          </div>
          <div className="fade-in-up delay-200">
            <div className="aspect-[21/9] bg-gray-dark overflow-hidden rounded-sm border border-white/5">
              <img src="/hosp-hero.png" alt="Studio Architecture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Link */}
      <section className="px-[5vw] py-32 text-center fade-in border-t border-white/5">
        <p className="text-[0.6rem] tracking-[0.5em] text-white/30 mb-8 uppercase font-bold">READY TO COMMENCE?</p>
        <h3 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white mb-10 tracking-tighter uppercase leading-none">BUILD THE <br /> UNCONVENTIONAL.</h3>
        <Link to="/contact" className="inline-block border border-white text-white py-4 px-16 text-[0.7rem] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all hover-target">GET IN TOUCH</Link>
      </section>
    </div>
  );
};

export default About;
