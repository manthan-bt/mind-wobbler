import React, { useEffect, useState, useRef } from 'react';

const ThemedDropdown = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="input-group relative" ref={dropdownRef}>
      <label className="text-[0.6rem] tracking-[0.3em] text-white/40 block mb-2 uppercase font-bold">{label}</label>
      <div 
        className="w-full border-b border-white/20 py-2 cursor-pointer transition-colors hover:border-white flex justify-between items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg uppercase tracking-widest ${selected ? 'text-white' : 'text-white/20'}`}>
          {selected || 'SELECT TYPE'}
        </span>
        <span className={`text-[0.6rem] transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'} opacity-40 group-hover:opacity-100`}>
          ▼
        </span>
      </div>
      
      {/* Dropdown Menu */}
      <div className={`absolute left-0 right-0 mt-2 bg-black border border-white/10 z-[100] transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        {options.map((option) => (
          <div 
            key={option}
            className="px-6 py-4 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer border-b border-white/5 last:border-0"
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("PLEASE FILL IN ALL REQUIRED FIELDS.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          inquiryType: inquiryType || 'GENERAL INQUIRY',
          message: message,
          honey: honey
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setInquiryType('');
        setHoney('');
      } else {
        const result = await response.json();
        alert(result.message || "SOMETHING WENT WRONG. PLEASE TRY AGAIN.");
      }
    } catch (error) {
      alert("CONNECTION ERROR. PLEASE CHECK YOUR INTERNET AND TRY AGAIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-40 pb-32">
      <section id="contact" className="contact px-[5vw]">
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="contact-info fade-in">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-tighter leading-none mb-10">START THE <br /> CONVERSATION</h2>
            <p className="text-xl text-gray-light tracking-wide mb-16 uppercase max-w-md">WE ARE CURRENTLY ACCEPTING COMMISSIONS FOR Q3 & Q4 2026. REACH OUT TO DISCUSS YOUR NEXT PROJECT.</p>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-[0.6rem] tracking-[0.4em] text-white/40 mb-4 uppercase">NEW BUSINESS</h4>
                <a href="mailto:mindwobblerstudios@gmail.com" className="cta-link text-[clamp(1.2rem,2.5vw,2rem)] text-white border-b border-white/20 pb-1 hover:border-white transition-colors hover-target tracking-wide uppercase font-bold break-all">MINDWOBBLERSTUDIOS@GMAIL.COM</a>
              </div>
              
              <div>
                <h4 className="text-[0.6rem] tracking-[0.4em] text-white/40 mb-4 uppercase">DIRECT LINE</h4>
                <a href="tel:+918105176785" className="cta-link text-[clamp(1.2rem,2.5vw,2rem)] text-white border-b border-white/20 pb-1 hover:border-white transition-colors hover-target tracking-wide uppercase font-bold">+91 81051 76785</a>
              </div>
              
              <div>
                <h4 className="text-[0.6rem] tracking-[0.4em] text-white/40 mb-4 uppercase">WHATSAPP</h4>
                <a href="https://wa.me/918105176785" target="_blank" rel="noopener noreferrer" className="cta-link text-[clamp(1.2rem,2.5vw,2rem)] text-white border-b border-white/20 pb-1 hover:border-white transition-colors hover-target tracking-wide uppercase font-bold break-all">CHAT NOW</a>
              </div>
              
              <div>
                <h4 className="text-[0.6rem] tracking-[0.4em] text-white/40 mb-6 uppercase">FOLLOW US</h4>
                <div className="social-links flex flex-wrap gap-x-12 gap-y-6">
                  <a href="https://www.instagram.com/mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-[0.2em] text-[0.8rem] border-b border-transparent hover:border-white transition-all uppercase font-bold">INSTAGRAM</a>
                  <a href="https://www.linkedin.com/in/manthan-bt-268610295/" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-[0.2em] text-[0.8rem] border-b border-transparent hover:border-white transition-all uppercase font-bold">LINKEDIN</a>
                  <a href="https://www.behance.net/mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-[0.2em] text-[0.8rem] border-b border-transparent hover:border-white transition-all uppercase font-bold">BEHANCE</a>
                  <a href="https://www.youtube.com/@mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-white hover-target tracking-[0.2em] text-[0.8rem] border-b border-transparent hover:border-white transition-all uppercase font-bold">YOUTUBE</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form bg-white/5 p-12 md:p-16 rounded-sm fade-in-up delay-200 border border-white/5 min-h-[400px] flex flex-col justify-center">
            {submitSuccess ? (
              <div className="text-center space-y-6">
                <span className="text-white text-5xl block mb-2">✓</span>
                <h3 className="text-white font-bold tracking-[0.2em] text-lg uppercase">INQUIRY TRANSMITTED</h3>
                <p className="text-gray text-xs tracking-widest leading-loose uppercase max-w-sm mx-auto">
                  THANK YOU FOR CONTACTING MIND WOBBLER. OUR TEAM WILL COMMENCE RESPONSE WITHIN 24 HOURS.
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)} 
                  className="mt-8 border border-white/20 text-white hover:border-white py-3 px-8 text-[0.65rem] font-bold tracking-[0.3em] uppercase transition-all hover-target"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                <div className="input-group">
                  <label className="text-[0.6rem] tracking-[0.3em] text-white/40 block mb-2 uppercase font-bold">FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="REQUIRED" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 text-white text-lg py-2 outline-none focus:border-white transition-colors uppercase tracking-widest placeholder:text-white/10" 
                  />
                </div>
                <div className="input-group">
                  <label className="text-[0.6rem] tracking-[0.3em] text-white/40 block mb-2 uppercase font-bold">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="REQUIRED" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 text-white text-lg py-2 outline-none focus:border-white transition-colors uppercase tracking-widest placeholder:text-white/10" 
                  />
                </div>
                
                <ThemedDropdown 
                  label="INQUIRY TYPE"
                  options={['BRAND IDENTITY', 'CINEMATOGRAPHY', 'PHOTOGRAPHY', 'MOTION DESIGN', 'UI/UX STRATEGY', 'SOCIAL MANAGEMENT', 'GRAPHIC DESIGN', 'GENERAL INQUIRY']}
                  selected={inquiryType}
                  onSelect={setInquiryType}
                />

                <div className="input-group">
                  <label className="text-[0.6rem] tracking-[0.3em] text-white/40 block mb-2 uppercase font-bold">MESSAGE</label>
                  <textarea 
                    placeholder="TELL US ABOUT YOUR PROJECT" 
                    rows="4" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 text-white text-lg py-2 outline-none focus:border-white transition-colors uppercase tracking-widest placeholder:text-white/10 resize-none"
                  />
                </div>
                
                {/* Honeypot Spam Protection check */}
                <input 
                  type="text" 
                  name="_honey" 
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  className="hidden" 
                  style={{ display: 'none' }} 
                />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-white text-black py-6 px-12 text-[0.8rem] font-black uppercase tracking-[0.3em] self-start transition-all hover:bg-gray-light hover-target disabled:opacity-50"
                >
                  {isSubmitting ? "TRANSMITTING..." : "SUBMIT INQUIRY"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
