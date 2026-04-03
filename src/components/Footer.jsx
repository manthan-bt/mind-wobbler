import React from 'react';

const Footer = () => {
  return (
    <footer className="py-24 px-[5vw] border-t border-white/5 text-gray text-center bg-black">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 text-white font-bold tracking-[0.3em] opacity-90 scale-90 md:scale-100 uppercase">
          <img
            src="/mind-wobbler-icon.png"
            alt="M"
            className="h-[24px] brightness-0 invert"
          />
          <span>MIND WOBBLER</span>
        </div>
        <div className="text-[0.7rem] tracking-[0.2em] opacity-50 uppercase">
          <p>&copy; 2026 MIND WOBBLER. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-[0.6rem]">Personal passion project showcased through the branding of photography and design.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
