'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate form out
    if (formRef.current && successRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          setSubmitted(true);
          
          // Animate success in
          gsap.fromTo(successRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)', delay: 0.1 }
          );
        }
      });
    }
  };

  return (
    <div className="bg-bg min-h-screen pt-32 pb-0">

      {/* 6.1 — HEADER */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[40vh] flex flex-col justify-center">
        <div className="mb-6">
          <TextReveal className="font-heading font-extrabold text-[clamp(48px,6vw,96px)] leading-[1.05] text-white">
            {"Let's Build\nSomething."}
          </TextReveal>
        </div>
        <p className="font-sans text-[16px] md:text-[18px] text-grey max-w-[500px]">
          Tell us about your brand. We'll get back to you within 24 hours — usually faster.
        </p>
      </section>

      {/* 6.2 — CONTACT SECTION (2 COLUMNS) */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto pb-40 border-t border-border pt-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT COLUMN - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
            className="w-full lg:w-[35%] flex flex-col"
          >
            <h3 className="font-heading font-bold text-[22px] text-white mb-8">Get in Touch</h3>
            
            <div className="flex flex-col gap-5 font-sans text-[15px] text-white-dim mb-8">
              <div className="flex items-center gap-3">
                <span className="text-accent text-[20px]">📧</span>
                <a href="mailto:hello@ishdev.in" className="hover:text-accent transition-colors hover:translate-x-1 duration-300">hello@ishdev.in</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent text-[20px]">📞</span>
                <a href="tel:+919810045231" className="hover:text-accent transition-colors hover:translate-x-1 duration-300">+91 98100 45231</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent text-[20px]">📍</span>
                <span>Connaught Place, New Delhi 110001</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent text-[20px]">🕐</span>
                <span>Mon–Sat, 10AM–7PM IST</span>
              </div>
            </div>

            <div className="hairline mb-8" />

            <div className="mb-8">
              <p className="font-sans text-[14px] text-grey mb-4">Prefer WhatsApp?</p>
              <a 
                href="https://wa.me/919810045231?text=Hi%20Ishdev%2C%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-sans font-medium text-[14px] hover:opacity-90 transition-opacity"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            <div className="hairline mb-8" />

            <div className="flex gap-3">
              {['IN', 'LI', 'X', 'YT'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-[13px] font-sans font-medium text-white hover:bg-accent hover:border-accent hover:text-bg transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Form */}
          <div className="w-full lg:w-[65%] relative">
            
            {!submitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex-1"
                  >
                    <input type="text" placeholder="Name *" required className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] placeholder-grey focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.98, duration: 0.5 }}
                    className="flex-1"
                  >
                    <input type="email" placeholder="Email *" required className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] placeholder-grey focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300" />
                  </motion.div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.06, duration: 0.5 }}
                    className="flex-1"
                  >
                    <input type="tel" placeholder="Phone" className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] placeholder-grey focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.14, duration: 0.5 }}
                    className="flex-1"
                  >
                    <input type="text" placeholder="Company Name" className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] placeholder-grey focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300" />
                  </motion.div>
                </div>

                {/* Row 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.22, duration: 0.5 }}
                >
                  <select required className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300 appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%235A5A6E%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_16px_center]">
                    <option value="" disabled selected className="text-grey">Service Interested In</option>
                    <option value="seo">SEO</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="ads">Google & Meta Ads</option>
                    <option value="content">Content Marketing</option>
                    <option value="email">Email Marketing</option>
                    <option value="web">Web Design & Development</option>
                    <option value="influencer">Influencer Marketing</option>
                    <option value="brand">Brand Strategy</option>
                    <option value="video">Video Marketing</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="unsure">Not Sure Yet — Help Me Decide</option>
                  </select>
                </motion.div>

                {/* Row 4 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.30, duration: 0.5 }}
                >
                  <select required className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300 appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%235A5A6E%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_16px_center]">
                    <option value="" disabled selected className="text-grey">Monthly Budget</option>
                    <option value="1">Under ₹10,000</option>
                    <option value="2">₹10,000 – ₹25,000</option>
                    <option value="3">₹25,000 – ₹50,000</option>
                    <option value="4">₹50,000+</option>
                    <option value="5">Let's Discuss</option>
                  </select>
                </motion.div>

                {/* Row 5 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.38, duration: 0.5 }}
                >
                  <textarea rows={4} placeholder="Tell us about your brand, your goals, and any challenges you're facing. The more detail, the better our first conversation will be." required className="w-full bg-surface border border-border rounded-[10px] p-4 text-white font-sans text-[15px] placeholder-grey focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all duration-300 resize-none" />
                </motion.div>

                {/* Row 6 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.46, duration: 0.5 }}
                  className="w-full mt-2"
                >
                  <MagneticButton className="w-full">
                    <button type="submit" className="w-full py-4 rounded-[10px] bg-accent text-bg font-sans font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors">
                      Send Message <span className="text-[18px]">→</span>
                    </button>
                  </MagneticButton>
                </motion.div>
              </form>
            ) : null}

            {/* Success State */}
            <div 
              ref={successRef} 
              className={`absolute top-0 left-0 w-full bg-surface border border-border rounded-xl p-12 text-center flex flex-col items-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${!submitted ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-8 border border-success/30">
                <span className="text-success text-[40px]">✓</span>
              </div>
              <h3 className="font-heading font-extrabold text-[32px] text-white mb-4">Message Received.</h3>
              <p className="font-sans text-[16px] text-white-dim mb-10 max-w-[400px]">
                Thanks! We'll get back to you within 24 hours — usually sooner.
              </p>
              
              <div className="w-full border-t border-border pt-8 mt-4">
                <p className="font-sans text-[13px] text-grey mb-6">In the meantime:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#" className="flex-1 py-3 px-6 rounded-md bg-transparent border border-border text-white font-sans text-[14px] hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
                    Follow us on Instagram <span className="opacity-50">↗</span>
                  </a>
                  <Link href="/chat" className="flex-1 py-3 px-6 rounded-md bg-transparent border border-border text-white font-sans text-[14px] hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
                    Chat with our AI bot <span className="opacity-50">↗</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
