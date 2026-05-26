import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
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
    <div className="bg-white text-black min-h-screen relative">
      <section key={id} className="project-hero h-[85vh] flex flex-col justify-end px-6 md:px-[3vw] pb-16 relative overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0">
          {project.youtubeId ? (
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover scale-[1.05] animate-hero-pulse opacity-25"
              />
            </div>
          ) : (
            <img 
              src={project.hero} 
              alt={project.title} 
              className="w-full h-full object-cover scale-[1.05] animate-hero-pulse opacity-25" 
            />
          )}
          <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent z-10" />
        </div>
        <div className="relative z-20">
          <span className="block text-[0.7rem] font-bold uppercase tracking-[0.3em] text-black/40 mb-6">{project.category}</span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-black tracking-tighter mb-8 uppercase">
            {project.title}
          </h1>
          <div className="project-meta flex gap-12 text-[0.9rem] text-black/60 uppercase tracking-widest font-bold">
            <span>Year: {project.year}</span>
            <span>Role: {project.role}</span>
          </div>
        </div>
      </section>

      <section className="project-content py-24 md:py-48 px-6 md:px-[3vw] relative z-20 bg-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4 lg:col-span-3 fade-in">
            <h2 className="text-[0.7rem] tracking-[0.3em] text-black/40 uppercase mb-8 font-bold">PROJECT SCOPE</h2>
            <div className="flex flex-col gap-6 text-[0.9rem] text-black/60 font-bold uppercase tracking-widest">
              <div className="border-b border-black/5 pb-2">Year: {project.year}</div>
              <div className="border-b border-black/5 pb-2">Role: {project.role}</div>
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-7 fade-in">
            <h2 className="text-[0.7rem] tracking-[0.3em] text-black/40 uppercase mb-8 font-bold">DESCRIPTION</h2>
            <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] leading-relaxed text-black/80 font-medium mb-16">
              {project.description}
            </p>
            {project.externalLink && (
              <a 
                href={project.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-6 text-black uppercase tracking-[0.3em] group no-underline border-b-2 border-black/20 pb-2 hover:border-black transition-all font-black text-sm"
              >
                Launch Experience
                <span className="transform transition-transform group-hover:translate-x-3">→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="project-visuals bg-white flex flex-col items-center relative z-20 px-6 md:px-[3vw] py-12 gap-12 md:gap-24">
        {project.gallery.map((media, index) => {
          // Detect YouTube URLs or Behance URLs that embed a youtubeId (broken placeholder pattern)
          const isYouTubeUrl = media.includes('youtube.com') || media.includes('shorts') || media.includes('youtu.be');
          const isProjectVideoPlaceholder = !isYouTubeUrl && project.youtubeId && media.includes(project.youtubeId);
          const videoId = isYouTubeUrl
            ? media.split('/').pop().split('?')[0]
            : isProjectVideoPlaceholder ? project.youtubeId : null;

          return (
            <ScrollReveal 
              key={index}
              type="clip"
              className="w-full relative overflow-hidden border border-black/5 shadow-2xl"
            >
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
                  className="w-full h-auto block object-cover"
                />
              )}
            </ScrollReveal>
          );
        })}
      </section>

      <section className="next-project py-48 px-6 md:px-[3vw] text-center border-t border-black/10 fade-in flex flex-col items-center gap-12 bg-white">
        <Link 
          to="/work" 
          className="text-black/60 hover:text-black uppercase tracking-[4px] text-xs transition-colors border-b-2 border-black/10 pb-2 font-bold"
        >
          VIEW ARCHIVE
        </Link>
        <div className="w-full">
          <p className="text-black/40 uppercase tracking-[3px] mb-8 font-bold text-xs">SEQUENTIAL PRODUCTION</p>
          <Link 
            to={`/projects/${nextProjectId}`} 
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-black no-underline hover-target transition-all duration-500 hover:text-black/40 font-black uppercase tracking-tighter"
          >
            {nextProject.title}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
