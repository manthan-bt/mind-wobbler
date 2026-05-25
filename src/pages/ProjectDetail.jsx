import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData[id];
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
  }, [id]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05 // Lower threshold for better reliability
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
    <div className="bg-black text-white min-h-screen relative">
      <section key={id} className="project-hero h-[80vh] flex flex-col justify-end px-[5vw] pb-md relative overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0">
          {project.youtubeId ? (
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover scale-[1.05] animate-hero-pulse"
              />
            </div>
          ) : (
            <img 
              src={project.hero} 
              alt={project.title} 
              className="w-full h-full object-cover scale-[1.05] animate-hero-pulse" 
            />
          )}
          <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
        </div>
        <div className="relative z-20">
          <span className="section-tag">{project.category}</span>
          <h1 className="text-[clamp(3rem,6vw,6rem)] leading-none font-semibold tracking-[-0.04em] mb-5 uppercase grayscale hover:grayscale-0 transition-custom">
            {project.title}
          </h1>
          <div className="project-meta flex gap-10 text-[1.1rem] text-gray-light uppercase tracking-widest">
            <span>YEAR: {project.year}</span>
            <span>ROLE: {project.role}</span>
          </div>
        </div>
      </section>

      <section className="project-content py-16 md:py-32 px-[5vw] border-b border-white/5 relative z-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-12 md:gap-24">
          <div className="fade-in is-visible">
            <h2 className="text-[0.7rem] tracking-[4px] text-gray uppercase mb-4">PROJECT SCOPE</h2>
            <div className="flex flex-col gap-4 text-[0.9rem] text-gray-light uppercase tracking-widest">
              <div>YEAR: {project.year}</div>
              <div>ROLE: {project.role}</div>
            </div>
          </div>
          <div className="fade-in is-visible">
            <h2 className="text-[0.7rem] tracking-[4px] text-gray uppercase mb-4">DESCRIPTION</h2>
            <p className="text-[1.1rem] md:text-[1.4rem] leading-relaxed text-white font-medium mb-12">
              {project.description}
            </p>
            {project.externalLink && (
              <a 
                href={project.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-white uppercase tracking-widest group no-underline border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-custom"
              >
                View Full Project
                <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="project-visuals bg-black flex flex-col items-center relative z-20">
        {project.gallery.map((media, index) => {
          // Detect YouTube URLs or Behance URLs that embed a youtubeId (broken placeholder pattern)
          const isYouTubeUrl = media.includes('youtube.com') || media.includes('shorts') || media.includes('youtu.be');
          const isProjectVideoPlaceholder = !isYouTubeUrl && project.youtubeId && media.includes(project.youtubeId);
          const videoId = isYouTubeUrl
            ? media.split('/').pop().split('?')[0]
            : isProjectVideoPlaceholder ? project.youtubeId : null;

          return (
            <div key={index} className="w-full max-w-[1600px] relative overflow-hidden fade-in-up">
              {videoId ? (
                <div className="aspect-video w-full relative overflow-hidden">
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&playsinline=1`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                  />
                </div>
              ) : (
                <img 
                  src={media} 
                  alt={`${project.title} detail ${index + 1}`} 
                  loading="lazy" 
                  className="w-full h-auto block object-cover grayscale transition-custom hover:grayscale-0"
                />
              )}
            </div>
          );
        })}
      </section>

      <section className="next-project py-lg px-[5vw] text-center border-t border-white/10 fade-in flex flex-col items-center gap-10">
        <Link 
          to="/" 
          className="text-gray-light hover:text-white uppercase tracking-[4px] text-sm transition-colors border-b border-white/10 pb-2"
        >
          BACK TO ALL WORK
        </Link>
        <div>
          <p className="text-gray uppercase tracking-[2px] mb-5">NEXT PROJECT</p>
          <Link 
            to={`/projects/${nextProjectId}`} 
            className="text-[clamp(2rem,5vw,4rem)] text-white no-underline hover-target transition-all duration-500 hover:text-gray-light"
          >
            {nextProject.title}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
