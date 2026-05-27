import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10"
      >
        <span className="block text-[0.65rem] font-bold tracking-[0.4em] text-black/40 mb-6 uppercase">PAGE NOT FOUND</span>
        <h1 className="text-[clamp(4rem,12vw,8rem)] font-black tracking-tighter leading-none text-black mb-8 uppercase">
          404.
        </h1>
        <p className="text-black/60 max-w-sm mx-auto mb-12 text-[0.75rem] md:text-[0.85rem] font-bold leading-relaxed uppercase tracking-[0.2em]">
          WE CAN'T FIND THE PAGE YOU ARE LOOKING FOR.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-black text-white px-10 py-5 text-[0.7rem] font-black tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-sm shadow-2xl active:scale-95"
        >
          BACK TO HOME
        </Link>
      </motion.div>
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
        <img src="/mind-wobbler-icon.png" alt="" className="w-64 md:w-[450px] h-auto grayscale animate-pulse" />
      </div>

      <div className="absolute bottom-12 left-12 opacity-20 hidden md:block">
        <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase">MIND WOBBLER © 2023</span>
      </div>
    </div>
  );
};

export default NotFound;
