import React, { useEffect } from 'react';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-[3vw]">
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-12 text-black uppercase">
            COOKIES <br /> POLICY.
          </h1>
          
          <div className="space-y-16 text-[1rem] md:text-[1.1rem] leading-relaxed text-black/70 font-medium text-justify">
            <p className="text-black font-bold border-b border-black/10 pb-8 uppercase text-xs tracking-[0.2em]">Effective Date: May 26, 2026</p>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">1. WHAT ARE COOKIES?</h2>
              <p>
                A "cookie" is a very small text file that a website saves on your computer or mobile device when you visit. It acts like a temporary memory for the website, allowing it to remember your actions and preferences over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">2. HOW WE USE COOKIES</h2>
              <p className="mb-6">At MIND WOBBLER, we use cookies to make our digital interfaces work better for you. We categorize our cookies into three specific tiers:</p>
              
              <div className="space-y-8">
                <div className="pl-8 border-l border-black/10">
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2 italic underline underline-offset-4">Tier I: Essential Cookies</h3>
                  <p>These are strictly necessary for the website to function. They handle basic things like page navigation, website security, and ensuring that your contact form submissions are sent correctly. Without these cookies, the website will not work properly.</p>
                </div>
                <div className="pl-8 border-l border-black/10">
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2 italic underline underline-offset-4">Tier II: Performance & Analytics</h3>
                  <p>These cookies help us understand how people use our website. We see which pages are the most popular, how long people stay on a project page, and if any errors occur. All this information is grouped together and kept anonymous. We use it only to make the website faster and more intuitive.</p>
                </div>
                <div className="pl-8 border-l border-black/10">
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2 italic underline underline-offset-4">Tier III: Functional Preferences</h3>
                  <p>These cookies remember the choices you make, such as your preferred language or region. This allows us to provide a more personalized experience when you return to our studio's digital environment.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">3. OUR "NO AD TRACKING" PROMISE</h2>
              <p>
                MIND WOBBLER is a creative studio, not an advertising firm. We have a strict policy against using "Third-Party Advertising Cookies." We will never track your behavior across other websites to show you targeted ads, and we will never sell your browsing data to data brokers.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">4. DURATION OF COOKIES</h2>
              <p className="mb-4">How long a cookie stays on your device depends on its type:</p>
              <ul className="list-disc pl-8 space-y-3">
                <li><strong className="text-black uppercase text-xs tracking-widest">Session Cookies</strong> are temporary and are deleted as soon as you close your browser.</li>
                <li><strong className="text-black uppercase text-xs tracking-widest">Persistent Cookies</strong> stay on your device for a set period (usually between 30 days and 24 months) or until you manually delete them.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">5. YOU ARE IN CONTROL</h2>
              <p className="mb-6">
                You have the absolute right to choose whether or not to accept cookies. You can manage your preferences through your web browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-8 space-y-3">
                <li>See what cookies you've got and delete them on an individual basis.</li>
                <li>Block third-party cookies.</li>
                <li>Block cookies from particular sites.</li>
                <li>Block all cookies from being set.</li>
                <li>Delete all cookies when you close your browser.</li>
              </ul>
              <p className="mt-6 text-sm italic">
                Note: If you choose to delete or block all cookies, many parts of our website may not function correctly, and your preferences will be lost every time you visit.
              </p>
            </section>

            <section className="border-t border-black pt-12">
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">COMPLIANCE INQUIRIES</h2>
              <p className="mb-8">
                If you have any specific questions about our use of cookies or technical tracking, please contact our compliance team:
              </p>
              <div className="flex flex-col gap-4">
                <a href="mailto:mindwobblerstudios@gmail.com" className="text-xl font-bold border-b-2 border-black/10 hover:border-black transition-all pb-1 uppercase tracking-tighter self-start">mindwobblerstudios@gmail.com</a>
                <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">MIND WOBBLER &bull; BENGALURU, INDIA</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
