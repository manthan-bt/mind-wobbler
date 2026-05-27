import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.90, // Trigger slightly later
  centerRatio = 0.30, // Complete higher up for better visibility
  className = '' 
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startRatio}`, `end 0.95`] // Animation completes when the BOTTOM enters 95% of viewport
  });

  // Ease-in-out-cubic mapping applied directly to scroll progress for instant matching
  const easedProgress = useTransform(scrollYProgress, (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Visuals strictly matching the "very nice" original version
  const slideY = useTransform(easedProgress, [0, 1], [30, 0]);
  const opacity = easedProgress;
  const clipPath = useTransform(easedProgress, [0, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(easedProgress, [0, 1], [0.97, 1]);

  let style = { willChange: 'transform, opacity, clip-path' };
  if (type === 'clip') {
    style = { ...style, clipPath, scale, opacity };
  } else if (type === 'fade') {
    style = { ...style, opacity };
  } else {
    // Slide (the original 30px translation)
    style = { ...style, y: slideY, opacity };
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
