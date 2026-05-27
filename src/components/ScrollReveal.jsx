import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.95, // Animation starts when top enters 95% of viewport
  centerRatio = 0.75, // Animation completes when top reaches 75% of viewport
  className = '' 
}) => {
  const ref = useRef(null);
  const progress = useMotionValue(0);
  const latestProgress = useRef(0);
  const isAnimatingOnMount = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // If we are at the top of the page and the element is in the viewport,
      // keep its progress at 1.0 (fully visible) and don't let timeouts fade it out.
      if (window.scrollY < 50 && rect.top < viewportHeight) {
        if (isAnimatingOnMount.current) return;
        progress.set(1);
        latestProgress.current = 1;
        return;
      }
      
      const isMobile = window.innerWidth < 1024;
      
      let newProgress = 0;
      let y_start = 0;
      let distance = 1;
      
      // Animation starts when the top of the element enters the viewport
      y_start = (isMobile ? 0.95 : startRatio) * viewportHeight;
      
      // Determine completion point (y_end)
      let y_end = (isMobile ? 0.75 : centerRatio) * viewportHeight;
      if (type === 'clip') {
        // Complete when the bottom of the element reaches 100% of the viewport height
        // This ensures items at the top of the page are fully revealed
        const calculatedEnd = 1.0 * viewportHeight - rect.height;
        // Safety guard: ensure y_end doesn't go too high on the screen for tall images
        y_end = Math.max(0.15 * viewportHeight, calculatedEnd);
      }
      
      // Safety guard: ensure y_end is less than y_start
      const endVal = y_end < y_start ? y_end : 0.75 * viewportHeight;
      distance = y_start - endVal;
      
      if (distance > 0) {
        const rawProgress = (y_start - rect.top) / distance;
        newProgress = Math.max(0, Math.min(1, rawProgress));
      }
      
      if (isNaN(newProgress)) {
        newProgress = 0;
      }
      
      latestProgress.current = newProgress;
      progress.set(newProgress);
    };

    // Run immediately on mount to establish initial state
    const rect = ref.current?.getBoundingClientRect();
    const isMobile = window.innerWidth < 1024;
    const viewportHeight = window.innerHeight;

    if (window.scrollY < 50 && rect && rect.top < viewportHeight) {
      // For elements already in the viewport on mount when scroll is at top,
      // animate them to 1.0 smoothly using the safe animate signature.
      isAnimatingOnMount.current = true;
      animate(0, 1, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate: (latest) => {
          progress.set(latest);
          latestProgress.current = latest;
        },
        onComplete: () => {
          isAnimatingOnMount.current = false;
        }
      });
    } else {
      handleScroll();
    }

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
