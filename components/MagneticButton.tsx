'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className,
  as: Component = 'button',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
} & React.HTMLAttributes<HTMLElement>) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const xTo = gsap.quickTo(container, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(container, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const textXTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = container.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3); // Magnetic pull factor
      yTo(y * 0.3);
      textXTo(x * 0.1);
      textYTo(y * 0.1);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={containerRef as any}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10,
        mass: 0.8
      }}
      className={`relative inline-flex z-10 glass-shiny px-8 py-3.5 rounded-full items-center justify-center transition-shadow ${className || ''}`}
      {...props}
    >
      <span ref={textRef} className="block pointer-events-none relative z-10 w-full h-full">
        {children}
      </span>
    </MotionComponent>
  );
}
