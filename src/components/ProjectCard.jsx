import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, category, media, youtubeId, externalLink, aspectRatio = 'auto' }) => {
  const isVideo = !!youtubeId;
  const displayMedia = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` 
    : media;

  return (
    <Link 
      to={externalLink ? externalLink : `/projects/${id}`} 
      target={externalLink ? "_blank" : "_self"}
      className="break-inside-avoid block no-underline text-white mb-8 group fade-in-up"
    >
      <div className="w-full overflow-hidden bg-gray-dark rounded-[2px]">
        <div style={{ aspectRatio }} className="relative overflow-hidden">
          <img 
            src={displayMedia} 
            alt={title} 
            loading="lazy" 
            className="w-full h-auto block object-cover transition-transform duration-[1.2s] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-105"
          />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[15px] px-[5px]">
        <div className="text-[0.6rem] font-semibold uppercase tracking-[1px] text-gray mb-1">
          {category}
        </div>
        <h3 className="text-[1.1rem] font-medium tracking-tight transition-colors group-hover:text-gray-light">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
