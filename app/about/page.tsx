'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/TextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const diffRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Intro Animations
    gsap.from('.about-intro-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1,
      delay: 0.8,
      ease: 'expo.out',
    });

    gsap.from('.about-intro-col', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      delay: 1,
      ease: 'power3.out',
    });

    // 2. Differentiators
    if (diffRef.current) {
      gsap.from(diffRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: diffRef.current,
          start: 'top 75%',
        },
      });
    }

    // 3. Horizontal Timeline Pin
    if (timelineContainerRef.current && timelineScrollRef.current) {
      if (window.innerWidth >= 768) {
        const totalWidth = timelineScrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        gsap.to(timelineScrollRef.current, {
          x: () => -(totalWidth - viewportWidth + 100), // 100px padding
          ease: 'none',
          scrollTrigger: {
            trigger: timelineContainerRef.current,
            pin: true,
            scrub: 1,
            start: 'center center',
            end: () => `+=${totalWidth}`,
          },
        });
      }
    }

    // 4. Values Cards
    if (valuesRef.current) {
      gsap.from(valuesRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-bg min-h-screen pt-32 pb-24">
      {/* 2.1 — INTRO */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[80vh] flex flex-col justify-center">
        <div className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-12">
          ABOUT ISHDEV<span className="text-accent-hover">.</span>
        </div>
        
        <div className="mb-16">
          <TextReveal className="font-heading font-extrabold text-[clamp(48px,6vw,96px)] leading-[1.05] text-white max-w-[1000px]">
            {"We started with\none client and\na borrowed laptop."}
          </TextReveal>
        </div>

        <div className="about-intro-line hairline mb-16 max-w-[1000px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-[1000px]">
          <div className="about-intro-col font-sans text-[16px] text-white-dim leading-relaxed">
            2023. South Delhi. Two people. One shared workspace. 
            Our first client came from a cold DM on LinkedIn at 1AM.
            They paid ₹8,000 for social media management.
            They're still with us — now on the Growth plan.
          </div>
          <div className="about-intro-col font-sans text-[16px] text-white-dim leading-relaxed">
            Today we're a team of 8 specialists — small by choice.
            We've managed ₹40L+ in ad spend across 85 campaigns.
            We still reply to every message ourselves.
            That part will never change.
          </div>
        </div>
      </section>

      {/* 2.2 — WHAT MAKES US DIFFERENT */}
      <section className="w-full py-32 px-6 lg:px-12 border-t border-border bg-surface/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-20 max-w-[800px]">
            <h2 className="font-heading font-extrabold text-[clamp(36px,5vw,64px)] leading-[1.1] text-white mb-6">
              Built to Be the Agency<br />We Wished Existed.
            </h2>
            <p className="font-sans text-[16px] text-grey leading-relaxed">
              When we were freelancers, we hated working with agencies. 
              Slow responses. Vague reports. 6-month contracts for 2 months of actual work.
              So we built the opposite.
            </p>
          </div>

          <div ref={diffRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24">
            {[
              {
                num: '01',
                title: 'Month-to-Month Only',
                desc: "No contracts. No lock-in. We earn your business every 30 days. If we're not delivering, you leave. Simple."
              },
              {
                num: '02',
                title: 'One Point of Contact',
                desc: "You get a dedicated account manager who knows your brand inside out. Not a rotating cast of strangers. Not a ticket system."
              },
              {
                num: '03',
                title: 'Weekly Reports — Not Monthly',
                desc: "You see the numbers every week. Full dashboard access. No waiting 30 days to find out something isn't working."
              },
              {
                num: '04',
                title: 'Your Budget = Our Reputation',
                desc: "We optimize like it's our own money. Because if your campaign fails, we lose you. And we hate losing."
              },
              {
                num: '05',
                title: 'Full-Funnel Thinking',
                desc: "We don't just run ads and hope. We look at the whole journey — from first click to repeat purchase."
              },
              {
                num: '06',
                title: 'Honest Timelines',
                desc: "SEO takes 3–6 months. We'll tell you that on day one. If someone promises page 1 in 30 days, they're lying."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="font-mono text-[20px] text-accent border-b border-border pb-4 mb-2">{item.num}</div>
                <h3 className="font-heading font-bold text-[20px] text-white">{item.title}</h3>
                <p className="font-sans text-[15px] text-white-dim leading-relaxed max-w-[400px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.3 — TIMELINE */}
      <section ref={timelineContainerRef} className="w-full h-screen flex flex-col justify-center overflow-hidden bg-bg relative px-6 md:px-0 border-y border-border">
        <div className="md:absolute md:top-24 md:left-12 font-heading font-extrabold text-[36px] text-white mb-16 md:mb-0 z-10">
          How We Got Here
        </div>

        {/* Scroll Container */}
        <div ref={timelineScrollRef} className="flex flex-col md:flex-row md:items-center h-full md:px-12 w-full md:w-max">
          
          {/* Main Line Background (Desktop Only) */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-[1px] bg-border z-0" />

          {/* Nodes */}
          {[
            {
              year: '2023',
              desc: "Started. 2 people. ₹8,000 was our first invoice."
            },
            {
              year: 'Early 2024',
              desc: "First 15 clients. Hired our first full-time designer. ₹15L in managed ad spend."
            },
            {
              year: 'Late 2024',
              desc: "Expanded into influencer + video production. Team grew to 6."
            },
            {
              year: '2025',
              desc: "40+ clients. Moved to a real office. Same hunger. Bigger ambitions."
            }
          ].map((node, i) => (
            <div key={i} className="relative flex flex-row md:flex-col items-start md:items-center min-w-[350px] md:min-w-[500px] gap-8 md:gap-0 py-8 md:py-0 mb-8 md:mb-0 border-l md:border-l-0 border-border pl-6 md:pl-0">
              
              {/* Node Dot Desktop */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent z-10 
                              shadow-[0_0_15px_rgba(255,107,43,0.5)] border-4 border-bg" />
              
              {/* Connecting Line Desktop */}
              {i !== 0 && (
                <div className="hidden md:block absolute top-1/2 right-1/2 w-full h-[1px] bg-accent z-[5]" />
              )}

              {/* Node Dot Mobile */}
              <div className="md:hidden absolute top-10 left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-accent z-10 border border-bg" />

              <div className="md:mb-16 md:text-center w-full">
                <div className="font-heading font-extrabold text-[36px] md:text-[48px] text-accent leading-none mb-4 md:-translate-y-8">
                  {node.year}
                </div>
              </div>

              <div className="md:mt-16 md:text-center w-full max-w-[280px]">
                <p className="font-sans text-[14px] leading-relaxed text-grey md:translate-y-8">
                  {node.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 2.4 — VALUES */}
      <section className="w-full py-40 px-6 lg:px-12 bg-bg max-w-[1440px] mx-auto">
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Results First',
              desc: "If it can't be measured, we don't recommend it. Every rupee you spend should move a number."
            },
            {
              icon: '🤝',
              title: 'Radical Honesty',
              desc: "We'll tell you if something won't work — even if it means a smaller invoice for us. Trust > revenue."
            },
            {
              icon: '💡',
              title: 'Full Transparency',
              desc: "Real-time dashboards. Weekly reports. No hiding behind jargon or vanity metrics. You see everything we see."
            }
          ].map((card, i) => (
            <div key={i} className="bg-surface border-l-[4px] border-accent p-10 rounded-xl">
              <div className="text-[48px] mb-8">{card.icon}</div>
              <h3 className="font-heading font-bold text-[22px] text-white mb-4">{card.title}</h3>
              <p className="font-sans text-[15px] text-white-dim leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
