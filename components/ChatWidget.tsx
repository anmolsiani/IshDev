'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { getReply } from '@/lib/chatReplies';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: "Hi, how may I help you? 👋\n\nAsk me anything about our services, pricing, or how to get started.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Remove Spline watermark
  useEffect(() => {
    const removeWatermark = () => {
      const viewers = document.querySelectorAll('.chat-robot-spline spline-viewer');
      viewers.forEach((viewer) => {
        if (viewer.shadowRoot) {
          const logo = viewer.shadowRoot.querySelector('#logo');
          const brand = viewer.shadowRoot.querySelector('.spline-watermark');
          if (logo) (logo as HTMLElement).style.display = 'none';
          if (brand) (brand as HTMLElement).style.display = 'none';
          
          // Force hide all absolute positioned elements that might be the watermark
          const absolutElements = viewer.shadowRoot.querySelectorAll('div[style*="position: absolute"]');
          absolutElements.forEach((el) => {
             if (el.innerHTML.toLowerCase().includes('spline')) {
               (el as HTMLElement).style.display = 'none';
             }
          });
        }
      });
    };
    const interval = setInterval(removeWatermark, 100);
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: `msg-${Date.now()}`, sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const delay = Math.floor(Math.random() * 700) + 800;
    setTimeout(() => {
      const replyText = getReply(text);
      const botMsg: Message = { id: `msg-${Date.now() + 1}`, sender: 'bot', text: replyText };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <>
      {/* Spline Script (loaded once) */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.7/build/spline-viewer.js"
        strategy="lazyOnload"
      />

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-6 z-[9998] w-[calc(100vw-48px)] max-w-[380px] h-[480px] rounded-2xl bg-white/90 backdrop-blur-xl border border-black/8 shadow-[0_30px_80px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-white/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-highlight flex items-center justify-center text-white font-oxanium font-bold text-[11px]">
                  I
                </div>
                <div>
                  <div className="font-oxanium font-bold text-[13px] text-black uppercase tracking-wide">
                    Ishdev AI
                  </div>
                  <div className="font-mono text-[9px] text-black/40 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors text-black/40 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-black text-white rounded-[14px_14px_0_14px] px-4 py-3'
                        : 'bg-black/[0.03] text-black/80 rounded-[14px_14px_14px_0] px-4 py-3 border border-black/5'
                    }`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 px-4 py-3 bg-black/[0.03] rounded-[14px_14px_14px_0] border border-black/5 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '0.6s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: '0.15s', animationDuration: '0.6s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.6s' }} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-black/5 bg-white/40">
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-black/[0.03] border border-black/5 rounded-xl px-4 py-2.5 text-[13px] text-black placeholder-black/30 focus:outline-none focus:border-black/15 transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 rounded-xl bg-highlight text-white flex items-center justify-center shrink-0 disabled:opacity-20 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_12px_rgba(255,0,0,0.2)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12H19" />
                    <path d="M12 5L19 12L12 19" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Robot Bubble */}
      <button
        ref={robotRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-20 h-20 cursor-pointer group chat-robot-spline hover:scale-110 active:scale-95 transition-transform duration-500"
        aria-label="Open chat"
      >
        {/* Robot container without box borders for a "pop" feel */}
        <div
          className="w-full h-full bg-transparent flex items-center justify-center relative"
          style={{ animation: 'breathe 3s ease-in-out infinite' }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-2 rounded-full bg-highlight/5 blur-xl group-hover:bg-highlight/10 transition-colors" />
          
          <div className="w-full h-full relative z-10">
            {/* @ts-expect-error custom element */}
            <spline-viewer
              url="https://prod.spline.design/zbWDFVOwAiOjzE7F/scene.splinecode"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'transparent',
                pointerEvents: 'none',
              }}
            ></spline-viewer>
          </div>
        </div>

        {/* Pulse ring (Red) */}
        <div className="absolute inset-0 rounded-full border-2 border-highlight/20 animate-ping opacity-40 pointer-events-none" />

        {/* Notification dot (Red) */}
        {!isOpen && (
          <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-highlight flex items-center justify-center shadow-[0_2px_8px_rgba(255,0,0,0.3)] border-2 border-white z-20">
            <span className="text-white text-[9px] font-bold">1</span>
          </div>
        )}
      </button>
    </>
  );
}
