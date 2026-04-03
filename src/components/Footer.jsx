import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 px-[5vw] border-t border-white/10 text-gray text-center">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center gap-4 text-white font-semibold tracking-widest">
          <img
            src="/mind-wobbler-icon.png"
            alt="MIND WOBBLER"
            className="h-[30px] opacity-80 brightness-0 invert"
          />
          <span>MIND WOBBLER</span>
        </div>
        <div className="text-[0.85rem] tracking-wider">
          <p>&copy; 2026 MIND WOBBLER. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
