import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedTick from '../components/AnimatedTick';

const Unsubscribe = () => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white pt-[35vh] xl:pt-64 pb-48 text-black min-h-screen relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        <section className="px-6 md:px-[3vw]">

          {status === 'pending' ? (
            <div className="max-w-3xl">
              <p className="text-[0.65rem] font-bold tracking-[0.4em] text-black/30 uppercase mb-8">
                Email Preferences
              </p>

              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] mb-10 text-black uppercase">
                Unsubscribe
              </h1>

              <p className="text-black/50 text-[clamp(0.95rem,1.3vw,1.2rem)] leading-relaxed max-w-xl font-medium mb-4">
                YOU ARE ABOUT TO UNSUBSCRIBE FROM MIND WOBBLER'S <strong>MARKETING UPDATES</strong>.
              </p>
              <p className="text-black/30 text-sm leading-relaxed max-w-xl mb-4">
                NOTE: YOU WILL STILL RECEIVE TRANSACTIONAL EMAILS — SUCH AS CONFIRMATION OF YOUR SUBMITTED INQUIRY AND OUR REPLY — AS THESE ARE ESSENTIAL COMMUNICATIONS, NOT MARKETING.
              </p>
              <p className="text-black/25 text-xs tracking-wide mb-16">
                THIS ACTION IS IMMEDIATE AND CANNOT BE UNDONE.
              </p>

              <div className="w-12 h-[2px] bg-black mb-16" />

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <button
                  onClick={() => setStatus('success')}
                  className="bg-black text-white px-12 py-5 text-[0.75rem] font-black tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-sm shadow-xl"
                >
                  CONFIRM UNSUBSCRIBE
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center gap-3 px-12 py-5 text-[0.75rem] font-black tracking-[0.3em] uppercase border border-black/10 hover:border-black transition-all rounded-sm text-black/50 hover:text-black"
                >
                  TAKE ME BACK
                </Link>
              </div>
            </div>

          ) : (
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <AnimatedTick size={24} strokeWidth={8} className="text-black flex-shrink-0" />
                <p className="text-[0.65rem] font-bold tracking-[0.4em] text-black/30 uppercase">
                  Confirmed
                </p>
              </div>

              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] mb-10 text-black uppercase">
                You're all done.
              </h1>

              <p className="text-black/50 text-[clamp(0.95rem,1.3vw,1.2rem)] leading-relaxed max-w-xl font-medium mb-4">
                YOU'VE BEEN SUCCESSFULLY REMOVED FROM OUR MARKETING UPDATES MAILING LIST.
              </p>
              <p className="text-black/30 text-sm leading-relaxed max-w-xl mb-4">
                NOTE: YOU MAY STILL RECEIVE DIRECT REPLIES TO ANY SUBMITTED INQUIRIES, AS THESE ARE TRANSACTIONAL COMMUNICATIONS, NOT MARKETING.
              </p>
              <p className="text-black/25 text-xs tracking-wide mb-16">
                THIS PREFERENCE UPDATE HAS BEEN APPLIED IMMEDIATELY.
              </p>

              <div className="w-12 h-[2px] bg-black mb-16" />

              <Link
                to="/"
                className="inline-block bg-black text-white px-12 py-5 text-[0.75rem] font-black tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-sm shadow-xl"
              >
                BACK TO MIND WOBBLER
              </Link>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default Unsubscribe;
