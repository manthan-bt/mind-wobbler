import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, category, hero, gallery, youtubeId, externalLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isVideo = !!youtubeId;
  
  useEffect(() => {
    if (!isHovered) {
      setVideoLoaded(false);
    }
  }, [isHovered]);

  useEffect(() => {
    let interval;
    if (isHovered && !isVideo && gallery && gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.min(gallery.length, 5));
      }, 1500);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, isVideo, gallery]);

  const displayMedia = isVideo 
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` 
    : (isHovered && gallery && gallery.length > 0 ? gallery[currentIndex] : hero);

  return (
    <Link 
      to={externalLink ? externalLink : `/projects/${id}`} 
      target={externalLink ? "_blank" : "_self"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block no-underline text-white group fade-in-up"
    >
      <div className="w-full relative overflow-hidden bg-gray-dark rounded-sm">
        <div className="relative overflow-hidden aspect-[16/10] sm:aspect-video">
          {/* Grayscale overlay that fades out on hover */}
          <div className="w-full h-full overflow-hidden relative z-10">
            <img 
              key={displayMedia}
              src={displayMedia} 
              alt={title} 
              loading="lazy" 
              className={`w-full h-full block object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 ${isVideo && videoLoaded ? 'opacity-0' : 'opacity-100'}`}
            />
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none" />
          </div>

          {isVideo && isHovered && (
            <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-20 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <iframe 
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1`}
                className="video-preview-iframe grayscale group-hover:grayscale-0 transition-all duration-1000"
                allow="autoplay; encrypted-media"
                onLoad={() => setVideoLoaded(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="text-[0.9rem] font-bold tracking-tight uppercase mb-1">
            {title}
          </h3>
          <div className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/30">
            {category}
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
          <span className="text-xl">→</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
