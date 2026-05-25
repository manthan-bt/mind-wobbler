import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SocialService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex flex-col justify-end pb-24 px-[5vw] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Social Background"
            className="w-full h-full object-cover grayscale opacity-40 scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 fade-in">
          <span className="text-[0.6rem] tracking-[0.5em] text-white/40 mb-4 block font-bold uppercase">DISCIPLINE</span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-tighter leading-none mb-10">
            SOCIAL <br /> MANAGEMENT
          </h1>
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-[0.6rem] tracking-[0.3em] text-white/60 font-bold uppercase">
            <p>ESTABLISHED: 2023</p>
            <p>OFFERING: STRATEGIC CONTENT & GROWTH</p>
          </div>
        </div>
      </section>

      {/* Process Content */}
      <section className="px-[5vw] py-32 grid grid-cols-1 lg:grid-cols-[0.4fr,0.6fr] gap-20 border-t border-white/5">
        <div className="fade-in-up">
          <h2 className="text-white font-bold tracking-[0.3em] text-[0.65rem] mb-10 uppercase">THE STRATEGY</h2>
          <div className="space-y-12">
            <div>
              <span className="text-white/20 text-4xl font-bold block mb-4">01</span>
              <h3 className="text-white font-bold tracking-tight text-xl mb-4 uppercase">CONTENT AUDIT</h3>
              <p className="text-gray text-[0.7rem] leading-loose tracking-[0.15em] uppercase font-medium">
                WE ANALYZE YOUR CURRENT DIGITAL FOOTPRINT AND COMPETITIVE LANDSCAPE TO DEFINE A CONTENT VOICE THAT RESONATES AND STANDS OUT.
              </p>
            </div>
            <div>
              <span className="text-white/20 text-4xl font-bold block mb-4">02</span>
              <h3 className="text-white font-bold tracking-tight text-xl mb-4 uppercase">CURATION & PRODUCTION</h3>
              <p className="text-gray text-[0.7rem] leading-loose tracking-[0.15em] uppercase font-medium">
                OUR TEAM PRODUCES HIGH-END VISUAL ASSETS TAILORED FOR SOCIAL CONSUMPTION, ENSURING EVERY POST ALIGNS WITH THE STUDIO'S CINEMATIC STANDARDS.
              </p>
            </div>
          </div>
        </div>

        <div className="fade-in-up delay-200">
          <div className="space-y-12 lg:mt-[168px]">
            <div>
              <span className="text-white/20 text-4xl font-bold block mb-4">03</span>
              <h3 className="text-white font-bold tracking-tight text-xl mb-4 uppercase">COMMUNITY GROWTH</h3>
              <p className="text-gray text-[0.7rem] leading-loose tracking-[0.15em] uppercase font-medium">
                WE IMPLEMENT ORGANIC AND STRATEGIC ENGAGEMENT TACTICS TO BUILD AN AUTHENTIC COMMUNITY AROUND YOUR BRAND, DRIVING LONG-TERM LOYALTY.
              </p>
            </div>
            <div>
              <span className="text-white/20 text-4xl font-bold block mb-4">04</span>
              <h3 className="text-white font-bold tracking-tight text-xl mb-4 uppercase">PERFORMANCE ANALYSIS</h3>
              <p className="text-gray text-[0.7rem] leading-loose tracking-[0.15em] uppercase font-medium">
                DATA DRIVES OUR CREATIVITY. WE PROVIDE DETAILED INSIGHTS AND REPORTING TO CONSTANTLY REFINE THE STRATEGY FOR MAXIMUM IMPACT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Statement */}
      <section className="px-[5vw] py-40 bg-white/5 text-center fade-in border-b border-white/5">
        <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white mb-10 tracking-tighter uppercase leading-tight max-w-4xl mx-auto">
          WE DON'T JUST POST; WE BUILD DIGITAL LEGACIES.
        </h2>
        <p className="text-gray text-xs tracking-[0.4em] uppercase font-bold">ENGAGEMENT • STRATEGY • IMPACT</p>
      </section>

      {/* Next Service Link */}
      <section className="py-32 px-[5vw] bg-black text-center group">
        <Link to="/services/graphic" className="inline-block hover-target">
          <span className="text-[0.6rem] tracking-[0.5em] text-white/30 mb-6 block font-bold uppercase">NEXT DISCIPLINE</span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white mb-8 tracking-tighter uppercase leading-none transition-transform group-hover:-translate-y-2">
            GRAPHIC DESIGN
          </h2>
          <div className="inline-flex items-center gap-4 text-white border-b border-white/20 pb-2 group-hover:border-white transition-all">
            <span className="text-[0.7rem] tracking-[0.4em] font-bold uppercase">EXPLORE SERVICE</span>
            <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default SocialService;
