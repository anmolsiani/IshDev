'use client';
 
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white/20 backdrop-blur-3xl border-t border-black/5 pt-24 pb-12 px-6 lg:px-12 relative z-50 overflow-hidden glass-shiny">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-highlight/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 md:gap-12 justify-between relative z-10">
          
          {/* Left Column: Brand Monolith */}
          <div className="flex flex-col md:w-[40%]">
            <Link href="/" className="inline-block group mb-8">
              <span className="font-oxanium font-black text-[32px] uppercase tracking-[6px] text-black transition-all duration-500 hover:tracking-[10px]">
                ISHDEV<span className="text-highlight">.</span>
              </span>
            </Link>
            <p className="font-sans italic text-black text-[22px] leading-tight mb-6 max-w-[300px]">
              Growth is not an option. It's the standard.
            </p>
            <p className="font-mono text-[11px] text-grey leading-relaxed max-w-[320px] mb-10 uppercase tracking-widest opacity-60">
              New Delhi // PERFORMANCE & Innovation Group. No long-term contracts. Pure data-led scale.
            </p>
            
            <div className="flex gap-4">
              {['IG', 'IN', 'TW'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-[11px] font-mono font-bold hover:bg-black hover:text-white hover:scale-125 transition-all duration-500 backdrop-blur-sm group"
                >
                  <span className="group-hover:rotate-[360deg] transition-transform duration-700">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Center Column: Navigation */}
          <div className="flex flex-col md:w-[25%] pt-4">
            <h4 className="font-mono uppercase text-[10px] text-black/40 mb-10 tracking-[0.5em]">
              Directory
            </h4>
            <nav className="flex flex-col gap-5">
              {['Home', 'About', 'Services', 'Case Studies', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                  className="font-oxanium font-bold text-black/60 text-[14px] uppercase tracking-widest hover:text-black transition-all duration-300 flex items-center group w-fit"
                >
                  {item}
                  <div className="w-0 h-[1px] bg-highlight ml-0 group-hover:w-8 group-hover:ml-4 transition-all duration-500" />
                </Link>
              ))}
              <Link
                href="/chat"
                className="mt-6 px-6 py-2.5 rounded-full bg-black text-white text-[11px] font-mono tracking-widest uppercase flex items-center justify-center w-fit hover:scale-110 active:scale-95 transition-all duration-300"
              >
                Ask AI ⚡
              </Link>
            </nav>
          </div>

          {/* Right Column: Connection */}
          <div className="flex flex-col md:w-[35%] pt-4">
            <h4 className="font-mono uppercase text-[10px] text-black/40 mb-10 tracking-[0.5em]">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-8 font-sans">
              <a href="mailto:ish..kumar.personal@gmail.com" className="text-black text-[18px] lg:text-[22px] font-oxanium font-bold hover:text-highlight transition-colors block leading-none">
                ish..kumar.personal@gmail.com
              </a>
              <a href="tel:+919467534977" className="text-black text-[24px] lg:text-[32px] font-oxanium font-black leading-none hover:tracking-widest transition-all">
                +91 94675 34977
              </a>
              
              <div className="flex flex-col gap-2 mt-4">
                <p className="font-mono text-[11px] text-grey uppercase tracking-widest">Connaught Place, New Delhi</p>
                <p className="font-mono text-[11px] text-highlight uppercase tracking-[4px]">Mon–Sat // 10AM–7PM IST</p>
              </div>

              <a
                href="https://wa.me/919467534977"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 mt-4 rounded-full bg-black text-white font-mono text-[11px] tracking-widest uppercase hover:scale-110 active:scale-95 transition-all duration-500 w-fit glass-shiny"
              >
                💬 WhatsApp Reach
              </a>
            </div>
          </div>
      </div>

      {/* Final Copyright */}
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
        <p className="font-mono text-[9px] uppercase tracking-[4px] text-black/30">© 2026 Ishdev // Precision. Performance. Scale.</p>
        <p className="font-mono text-[9px] uppercase tracking-[4px] text-black/30">Crafted for Excellence in Bharat 🇮🇳</p>
      </div>
    </footer>
  );
}
