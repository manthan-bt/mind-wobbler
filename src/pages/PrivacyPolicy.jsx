import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white pt-[35vh] xl:pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-[3vw]">
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-12 text-black uppercase">
            PRIVACY <br /> POLICY.
          </h1>
          
          <div className="space-y-16 text-[1rem] md:text-[1.1rem] leading-relaxed text-black/70 font-medium text-justify">
            <p className="text-black font-bold border-b border-black/10 pb-8 uppercase text-xs tracking-[0.2em]">Effective Date: May 26, 2026</p>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">1. OUR COMMITMENT TO YOUR PRIVACY</h2>
              <p>
                At MIND WOBBLER, we believe your privacy is a human right. This document explains in plain and simple words exactly what happens to your information when you interact with our brand, our website, and our team. We have designed this policy to be the most detailed and honest guide possible, ensuring we meet all global government rules like the GDPR (Europe), CCPA (California), and the Digital Personal Data Protection Act (India).
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">2. THE TYPE OF INFORMATION WE COLLECT</h2>
              <p className="mb-6">We only collect information that is necessary to provide you with high-end creative services. We divide this into two categories:</p>
              
              <div className="space-y-8 pl-8 border-l border-black/10">
                <div>
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2">A. Information You Give Us Directly</h3>
                  <p>When you contact us or start a project, you provide us with your name, professional email address, phone number, company name, and the specific details of your project vision. This information is given voluntarily by you.</p>
                </div>
                <div>
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2">B. Information Collected Automatically</h3>
                  <p>When you browse our site, our systems automatically record your IP address (which tells us your general location), your browser type (like Chrome or Safari), which pages you visited, and how long you stayed. This helps us understand what parts of our website are working well.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">3. HOW WE USE YOUR INFORMATION</h2>
              <p className="mb-4">We use your data for very specific reasons, and never for anything else:</p>
              <ul className="list-disc pl-8 space-y-4">
                <li><strong className="text-black text-sm uppercase">Communication:</strong> To reply to your messages and keep you updated on project progress.</li>
                <li><strong className="text-black text-sm uppercase">Service Delivery:</strong> To create the specific brand identities, films, or digital products you hired us for.</li>
                <li><strong className="text-black text-sm uppercase">Security:</strong> To protect our website from hackers, spam, and digital attacks.</li>
                <li><strong className="text-black text-sm uppercase">Optimization:</strong> To see how people use our site so we can make it faster and more beautiful.</li>
                <li><strong className="text-black text-sm uppercase">Legal Compliance:</strong> To follow tax laws, business reporting rules, and government requests if necessary.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">4. WHO WE SHARE YOUR DATA WITH</h2>
              <p className="mb-6">We do not sell your data. We do not rent your data. We do not "monetize" your data. The only time we share your information is with trusted technical partners who help us function:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black/[0.02] p-6 border border-black/5">
                  <h4 className="text-black font-bold text-xs uppercase tracking-widest mb-2">Technical Infrastructure</h4>
                  <p className="text-sm">Companies that provide our website hosting and secure database storage.</p>
                </div>
                <div className="bg-black/[0.02] p-6 border border-black/5">
                  <h4 className="text-black font-bold text-xs uppercase tracking-widest mb-2">Communication Tools</h4>
                  <p className="text-sm">Services that allow us to send you professional emails and project updates safely.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">5. GLOBAL DATA PROTECTION RIGHTS</h2>
              <p className="mb-6">MIND WOBBLER gives the same high-level rights to every person on Earth, regardless of which country's laws apply:</p>
              <ul className="space-y-6">
                <li className="border-b border-black/5 pb-4">
                  <strong className="text-black uppercase text-xs tracking-widest block mb-1">Right to Access</strong>
                  You can ask us for a full report of every piece of data we have about you.
                </li>
                <li className="border-b border-black/5 pb-4">
                  <strong className="text-black uppercase text-xs tracking-widest block mb-1">Right to Correction</strong>
                  If we have your name or email spelled wrong, or any other info is incorrect, you can tell us to fix it immediately.
                </li>
                <li className="border-b border-black/5 pb-4">
                  <strong className="text-black uppercase text-xs tracking-widest block mb-1">Right to Deletion</strong>
                  Also known as the "Right to be Forgotten." You can ask us to delete all your data from our systems forever.
                </li>
                <li className="border-b border-black/5 pb-4">
                  <strong className="text-black uppercase text-xs tracking-widest block mb-1">Right to Portability</strong>
                  You can ask us to send your data to another company in a format that their computers can easily read.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">6. HOW WE PROTECT YOUR DATA</h2>
              <p>
                We use industry-standard encryption (SSL/TLS) to protect your information while it is being sent to us. Once we have it, we store it on secure, password-protected servers that are only accessible by the authorized MIND WOBBLER partners. We conduct regular security audits to make sure our "digital vault" is always locked tight.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">7. DATA RETENTION POLICY</h2>
              <p>
                We don't keep your data forever. We only keep it as long as we have a professional relationship with you. If you haven't worked with us for 24 months, we automatically purge your personal details from our active outreach lists, unless the law requires us to keep a record of a financial transaction.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">8. COOKIES & TRACKING</h2>
              <p>
                We use very small "cookies" to help our website remember you. We never use these to track you on other websites or to show you annoying ads. You can see our full Cookies Policy for more detail on how to turn them off in your browser settings.
              </p>
            </section>

            <section className="border-t border-black pt-12">
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">9. CONTACT OUR PRIVACY TEAM</h2>
              <p className="mb-8">
                If you have any questions, want to exercise your data rights, or just want to confirm your info is safe, please reach out to our team. We answer every privacy inquiry personally.
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

export default PrivacyPolicy;
