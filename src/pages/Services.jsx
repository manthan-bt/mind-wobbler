import React, { useEffect, useState, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Services = () => {
  const [activeSection, setActiveActiveSection] = useState('overview');
  const sidebarRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));

    // Scroll tracker for side navigation
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // trigger active highlights early
      
      if (window.scrollY < 150) {
        setActiveActiveSection('overview');
      } else {
        const ids = ['branding', 'graphic-design', 'digital-products', 'ai-integration', 'social-media', 'web-presence', 'ongoing-support'];
        let current = 'overview';
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top - 200) {
              current = id;
            }
          }
        }
        setActiveActiveSection(current);
      }

      // Check footer overlap dynamically to pin it exactly above the footer
      const aside = sidebarRef.current;
      const footer = document.querySelector('footer');
      const sidebarHeight = aside ? aside.offsetHeight : 250;
      const footerHeight = footer ? footer.offsetHeight : 450;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const sidebarBottom = window.scrollY + clientHeight / 2 + sidebarHeight / 2;
      const footerTop = scrollHeight - footerHeight - 80; // Stop exactly 80px above the footer
      
      const excess = sidebarBottom - footerTop;
      if (aside) {
        if (excess > 0) {
          aside.style.transform = `translateY(calc(-50% - ${excess}px))`;
        } else {
          aside.style.transform = 'translateY(-50%)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pillars = [
    {
      id: 'branding',
      num: '01',
      phase: 'Brand Strategy & Architecture',
      title: 'Branding',
      philosophy: 'At the core of our approach, we maintain that brand and UX are closely connected and work together. Our team specializes in creating and representing digital brand identities across channels, providing strategy assistance and guidelines to ensure consistency.',
      img: 'https://images.unsplash.com/photo-1633533451638-32f1e337d254?auto=format&fit=crop&q=80&w=1200',
      items: [
        "Brand Strategy",
        "Brand Architecture",
        "Verbal Identity",
        "Visual Identity",
        "Brand Guidelines",
        "Brand Experiences"
      ]
    },
    {
      id: 'graphic-design',
      num: '02',
      phase: 'Physical & Digital Collateral',
      title: 'Graphic Design',
      philosophy: 'We extend brand identity into physical spaces and digital communication channels. Our design teams compose high-end stationery suites, corporate assets, presentation decks, and product packaging configurations that project brand authority.',
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
      items: [
        "Stationery Systems",
        "Corporate Assets",
        "Presentation Decks",
        "Product Packaging",
        "Office & Wall Graphics",
        "Poster & Banner Layouts"
      ]
    },
    {
      id: 'digital-products',
      num: '03',
      phase: 'UX/UI & Application Frameworks',
      title: 'Digital Products',
      philosophy: 'We design and develop digital products that solve complex user problems and drive business growth. Our product design team creates intuitive mobile apps, dashboards, and enterprise platforms backed by robust design systems.',
      img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200',
      items: [
        "User Research",
        "UX/UI Design",
        "Interactive Prototyping",
        "Design Systems",
        "Mobile & Web App Design",
        "Usability Testing"
      ]
    },
    {
      id: 'ai-integration',
      num: '04',
      phase: 'LLM Systems & Automation',
      title: 'AI Integration',
      philosophy: 'We link advanced cognitive model reasoning directly into corporate workflows and software systems. By implementing MCP servers and prompt engineering, we build internal copilots and automated responders that optimize team speed.',
      img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
      items: [
        "Model Context Protocol (MCP)",
        "Prompt Engineering",
        "Workspace Copilots",
        "Automated Support Agents",
        "System Linking & API Config",
        "Autonomous Operations"
      ]
    },
    {
      id: 'social-media',
      num: '05',
      phase: 'Storytelling & Channel Reach',
      title: 'Social Media',
      philosophy: 'We build community engagement through cinematic storytelling, videography, and motion graphics. Our campaigns are backed by strategic reach audits, content calendars, and professional copywriting captions.',
      img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200',
      items: [
        "Channel Strategy & Setup",
        "Video Production & Editing",
        "Motion Graphics Animation",
        "Content Calendars",
        "Copywriting & Scripting",
        "Audience Growth Audits"
      ]
    },
    {
      id: 'web-presence',
      num: '06',
      phase: 'Domain Security & Local SEO',
      title: 'Web Presence',
      philosophy: 'We verify and secure brand discoverability and credibility across core search engines and local networks. From custom domains and professional emails to maps configurations and automated review generation.',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      items: [
        "Google Business & Maps",
        "Directory Registrations",
        "Domain & DNS Setup",
        "Search Engine Indexing",
        "Review Automation Setup",
        "Local Optimization Audits"
      ]
    },
    {
      id: 'ongoing-support',
      num: '07',
      phase: 'Maintenance & Security Retainers',
      title: 'Ongoing Support',
      philosophy: 'We protect, scale, and maintain your digital products and visual assets post-launch. Our technical teams monitor uptimes, apply security framework patches, upgrade SDKs, and tune custom models.',
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
      items: [
        "Website Maintenance",
        "Mobile App Support",
        "AI Ops Auditing",
        "Visual Retainer Updates",
        "Helpdesk Technical Support",
        "Framework Vulnerability Patches"
      ]
    }
  ];

  const navSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'branding', label: 'Branding' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'digital-products', label: 'Digital Products' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'web-presence', label: 'Web Presence' },
    { id: 'ongoing-support', label: 'Ongoing Support' }
  ];

  const scrollToSection = (id) => {
    if (id === 'overview') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen relative overflow-hidden">
      

      
      {/* Fixed Left-Side Navigation Overlay (remains fixed on scroll, does not squeeze page content) */}
      <aside 
        ref={sidebarRef}
        className="fixed left-6 top-1/2 z-[1000] hidden xl:flex flex-col gap-3 items-start mix-blend-difference"
      >
        {navSections.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
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
              
              {/* Text Label (no container, visible by default with lower opacity) */}
              <span 
                className={`text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/30 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="max-w-[1800px] mx-auto relative z-10 w-full">
        {/* Editorial Hero Header Section */}
        <section id="overview" className="px-6 md:px-[4vw] xl:pl-64 xl:pr-[4vw] mb-32 md:mb-48 fade-in">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
              STRATEGIC DESIGN <br className="hidden md:block" /> & TECHNOLOGY.
            </h1>
            <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium">
              We shape memorable brand identities, digital products, and automated workflows that help ambitious companies stand out in a crowded visual landscape.
            </p>
          </div>
        </section>

        {/* Side-by-Side Visual Services Sections */}
        <div className="space-y-32 md:space-y-48">
          {pillars.map((pillar, index) => {
            const isEven = index % 2 === 0;
            return (
              <section 
                key={pillar.id}
                id={pillar.id}
                className="px-6 md:px-[4vw] xl:pl-64 xl:pr-[4vw] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative py-12"
              >


                {/* Text Container Column (col-span-7) */}
                <ScrollReveal 
                  type="slide"
                  className={`lg:col-span-7 flex flex-col justify-center relative z-10 ${
                    isEven ? 'lg:order-1 lg:col-start-1 lg:items-start' : 'lg:order-2 lg:col-start-6 lg:items-end'
                  }`}
                >
                  <div className="w-full max-w-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[0.7rem] font-mono font-bold tracking-widest text-black/20">
                        [{pillar.num}]
                      </span>
                      <div className="h-[1px] w-12 bg-black/10" />
                    </div>
                    
                    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter leading-[0.9] text-black mb-8 uppercase">
                      {pillar.title}
                    </h2>
                    
                    <p className="text-black/70 text-[1rem] md:text-[1.1rem] leading-relaxed mb-8 font-medium">
                      {pillar.philosophy}
                    </p>

                    {/* Vertical Deliverables List */}
                    <div className="flex flex-col gap-3 font-bold text-black/90 text-[0.85rem] md:text-[0.95rem] tracking-tight uppercase">
                      {pillar.items.map((item) => (
                        <span key={item} className="cursor-default border-l-2 border-black/10 pl-4 hover:border-black transition-colors">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Image Container Column (col-span-4) with Sharp Corners */}
                <ScrollReveal 
                  type="clip"
                  className={`lg:col-span-4 relative group overflow-hidden bg-zinc-50 border border-black/[0.06] shadow-xl z-10 ${
                    isEven ? 'lg:order-2 lg:col-start-9' : 'lg:order-1 lg:col-start-1'
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img 
                      src={pillar.img} 
                      alt={pillar.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </div>
                </ScrollReveal>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
