import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, category, hero, gallery, youtubeId, externalLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isVideo = !!youtubeId;
  
  // Reset video loaded state when not hovering
  useEffect(() => {
    if (!isHovered) {
      setVideoLoaded(false);
    }
  }, [isHovered]);

  // Slideshow logic for images
  useEffect(() => {
    let interval;
    if (isHovered && !isVideo && gallery && gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.min(gallery.length, 5)); // Cycle through first 5 images
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
      <div className="w-full relative overflow-hidden grayscale transition-custom hover:grayscale-0 rounded-[2px]">
        <div className="relative overflow-hidden aspect-video bg-gray-dark">
          {/* Main Image / Thumbnail — Always here as base/fallback */}
          <div className="w-full h-full overflow-hidden relative">
            <img 
              key={displayMedia}
              src={displayMedia} 
              alt={title} 
              loading="lazy" 
              className={`w-full h-full block object-cover transition-custom group-hover:scale-110 animate-fade-in ${isVideo && videoLoaded ? 'opacity-0' : 'opacity-100'}`}
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Video Iframe — Overlays thumbnail when hovering */}
          {isVideo && isHovered && (
            <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <iframe 
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1`}
                className="video-preview-iframe"
                allow="autoplay; encrypted-media"
                onLoad={() => setVideoLoaded(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 px-1 transition-opacity duration-500 group-hover:opacity-100 opacity-60">
        <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray mb-1">
          {category}
        </div>
        <h3 className="text-[1rem] md:text-[1.2rem] font-bold tracking-tight uppercase">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
