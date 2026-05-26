import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

const AnimatedNumber = ({ value, duration = 2.5, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        // Ease-in-out quart for professional, smooth acceleration and deceleration
        ease: [0.76, 0, 0.24, 1], 
        onUpdate: (latest) => {
          // Using Math.round for a more natural step-up toward the end
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    } else {
      setDisplayValue(0);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
};

export default AnimatedNumber;
