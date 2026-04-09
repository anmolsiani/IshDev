'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const processLinesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 3.1 Header animation
    gsap.from('.services-subtext', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.2,
    });

    // 3.2 Services Grid
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });
    }

    // 3.3 Process Steps & Connecting Lines
    if (processRef.current) {
      const steps = processRef.current.querySelectorAll('.process-step');
      const lines = processRef.current.querySelectorAll('.process-line');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 70%',
        },
      });

      steps.forEach((step, i) => {
        tl.from(step, { opacity: 0, x: -30, duration: 0.6, ease: 'power2.out' }, i * 0.4);
        if (lines[i]) {
          tl.fromTo(
            lines[i],
            { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 0.4, ease: 'none' },
            '-=0.2'
          );
        }
      });
    }

    // Bottom CTA
    gsap.fromTo(
      '.services-cta',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.services-cta-container',
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-bg min-h-screen pt-32 pb-0">
      
      {/* 3.1 — HEADER */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[60vh] flex flex-col justify-center">
        <div className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-12">
          WHAT WE DO<span className="text-accent-hover">.</span>
        </div>
        
        <div className="mb-10">
          <TextReveal className="font-heading font-extrabold text-[clamp(48px,6vw,96px)] leading-[1.05] text-white max-w-[900px]">
            {"Nine Services.\nOne Obsession."}
          </TextReveal>
        </div>

        <p className="services-subtext font-sans text-[18px] text-grey leading-relaxed max-w-[600px]">
          Every service connects to one outcome — measurable, sustainable growth for your brand.
        </p>
      </section>

      {/* 3.2 — SERVICE CARDS GRID */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto py-24 border-t border-border">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: '01', icon: '🔍', title: 'SEO Optimization',
              desc: "Rank higher. Grow organically. Build compounding traffic that doesn't disappear when you stop paying.",
              tags: ['Technical SEO', 'On-Page', 'Link Building', 'Local SEO']
            },
            {
              id: '02', icon: '📱', title: 'Social Media Marketing',
              desc: "Build community. Drive engagement. Turn followers into customers — not just likes.",
              tags: ['Instagram', 'LinkedIn', 'Content Calendar', 'Strategy']
            },
            {
              id: '03', icon: '🎯', title: 'Google & Meta Ads',
              desc: "Campaigns built for ROI, not vanity metrics. We track every rupee to the conversion.",
              tags: ['Google Ads', 'Meta Ads', 'Retargeting', 'A/B Testing']
            },
            {
              id: '04', icon: '✍️', title: 'Content Marketing',
              desc: "Content that ranks on Google AND converts when someone reads it. SEO + copywriting in one.",
              tags: ['Blog Strategy', 'SEO Content', 'Copywriting', 'Content Repurposing']
            },
            {
              id: '05', icon: '📧', title: 'Email Marketing',
              desc: "Automated flows, nurture sequences, and newsletters. Average 34% open rate across our clients.",
              tags: ['Automation', 'Drip Campaigns', 'Newsletters', 'Segmentation']
            },
            {
              id: '06', icon: '💻', title: 'Web Design & Development',
              desc: "Fast. Clean. Mobile-first. Built to convert visitors into leads — not just look pretty.",
              tags: ['UI/UX Design', 'Next.js', 'Performance', 'CRO']
            },
            {
              id: '07', icon: '🤳', title: 'Influencer Marketing',
              desc: "Right creators. Real audiences. We focus on engagement rate, not follower count.",
              tags: ['Nano/Micro Influencers', 'UGC', 'Campaign Management']
            },
            {
              id: '08', icon: '🧠', title: 'Brand Strategy',
              desc: "Positioning, messaging, and voice that stays consistent across every channel.",
              tags: ['Brand Positioning', 'Messaging Framework', 'Visual Identity']
            },
            {
              id: '09', icon: '🎬', title: 'Video Marketing',
              desc: "Scroll-stopping content for Reels, Shorts, and YouTube. From concept to publish.",
              tags: ['Reels/Shorts', 'Video Ads', 'YouTube Strategy', 'Editing']
            }
          ].map((card, i) => (
            <div 
              key={i} 
              className="group bg-surface border border-border rounded-xl p-8 transition-all duration-300 hover:border-border-hover hover:border-l-[3px] hover:border-l-accent hover:-translate-y-[6px] hover:shadow-[0_8px_32px_rgba(255,107,43,0.06)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-accent text-[14px] transition-transform duration-300 group-hover:scale-[1.15]">
                  [{card.id}]
                </span>
                <span className="text-[32px]">{card.icon}</span>
              </div>
              <h3 className="font-heading font-bold text-[26px] text-white mb-4">
                {card.title}
              </h3>
              <p className="font-sans text-[15px] text-grey leading-relaxed mb-8 flex-1">
                {card.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 border border-border rounded text-[11px] font-mono text-grey group-hover:border-grey-light/30 transition-colors">
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.3 — PROCESS */}
      <section className="w-full py-40 px-6 lg:px-12 bg-surface/30 border-y border-border">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-heading font-extrabold text-[40px] md:text-[56px] text-white mb-24 text-center md:text-left">
            How We Work
          </h2>

          <div ref={processRef} className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-4 lg:gap-8 overflow-hidden relative">
            {[
              { id: '01', title: 'Discovery Call', desc: "Free 30-min call. We learn your brand, goals, and challenges." },
              { id: '02', title: 'Strategy & Proposal', desc: "Custom plan with clear deliverables, timeline, and pricing." },
              { id: '03', title: 'Execution & Launch', desc: "We build, launch, and manage everything. You approve." },
              { id: '04', title: 'Optimize & Scale', desc: "Weekly data review. We double down on what works. Cut what doesn't." }
            ].map((step, i, arr) => (
              <div key={i} className="flex-1 flex flex-col relative group">
                {/* Connecting Line (Desktop) */}
                {i !== arr.length - 1 && (
                  <div className="hidden md:block absolute top-[45px] left-[60%] w-[80%] h-[1px] border-b border-dashed border-accent process-line z-0" />
                )}
                
                <div className="process-step flex flex-col z-10 bg-bg md:bg-transparent pr-4 relative">
                  <div className="font-mono text-[32px] md:text-[48px] text-accent mb-6 leading-none">
                    [{step.id}]
                  </div>
                  <h3 className="font-heading font-bold text-[20px] text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] text-grey leading-relaxed max-w-[260px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.4 — BOTTOM CTA */}
      <section className="services-cta-container w-full min-h-[50vh] flex flex-col items-center justify-center py-32 px-6">
        <div className="services-cta text-center flex flex-col items-center">
          <h2 className="font-heading font-extrabold text-[32px] md:text-[48px] text-white mb-4">
            Not sure which services you need?
          </h2>
          <p className="font-sans text-[16px] text-grey mb-10 max-w-[600px]">
            That's normal. Most clients don't when they first reach out.
          </p>
          <MagneticButton className="bg-accent text-bg hover:bg-accent-hover px-8 py-4 rounded-full font-sans font-medium text-[15px] transition-colors mb-4">
            <Link href="/contact">Book a Free 30-Min Call</Link>
          </MagneticButton>
          <p className="text-[12px] text-grey font-mono">
            No commitment. No sales pitch. Just clarity.
          </p>
        </div>
      </section>

    </div>
  );
}
