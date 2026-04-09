'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Marquee() {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  const textRow = "SEO OPTIMIZATION  ◆  PAID ADVERTISING  ◆  SOCIAL MEDIA  ◆  CONTENT STRATEGY  ◆  BRAND IDENTITY  ◆  WEB DESIGN  ◆  INFLUENCER MARKETING  ◆  EMAIL CAMPAIGNS  ◆  VIDEO PRODUCTION  ◆  ";

  useEffect(() => {
    // Row 1 - moves right
    if (containerRef1.current) {
      gsap.to(containerRef1.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30, // 60px/s roughly translated to time
        ease: 'linear',
      });
    }

    // Row 2 - moves left
    if (containerRef2.current) {
      // Start from offset and move right
      gsap.set(containerRef2.current, { xPercent: -50 });
      gsap.to(containerRef2.current, {
        xPercent: 0,
        repeat: -1,
        duration: 35, // slightly different speed
        ease: 'linear',
      });
    }
  }, []);

  const diamondFormattedText = () => {
    const parts = textRow.split('◆');
    return (
      <div className="flex w-max whitespace-nowrap px-4 tracking-[3px]">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center">
            {part}
            {i !== parts.length - 1 && <span className="text-accent mx-6">◆</span>}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-auto bg-elevated border-y border-border py-4 overflow-hidden flex flex-col gap-4 font-sans font-medium text-[13px] uppercase text-grey">
      <div className="flex whitespace-nowrap w-max" ref={containerRef1}>
        {diamondFormattedText()}
        {diamondFormattedText()}
        {diamondFormattedText()}
      </div>
      
      <div className="flex whitespace-nowrap w-max" ref={containerRef2}>
        {diamondFormattedText()}
        {diamondFormattedText()}
        {diamondFormattedText()}
      </div>
    </div>
  );
}
