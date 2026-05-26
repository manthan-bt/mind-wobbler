import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Unsubscribe = () => {
  const [status, setStatus] = useState('pending'); // pending, success, error

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    setStatus('success');
  };

  return (
    <div className="bg-white pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen relative overflow-hidden">

      
      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        <section className="px-6 md:px-[3vw] max-w-4xl fade-in">
          {status === 'pending' ? (
            <>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
                Manage your <br className="hidden md:block" />
                preferences.
              </h1>
              <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium mb-16">
                You are about to unsubscribe from Mind Wobbler's strategic updates and inquiry follow-ups. We're sorry to see you go.
              </p>
              
              <button 
                onClick={handleUnsubscribe}
                className="bg-black text-white px-12 py-5 text-[0.8rem] font-black tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-sm shadow-2xl"
              >
                Confirm Unsubscribe
              </button>
              
              <div className="mt-12">
                <Link to="/" className="text-sm font-bold border-b border-black/10 pb-1 hover:border-black transition-all uppercase tracking-widest text-black/40 hover:text-black">
                  Return to Mind Wobbler →
                </Link>
              </div>
            </>
          ) : (
            <div className="fade-in-up">
              <span className="text-black text-7xl block mb-8">✓</span>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
                Success.
              </h1>
              <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium mb-16">
                You have been successfully removed from our mailing list. You will no longer receive automated marketing or update transmissions from Mind Wobbler.
              </p>
              <Link 
                to="/" 
                className="bg-black text-white px-12 py-5 text-[0.8rem] font-black tracking-[0.3em] uppercase hover:bg-black/80 transition-all rounded-sm inline-block"
              >
                Back to Home
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Unsubscribe;
