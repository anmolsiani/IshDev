'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CartButton } from './CartSystem';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 rounded-full border group/nav hover:bg-white/60 hover:border-black/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.03)] ${
          scrolled || mobileMenuOpen
            ? 'w-[95%] md:w-[80vw] max-w-[1100px] h-[64px] bg-white/40 backdrop-blur-3xl border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.05)]'
            : 'w-[95%] md:w-[85vw] max-w-[1200px] h-[72px] bg-white/10 backdrop-blur-[12px] border-black/5 shadow-sm'
        }`}
      >
        <div className="w-full h-full px-8 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative group z-[60]">
            <span className="font-oxanium font-black text-[20px] tracking-[4px] uppercase">
              ISHDEV<span className="text-highlight">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-2 items-center h-full">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-heading font-black text-[13px] tracking-[1.5px] uppercase relative px-5 py-2.5 rounded-full transition-all duration-300 ${
                    isActive ? 'text-black' : 'text-black/40 hover:text-black'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-black/[0.05] border border-black/5 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    />
                  )}
                  <motion.span 
                    className="relative z-10 block"
                    whileHover={{ scale: 1.4, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Ask AI Pill & Mobile Toggle */}
          <div className="flex items-center gap-4 z-[60]">
            <CartButton />
            <Link
              href="/chat"
              className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full glass-shiny text-black text-[12px] uppercase tracking-widest font-mono hover:scale-105 transition-all duration-300"
            >
              Ask AI ⚡
            </Link>
            <button
              className="md:hidden flex flex-col justify-center items-end gap-[6px] w-[32px] h-[32px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={`block h-[2px] bg-black transition-all duration-300 ${
                  mobileMenuOpen ? 'w-full rotate-45 translate-y-[8px]' : 'w-full'
                }`}
              />
              <span
                className={`block h-[2px] bg-black transition-all duration-300 ${
                  mobileMenuOpen ? 'w-0 opacity-0' : 'w-[80%]'
                }`}
              />
              <span
                className={`block h-[2px] bg-black transition-all duration-300 ${
                  mobileMenuOpen ? 'w-full -rotate-45 -translate-y-[8px]' : 'w-full'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-bg min-h-screen flex flex-col pt-32 px-6 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-heading font-extrabold text-[36px] uppercase ${
                      pathname === link.href ? 'text-highlight' : 'text-black'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="mt-6"
              >
                  <Link
                    href="/chat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-full glass-shiny text-black font-sans font-medium"
                  >
                    Ask AI
                  </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-16"
            >
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-highlight hover:border-highlight hover:text-white transition-colors">IN</a>
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-highlight hover:border-highlight hover:text-white transition-colors">LI</a>
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-highlight hover:border-highlight hover:text-white transition-colors">X</a>
              </div>
              <p className="mt-6 text-grey text-sm">hello@ishdev.in</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
