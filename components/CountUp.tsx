'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({
  end,
  duration = 2,
  delay = 0,
}: {
  end: number;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      // Add delay
      if (timestamp - startTime < delay * 1000) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      const progress = timestamp - startTime - delay * 1000;
      const durationMs = duration * 1000;
      
      const rawCount = Math.min((progress / durationMs) * end, end);
      
      // Ease out expo
      const easeProgress = rawCount === end ? end : end * (1 - Math.pow(2, -10 * (rawCount / end)));
      
      setCount(Math.floor(easeProgress));

      if (progress < durationMs) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}</span>;
}
