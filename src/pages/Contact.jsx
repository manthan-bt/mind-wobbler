import React, { useEffect, useState, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedTick from '../components/AnimatedTick';

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
      <label className="text-[0.6rem] tracking-[0.3em] text-black/40 block mb-2 uppercase font-bold">{label}</label>
      <div 
        className="w-full border-b border-black/20 py-2 cursor-pointer transition-colors hover:border-black flex justify-between items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg uppercase tracking-widest ${selected ? 'text-black font-semibold' : 'text-black/20'}`}>
          {selected || 'SELECT TYPE'}
        </span>
        <span className={`text-[0.6rem] transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'} opacity-40 group-hover:opacity-100 text-black`}>
          ▼
        </span>
      </div>
      
      {/* Dropdown Menu */}
      <div className={`absolute left-0 right-0 mt-2 bg-white border border-black/10 z-[100] transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto shadow-lg' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        {options.map((option) => (
          <div 
            key={option}
            className="px-6 py-4 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-black/60 hover:text-black hover:bg-black/5 transition-all cursor-pointer border-b border-black/5 last:border-0"
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
  const [errors, setErrors] = useState({});

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

    // Inline validation
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

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
    <div className="bg-white pt-[35vh] xl:pt-64 pb-48 text-black min-h-screen relative overflow-hidden">



      <div className="max-w-[1600px] mx-auto relative z-10 w-full">

        {/* Editorial Hero Header Section */}
        <section className="px-6 md:px-[3vw] mb-32 md:mb-48 fade-in">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] mb-8 text-black uppercase">
              START THE <br className="hidden md:block" />
              CONVERSATION.
            </h1>
            <p className="text-black/60 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed max-w-2xl font-medium">
              We are always interested in hearing about new projects and collaborations. Reach out to discuss your vision, or simply to connect.
            </p>
          </div>
        </section>

        {/* Contact Grid Section */}
        <section className="px-6 md:px-[3vw] pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Info Column */}
            <ScrollReveal 
              type="slide"
              className="lg:col-span-5 space-y-24"
            >
              <div>
                <h4 className="text-[0.7rem] font-bold tracking-[0.4em] text-black/40 mb-8 uppercase">NEW BUSINESS</h4>
                <div className="space-y-4">
                  <a href="mailto:mindwobblerstudios@gmail.com" className="block text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold tracking-tighter hover:text-black/60 transition-colors break-all uppercase">MINDWOBBLERSTUDIOS@GMAIL.COM</a>
                  <a href="tel:+918105176785" className="block text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold tracking-tighter hover:text-black/60 transition-colors">+91 81051 76785</a>
                </div>
              </div>

              <div>
                <h4 className="text-[0.7rem] font-bold tracking-[0.4em] text-black/40 mb-8 uppercase">SOCIAL</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <a href="https://www.instagram.com/mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest hover:text-black/60 transition-colors uppercase">INSTAGRAM</a>
                  <a href="https://www.linkedin.com/in/manthan-bt-268610295/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest hover:text-black/60 transition-colors uppercase">LINKEDIN</a>
                  <a href="https://www.behance.net/mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest hover:text-black/60 transition-colors uppercase">BEHANCE</a>
                  <a href="https://www.youtube.com/@mind_wobbler" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest hover:text-black/60 transition-colors uppercase">YOUTUBE</a>
                  <a href="https://wa.me/918105176785" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest hover:text-black/60 transition-colors uppercase">WHATSAPP</a>
                </div>
              </div>

              <div>
                <h4 className="text-[0.7rem] font-bold tracking-[0.4em] text-black/40 mb-8 uppercase">LOCATION</h4>
                <p className="text-sm font-bold tracking-widest uppercase">BENGALURU, INDIA</p>
              </div>
            </ScrollReveal>

            {/* Form Column */}
            <ScrollReveal 
              type="slide"
              className="lg:col-span-7"
            >
              <div className="bg-black/[0.01] p-8 md:p-16 border border-black/5 shadow-2xl rounded-sm">
                {submitSuccess ? (
                  <div className="text-center py-20 space-y-8">
                    <div className="flex justify-center mb-8">
                      <AnimatedTick size={80} />
                    </div>
                    <h3 className="text-black font-bold tracking-tight text-2xl uppercase">INQUIRY TRANSMITTED</h3>
                    <p className="text-black/60 text-lg leading-relaxed max-w-sm mx-auto font-medium">
                      Thank you for contacting Mind Wobbler. Our team will respond within 24 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitSuccess(false)} 
                      className="mt-12 bg-black text-white px-12 py-4 text-[0.7rem] font-bold tracking-widest uppercase hover:bg-black/80 transition-all rounded-sm"
                    >
                      SEND ANOTHER
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                    <div className="input-group">
                      <label className="text-[0.7rem] font-bold tracking-[0.3em] text-black/40 block mb-4 uppercase">FULL NAME</label>
                      <input
                        type="text"
                        placeholder="E.G. ARJUN SHARMA"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: false })); }}
                        className={`w-full bg-transparent border-b-2 text-black text-lg py-4 outline-none transition-colors tracking-widest placeholder:text-black/20 ${
                          errors.name ? 'border-red-500' : 'border-black/10 focus:border-black'
                        }`}
                      />
                      {errors.name && <span className="text-red-500 text-[0.65rem] font-bold tracking-widest uppercase mt-2 block">Required</span>}
                    </div>
                    <div className="input-group">
                      <label className="text-[0.7rem] font-bold tracking-[0.3em] text-black/40 block mb-4 uppercase">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        placeholder="E.G. HELLO@YOURBRAND.COM"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: false })); }}
                        className={`w-full bg-transparent border-b-2 text-black text-lg py-4 outline-none transition-colors tracking-widest placeholder:text-black/20 ${
                          errors.email ? 'border-red-500' : 'border-black/10 focus:border-black'
                        }`}
                      />
                      {errors.email && <span className="text-red-500 text-[0.65rem] font-bold tracking-widest uppercase mt-2 block">Required</span>}
                    </div>

                    <ThemedDropdown 
                      label="INQUIRY TYPE"
                      options={['BRAND IDENTITY', 'CINEMATOGRAPHY', 'PHOTOGRAPHY', 'MOTION DESIGN', 'UI/UX STRATEGY', 'SOCIAL MANAGEMENT', 'GRAPHIC DESIGN', 'GENERAL INQUIRY']}
                      selected={inquiryType}
                      onSelect={setInquiryType}
                    />

                    <div className="input-group">
                      <label className="text-[0.7rem] font-bold tracking-[0.3em] text-black/40 block mb-4 uppercase">MESSAGE</label>
                      <textarea
                        placeholder="E.G. WE'RE LAUNCHING A NEW BRAND AND NEED A FULL IDENTITY — LOGO, MOTION, AND SOCIAL STRATEGY."
                        rows="4"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); setErrors(p => ({ ...p, message: false })); }}
                        className={`w-full bg-transparent border-b-2 text-black text-lg py-4 outline-none transition-colors tracking-tight placeholder:text-black/20 resize-none font-montserrat ${
                          errors.message ? 'border-red-500' : 'border-black/10 focus:border-black'
                        }`}
                      />
                      {errors.message && <span className="text-red-500 text-[0.65rem] font-bold tracking-widest uppercase mt-2 block">Required</span>}
                    </div>

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
                      className="bg-black text-white py-6 px-12 text-[0.8rem] font-black uppercase tracking-[0.3em] self-start transition-all hover:bg-black/80 hover-target disabled:opacity-50 rounded-sm shadow-2xl mt-4"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SUBMIT INQUIRY"}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
