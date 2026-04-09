'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function SplineHero() {
  useEffect(() => {
    // Poll to remove the watermark inside the shadow DOM
    const removeWatermark = () => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          (logo as HTMLElement).style.display = 'none';
        }
      }
    };

    // Run interval since the shadowRoot takes time to initialize and inject the logo
    const intervalId = setInterval(removeWatermark, 100);
    
    // Clear interval after 5 seconds to prevent infinite polling
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      {/* Robot Halo Gradient */}
      <div className="absolute w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)] blur-[100px]" />
      <div className="absolute w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(255,107,43,0.05)_0%,transparent_60%)] blur-[80px]" />
      
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.9.7/build/spline-viewer.js" 
        strategy="lazyOnload" 
      />
      {/* @ts-expect-error custom element */}
      <spline-viewer 
        url="https://prod.spline.design/NIGerLz1gzGc3cEp/scene.splinecode" 
        style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
      ></spline-viewer>
    </div>
  );
}
