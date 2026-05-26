import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Using highly stable, production-ready Unsplash IDs for 100% reliability
  const serviceItems = [
    {
      id: 'branding',
      num: '01',
      title: 'BRAND IDENTITY',
      path: '/services/branding',
      desc: 'DEFINING THE VISUAL AND STRATEGIC FOUNDATIONS OF MODERN ENTITIES.',
      image: 'https://images.unsplash.com/photo-1633533451638-32f1e337d254?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'cinematography',
      num: '02',
      title: 'CINEMATOGRAPHY',
      path: '/services/cinematography',
      desc: 'HIGH-END FILM PRODUCTION TAILORED FOR EMOTIONAL AND VISUAL IMPACT.',
      image: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'photography',
      num: '03',
      title: 'PHOTOGRAPHY',
      path: '/services/photography',
      desc: 'PRECISE ARCHITECTURAL CAPTURE HIGHLIGHTING LIGHT AND GEOMETRY.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'motion',
      num: '04',
      title: 'POST-PRODUCTION & MOTION',
      path: '/services/motion',
      desc: 'EXPERT VIDEO EDITING AND DYNAMIC VISUAL SYSTEMS FOR MODERN NARRATIVES.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'uiux',
      num: '05',
      title: 'UI/UX STRATEGY',
      path: '/services/uiux',
      desc: 'MINIMALIST DIGITAL EXPERIENCES BUILT ON FUNCTIONAL PRECISION.',
      image: 'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'social',
      num: '06',
      title: 'SOCIAL MANAGEMENT',
      path: '/services/social',
      desc: 'STRATEGIC CONTENT CURATION AND COMMUNITY GROWTH FOR DIGITAL BRANDS.',
      image: 'https://images.unsplash.com/photo-1683721003111-070bcc053d8b?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'graphic',
      num: '07',
      title: 'GRAPHIC DESIGN',
      path: '/services/graphic',
      desc: 'HITTING THE INTERSECTION OF TYPE, FORM, AND FUNCTIONAL COMMUNICATION.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1600'
    }
  ];

  return (
    <section className="bg-black pt-32 pb-24 px-[5vw]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 fade-in">
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-tighter leading-none mb-6">
            STUDIO <br /> CAPABILITIES
          </h1>
          <p className="text-gray tracking-[0.4em] text-[0.6rem] sm:text-[0.65rem] uppercase max-w-sm leading-relaxed font-bold">
            A MULTIDISCIPLINARY APPROACH TO CREATIVE EXECUTION AND STRATEGIC DESIGN.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {serviceItems.map((service, index) => (
            <div key={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className={`fade-in-up order-2 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.5em] text-white/30 mb-6 block font-bold uppercase">{service.num}</span>
                <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold mb-6 tracking-tight uppercase leading-tight">{service.title}</h3>
                <p className="text-gray text-[0.65rem] sm:text-[0.7rem] tracking-[0.15em] leading-loose mb-10 uppercase max-w-md font-medium">
                  {service.desc}
                </p>
                <Link 
                  to={service.path} 
                  className="group inline-flex items-center gap-4 text-white hover-target transition-all"
                >
                  <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.4em] font-bold border-b border-white/20 pb-1 group-hover:border-white transition-colors uppercase">VIEW SERVICE</span>
                  <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <div className={`relative aspect-[16/10] overflow-hidden bg-gray-dark rounded-sm fade-in order-1 group ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600'; // Global high-quality fallback
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
