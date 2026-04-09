'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Target,
  TrendingUp,
  Palette,
  Globe,
  BarChart3,
  Mail,
  Share2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: Search, title: 'SEO Optimization', desc: 'Page-1 rankings with data-led keyword strategy, technical audits, and link building.' },
  { icon: Target, title: 'Paid Advertising', desc: 'High-performance Google & Meta campaigns optimized for conversion and scale.' },
  { icon: TrendingUp, title: 'Growth Strategy', desc: 'Full-funnel growth architecture from awareness to retention and referral.' },
  { icon: Palette, title: 'Brand Identity', desc: 'Visual systems and positioning that make your brand unforgettable.' },
  { icon: Globe, title: 'Web Development', desc: '3D-integrated, high-speed sites built for performance and conversion.' },
  { icon: BarChart3, title: 'Analytics & CRO', desc: 'A/B testing, UX audits, and data analysis to maximize visitor value.' },
  { icon: Mail, title: 'Email Marketing', desc: 'Automated email sequences that nurture leads and drive repeat revenue.' },
  { icon: Share2, title: 'Social Media', desc: 'Platform strategy, content creation, and community management that converts.' },
];

export default function CircularServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop circular scroll animation
  useEffect(() => {
    if (isMobile || !sectionRef.current || !containerRef.current) return;

    const totalItems = SERVICES.length;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${totalItems * 600}`, // Slower scroll for better feel
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Calculate index based on progress
        const rawIndex = progress * totalItems;
        const index = Math.min(Math.floor(rawIndex), totalItems - 1);
        setActiveIndex(index);

        if (containerRef.current) {
          // Adjust rotation so the active item is always on the right (0 degrees)
          // Item angle is (i / N) * 360. To make item[index] at 0deg, 
          // container must be at -(index / N) * 360.
          // For smooth interpolation:
          const rotation = -rawIndex * (360 / totalItems);
          
          gsap.to(containerRef.current, {
            rotation: rotation,
            duration: 0.1,
            overwrite: 'auto',
            ease: 'none'
          });

          // Counter-rotate each item to keep text upright
          const items = containerRef.current.querySelectorAll('.orbit-item');
          items.forEach((item, i) => {
            const isActive = i === index;
            const distance = Math.abs(rawIndex - i);
            const normalizedDistance = Math.min(distance, 2);
            
            // Get current global position to check if it's on the left
            const angle = (i / totalItems) * 360 + rotation;
            const normalizedAngle = ((angle % 360) + 360) % 360; // 0 to 360
            const isOnLeft = normalizedAngle > 90 && normalizedAngle < 270;

            // Apply scale and blur based on distance from active
            const scale = isActive ? 1.5 : 1 - (normalizedDistance * 0.15);
            const opacity = isActive ? 1 : 0.3 - (normalizedDistance * 0.1);
            
            // SIGNIFICANTLY increase blur if on the left
            let blur = isActive ? 0 : normalizedDistance * 6;
            if (isOnLeft && !isActive) {
              blur *= 4; // Force deep blur on left side
            }

            gsap.to(item, {
              rotation: -rotation,
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              duration: 0.5,
              overwrite: 'auto',
              ease: 'power2.out'
            });
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  // Mobile: stagger animation
  useEffect(() => {
    if (!isMobile) return;

    const cards = document.querySelectorAll('.mobile-service-card');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.mobile-services-grid',
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  const activeService = SERVICES[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full relative z-10 bg-bg border-t border-border overflow-hidden"
      style={{ minHeight: isMobile ? 'auto' : '100vh' }}
    >
      {/* Header */}
      <div className="px-6 lg:px-12 pt-32 lg:pt-0 lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full lg:flex lg:items-center lg:pointer-events-none z-20">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col lg:w-[40%]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-highlight" />
              <span className="font-mono text-highlight text-[10px] tracking-[0.5em] uppercase">
                Service Orbit // Interactive
              </span>
            </div>
            <h2 className="font-oxanium font-black text-[clamp(36px,6vw,80px)] text-black uppercase leading-[0.85] tracking-tighter mb-8">
              Our<br />
              <span className="text-black/15">Services.</span>
            </h2>

            {/* Active Service Info (Desktop) */}
            {!isMobile && (
              <div className="mt-8 pointer-events-auto overflow-hidden">
                <div key={activeIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-highlight flex items-center justify-center text-white shadow-[0_10px_30px_rgba(255,0,0,0.2)]">
                      {(() => {
                        const Icon = activeService.icon;
                        return <Icon size={22} />;
                      })()}
                    </div>
                    <h3 className="font-oxanium font-bold text-[28px] text-black uppercase tracking-tight">
                      {activeService.title}
                    </h3>
                  </div>
                  <p className="font-sans text-black/70 text-[17px] leading-relaxed max-w-[420px]">
                    {activeService.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="font-mono text-[11px] text-highlight font-bold tracking-widest uppercase">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="w-20 h-[1px] bg-black/10 relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-highlight transition-all duration-500" 
                        style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-black/30 tracking-widest uppercase">
                      {String(SERVICES.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop: Circular Orbit */}
      {!isMobile && (
        <div className="w-full h-screen flex items-center justify-center relative">
          {/* Orbit Tracks */}
          <div className="absolute w-[700px] h-[700px] border border-black/[0.03] rounded-full" />
          <div className="absolute w-[500px] h-[500px] border border-black/[0.02] rounded-full" />
          
          {/* Focal Point Indicator (Right) */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-l from-highlight/20 to-transparent pointer-events-none" />

          {/* Orbit Container */}
          <div
            ref={containerRef}
            className="absolute w-[600px] h-[600px] will-change-transform"
            style={{ right: '5%' }}
          >
            {SERVICES.map((service, i) => {
              const angle = (i / SERVICES.length) * 360;
              const radian = (angle * Math.PI) / 180;
              const radius = 300;
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;
              const Icon = service.icon;

              return (
                <div
                  key={i}
                  className="orbit-item absolute flex flex-col items-center"
                  style={{
                    left: `calc(50% + ${x}px - 40px)`,
                    top: `calc(50% + ${y}px - 40px)`,
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 cursor-pointer bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group"
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    {/* Stylized Branding Mark */}
                    <div className="absolute top-3 left-3 flex flex-col items-start opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="w-4 h-[2px] bg-highlight mb-1" />
                      <div className="font-oxanium font-black text-[10px] text-black leading-none tracking-tighter">
                        ISH<span className="text-highlight">.</span>
                      </div>
                    </div>
                    
                    <Icon size={28} strokeWidth={1.5} className="text-black z-10" />

                    {/* Background Logo Glow for Active */}
                    {i === activeIndex && (
                      <div className="absolute inset-0 bg-highlight/5 rounded-2xl animate-pulse -z-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile: Grid Fallback */}
      {isMobile && (
        <div className="mobile-services-grid px-6 pb-24 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="mobile-service-card glass-card rounded-2xl p-6 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center mb-5 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-oxanium font-bold text-[16px] text-black uppercase tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans text-grey text-[13px] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
