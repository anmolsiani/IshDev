"use client";

import { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusText, setStatusText] = useState("INITIALIZING_CORE");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Status text cycling
  useEffect(() => {
    const statuses = [
      "INITIALIZING_CORE",
      "ESTABLISHING_3D_MESH",
      "CALIBRATING_OPTICS",
      "SYNCING_DATABASE",
      "STABILIZING_FLUX",
      "FINAL_POLISH"
    ];
    const interval = setInterval(() => {
      if (progress < 100) {
        setStatusText(statuses[Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1)]);
      } else {
        setStatusText("SYSTEM_READY");
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [progress]);

  // Progress logic
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const remaining = 100 - prev;
        const inc = Math.max(0.5, Math.random() * (remaining / 10));
        return Math.min(100, prev + inc);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Smooth exit animation
  useEffect(() => {
    if (progress !== 100) return;

    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
      delay: 1.2,
    });

    // Phase 1: Content fades out with blur and slight scale up
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 1.05,
      filter: "blur(12px)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Phase 2: Brief white flash
    tl.to(
      overlayRef.current,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    );

    // Phase 3: Entire container slides up with clip-path
    tl.to(containerRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 1,
      ease: "expo.inOut",
    });

    // Phase 4: Flash fades during the slide
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.7"
    );
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] overflow-hidden pointer-events-auto bg-[var(--bg)] font-oxanium"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Background Grain */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 grain" />

      {/* White flash overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-white pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content Layer */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 text-[var(--accent)]"
      >
        {/* 3D Robot */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="laser-scan-line" />
          <div className="w-full h-full opacity-60 mix-blend-screen scale-125">
            <Spline
              scene="https://prod.spline.design/zbWDFVOwAiOjzE7F/scene.splinecode"
              onLoad={() => setIsModelLoaded(true)}
            />
          </div>
          <div className="absolute w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)] blur-[150px]" />
        </div>

        {/* Branding */}
        <div className="relative z-10 text-center flex flex-col items-center gap-6">
          <div className="relative">
            <h1 className="text-[14vw] md:text-[10vw] font-black tracking-tighter uppercase leading-none">
              ishdev.
            </h1>
          </div>
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
          <span className="text-[10px] tracking-[1.5em] uppercase opacity-40 font-mono">
            {isModelLoaded ? "MODEL_CONNECTED" : "ESTABLISHING_LINK..."}
          </span>
        </div>

        {/* HUD Bottom-Left */}
        <div className="absolute bottom-12 left-12 z-30 flex flex-col gap-4 font-mono">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <span className="text-[10px] text-accent tracking-widest">{statusText}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums leading-none">
                {Math.floor(progress).toString().padStart(3, '0')}
              </span>
              <span className="text-xl opacity-30">%</span>
            </div>
            <div className="w-[180px] h-[4px] bg-black/5 relative overflow-hidden mt-2 rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-black rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col opacity-20 text-[8px] tracking-[0.4em] uppercase gap-1">
            <span>Network_Lat: 12ms</span>
            <span>Payload_Type: Digital_Architecture_v5</span>
            <span>Security_Status: VERIFIED</span>
          </div>
        </div>

        {/* HUD Bottom-Right */}
        <div className="absolute bottom-12 right-12 z-30 hidden md:flex flex-col items-end text-right gap-2 opacity-30 font-mono text-[9px] tracking-[0.2em] uppercase">
          <div className="flex gap-4">
            <span>FPS: 60.0</span>
            <span>GPU: ACTIVE</span>
          </div>
          <div className="w-24 h-[1px] bg-black/10" />
          <span>Memory_Usage: 142MB</span>
          <span>Thread_Priority: CRITICAL</span>
        </div>
      </div>
    </div>
  );
}
