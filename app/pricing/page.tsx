'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Do I need to sign a contract?",
    a: "No. All plans are month-to-month. Cancel with 7 days notice. No exit fee. No penalty. We believe if we need a contract to keep you, we're not doing our job."
  },
  {
    q: "How soon will I see results?",
    a: "Depends on the service. Paid ads: you'll see data within 2 weeks, meaningful ROI in 4–8 weeks. SEO: 3–6 months for significant organic movement. Social media: engagement improvements in 30–60 days. We'll give you honest timelines upfront."
  },
  {
    q: "What if I want to switch plans?",
    a: "Upgrade or downgrade anytime. We prorate the difference. Takes effect from your next billing cycle."
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work with brands in India, UK, UAE, and the US. Billing available in INR, USD, GBP, and AED."
  },
  {
    q: "Can I pause my plan?",
    a: "Yes. You can pause for up to 30 days once per quarter. No charge during the pause."
  },
  {
    q: "What if I'm not happy with the results?",
    a: "We'll have an honest conversation about what's working and what's not. If we can fix it, we will — at no extra cost. If we can't deliver what you need, we'll tell you that too. No hard feelings."
  }
];

export default function Pricing() {
  const [isQuarterly, setIsQuarterly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pricesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reveal Cards
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  // Handle Toggle Animation
  useEffect(() => {
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        x: isQuarterly ? 24 : 0,
        duration: 0.4,
        ease: 'back.out(1.5)',
      });
    }

    // Number flip animation
    pricesRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(el, 
          { rotationX: -90, opacity: 0 },
          { rotationX: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
        );
      }
    });
  }, [isQuarterly]);

  const toggleFaq = (index: number, e: React.MouseEvent) => {
    const isOpening = openFaq !== index;
    const bodyEl = document.getElementById(`faq-body-${index}`);
    const iconEl = document.getElementById(`faq-icon-${index}`);

    // Close previous
    if (openFaq !== null && openFaq !== index) {
      const prevBody = document.getElementById(`faq-body-${openFaq}`);
      const prevIcon = document.getElementById(`faq-icon-${openFaq}`);
      if (prevBody) gsap.to(prevBody, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
      if (prevIcon) gsap.to(prevIcon, { rotation: 0, duration: 0.3 });
    }

    // Open/Close current
    if (bodyEl && iconEl) {
      if (isOpening) {
        setOpenFaq(index);
        gsap.to(bodyEl, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(iconEl, { rotation: 45, duration: 0.3 });
      } else {
        setOpenFaq(null);
        gsap.to(bodyEl, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
        gsap.to(iconEl, { rotation: 0, duration: 0.3 });
      }
    }
  };

  const PLANS = [
    {
      name: 'STARTER',
      desc: "For brands getting their first traction",
      monthly: '₹12,000/mo',
      quarterly: '₹30,600/qtr',
      features: [
        '1 Social Platform',
        'Basic On-Page SEO',
        '8 Posts/Month',
        'Monthly Report',
        'Email Support',
        '1 Ad Campaign'
      ],
      missing: [
        'Account Manager',
        'Weekly Reports',
        'Landing Pages'
      ],
      button: 'Get Started',
      highlight: false,
    },
    {
      name: 'GROWTH ★',
      desc: "For brands ready to accelerate",
      monthly: '₹28,000/mo',
      quarterly: '₹71,400/qtr',
      features: [
        '3 Social Platforms',
        'Full SEO (On+Off Page)',
        '20 Posts/Month',
        'Weekly Reports',
        'Dedicated Account Mgr',
        '3 Ad Campaigns',
        'WhatsApp Support',
        '1 Landing Page',
        'Competitor Analysis'
      ],
      missing: [],
      button: 'Start Growing',
      highlight: true,
      badge: 'Most Popular'
    },
    {
      name: 'SCALE',
      desc: "For brands ready to dominate",
      monthly: '₹55,000/mo',
      quarterly: '₹1,40,250/qtr',
      features: [
        'All Platforms',
        'Full SEO + Backlinks',
        'Unlimited Posts',
        'Real-Time Dashboard',
        'Priority WhatsApp',
        'Unlimited Campaigns',
        'Website Management',
        'Monthly Strategy Call',
        '2 Videos/Month',
        'Influencer Outreach',
        'Quarterly Brand Review',
        'Competitor Monitoring'
      ],
      missing: [],
      button: "Let's Talk",
      highlight: false,
    }
  ];

  return (
    <div className="bg-bg min-h-screen pt-32 pb-0">
      
      {/* 4.1 — HEADER */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[50vh] flex flex-col justify-center items-center text-center">
        <div className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-12">
          PRICING
        </div>
        
        <div className="mb-10 w-full flex justify-center">
          <TextReveal className="font-heading font-extrabold text-[clamp(48px,6vw,96px)] leading-[1.05] text-white">
            {"Transparent.\nAlways."}
          </TextReveal>
        </div>

        <p className="font-sans text-[16px] text-grey leading-relaxed max-w-[600px] mx-auto">
          Month-to-month. Cancel anytime. Upgrade or downgrade whenever you want.
          No lock-in contracts. No hidden fees. No 'setup charges' that never end.
        </p>
      </section>

      {/* 4.2 — BILLING TOGGLE */}
      <section className="w-full pb-12 pt-8 flex justify-center px-6 relative z-20">
        <div className="flex items-center gap-6 font-mono text-[13px] uppercase tracking-widest text-white">
          <button 
            onClick={() => setIsQuarterly(false)}
            className={`transition-colors duration-300 ${!isQuarterly ? 'text-white' : 'text-grey'}`}
          >
            Monthly
          </button>
          
          <button 
            className="w-14 h-8 rounded-full bg-border flex items-center px-1 cursor-pointer"
            onClick={() => setIsQuarterly(!isQuarterly)}
          >
            <div ref={toggleRef} className="w-6 h-6 rounded-full bg-accent" />
          </button>
          
          <button 
            onClick={() => setIsQuarterly(true)}
            className={`flex items-center gap-3 transition-colors duration-300 ${isQuarterly ? 'text-white' : 'text-grey'}`}
          >
            Quarterly
            <span className="bg-highlight text-bg px-2 py-0.5 rounded-sm text-[10px] font-bold">
              SAVE 15%
            </span>
          </button>
        </div>
      </section>

      {/* 4.3 — PRICING CARDS */}
      <section className="px-6 lg:px-12 max-w-[1440px] mx-auto pb-24 relative z-20">
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-12">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col rounded-2xl p-8 lg:p-10 transition-all duration-300
                ${plan.highlight 
                  ? 'bg-surface border border-accent shadow-[0_0_80px_rgba(255,107,43,0.1)] lg:-translate-y-4 scale-100 lg:scale-[1.02]' 
                  : 'bg-transparent border border-border mt-0 lg:mt-4 hover:border-border-hover'}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-highlight text-bg font-sans font-bold text-[12px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {plan.badge}
                </div>
              )}
              
              <h3 className="font-heading font-extrabold text-[24px] text-white">
                {plan.name}
              </h3>
              
              <div 
                ref={(el) => { pricesRef.current[i] = el; }}
                className="font-mono text-[36px] md:text-[42px] text-white mt-4 mb-2 h-[50px] flex items-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {isQuarterly ? plan.quarterly : plan.monthly}
              </div>
              
              <p className="font-sans text-[14px] text-grey mb-8 h-[40px]">
                {plan.desc}
              </p>
              
              <div className="hairline mb-8" />
              
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-white-dim font-sans text-[15px]">
                    <span className="text-accent mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
                {plan.missing.map((feature, j) => (
                  <li key={`m-${j}`} className="flex items-start gap-3 text-grey opacity-50 font-sans text-[15px]">
                    <span className="text-grey mt-0.5">✗</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton 
                className={`w-full py-4 rounded-full font-sans font-bold text-[15px] transition-all duration-300 pt-0 pb-0
                  ${plan.highlight 
                    ? 'bg-accent text-bg hover:bg-accent-hover' 
                    : 'bg-transparent border border-border text-white hover:border-accent hover:text-accent'}`}
              >
                <Link href="/contact" className="w-full h-full py-4 flex items-center justify-center">
                  {plan.button}
                </Link>
              </MagneticButton>

            </div>
          ))}
        </div>
      </section>

      {/* 4.4 — ADD-ONS */}
      <section className="px-6 pb-32 max-w-[1440px] mx-auto flex flex-col items-center">
        <p className="font-sans text-grey mb-6">Need something specific?</p>
        <div className="flex flex-wrap justify-center gap-4 text-[13px] font-sans">
          {[
            'Extra Landing Page — ₹5,000',
            'Video Production — ₹8,000/video',
            'Additional Platform — ₹4,000/mo',
            'Website Redesign — Custom Quote'
          ].map((addon, i) => (
            <div key={i} className="px-5 py-2.5 rounded-full border border-border bg-surface text-white-dim hover:border-accent hover:text-accent cursor-pointer transition-colors duration-300">
              {addon}
            </div>
          ))}
        </div>
      </section>

      {/* 4.5 — FAQ ACCORDION */}
      <section className="px-6 lg:px-12 max-w-[800px] mx-auto pb-40">
        <h2 className="font-heading font-bold text-[36px] text-white mb-12 text-center md:text-left">
          Common Questions
        </h2>
        
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-border py-6 cursor-pointer group"
              onClick={(e) => toggleFaq(i, e)}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-semibold text-[18px] text-white group-hover:text-accent transition-colors duration-300 pr-8">
                  {faq.q}
                </h4>
                <div 
                  id={`faq-icon-${i}`}
                  className="text-accent text-[24px] pointer-events-none transform origin-center"
                >
                  +
                </div>
              </div>
              <div 
                id={`faq-body-${i}`}
                className="h-0 opacity-0 overflow-hidden"
              >
                <p className="font-sans text-[15px] text-white-dim pt-4 leading-relaxed max-w-[90%]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
