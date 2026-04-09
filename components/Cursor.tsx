'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Inner circle - fast follow
      gsap.to(innerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });

      // Outer circle - slow/laggy follow
      gsap.to(outerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering a link, button, or something with pointer
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        gsap.to(outerRef.current, {
          scale: 1.5,
          backgroundColor: 'rgba(255,107,43,0.1)',
          duration: 0.3,
        });
        gsap.to(innerRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
        });
      } else {
        gsap.to(outerRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.3,
        });
        gsap.to(innerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
    };
  }, []);

  return (
    <>
      <div 
        ref={outerRef} 
        className="fixed top-0 left-0 w-[32px] h-[32px] -ml-[16px] -mt-[16px] rounded-full border border-accent pointer-events-none z-[9999] hidden md:block" 
      />
      <div 
        ref={innerRef} 
        className="fixed top-0 left-0 w-[8px] h-[8px] -ml-[4px] -mt-[4px] rounded-full bg-accent pointer-events-none z-[9999] hidden md:block" 
      />
    </>
  );
}
