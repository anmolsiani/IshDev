'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useCart } from '@/components/CartSystem'
import ThreeBackground from '@/components/ThreeBackground'

const SplineModel = dynamic(() => import('@/components/SplineModel'), {
  ssr: false,
})

// ─── DATA ────────────────────────────────────────────────────
const ROTATING_WORDS = [
  'DIGITAL MARKETERS',
  'WEB BUILDERS',
  'BRAND CREATORS',
  'SEO EXPERTS',
  'GROWTH HACKERS',
]

const STATS = [
  { num: '2+',   unit: 'YEARS',    label: 'Years of Experience',   desc: 'Delivering premium digital solutions since 2023' },
  { num: '50+',  unit: 'CLIENTS',  label: 'Happy Clients',         desc: 'Businesses that trusted us and grew with us' },
  { num: '98%',  unit: 'RATE',     label: 'Success Rate',          desc: 'Projects delivered on time, on budget, beyond expectations' },
  { num: '200+', unit: 'PROJECTS', label: 'Projects Delivered',    desc: 'From simple websites to complex full-stack applications' },
  { num: '15+',  unit: 'TEAM',     label: 'Team Members',          desc: 'Skilled professionals dedicated to your success' },
  { num: '24/7', unit: 'ALWAYS',   label: 'Support Available',     desc: 'Always here when you need us, no matter the time' },
]

const FLOATING_TAGS = ['WEB', 'SEO', 'ADS', 'UI', 'SMM', 'BRAND', 'CMS', 'DEV']

const SERVICES_LIST = [
  'Website Design & Development',
  'WordPress Development',
  'Full-Stack Development',
  'Front-End Development',
  'SEO Services',
  'Social Media Marketing',
  'Paid Advertising',
  'Content Marketing',
  'Branding & Design',
]

const SERVICES_DETAIL = [
  {
    icon: '🌐', price: 99,
    title: 'Website Design & Development',
    desc: 'We craft stunning, responsive websites that look great on every device and convert visitors into customers.',
    features: ['Mobile-first responsive design', 'SEO-optimized structure', 'Fast loading under 3 seconds'],
  },
  {
    icon: '⚙️', price: 79,
    title: 'WordPress Development',
    desc: 'Custom WordPress websites with themes, plugins, and WooCommerce stores built for performance.',
    features: ['Custom theme development', 'Plugin customization', 'WooCommerce integration'],
  },
  {
    icon: '💻', price: 599,
    title: 'Full-Stack Development',
    desc: 'Complete web applications built with MERN stack, APIs, and databases for any business need.',
    features: ['MERN stack applications', 'REST & GraphQL APIs', 'Database design & optimization'],
  },
  {
    icon: '🖥️', price: 149,
    title: 'Front-End Development',
    desc: 'Pixel-perfect interfaces with smooth animations and an exceptional user experience.',
    features: ['React & Next.js expertise', 'GSAP & Three.js animations', 'Performance optimization'],
  },
  {
    icon: '🔍', price: 79,
    title: 'SEO Services',
    desc: 'Data-driven SEO strategies that get you ranking higher and drive organic traffic that converts.',
    features: ['Complete SEO audit', 'Keyword research & strategy', 'Link building campaigns'],
  },
  {
    icon: '📱', price: 99,
    title: 'Social Media Marketing',
    desc: 'Build your brand presence across all social platforms with content that engages and converts.',
    features: ['Platform strategy & setup', 'Content creation & scheduling', 'Community management'],
  },
  {
    icon: '🎯', price: 149,
    title: 'Paid Advertising',
    desc: 'Smart Google Ads and Meta campaigns that maximize your ROI and reach the right audience.',
    features: ['Google Ads management', 'Meta & Instagram ads', 'A/B testing & optimization'],
  },
  {
    icon: '✍️', price: 129,
    title: 'Content Marketing',
    desc: 'Engaging content strategies that attract, educate, and convert your target audience.',
    features: ['Blog & article writing', 'Email marketing campaigns', 'Video script creation'],
  },
  {
    icon: '🎨', price: 149,
    title: 'Branding & Design',
    desc: 'Complete brand identity that tells your story, builds trust, and leaves lasting impressions.',
    features: ['Logo & brand identity', 'Marketing materials design', 'UI/UX design systems'],
  },
]

const REVIEWS = [
  { initials: 'RS', name: 'Rahul Sharma',  role: 'CEO at TechVista',           text: '"ISHDEV transformed our online presence. The website is stunning and our sales doubled in 3 months!"' },
  { initials: 'PM', name: 'Priya Mehta',   role: 'Founder of StyleHub',        text: '"Best digital marketing agency in Delhi. Their SEO work got us to #1 on Google!"' },
  { initials: 'AK', name: 'Amit Kumar',    role: 'Owner of FoodieBay',         text: '"Professional, creative, and always on time. Highly recommend ISHDEV for any digital project."' },
  { initials: 'SG', name: 'Sneha Gupta',   role: 'Director at EduTech Solutions', text: '"The team understood our vision and delivered beyond expectations. Outstanding work!"' },
  { initials: 'VS', name: 'Vikram Singh',  role: 'MD of GreenLeaf Organic',    text: '"From branding to website development, ISHDEV nailed everything. Worth every penny!"' },
  { initials: 'NV', name: 'Neha Verma',    role: 'CMO at FashionForward',      text: '"Their social media strategies brought us 10K+ followers in just 2 months. Amazing!"' },
  { initials: 'RK', name: 'Rohan Kapoor', role: 'Founder of QuickServe',      text: '"ISHDEV\'s team is responsive, skilled, and dedicated. They\'re our go-to agency now."' },
  { initials: 'KJ', name: 'Kavita Jain',   role: 'Owner of HomeDeco',          text: '"Outstanding web development. Our bounce rate dropped by 60% after the redesign!"' },
  { initials: 'AR', name: 'Arjun Reddy',   role: 'CEO of FitZone Gym',         text: '"Professional service from start to finish. ISHDEV knows how to grow businesses online."' },
  { initials: 'SK', name: 'Simran Kaur',   role: 'Founder of BeautyBloom',     text: '"Creative, reliable, and results-driven. ISHDEV is the real deal in digital marketing!"' },
]

// ─── Main Component ──────────────────────────────────────────
export default function HomePage() {
  const { addItem } = useCart()

  const [wordIndex,    setWordIndex]    = useState(0)
  const [wordVisible,  setWordVisible]  = useState(true)
  const [activeService, setActiveService] = useState(0)
  const [hero5Played,  setHero5Played]  = useState(false)
  const [quoteVisible, setQuoteVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  // Refs
  const hero5Ref   = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const hero7Ref   = useRef<HTMLDivElement>(null)

  // ── Word rotator ──
  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length)
        setWordVisible(true)
      }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  // ── IntersectionObserver for sections ──
  useEffect(() => {
    // Stats reveal
    const statsObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.2 }
    )
    if (statsRef.current) statsObserver.observe(statsRef.current)

    // Hero 5 goodbye
    const h5Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hero5Played) {
          setHero5Played(true)
          setTimeout(() => setQuoteVisible(true), 1200)
        }
      },
      { threshold: 0.3 }
    )
    if (hero5Ref.current) h5Observer.observe(hero5Ref.current)

    return () => { statsObserver.disconnect(); h5Observer.disconnect() }
  }, [hero5Played])

  return (
    <main>

      {/* ═══════════════════════════════════════
          HERO 1 — MAIN HERO WITH SPLINE
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center justify-end pb-[8vh]">

        {/* Spline 3D Model — Full Screen */}
        <div className="absolute inset-0 z-10">
          <SplineModel />
        </div>

        {/* Energy beam from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 
                        pointer-events-none w-1 h-[42vh]">
          <div className="relative w-full h-full flex justify-center">
            <div className="energy-beam-core absolute inset-0" />
            <div className="energy-beam-glow absolute -left-2.5" />
            {/* Beam particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  left: `${Math.random() * 20 - 10}px`,
                  top: `${(i / 8) * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animation: `beamPulse ${1.5 + Math.random()}s ease-in-out infinite ${Math.random()}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Circular SVG text ring */}
        <div className="circular-ring-rotate absolute pointer-events-none z-20"
             style={{
               width: 'min(400px, 85vw)',
               height: 'min(400px, 85vw)',
               left: '50%',
               bottom: '12%',
               transform: 'translateX(-50%)',
             }}>
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#ff0000" />
                <stop offset="17%"  stopColor="#ff7700" />
                <stop offset="33%"  stopColor="#ffff00" />
                <stop offset="50%"  stopColor="#00ff00" />
                <stop offset="67%"  stopColor="#0077ff" />
                <stop offset="83%"  stopColor="#8800ff" />
                <stop offset="100%" stopColor="#ff0000" />
              </linearGradient>
              <path id="circlePath"
                d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
            </defs>
            <text style={{ fontFamily: 'VT323, monospace', fontSize: 13, letterSpacing: 2 }}>
              <textPath href="#circlePath" startOffset="0%" fill="url(#rainbowGrad)">
                ✦ DIGITAL MARKETING ✦ WEB DEVELOPMENT ✦ BRANDING ✦ SEO EXPERTS ✦ CREATIVE AGENCY ✦ INNOVATIVE SOLUTIONS ✦
              </textPath>
            </text>
          </svg>
        </div>

        {/* Floating tags around model */}
        <div className="absolute pointer-events-none z-20"
             style={{ width: 380, height: 380, left: '50%', bottom: '14%', transform: 'translateX(-50%)' }}>
          {FLOATING_TAGS.map((tag, i) => {
            const angle  = (i / FLOATING_TAGS.length) * Math.PI * 2
            const radius = 170
            const x = 190 + Math.cos(angle) * radius - 26
            const y = 190 + Math.sin(angle) * radius - 26
            return (
              <div
                key={tag}
                className="absolute w-[52px] h-[52px] rounded-xl
                           bg-white/25 backdrop-blur-md border border-white/40
                           flex items-center justify-center
                           shadow-lg text-black font-dot text-xs tracking-wider"
                style={{
                  left: x,
                  top: y,
                  animation: `floatBob 4s ease-in-out infinite ${i * 0.25}s`,
                }}
              >
                {tag}
              </div>
            )
          })}
        </div>

        {/* Hero 1 text content */}
        <div className="relative z-30 text-center max-w-2xl px-6 
                        animate-[fadeSlideUp_1.2s_cubic-bezier(0.34,1.56,0.64,1)_0.8s_both]">

          <p className="font-dot text-xs tracking-[4px] text-black/40 mb-5">
            ✦ DELHI BASED DIGITAL AGENCY ✦
          </p>

          {/* Word rotator */}
          <div className="flex flex-col items-center gap-1 mb-5">
            <span className="font-poppins text-lg text-black/50">We Are</span>
            <div className="h-[60px] flex items-center justify-center overflow-hidden">
              <span
                className="font-oxanium font-black text-black"
                style={{
                  fontSize: 'clamp(26px, 6vw, 52px)',
                  letterSpacing: '-1px',
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? 'translateY(0)' : 'translateY(-40px)',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  background: 'linear-gradient(135deg, #000 0%, #e63946 60%, #000 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </div>
          </div>

          <p className="font-poppins text-base text-black/60 leading-relaxed mb-8">
            Premium digital solutions that drive real results.<br />
            Welcome to ISHDEV — Your Growth Partner.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3 rounded-full font-oxanium text-sm font-semibold
                         tracking-wider bg-red-500/10 border-2 border-red-500 text-red-500
                         hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/30
                         hover:-translate-y-1 hover:scale-[1.03]
                         transition-all duration-300"
            >
              Explore Our Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3 rounded-full font-oxanium text-sm font-semibold
                         tracking-wider bg-black/6 border-2 border-black/20 text-black
                         hover:bg-black/12 hover:-translate-y-1 hover:scale-[1.03]
                         transition-all duration-300"
            >
              Book Free Call
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30
                        flex flex-col items-center gap-2
                        text-black/40 font-dot text-xs tracking-[3px]
                        animate-[fadeIn_1s_2s_both]">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" />
          SCROLL
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO 2 — STATS / CASE STUDY
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <ThreeBackground type="particles" />

        <div className="relative z-10 w-full max-w-5xl px-6 py-24" ref={statsRef}>

          {/* Model area indicator */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-28 h-28 rounded-full border-2 border-cyan-500/40 
                            flex items-center justify-center mb-4
                            animate-[ringGlow_2s_ease-in-out_infinite]">
              <span className="font-dot text-cyan-400/70 text-sm tracking-[3px]">
                ✦ AI ✦
              </span>
            </div>
          </div>

          <div className="text-center mb-14">
            <h2
              className="font-oxanium font-black text-white glitch-text"
              data-text="OUR IMPACT"
              style={{ fontSize: 'clamp(36px, 8vw, 80px)' }}
            >
              OUR <span className="text-red-500">IMPACT</span>
            </h2>
            <p className="font-poppins text-white/50 text-lg mt-3">
              Numbers that speak louder than words
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="p-8 rounded-2xl border border-white/8 bg-white/3
                           text-center relative overflow-hidden group"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s`,
                }}
              >
                {/* Rainbow top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg,#ff0000,#ff7700,#ffff00,#00ff00,#0077ff,#8800ff)',
                    backgroundSize: '200% auto',
                    animation: 'rainbowShift 4s linear infinite',
                    transform: statsVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 0.8s ease ${i * 0.12 + 0.2}s`,
                  }}
                />

                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span
                    className="stat-num-rainbow"
                    style={{ fontSize: 'clamp(36px, 7vw, 68px)' }}
                  >
                    {stat.num}
                  </span>
                  <span className="font-dot text-white/40 text-sm tracking-widest">
                    {stat.unit}
                  </span>
                </div>

                <p className="font-poppins text-white font-semibold text-base mb-2">
                  {stat.label}
                </p>
                <p className="font-poppins text-white/40 text-sm leading-relaxed mb-4">
                  {stat.desc}
                </p>

                <div
                  className="h-0.5 rounded-full opacity-40"
                  style={{
                    background: 'linear-gradient(90deg,#ff0000,#ff7700,#ffff00,#00ff00,#0077ff,#8800ff)',
                    backgroundSize: '200% auto',
                    animation: 'rainbowShift 4s linear infinite',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Water reflection text */}
          <div className="text-center mt-16 overflow-hidden h-20">
            <span
              className="stat-num-rainbow water-wave font-oxanium font-black"
              style={{ fontSize: 64 }}
            >
              ISHDEV
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO 3 — WHAT WE BUILD
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-white py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="section-tag">✦ OUR WORK ✦</p>
            <h2
              className="font-oxanium font-black text-black mt-3"
              style={{ fontSize: 'clamp(28px, 5.5vw, 64px)' }}
            >
              What We <span className="text-red-500">Build</span>
            </h2>
            <p className="font-poppins text-black/55 text-lg mt-3">
              From ideas to digital reality — we build it all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DETAIL.slice(0, 6).map((svc, i) => (
              <ServiceTile
                key={svc.title}
                svc={svc}
                index={i}
                onAddCart={() => addItem(svc.title, svc.price)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO 4 — SERVICES DETAIL
      ═══════════════════════════════════════ */}
      <section id="services" className="relative min-h-screen bg-black overflow-hidden">
        <div className="flex min-h-screen">

          {/* Left — Active service detail */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-24
                          sticky top-0 h-screen">
            <p className="section-tag section-tag-white mb-6">✦ OUR SERVICES ✦</p>

            {SERVICES_DETAIL.map((svc, i) => (
              <div
                key={svc.title}
                className={`transition-all duration-500 ${
                  i === activeService ? 'block' : 'hidden'
                }`}
                style={{
                  opacity: i === activeService ? 1 : 0,
                  animation: i === activeService
                    ? 'svcFadeIn 0.5s ease forwards' : 'none',
                }}
              >
                <span className="text-5xl block mb-5">{svc.icon}</span>
                <h3
                  className="font-oxanium font-black text-white mb-4"
                  style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}
                >
                  {svc.title}
                </h3>
                <p className="font-poppins text-white/65 leading-relaxed mb-6 text-base">
                  {svc.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {svc.features.map(f => (
                    <li
                      key={f}
                      className="font-poppins text-white/75 text-sm py-2
                                 border-b border-white/8 flex gap-3 items-center"
                    >
                      <span className="text-red-500">✦</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="font-oxanium text-white/70 text-lg mb-6">
                  From <span className="text-red-500 text-4xl font-black">${svc.price}</span>
                </div>
                <button
                  onClick={() => addItem(svc.title, svc.price)}
                  className="px-8 py-4 rounded-full font-oxanium text-sm font-semibold
                             tracking-wider bg-red-500/10 border-2 border-red-500 text-red-500
                             hover:bg-red-500/25 hover:shadow-xl hover:shadow-red-500/25
                             hover:-translate-y-1 transition-all duration-300"
                >
                  🛒 Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Right — Half circle with service list */}
          <div className="hidden lg:flex items-center justify-end">
            <div className="half-circle">
              <div className="svc-list w-full pr-8">
                {SERVICES_LIST.map((name, i) => (
                  <div
                    key={name}
                    className={`svc-item ${i === activeService ? 'active' : ''}`}
                    onClick={() => setActiveService(i)}
                  >
                    <span className="font-dot text-red-500 text-xs tracking-widest min-w-[28px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-oxanium text-white text-sm">{name}</span>
                    <span
                      className="ml-auto text-red-500 text-sm"
                      style={{ opacity: i === activeService ? 1 : 0 }}
                    >
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO 5 — GOODBYE + QUOTE
      ═══════════════════════════════════════ */}
      <section
        ref={hero5Ref}
        className="relative min-h-screen bg-black flex items-center 
                   justify-center overflow-hidden"
      >
        <ThreeBackground type="particles" />
        <canvas id="particleCanvas" className="particle-canvas" />

        {/* Goodbye model area */}
        {!quoteVisible && (
          <div
            className="relative z-10 flex flex-col items-center gap-6"
            style={{
              animation: hero5Played
                ? 'goodbyeDash 0.25s ease-in 0.8s forwards'
                : 'none',
            }}
          >
            <div
              className="text-8xl"
              style={{
                animation: hero5Played
                  ? 'waveHand 0.4s ease-in-out 0.1s 3, scalePopup 0.4s ease 0s 1'
                  : 'none',
              }}
            >
              👋
            </div>
            <p className="font-dot text-white/40 text-sm tracking-[4px]">
              ✦ SEE YOU ON THE OTHER SIDE ✦
            </p>
          </div>
        )}

        {/* Quote */}
        <div
          className="relative z-10 text-center px-6 max-w-4xl flex flex-col 
                     items-center gap-5"
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 1s cubic-bezier(0.34,1.56,0.64,1)',
            display: quoteVisible ? 'flex' : 'none',
          }}
        >
          <span className="font-dot text-red-500 text-xl tracking-[8px]">✦ ✦ ✦</span>
          <h1
            className="font-oxanium font-black text-white glitch-text"
            data-text="We Built The Firm No One Can Ignore"
            style={{ fontSize: 'clamp(26px, 5.5vw, 68px)', lineHeight: 1.2 }}
          >
            We Built The Firm<br />
            <span className="text-red-500">No One Can Ignore</span>
          </h1>
          <p className="font-poppins text-white/55 text-lg leading-relaxed">
            Every project we touch becomes a statement.<br />
            Every brand we build becomes a benchmark.
          </p>
          <p className="font-oxanium text-white/35 text-sm tracking-[3px]">
            — ISHDEV, Delhi
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-2 px-8 py-4 rounded-full font-oxanium text-sm font-semibold
                       tracking-wider bg-red-500/10 border-2 border-red-500 text-red-500
                       hover:bg-red-500/20 hover:-translate-y-1 transition-all duration-300"
          >
            Let's Build Something →
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO 6 — INFINITE REVIEWS
      ═══════════════════════════════════════ */}
      <section className="relative bg-white py-28 overflow-hidden">
        <div className="text-center mb-16 px-6">
          <p className="section-tag">✦ TESTIMONIALS ✦</p>
          <h2
            className="font-oxanium font-black text-black mt-3"
            style={{ fontSize: 'clamp(26px, 5vw, 56px)' }}
          >
            What Our <span className="text-red-500">Clients Say</span>
          </h2>
          <p className="font-poppins text-black/50 mt-3 text-lg">
            Real results. Real people. Real growth.
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="reviews-mask overflow-hidden py-4 mb-5">
          <div className="flex gap-5 track-scroll-left" style={{ width: 'max-content' }}>
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <ReviewCard key={`r1-${i}`} review={r} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="reviews-mask overflow-hidden py-4">
          <div className="flex gap-5 track-scroll-right" style={{ width: 'max-content' }}>
            {[...REVIEWS.slice(5), ...REVIEWS.slice(5)].map((r, i) => (
              <ReviewCard key={`r2-${i}`} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO 7 — BOOK A CALL / CTA
      ═══════════════════════════════════════ */}
      <section
        id="contact"
        ref={hero7Ref}
        className="relative min-h-screen bg-black flex items-center 
                   justify-center overflow-hidden"
      >
        <ThreeBackground type="network" />

        {/* Mesh gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
               style={{
                 background: `
                   radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.12) 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 50%, rgba(0,100,255,0.08) 0%, transparent 60%)
                 `,
                 animation: 'meshShift 8s ease-in-out infinite alternate',
               }} />
        </div>

        {/* Wave emoji model */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10
                        flex flex-col items-center pb-8"
             style={{ animation: 'modelRise 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.5s both' }}>
          <div style={{ animation: 'floatUpDown 3s ease-in-out 2s infinite', fontSize: 72 }}>
            👋
          </div>
          <div className="w-40 h-8 rounded-full mt-2"
               style={{
                 background: 'rgba(230,57,70,0.25)',
                 filter: 'blur(12px)',
                 animation: 'glowPulse 2s ease-in-out infinite',
               }} />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-3xl pb-48">
          <p className="section-tag section-tag-white mb-5">✦ LET'S TALK ✦</p>

          <h1
            className="font-oxanium font-black text-white mb-6"
            style={{ fontSize: 'clamp(26px, 5vw, 60px)', lineHeight: 1.2 }}
          >
            Hi! Let's Cook Something<br />
            <span className="text-red-500">Good Together 🔥</span>
          </h1>

          <p className="font-poppins text-white/60 text-lg leading-relaxed mb-10">
            Book a free 30-minute consultation call and let's discuss<br />
            your next big project. No commitments, just possibilities.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-6">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 rounded-full font-oxanium text-sm font-semibold
                         tracking-wider bg-red-500/10 border-2 border-red-500 text-red-500
                         hover:bg-red-500/20 hover:shadow-xl hover:shadow-red-500/25
                         hover:-translate-y-1 transition-all duration-300"
            >
              📅 Book a 30 Min Call
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 rounded-full font-oxanium text-sm font-semibold
                         tracking-wider bg-white/10 border-2 border-white/40 text-white
                         hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              💬 WhatsApp Us Now
            </a>
          </div>

          <p className="font-dot text-white/25 text-sm tracking-[3px]">
            ✦ FREE CONSULTATION • NO CREDIT CARD • 24HR RESPONSE ✦
          </p>
        </div>
      </section>

    </main>
  )
}

// ─── Sub Components ──────────────────────────────────────────
function ServiceTile({
  svc, index, onAddCart,
}: {
  svc: typeof SERVICES_DETAIL[0]
  index: number
  onAddCart: () => void
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group p-8 rounded-2xl border border-black/8 bg-black/2
                 cursor-pointer relative overflow-hidden
                 hover:-translate-y-2 hover:scale-[1.02]
                 hover:shadow-2xl hover:border-red-500
                 transition-all duration-400"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0)'
          : `translateX(${index % 2 === 0 ? '-60px' : '60px'})`,
        transition: `all 0.7s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.12}s`,
      }}
    >
      <span className="font-dot text-red-500/70 text-xs tracking-[3px] block mb-3">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-4xl block mb-4">{svc.icon}</span>
      <h3 className="font-oxanium font-bold text-black text-lg mb-3">{svc.title}</h3>
      <p className="font-poppins text-black/60 text-sm leading-relaxed mb-4">{svc.desc}</p>
      <span className="inline-block bg-red-500/8 text-red-500 font-dot text-xs
                       tracking-widest px-3 py-1 rounded-full mb-4">
        FROM ${svc.price}
      </span>
      <button
        onClick={onAddCart}
        className="w-full py-2.5 rounded-xl font-oxanium text-xs font-semibold
                   tracking-wider border border-red-500/40 bg-red-500/5 text-red-500
                   opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                   hover:bg-red-500/15 transition-all duration-300"
      >
        Add to Cart +
      </button>
    </div>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div
      className="w-[320px] flex-shrink-0 p-7 rounded-2xl
                 bg-white/70 backdrop-blur-xl border border-white/50
                 shadow-lg hover:-translate-y-1 hover:shadow-xl
                 transition-all duration-300 cursor-default"
    >
      <div className="text-yellow-400 font-oxanium text-base tracking-widest mb-4">
        ★★★★★
      </div>
      <p className="font-poppins text-gray-700 text-sm leading-relaxed mb-5">
        {review.text}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black to-red-500
                        flex items-center justify-center text-white font-oxanium text-xs font-bold">
          {review.initials}
        </div>
        <div>
          <p className="font-oxanium text-black text-sm font-semibold">{review.name}</p>
          <p className="font-poppins text-gray-500 text-xs">{review.role}</p>
        </div>
      </div>
    </div>
  )
}
