import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData[id];

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
  }, [id]);

  if (!project) {
    return <Navigate to="/" />;
  }

  // Get next project ID for the bottom link
  const projectIds = Object.keys(projectsData);
  const currentIndex = projectIds.indexOf(id);
  const nextProjectId = projectIds[(currentIndex + 1) % projectIds.length];
  const nextProject = projectsData[nextProjectId];

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="project-hero h-[80vh] flex flex-col justify-end px-[5vw] pb-md relative overflow-hidden fade-in">
        <div className="hero-bg absolute inset-0 -z-10">
          {project.youtubeId ? (
            <div className="w-full h-full scale-[1.1] animate-hero-pulse">
              <iframe 
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
                className="w-full h-full object-cover aspect-video pointer-events-none"
                allow="autoplay; encrypted-media"
              />
            </div>
          ) : (
            <img src={project.hero} alt={project.title} className="w-full h-full object-cover scale-[1.15] animate-hero-pulse" />
          )}
          <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
        <div className="relative z-10">
          <span className="section-tag">{project.category}</span>
          <h1 className="text-[clamp(3rem,6vw,6rem)] leading-none font-semibold tracking-[-0.04em] mb-5 uppercase grayscale hover:grayscale-0 transition-all duration-700">
            {project.title}
          </h1>
          <div className="project-meta flex gap-10 text-[1.1rem] text-gray-light uppercase tracking-widest">
            <span>YEAR: {project.year}</span>
            <span>ROLE: {project.role}</span>
          </div>
        </div>
      </section>

      <section className="project-content py-lg px-[5vw]">
        <div className="project-grid grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-[60px]">
          <div className="fade-in-up">
            <h2 className="text-2xl text-gray">CONCEPT</h2>
          </div>
          <div className="fade-in-up delay-[200ms]">
            <p className="text-[1.3rem] leading-relaxed text-gray-light max-w-4xl lowercase">
              {project.description}
            </p>
            {project.externalLink && (
              <a 
                href={project.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-10 border-b-2 border-white text-white uppercase tracking-widest pb-1 hover-target"
              >
                View full project
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="project-visuals px-[5vw] pb-lg columns-1 md:columns-2 lg:columns-3 gap-10">
        {project.gallery.map((media, index) => (
          <div key={index} className="media-wrapper break-inside-avoid mb-10 rounded-[2px] overflow-hidden bg-gray-dark group fade-in-up">
            {media.includes('youtube.com') || media.includes('shorts') ? (
              <div className="aspect-video">
                <iframe 
                  src={`https://www.youtube.com/embed/${project.youtubeId || media.split('/').pop()}?controls=1`}
                  className="w-full h-full"
                  allow="encrypted-media"
                />
              </div>
            ) : (
              <img 
                src={media} 
                alt={`${project.title} visual ${index + 1}`} 
                loading="lazy" 
                className="w-full h-auto block grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
              />
            )}
          </div>
        ))}
      </section>

      <section className="next-project py-lg px-[5vw] text-center border-t border-white/10 fade-in">
        <p className="text-gray uppercase tracking-[2px] mb-5">NEXT PROJECT</p>
        <Link 
          to={`/projects/${nextProjectId}`} 
          className="text-[clamp(2rem,5vw,4rem)] text-white no-underline hover-target transition-all duration-500 hover:text-gray-light"
        >
          {nextProject.title}
        </Link>
      </section>
    </div>
  );
};

export default ProjectDetail;
