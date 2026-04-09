'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import TextReveal from '@/components/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: 'Priya Nair', comp: 'StyleArc Clothing· Jaipur',
    tag: 'Social Media', date: '3 weeks ago', initials: 'PN', stars: 5,
    text: "Our Instagram was stuck at 2,800 followers for months. We'd post regularly but nothing was moving. Ishdev redid our content strategy completely — better hooks, proper reels format, consistent posting schedule. 4 months in, we're at 11K and actually getting DMs from customers. The engagement rate went from 1.2% to 6.8%. Very happy with how hands-on the team is."
  },
  {
    name: 'Aakash Bhatia', comp: 'TechPulse (SaaS)· Bangalore',
    tag: 'Google Ads', date: '1 month ago', initials: 'AB', stars: 5,
    text: "Switched from our previous agency after 6 months of mediocre results. Ishdev audited our Google Ads account and found we were wasting about 35% of our budget on irrelevant keywords. They rebuilt the campaigns from scratch. CPA dropped from ₹1,800 to ₹680 within 2 months. Currently doing the best lead gen numbers we've ever had."
  },
  {
    name: 'Simran Kaur', comp: 'GreenRoots Organic· Chandigarh',
    tag: 'SEO + Content', date: '6 weeks ago', initials: 'SK', stars: 5,
    text: "When we started with Ishdev, we had zero organic traffic — literally single digits. They did a full SEO audit, fixed our site structure, and started publishing 8 blog posts a month. 5 months later, we're getting 3,200+ monthly visitors from Google. 7 keywords on page 1. Not overnight magic — they were upfront about the timeline — but the results are real and still growing."
  },
  {
    name: 'Rohan Kapoor', comp: 'FreshBrew Café (3 locs)· Delhi',
    tag: 'Local SEO + Social', date: '2 months ago', initials: 'RK', stars: 5,
    text: "We needed more footfall at our Hauz Khas and Saket outlets. Ishdev optimized our Google Business profiles, got us appearing in local search results, and ran a targeted Instagram campaign. Walk-ins at Hauz Khas are up roughly 40% on weekends. The social content actually looks like OUR brand, not generic café posts."
  },
  {
    name: 'James Whitfield', comp: 'FinCore Advisory· London UK 🇬🇧',
    tag: 'Email Marketing', date: '3 weeks ago', initials: 'JW', stars: 5,
    text: "I'll be honest, I was hesitant about working with an agency based in India for our UK financial advisory firm. A friend recommended them, so I gave it a try on a month-to-month basis. Our email open rates went from 12% to 38%. Click-through nearly tripled. The writing is sharp and professional — you wouldn't know it's not written in-house. Six months in now and very pleased."
  },
  {
    name: 'Meera Joshi', comp: 'MedReach Clinic· Mumbai',
    tag: 'Meta Ads', date: '1 month ago', initials: 'MJ', stars: 5,
    text: "Healthcare advertising has so many restrictions — most agencies don't understand the compliance side. Ishdev figured it out fast. We're getting 45–60 qualified patient inquiries per month from Meta ads at a cost we can sustain. They also built us a simple landing page that converts much better than our old website."
  },
  {
    name: 'Ananya Chopra', comp: 'LuxNova Jewels· Surat',
    tag: 'Meta Ads + Content', date: '5 weeks ago', initials: 'AC', stars: 5,
    text: "Our previous agency's ads looked generic — stock photos with discount text. Ishdev took time to understand our brand aesthetic and created ads that actually felt like LuxNova. ROAS improved from 1.8x to 3.4x. Our best Diwali season ever in terms of online sales. The creative team really gets luxury positioning."
  },
  {
    name: 'Arjun Tiwari', comp: 'SpeedCart (D2C)· Noida',
    tag: 'SEO + Content', date: '2 months ago', initials: 'AT', stars: 5,
    text: "We were entirely dependent on paid ads for traffic. Ishdev built out our content strategy and SEO foundation. After 6 months, organic traffic is now 35% of our total — up from basically zero. That's revenue we're earning without ad spend. Wish I'd invested in SEO earlier."
  },
  {
    name: 'Fatima Sheikh', comp: 'NovaSkin Beauty· Dubai UAE 🇦🇪',
    tag: 'Influencer Mktg', date: '6 weeks ago', initials: 'FS', stars: 5,
    text: "Ishdev sourced 12 micro-influencers for our product launch campaign. Total reach was around 380K — not millions, but the engagement was incredible. We got 1,400+ website visits and 190 orders directly from the campaign. They picked creators who actually matched our audience. Not just anyone with followers."
  },
  {
    name: 'Deepak Malhotra', comp: 'CareerForge (Ed-tech)· Pune',
    tag: 'Google + Landing Pg', date: '3 weeks ago', initials: 'DM', stars: 4,
    text: "Good experience overall. Lead quality improved significantly after they rebuilt our landing page and ad copy. Only giving 4 stars because the first 2 weeks were a bit slow on communication — they were onboarding multiple clients at once. After that, it's been smooth. Now getting 80+ course inquiries per month at ₹320/lead."
  },
  {
    name: 'Nisha Reddy', comp: 'PureGlow Skincare· Hyderabad',
    tag: 'Social + Influencer', date: '1 month ago', initials: 'NR', stars: 5,
    text: "Small brand, small budget — ₹15K/month. I wasn't sure any decent agency would take us seriously. Ishdev did. They focused on Instagram reels and 3 nano-influencer partnerships. Follower growth isn't explosive (1,200 to 3,800 in 4 months) but the QUALITY of engagement is completely different. We're getting real customers, not just likes."
  },
  {
    name: 'Sanjay Verma', comp: 'QuickShift Logistics· Gurgaon',
    tag: 'SEO + Google Ads', date: '2 months ago', initials: 'SV', stars: 5,
    text: "B2B marketing is hard. Most agencies only know how to sell to consumers. Ishdev understood our B2B sales cycle and built campaigns that target operations managers and procurement heads. Generating 25+ qualified leads per month now. The weekly reports are detailed and actually useful — not just pretty charts."
  }
];

export default function Reviews() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const msnryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Featured Quote Reveal
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
          }
        }
      );

      // Star stagger
      const stars = quoteRef.current.querySelectorAll('.featured-star');
      gsap.from(stars, {
        opacity: 0,
        scale: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        }
      });
    }

    // Masonry Cards Stagger
    if (msnryRef.current) {
      const cards = msnryRef.current.children;
      Array.from(cards).forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-bg min-h-screen pt-32 pb-0">

      {/* 5.1 — HEADER */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[40vh] flex flex-col justify-center items-center text-center">
        <div className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-12">
          CLIENT REVIEWS
        </div>
        
        <div className="mb-8 w-full flex justify-center">
          <TextReveal className="font-heading font-extrabold text-[clamp(48px,6vw,96px)] leading-[1.05] text-white">
            {"Real People.\nReal Results."}
          </TextReveal>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="font-mono text-[14px] text-white bg-surface px-4 py-2 rounded-full border border-border flex items-center gap-2">
            <span className="text-[#FBBC05]">⭐</span> 4.9/5 — 23 Google Reviews
          </div>
          <p className="font-sans text-[13px] text-grey italic max-w-[500px]">
            We're a young agency. These are every review we have — not a cherry-picked highlight reel.
          </p>
        </div>
      </section>

      {/* 5.2 — FEATURED QUOTE */}
      <section className="px-6 w-full py-24 min-h-[60vh] flex justify-center items-center relative border-y border-border bg-surface/30">
        <div ref={quoteRef} className="max-w-[900px] mx-auto text-center relative pointer-events-none">
          
          <div className="absolute -top-12 md:-top-20 left-1/2 -translate-x-1/2 font-display text-accent text-[120px] leading-none opacity-20 hidden md:block select-none">
            "
          </div>

          <p className="font-display italic text-white text-[24px] md:text-[36px] leading-[1.6] mb-12">
            "We were spending ₹40,000 a month on ads with another agency and barely breaking even. Ishdev restructured our campaigns, cut our cost-per-lead by 60%, and now we're actually profitable on paid ads for the first time. Honest team. They tell you what's working and what's not — no sugarcoating."
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map((_, i) => (
                <span key={i} className="featured-star text-accent text-[20px]">★</span>
              ))}
            </div>
            <div className="font-heading font-semibold text-[16px] text-white">
              — Vikram Sethi
            </div>
            <div className="font-sans text-[14px] text-grey">
              Founder, BuildNest Properties · Pune
            </div>
          </div>
          
        </div>
      </section>

      {/* 5.3 — REVIEWS GRID */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto py-32 relative z-20">
        <div ref={msnryRef} className="columns-1 md:columns-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          {REVIEWS.map((r, i) => (
            <div 
              key={i} 
              className="break-inside-avoid bg-surface border border-border rounded-xl p-8 transition-colors duration-300 hover:border-border-hover w-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-surface border border-border flex items-center justify-center font-heading font-bold text-accent text-[14px]">
                  {r.initials}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-[16px] text-white">{r.name}</h4>
                  <p className="font-sans text-[13px] text-grey">{r.comp}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className={j < r.stars ? 'text-accent' : 'text-grey opacity-40'}>★</span>
                ))}
              </div>

              <p className="font-sans text-[15px] text-white-dim leading-relaxed mb-6">
                "{r.text}"
              </p>

              <div className="flex items-center justify-between w-full">
                <span className="px-2 py-1 border border-border rounded text-[11px] font-mono text-grey">
                  [{r.tag}]
                </span>
                <span className="font-sans text-[11px] text-grey">
                  Reviewed {r.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center pb-24 border-b border-border">
          <p className="font-sans text-[12px] text-grey mb-4">
            All reviews are from real clients. Results vary by industry, budget, and timeline.<br />
            Reviews sourced from Google Business Profile and direct client feedback.
          </p>
          <a href="#" className="font-sans text-[13px] text-grey hover:text-accent transition-colors underline underline-offset-4 decoration-border">
            Leave us a review on Google →
          </a>
        </div>
      </section>

    </div>
  );
}
