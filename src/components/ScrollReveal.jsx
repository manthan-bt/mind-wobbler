import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  type = 'slide', 
  startRatio = 0.95, // Start near bottom
  centerRatio = 0.65, // Complete earlier
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
    offset: [`start ${startRatio}`, `start ${centerRatio}`]
  });

  // Use a very high stiffness spring to match scroll exactly with zero lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    mass: 1,
    restDelta: 0.0001
  });

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Restore original animation values
  // Slide: 30px translation + Opacity (as it was originally)
  const slideY = useTransform(smoothProgress, [0, 1], [30, 0]);
  const slideOpacity = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Clip: original editorial clip-path reveal + scale 0.97
  const clipPath = useTransform(smoothProgress, [0, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const clipScale = useTransform(smoothProgress, [0, 1], [0.97, 1]);
  const clipOpacity = useTransform(smoothProgress, [0, 1], [0, 1]);

  const fadeOpacity = smoothProgress;

  let style = { willChange: 'transform, opacity, clip-path' };
  if (type === 'clip') {
    style = { ...style, clipPath, scale: clipScale, opacity: clipOpacity };
  } else if (type === 'fade') {
    style = { ...style, opacity: fadeOpacity };
  } else {
    // Default Slide: how it was before
    style = { ...style, y: slideY, opacity: slideOpacity };
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
