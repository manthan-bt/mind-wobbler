import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white pt-[35vh] xl:pt-64 pb-48 text-black selection:bg-black selection:text-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-[3vw]">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-12 text-black uppercase">
              TERMS OF <br /> SERVICE.
            </h1>
          </motion.div>
          
          <div className="space-y-16 text-[1rem] md:text-[1.1rem] leading-relaxed text-black/70 font-medium text-justify">
            <p className="text-black font-bold border-b border-black/10 pb-8 uppercase text-xs tracking-[0.2em]">Effective Date: May 26, 2026</p>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">1. INTRODUCTION & ACCEPTANCE</h2>
              <p>
                Welcome to MIND WOBBLER. These Terms of Service ("Terms") are a legal agreement between you and our team. By visiting our website or hiring us for a project, you are telling us that you have read, understood, and agreed to these rules. If you do not agree with any part of these Terms, you must stop using our website and services immediately. We have written these rules in simple words so that everyone knows exactly what to expect.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">2. OUR CREATIVE SERVICES</h2>
              <p className="mb-6">MIND WOBBLER provides high-end services in branding, cinematography, 3D motion design, and digital product strategy. Here is how we work:</p>
              <ul className="space-y-4 pl-8 border-l border-black/10">
                <li><strong className="text-black uppercase text-xs tracking-widest block mb-1">Custom Work</strong> Every project is bespoke. We do not use "templates" or "copy-paste" solutions. Your project will be unique to your brand.</li>
                <li><strong className="text-black uppercase text-xs tracking-widest block mb-1">The Process</strong> We follow a strict creative process involving research, strategy, design, and final production. We will keep you updated at every stage.</li>
                <li><strong className="text-black uppercase text-xs tracking-widest block mb-1">Timelines</strong> All dates we give you at the start are "best estimates." Creative work can sometimes take longer than planned to reach the perfect result.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">3. INTELLECTUAL PROPERTY & OWNERSHIP</h2>
              <p className="mb-6">Ownership of the work is the most important part of our agreement:</p>
              <div className="space-y-8">
                <div>
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2">A. Our Proprietary Brand</h3>
                  <p>MIND WOBBLER owns everything on this website, including our name, logo, custom code, and the "noise" textures used in our design. You cannot use our brand assets for your own business without our written permission.</p>
                </div>
                <div>
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2">B. Your Project Deliverables</h3>
                  <p>Once you have paid for your project in full, you will own the final files we deliver to you (the "Deliverables"). However, MIND WOBBLER maintains the right to show the work in our portfolio, on our website, and on social media to promote our studio.</p>
                </div>
                <div>
                  <h3 className="text-black font-bold text-sm uppercase tracking-widest mb-2">C. Working Files</h3>
                  <p>Unless specifically agreed in writing, we do not provide "raw" or "working" files (like Layered Photoshop files, 3D project files, or raw film footage). You are paying for the final, polished result.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">4. FINANCIAL PROTOCOLS</h2>
              <p className="mb-4">To ensure a smooth partnership, we follow these payment rules:</p>
              <ul className="list-disc pl-8 space-y-4">
                <li><strong className="text-black text-sm uppercase">Booking Deposit:</strong> Most projects require a 50% non-refundable deposit before we start work. This secures your spot in our production calendar.</li>
                <li><strong className="text-black text-sm uppercase">Final Payment:</strong> The remaining 50% must be paid before we deliver the final, high-resolution files.</li>
                <li><strong className="text-black text-sm uppercase">Late Fees:</strong> Payments delayed by more than 14 days may be subject to a 5% late fee to cover administrative costs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">5. CANCELLATIONS & REFUNDS</h2>
              <p className="mb-4">We understand that plans change. Here is our policy for ending a project:</p>
              <ul className="list-disc pl-8 space-y-4">
                <li><strong className="text-black text-sm uppercase">By The Client:</strong> You can stop a project at any time. However, any deposits paid are non-refundable, and you must pay for any work completed up to that date.</li>
                <li><strong className="text-black text-sm uppercase">By MIND WOBBLER:</strong> We reserve the right to stop working with a client if they are unprofessional, do not pay on time, or ask for work that is illegal or unethical.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">6. LIMITATION OF LIABILITY</h2>
              <p>
                Creative work involves human judgment and technology. MIND WOBBLER will not be responsible for any indirect or consequential losses, such as lost profits, loss of data, or business interruptions, that might happen from using our work. Our total liability is limited to the amount you paid us for the project that caused the issue. This is a standard industry protection that allows us to take on ambitious creative risks.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">7. INDEMNITY</h2>
              <p>
                You agree to protect MIND WOBBLER from any legal claims or costs that arise because of the information or materials you provided to us for your project. For example, if you give us an image to use and it turns out you didn't own the rights to it, you are responsible for any legal issues that follow.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">8. GOVERNING LAW & DISPUTES</h2>
              <p>
                These Terms follow the laws of India. If we ever have a serious disagreement that we cannot solve through a simple conversation, it will be handled through confidential arbitration in the courts of Bengaluru, India. This ensures that any issues are resolved quickly and professionally.
              </p>
            </section>

            <section>
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">9. CHANGES TO THESE TERMS</h2>
              <p>
                As the industry changes, we may update these Terms from time to time. The latest version will always be available on our website. Continued use of our site or services after an update means you agree to the new version.
              </p>
            </section>

            <section className="border-t border-black pt-12">
              <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-6 text-black">LEGAL CONTACT</h2>
              <p className="mb-8">
                If you have any questions about these Terms, or if you need to send a formal legal notice, please contact our partners directly:
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

export default TermsOfService;
