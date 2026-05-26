import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.95, // Animation starts when top enters 95% of viewport
  centerRatio = 0.50, // Animation completes when center reaches 50% of viewport
  className = '' 
}) => {
  const ref = useRef(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth < 1024;
      
      let clampedProgress;
      
      if (isMobile) {
        // Mobile-optimized range: start at 98% height, complete at 75% height.
        // This ensures stacked contents are fully visible and readable as soon as they enter.
        const y_start = 0.98 * viewportHeight;
        const y_end = 0.75 * viewportHeight;
        const distance = y_start - y_end;
        const rawProgress = (y_start - rect.top) / distance;
        clampedProgress = Math.max(0, Math.min(1, rawProgress));
      } else {
        // Desktop height-aware centering formula
        const y_start = startRatio * viewportHeight;
        // Complete when the center of the element reaches centerRatio of viewport height
        const y_end = (centerRatio * viewportHeight) - (rect.height / 2);
        
        // Safety guard: ensure y_end is less than y_start
        const endVal = y_end < y_start ? y_end : 0.45 * viewportHeight;
        const distance = y_start - endVal;
        
        // Calculate scroll progress from y_start to endVal
        const rawProgress = (y_start - rect.top) / distance;
        clampedProgress = Math.max(0, Math.min(1, rawProgress));
      }
      
      progress.set(clampedProgress);
    };

    // Run immediately on mount to establish initial state
    handleScroll();

    // Listen to scroll and resize events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Schedule updates to handle layout shifts from async image/resource loading
    const t1 = setTimeout(handleScroll, 100);
    const t2 = setTimeout(handleScroll, 300);
    const t3 = setTimeout(handleScroll, 600);
    const t4 = setTimeout(handleScroll, 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [startRatio, centerRatio, progress]);

  // Apply custom ease-in-out cubic function to raw progress
  const easedProgress = useTransform(progress, (t) => {
    // Premium ease-in-out cubic curve
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  // Slide reveal (sleek 30px translation + opacity)
  const slideY = useTransform(easedProgress, [0, 1], [30, 0]);
  const slideOpacity = easedProgress;

  // Clip reveal (editorial clip-path reveal + scale transition)
  const clipPath = useTransform(easedProgress, [0, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const clipScale = useTransform(easedProgress, [0, 1], [0.97, 1]);
  const clipOpacity = easedProgress;

  // Pure fade reveal
  const fadeOpacity = easedProgress;

  // Determine active styles based on type
  let style = {};
  if (type === 'clip') {
    style = { clipPath, scale: clipScale, opacity: clipOpacity };
  } else if (type === 'fade') {
    style = { opacity: fadeOpacity };
  } else {
    // Default to slide
    style = { y: slideY, opacity: slideOpacity };
  }

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
