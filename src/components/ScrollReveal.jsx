import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue, animate } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.90, 
  centerRatio = 0.75, // Synchronized at 0.75
  className = '',
  delay = 0 
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  // Motion values to drive the layout transitions
  const scrollProgress = useMotionValue(0);
  const entranceValue = useMotionValue(0);
  
  // Trackers
  const isInitialInView = useRef(false);
  const currentProgress = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    if (mediaQuery.matches) {
      return;
    }

    if (typeof window !== 'undefined') {
      lastScrollY.current = window.scrollY;
    }

    const updateProgress = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const currentScrollY = window.scrollY;

      // Calculate scroll direction
      const isScrollingUp = currentScrollY < lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Reveal start: top of element crosses startRatio * viewportHeight
      const y_start = viewportHeight * startRatio;
      
      // Reveal end:
      // For clip: bottom of element crosses 0.85 * viewportHeight
      // For others: top of element crosses centerRatio * viewportHeight
      const y_end = type === 'clip'
        ? Math.max(0.15 * viewportHeight, 0.85 * viewportHeight - rect.height)
        : centerRatio * viewportHeight;

      let computedProgress = 0;
      if (y_start !== y_end) {
        computedProgress = (y_start - rect.top) / (y_start - y_end);
      }
      computedProgress = Math.max(0, Math.min(1, computedProgress));

      // Direction-aware progress mapping
      let nextProgress = computedProgress;
      if (!isScrollingUp) {
        // If scrolling down or layout shifts, only increase
        nextProgress = Math.max(currentProgress.current, computedProgress);
      }
      
      currentProgress.current = nextProgress;
      scrollProgress.set(nextProgress);
    };

    // Manual check for initial in-view status
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        isInitialInView.current = true;
      }
    }

    if (isInitialInView.current) {
      // Trigger mount animation if in-view initially
      animate(entranceValue, 1, {
        duration: 1.5,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      });
    } else {
      entranceValue.set(1);
    }

    // Set initial scroll progress before listeners fire
    updateProgress();

    const handleScroll = () => {
      updateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [type, startRatio, centerRatio, delay]);

  // Combined progress (scrollProgress * entranceValue)
  const combinedProgress = useTransform(
    [scrollProgress, entranceValue],
    ([s, e]) => s * e
  );

  // Ease-in-out-cubic mapping applied to the combined progress
  const easedProgress = useTransform(combinedProgress, (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Visual transitions
  const slideY = useTransform(easedProgress, [0, 1], [30, 0]);
  const opacity = easedProgress;
  const clipPath = useTransform(easedProgress, [0, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(easedProgress, [0, 1], [0.97, 1]);

  let scrollStyle = { willChange: 'transform, opacity, clip-path' };
  if (type === 'clip') {
    scrollStyle = { ...scrollStyle, clipPath, scale, opacity };
  } else if (type === 'fade') {
    scrollStyle = { ...scrollStyle, opacity };
  } else {
    scrollStyle = { ...scrollStyle, y: slideY, opacity };
  }

  return (
    <motion.div
      ref={ref}
      style={scrollStyle}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
