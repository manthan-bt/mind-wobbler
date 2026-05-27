import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.92, // Animation starts when top enters 92% of viewport
  centerRatio = 0.70, // Animation completes when top reaches 70% of viewport
  className = '' 
}) => {
  const ref = useRef(null);
  const progress = useMotionValue(0);
  const latestProgress = useRef(0);
  const isAnimatingOnMount = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Respect user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    
    let isIntersecting = false;
    
    const handleScroll = () => {
      if (!ref.current || (mediaQuery.matches) || !isIntersecting) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // If we are at the top of the page and the element is in the viewport,
      // keep its progress at 1.0 (fully visible)
      if (window.scrollY < 50 && rect.top < viewportHeight) {
        if (isAnimatingOnMount.current) return;
        progress.set(1);
        latestProgress.current = 1;
        return;
      }
      
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      let newProgress = 0;
      let y_start = 0;
      let distance = 1;
      
      // Dynamic start and end ratios based on screen size
      const sRatio = isMobile ? 0.98 : (isTablet ? 0.95 : startRatio);
      const cRatio = isMobile ? 0.85 : (isTablet ? 0.80 : centerRatio);
      
      y_start = sRatio * viewportHeight;
      let y_end = cRatio * viewportHeight;

      if (type === 'clip') {
        const calculatedEnd = (isMobile ? 1.05 : 1.0) * viewportHeight - rect.height;
        y_end = Math.max(0.1 * viewportHeight, calculatedEnd);
      }
      
      const endVal = y_end < y_start ? y_end : y_start * 0.8;
      distance = y_start - endVal;
      
      if (distance > 0) {
        const rawProgress = (y_start - rect.top) / distance;
        newProgress = Math.max(0, Math.min(1, rawProgress));
      }
      
      latestProgress.current = newProgress;
      progress.set(newProgress);
    };

    // Use IntersectionObserver to only track scroll when element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          handleScroll();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const rect = ref.current?.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (window.scrollY < 50 && rect && rect.top < viewportHeight && !mediaQuery.matches) {
      isAnimatingOnMount.current = true;
      animate(0, 1, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          progress.set(latest);
          latestProgress.current = latest;
        },
        onComplete: () => {
          isAnimatingOnMount.current = false;
        }
      });
    } else if (!mediaQuery.matches) {
      handleScroll();
    } else {
      progress.set(1);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [startRatio, centerRatio, progress, type]);

  // Apply custom ease function to progress
  const easedProgress = useTransform(progress, (t) => {
    // Smoother cubic bezier for all screen types
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

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
