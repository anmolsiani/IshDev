'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: 'Priya Mehta',
    role: 'Founder',
    company: 'GreenRoots Organic',
    text: "We were stuck on page 5 of Google for months. Ishdev's SEO team completely restructured our content strategy and within 4 months we were ranking on page 1 for our top keywords. Our organic traffic is up 280% and still growing. They don't just run campaigns — they build systems.",
    rating: 5,
    initials: 'PM',
  },
  {
    name: 'Arjun Kapoor',
    role: 'Marketing Head',
    company: 'StyleArc Clothing',
    text: "The ROAS we're seeing is genuinely better than any agency we've worked with before. Their creative team understands luxury fashion — the ad creatives they produce actually feel on-brand, not generic stock-photo stuff. The weekly reports are detailed and honest.",
    rating: 5,
    initials: 'AK',
  },
  {
    name: 'Dr. Sneha Rao',
    role: 'Director',
    company: 'MedReach Clinic',
    text: "Healthcare marketing is tricky — compliance, trust, patient sensitivity. Ishdev got it from day one. They built us a landing page system that converts at 12%, which is unheard of in our space. We get 220+ qualified leads a month now.",
    rating: 5,
    initials: 'SR',
  },
  {
    name: 'Vikram Singh',
    role: 'CEO',
    company: 'TechBridge Solutions',
    text: "What I appreciate most is the transparency. No fluff, no vanity metrics. They report on actual revenue impact. Our cost per acquisition dropped by 45% in the first quarter. The monthly strategy calls are genuinely useful.",
    rating: 4,
    initials: 'VS',
  },
  {
    name: 'Ananya Desai',
    role: 'Brand Manager',
    company: 'NovaSkin Beauty',
    text: "We came to Ishdev with a TikTok strategy question and ended up doing a full brand overhaul with them. The results on social have been incredible — engagement is up 3x and we're actually converting followers into customers now. Very responsive team.",
    rating: 5,
    initials: 'AD',
  },
  {
    name: 'Rahul Sharma',
    role: 'Co-Founder',
    company: 'FitGrid Wellness',
    text: "I was skeptical about agencies after two bad experiences. Ishdev changed my mind. Their no-contract model gave me confidence, and they earned our trust within the first month. Email open rates went from 12% to 38%. Genuine experts.",
    rating: 5,
    initials: 'RS',
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#000' : 'none'} stroke="#000" strokeWidth="1.5">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.review-item');

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 lg:py-40 px-6 lg:px-12 relative z-10 bg-bg border-t border-border overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-20 lg:mb-28 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase">
              Client Voices // Verified
            </span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="font-oxanium font-black text-[clamp(36px,6vw,90px)] text-black uppercase leading-[0.9] tracking-tighter">
            What They<br />
            <span className="text-black/15">Say.</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="review-item review-card rounded-2xl p-8 flex flex-col cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= review.rating} />
                ))}
              </div>

              {/* Quote */}
              <p className="font-sans text-[14px] lg:text-[15px] text-black/70 leading-relaxed flex-1 mb-8">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-oxanium font-bold text-[12px] shrink-0">
                  {review.initials}
                </div>
                <div>
                  <div className="font-oxanium font-bold text-[13px] text-black uppercase tracking-wide">
                    {review.name}
                  </div>
                  <div className="font-mono text-[10px] text-black/40 tracking-wider">
                    {review.role} · {review.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
