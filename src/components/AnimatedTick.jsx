import React from 'react';

const DASH = 110;

const AnimatedTick = ({ size = 28, strokeWidth = 8, className = "" }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Success"
    style={{ overflow: 'visible' }}
  >
    <style>{`
      @keyframes mw-draw {
        to { stroke-dashoffset: 0; }
      }
      .mw-tick {
        animation: mw-draw 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
      }
    `}</style>

    <polyline
      className="mw-tick"
      strokeDasharray={DASH}
      strokeDashoffset={DASH}
      points="24,54 40,70 78,32"
      stroke="#000000"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AnimatedTick;

