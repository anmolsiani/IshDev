'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: string | string[];
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create array of lines if children is string with \n or just array of strings
  const lines = Array.isArray(children) ? children : children.split('\n');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const childrenList = el.querySelectorAll('.reveal-text-line');

    gsap.fromTo(
      childrenList,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.1,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={`flex flex-col ${className}`}>
      {lines.map((text, i) => (
        <span key={i} className="overflow-hidden inline-block pb-1">
          <span className="reveal-text-line inline-block origin-bottom">
            {text}
          </span>
        </span>
      ))}
    </div>
  );
}
