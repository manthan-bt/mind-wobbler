import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.90, 
  centerRatio = 0.30, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const entranceValue = useMotionValue(0);
  
  // Check if in view ONLY on mount
  const isInitialInView = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start 0.95`, `end 0.70`] 
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    // Manual check for initial in-view status
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        isInitialInView.current = true;
      }
    }

    if (!mediaQuery.matches && isInitialInView.current) {
      animate(entranceValue, 1, {
        duration: 1.5,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      });
    } else {
      // If not in view on mount, set to 1 so that scrollProgress can take over (s * 1 = s)
      // or if reduced motion is on
      entranceValue.set(1);
    }
  }, [delay]);

  // Use raw scrollYProgress for "no delay" direct mapping
  // Combined with entranceValue for the mount animation
  const combinedProgress = useTransform(
    [scrollYProgress, entranceValue],
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

  // Visuals strictly matching the original preferred version
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
    // Slide (the original 30px translation)
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
