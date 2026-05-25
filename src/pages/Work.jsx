import React, { useEffect } from 'react';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

const Work = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="bg-black pt-40 pb-32">
      <section className="px-[5vw] mb-32 fade-in">
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-tighter leading-none mb-8">
          SELECTED <br /> ARCHIVE
        </h1>
        <p className="text-gray tracking-[0.3em] text-[0.65rem] uppercase max-w-md leading-relaxed">
          A CURATED COLLECTION OF VISUAL NARRATIVES AND STRATEGIC IDENTITIES DEVELOPED SINCE 2023.
        </p>
      </section>

      <section id="work" className="px-[5vw]">
        <h2 className="section-tag">PROJECT INDEX</h2>
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-16">
        {Object.values(projectsData).map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
          />
        ))}
      </div>
    </section>
    </div>
    );
    };
export default Work;
