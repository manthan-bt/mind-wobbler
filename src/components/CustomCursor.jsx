import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Update hero reveal properties if on Home page
      if (location.pathname === '/') {
        const hero = document.querySelector('.hero');
        const revealLayer = document.querySelector('.hero-reveal-layer');
        if (hero && revealLayer) {
          const rect = hero.getBoundingClientRect();
          const x = ((mouseX - rect.left) / rect.width) * 100;
          const y = ((mouseY - rect.top) / rect.height) * 100;
          revealLayer.style.setProperty('--x', `${x}%`);
          revealLayer.style.setProperty('--y', `${y}%`);
        }
      }
    };

    const renderFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(renderFollower);
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, .hover-target');
      targets.forEach((target) => {
        target.addEventListener('mouseenter', () => setIsHovered(true));
        target.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    renderFollower();
    addHoverListeners();

    // Re-bind listeners when location changes (new elements might appear)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transition-[width,height,background-color] duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? 'w-3 h-3 bg-transparent border border-white' : ''
        }`}
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] transition-[width,height,background-color] duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? 'w-[60px] h-[60px] bg-white/10 border-transparent' : ''
        }`}
      />
    </>
  );
};

export default CustomCursor;
