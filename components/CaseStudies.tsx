'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    client: 'GreenRoots Organic',
    metric: '280%',
    metricLabel: 'Organic Traffic Growth',
    desc: 'Built a full SEO architecture from scratch — technical audit, content pillars, and backlink strategy. Went from page 5 to dominating page 1 for 40+ keywords in the organic grocery niche.',
    tags: ['SEO', 'Content Architecture', 'Technical Audit'],
    timeline: '6 months',
    industry: 'E-Commerce',
  },
  {
    client: 'StyleArc Clothing',
    metric: '4.2×',
    metricLabel: 'Return on Ad Spend',
    desc: 'Scaled luxury fashion ROAS through cinematic ad creatives, audience segmentation, and conversion rate optimization across Meta and Google Shopping.',
    tags: ['Paid Social', 'Creative Strategy', 'CRO'],
    timeline: '4 months',
    industry: 'Fashion & Luxury',
  },
  {
    client: 'MedReach Clinic',
    metric: '220+',
    metricLabel: 'Qualified Leads per Month',
    desc: 'Digitized healthcare lead generation with high-conversion landing pages, Google Ads, and a retargeting funnel that reduced cost-per-lead by 60%.',
    tags: ['Performance Marketing', 'Web', 'Landing Pages'],
    timeline: '3 months',
    industry: 'Healthcare',
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.case-item');

    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
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
      id="work"
      className="w-full py-32 lg:py-40 px-6 lg:px-12 relative z-10 bg-bg"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase">
              Selected Works // 2024-25
            </span>
          </div>
          <h2 className="font-oxanium font-black text-[clamp(40px,8vw,110px)] text-black uppercase leading-[0.85] tracking-tighter">
            Case<br />
            <span className="text-black/15">Studies.</span>
          </h2>
        </div>

        {/* Case Study Cards */}
        <div ref={cardsRef} className="flex flex-col gap-8">
          {CASE_STUDIES.map((study, i) => (
            <div
              key={i}
              className="case-item case-card rounded-2xl lg:rounded-3xl p-8 lg:p-12 group cursor-default"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
                {/* Left: Metric */}
                <div className="flex flex-col items-start lg:w-[35%] shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] tracking-[4px] text-black/30 uppercase">
                      [{study.client}]
                    </span>
                  </div>
                  <div className="font-oxanium font-black text-[clamp(64px,10vw,120px)] text-black leading-[0.85] tracking-tighter group-hover:tracking-tight transition-all duration-700">
                    {study.metric}
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-black/40 uppercase mt-3">
                    {study.metricLabel}
                  </span>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {study.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-4 py-1.5 border border-black/8 rounded-full font-mono text-[10px] text-black/40 tracking-widest uppercase group-hover:border-black/15 group-hover:text-black/60 transition-all duration-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-sans text-[16px] lg:text-[18px] text-grey leading-relaxed max-w-[550px] mb-8">
                      {study.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-black/25 tracking-widest uppercase">Timeline</span>
                        <span className="font-oxanium font-bold text-[14px] text-black">{study.timeline}</span>
                      </div>
                      <div className="w-[1px] h-8 bg-black/5" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-black/25 tracking-widest uppercase">Industry</span>
                        <span className="font-oxanium font-bold text-[14px] text-black">{study.industry}</span>
                      </div>
                    </div>

                    <Link
                      href="/services"
                      className="hidden md:flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-black/30 group-hover:text-black transition-colors duration-500"
                    >
                      <span>View Details</span>
                      <span className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/services"
            className="group flex items-center gap-4 font-mono text-[12px] tracking-[4px] uppercase text-black/50 hover:text-black transition-colors duration-500"
          >
            <span>View Full Portfolio</span>
            <div className="w-8 h-[1px] bg-black/30 group-hover:w-16 group-hover:bg-black transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
