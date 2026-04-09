'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getReply } from '@/lib/chatReplies';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

const TYPING_DELAY_MIN = 800;
const TYPING_DELAY_MAX = 1500;

const QUICK_CHIPS = [
  "What services do you offer?",
  "Show me pricing",
  "How do I get started?",
  "Talk to a real person",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const initMsg: Message = {
      id: 'msg-init',
      sender: 'bot',
      text: "Hey 👋 I'm Ishdev's AI assistant.\n\nI can answer questions about our services, pricing, how we work, and what to expect. Ask me anything — I'll give you straight answers.\n\nIf you need something I can't help with, I'll connect you to the team."
    };
    
    setTimeout(() => {
      setMessages([initMsg]);
    }, 400); // Small delay on mount
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: `msg-${Date.now()}`, sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate delay
    const delay = Math.floor(Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN + 1)) + TYPING_DELAY_MIN;
    
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
    <div className="bg-bg min-h-screen pt-32 pb-12 flex flex-col items-center">
      
      <div className="text-center mb-8 px-6">
        <h1 className="font-heading font-extrabold text-[36px] md:text-[48px] text-white tracking-tight mb-4">
          Ask Ishdev AI
        </h1>
        <p className="font-sans text-[15px] md:text-[16px] text-grey max-w-[500px] mb-6">
          Get instant answers about our services, pricing, and process.
          No waiting. No forms. No sales calls.
        </p>
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent font-mono text-[11px] uppercase tracking-wider">
          ⚡ Powered by Ishdev's knowledge base — not ChatGPT
        </div>
      </div>

      <div className="w-[calc(100%-48px)] max-w-[680px] h-[70vh] md:h-[520px] bg-bg border border-border rounded-2xl flex flex-col overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
        
        {/* Messages Layout */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 custom-scrollbar"
        >
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-bg font-heading font-bold text-[14px] mr-4 mt-1">
                    I
                  </div>
                )}
                
                <div 
                  className={`max-w-[85%] font-sans text-[15px] leading-relaxed relative ${
                    msg.sender === 'user' 
                      ? 'bg-elevated text-white rounded-[12px_12px_0_12px] p-4 text-right border border-border' 
                      : 'bg-surface text-white-dim rounded-[12px_12px_12px_0] p-4 border border-border'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-bg font-heading font-bold text-[14px] mr-4 mt-1">
                I
              </div>
              <div className="bg-surface rounded-[12px_12px_12px_0] border border-border px-4 py-5 flex gap-1.5 items-center object-contain">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0s', animationDuration: '0.6s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.15s', animationDuration: '0.6s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.6s' }} />
              </div>
            </motion.div>
          )}

          {/* Quick Chips below the very first message */}
          {messages.length === 1 && !isTyping && (
            <div className="flex flex-wrap gap-2 ml-12 pt-2">
              {QUICK_CHIPS.map((chip, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSend(chip)}
                  className="px-4 py-2 rounded-full border border-border bg-surface text-grey font-sans text-[13px] hover:border-accent hover:text-accent transition-colors"
                >
                  {chip}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-border bg-bg/80 backdrop-blur-md">
          <form onSubmit={onSubmit} className="relative w-full flex items-center group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-surface border border-border rounded-[12px] pl-5 pr-14 py-4 text-white font-sans text-[15px] placeholder-grey focus:outline-none focus:border-accent shadow-[0_0_0_4px_transparent] focus:shadow-accent-soft transition-all duration-300"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 w-10 h-10 rounded-full bg-accent text-bg flex items-center justify-center disabled:bg-surface disabled:text-grey disabled:border disabled:border-border transition-colors group-focus-within:bg-accent-hover"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
