import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    functional: true
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner if no consent is saved
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      // If consent is already saved, load preferences
      try {
        const parsed = JSON.parse(consent);
        setPreferences({
          necessary: true,
          analytics: parsed.analytics !== false,
          functional: parsed.functional !== false
        });
      } catch (e) {
        // Fallback for older string consent format
        if (consent === 'accepted') {
          setPreferences({ necessary: true, analytics: true, functional: true });
        } else {
          setPreferences({ necessary: true, analytics: false, functional: false });
        }
      }
    }
  }, []);

  const saveConsent = (prefs) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);

    // Update Google Analytics Consent Mode (Consent Mode v2)
    if (typeof window.gtag === 'function') {
      const consentState = prefs.analytics ? 'granted' : 'denied';
      console.log('Updating Google Analytics consent state:', consentState);
      window.gtag('consent', 'update', {
        'analytics_storage': consentState,
        'ad_storage': consentState,
        'ad_user_data': consentState,
        'ad_personalization': consentState
      });
    } else {
      console.warn('Google Analytics gtag function not found on window object.');
    }

    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, functional: true });
  };

  const handleAcceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false, functional: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-[450px] z-[4000]"
        >
          <div className="bg-white border border-black/10 shadow-2xl p-8 md:p-10 relative overflow-hidden transition-all duration-300">
            {/* Background decorative spheres */}
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                <h4 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40">
                  {showDetails ? 'Cookie Preferences' : 'Privacy Preference'}
                </h4>
              </div>

              <AnimatePresence mode="wait">
                {!showDetails ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">
                      We use cookies.
                    </h3>
                    
                    <p className="text-sm leading-relaxed text-black/60 font-medium mb-8">
                      We use small digital files called cookies to help our website work safely and to understand how you move through our site. This helps us make your experience smoother and better.
                    </p>
                    
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="w-full bg-black text-white py-4 text-[0.7rem] font-black tracking-[0.2em] uppercase hover:bg-black/80 transition-all rounded-sm font-bold"
                      >
                        Accept All
                      </button>
                      <div className="flex gap-4">
                        <button
                          onClick={handleAcceptNecessary}
                          className="flex-1 border border-black/10 py-3 text-[0.65rem] font-bold tracking-[0.1em] uppercase hover:border-black transition-all rounded-sm text-black/40 hover:text-black"
                        >
                          Necessary Only
                        </button>
                        <button
                          onClick={() => setShowDetails(true)}
                          className="flex-1 border border-black/10 py-3 text-[0.65rem] font-bold tracking-[0.1em] uppercase hover:border-black transition-all rounded-sm text-black/40 hover:text-black"
                        >
                          Customize
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[0.75rem] text-black/60 font-medium mb-6">
                      Customize how cookies are saved on your device. You can learn more details on our <Link to="/cookies" className="underline text-black font-bold">Cookie Policy</Link>.
                    </p>

                    <div className="space-y-5 mb-8">
                      {/* Strictly Necessary */}
                      <div className="flex items-start gap-4 p-3 hover:bg-black/[0.01] transition-colors border border-black/5 rounded-sm">
                        <input
                          type="checkbox"
                          id="necessary"
                          checked={preferences.necessary}
                          disabled
                          className="mt-1 accent-black h-4 w-4 cursor-not-allowed"
                        />
                        <div className="flex-1">
                          <label htmlFor="necessary" className="text-[0.75rem] font-black tracking-widest uppercase text-black block mb-1">
                            Necessary <span className="text-[0.55rem] font-normal text-black/40 tracking-normal lowercase ml-2">(strictly required)</span>
                          </label>
                          <p className="text-[0.65rem] text-black/50 leading-relaxed font-medium">
                            Essential cookies required for core website features, secure navigation, and layout stability. Cannot be disabled.
                          </p>
                        </div>
                      </div>

                      {/* Analytics */}
                      <div 
                        onClick={() => togglePreference('analytics')}
                        className="flex items-start gap-4 p-3 hover:bg-black/[0.02] cursor-pointer transition-colors border border-black/5 rounded-sm"
                      >
                        <input
                          type="checkbox"
                          id="analytics"
                          checked={preferences.analytics}
                          onChange={() => {}} // handled by div click
                          className="mt-1 accent-black h-4 w-4 cursor-pointer"
                        />
                        <div className="flex-grow">
                          <label htmlFor="analytics" className="text-[0.75rem] font-black tracking-widest uppercase text-black block mb-1 cursor-pointer">
                            Analytics
                          </label>
                          <p className="text-[0.65rem] text-black/50 leading-relaxed font-medium">
                            Anonymized tracking cookies that measure visitor count, page traffic, and session details to help us optimize speed and content.
                          </p>
                        </div>
                      </div>

                      {/* Functional */}
                      <div 
                        onClick={() => togglePreference('functional')}
                        className="flex items-start gap-4 p-3 hover:bg-black/[0.02] cursor-pointer transition-colors border border-black/5 rounded-sm"
                      >
                        <input
                          type="checkbox"
                          id="functional"
                          checked={preferences.functional}
                          onChange={() => {}} // handled by div click
                          className="mt-1 accent-black h-4 w-4 cursor-pointer"
                        />
                        <div className="flex-grow">
                          <label htmlFor="functional" className="text-[0.75rem] font-black tracking-widest uppercase text-black block mb-1 cursor-pointer">
                            Functional
                          </label>
                          <p className="text-[0.65rem] text-black/50 leading-relaxed font-medium">
                            Preferences cookies that remember UI settings such as selected filters or local options to make navigation more personal.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleSavePreferences}
                        className="w-full bg-black text-white py-4 text-[0.7rem] font-black tracking-[0.2em] uppercase hover:bg-black/80 transition-all rounded-sm font-bold"
                      >
                        Save Preferences
                      </button>
                      <div className="flex gap-4">
                        <button
                          onClick={handleAcceptAll}
                          className="flex-grow border border-black/10 py-3 text-[0.65rem] font-bold tracking-[0.1em] uppercase hover:border-black transition-all rounded-sm text-black/40 hover:text-black font-bold"
                        >
                          Accept All
                        </button>
                        <button
                          onClick={() => setShowDetails(false)}
                          className="border border-black/10 px-6 py-3 text-[0.65rem] font-bold tracking-[0.1em] uppercase hover:border-black transition-all rounded-sm text-black/40 hover:text-black"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
