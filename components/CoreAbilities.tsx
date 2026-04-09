'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Target, TrendingUp, Palette, Globe, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ABILITIES = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    desc: 'Dominate organic search with data-driven strategies that compound ROI month over month.',
    tag: 'SEO',
  },
  {
    icon: Target,
    title: 'Performance Marketing',
    desc: 'Every rupee tracked, every conversion measured. Scale with precision across Meta, Google & TikTok.',
    tag: 'PAID',
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    desc: 'Full-funnel growth engineering — from awareness to retention, backed by real data.',
    tag: 'GROWTH',
  },
  {
    icon: Palette,
    title: 'Creative & Brand',
    desc: 'Visual identity systems and creative campaigns that make your brand impossible to ignore.',
    tag: 'BRAND',
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'High-speed, 3D-integrated digital experiences built for conversions and performance.',
    tag: 'WEB',
  },
  {
    icon: BarChart3,
    title: 'Analytics & CRO',
    desc: 'Psychology-backed UX audits and A/B testing to maximize every visitor\'s lifetime value.',
    tag: 'DATA',
  },
];

export default function CoreAbilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.ability-item');

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
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
      className="w-full py-32 lg:py-40 px-6 lg:px-12 relative z-10 bg-bg border-y border-border overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-20 lg:mb-28 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase">
                Core Capabilities // v.03
              </span>
            </div>
            <h2 className="font-oxanium font-black text-[clamp(40px,7vw,100px)] text-black uppercase leading-[0.85] tracking-tighter">
              What We<br />
              <span className="text-black/15">Build.</span>
            </h2>
          </div>
          <p className="font-sans italic text-grey text-[17px] lg:text-[20px] leading-relaxed max-w-[380px] border-l border-black/10 pl-8">
            Building the digital infrastructure that market leaders rely on to win.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {ABILITIES.map((ability, i) => {
            const Icon = ability.icon;
            return (
              <div
                key={i}
                className="ability-item ability-card rounded-2xl p-8 lg:p-10 group cursor-default"
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] tracking-[4px] text-black/25 uppercase group-hover:text-black/60 transition-colors duration-500">
                    [{ability.tag}]
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-oxanium font-bold text-[22px] lg:text-[26px] text-black uppercase tracking-tight leading-tight mb-4 group-hover:tracking-normal transition-all duration-500">
                  {ability.title}
                </h3>
                <p className="font-sans text-grey text-[14px] lg:text-[15px] leading-relaxed">
                  {ability.desc}
                </p>

                {/* Bottom line that expands on hover */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-[1px] bg-black/5 flex-1 group-hover:bg-black/15 transition-colors duration-700" />
                  <span className="font-mono text-[9px] text-black/20 tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    Explore →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
