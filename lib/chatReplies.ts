export const replies: Record<string, string> = {
  services: `We offer 9 core services:\n\n🔍 SEO Optimization\n📱 Social Media Marketing\n🎯 Google & Meta Ads\n✍️ Content Marketing\n📧 Email Marketing\n💻 Web Design & Development\n🤳 Influencer Marketing\n🧠 Brand Strategy\n🎬 Video Marketing\n\nWant to know more about any specific service?`,

  seo: `Our SEO service includes:\n\n• Full technical SEO audit\n• On-page optimization (titles, meta, structure)\n• Off-page link building\n• Monthly keyword tracking & reporting\n• Competitor gap analysis\n• Content recommendations\n\nMost clients start seeing page-1 rankings in 3–6 months. We'll never promise overnight results — that's not how real SEO works.\n\nStarts at ₹12,000/mo on the Starter plan.`,

  social: `Our social media service covers:\n\n• Platform strategy (Instagram, LinkedIn, Facebook, Twitter)\n• Content calendar & posting\n• Reel/Short-form video creation\n• Community management\n• Monthly analytics & growth reports\n\nStarter plan covers 1 platform (8 posts/mo).\nGrowth plan covers 3 platforms (20 posts/mo).\n\nWant to see pricing details?`,

  ads: `We run Google Ads and Meta (Facebook/Instagram) Ads.\n\n• Campaign setup & structure\n• Ad creative & copy\n• A/B testing\n• Retargeting setup\n• Weekly performance reports\n• Budget optimization\n\nMost clients see positive ROI within 4–8 weeks. We track every rupee to the conversion.\n\nAd spend is separate from our management fee.`,

  pricing: `We have 3 plans:\n\n💼 Starter — ₹12,000/mo\nBest for brands just getting started.\n\n🚀 Growth — ₹28,000/mo (most popular)\nFor brands ready to scale seriously.\n\n👑 Scale — ₹55,000/mo\nFull-service for brands that want to dominate.\n\nAll plans are month-to-month. No contracts. Save 15% on quarterly billing.\n\nWant me to break down what's included in each?`,

  starter: `💼 Starter Plan — ₹12,000/mo:\n\n✓ 1 Social Platform\n✓ Basic On-Page SEO\n✓ 8 Posts/Month\n✓ Monthly Report\n✓ Email Support\n✓ 1 Ad Campaign\n\nBest for: new brands, small budgets, getting initial traction.\n\nNo contract. Cancel anytime with 7 days notice.`,

  growth: `🚀 Growth Plan — ₹28,000/mo:\n\n✓ 3 Social Platforms\n✓ Full SEO (On + Off Page)\n✓ 20 Posts/Month\n✓ Weekly Reports\n✓ Dedicated Account Manager\n✓ 3 Ad Campaigns\n✓ WhatsApp Support\n✓ 1 Landing Page\n✓ Competitor Analysis\n\nOur most popular plan. Best for brands that are ready to invest in real growth.`,

  scale: `👑 Scale Plan — ₹55,000/mo:\n\n✓ All Platforms\n✓ Full SEO + Backlink Strategy\n✓ Unlimited Posts\n✓ Real-Time Dashboard\n✓ Priority WhatsApp Support\n✓ Unlimited Ad Campaigns\n✓ Website Management\n✓ Monthly Strategy Call\n✓ 2 Videos/Month\n✓ Influencer Outreach\n✓ Quarterly Brand Review\n\nFor brands that want a full marketing team without hiring one.`,

  started: `Getting started is simple:\n\n1️⃣ Fill out the contact form (or email us)\n2️⃣ We reply within 24 hours\n3️⃣ Free 30-min strategy call — no sales pitch\n4️⃣ We send a custom proposal\n5️⃣ You approve, we start\n\nNo upfront commitment. No contracts.\n\n📧 hello@ishdev.in\n📞 +91 98100 45231`,

  contract: `No contracts. Ever.\n\nAll our plans are month-to-month. You can cancel with 7 days notice — no penalty, no exit fee, no awkward conversation.\n\nWe believe if we need a contract to keep you, we're not doing our job right.`,

  results: `Typical timelines we share with clients:\n\n📈 SEO: Page-1 rankings in 3–6 months\n💰 Paid Ads: Meaningful ROI in 4–8 weeks\n📱 Social Media: 2–3× engagement in 60 days\n📧 Email: 30–40% open rates within first month\n\nResults vary by industry, competition, and budget. We'll give you honest expectations on our first call.`,

  human: `You can reach our team directly:\n\n📧 hello@ishdev.in\n📞 +91 98100 45231\n💬 WhatsApp: wa.me/919810045231\n\nWe're available Mon–Sat, 10AM–7PM IST.\nUsually reply within a few hours.`,

  location: `We're based in New Delhi, India.\n📍 Connaught Place, New Delhi 110001\n\nWe work with clients across India, UK, UAE, and the US.\nBilling available in INR, USD, GBP, and AED.\n\nMost of our work is done remotely — we use Google Meet, WhatsApp, and email to stay connected.`,

  international: `Yes! We work with international clients.\n\n🇬🇧 UK — FinCore Advisory (London)\n🇦🇪 UAE — NovaSkin Beauty (Dubai)\n🇮🇳 India — Most of our clients\n\nBilling available in USD, GBP, AED, and INR.\nTime zone differences haven't been an issue — we schedule calls that work for both sides.`,

  default: `That's a great question — and I want to make sure you get the right answer.\n\nFor anything specific, our team can help directly:\n\n📧 hello@ishdev.in\n📞 +91 98100 45231\n💬 WhatsApp: wa.me/919810045231\n\nOr try asking me about:\n• Our services\n• Pricing & plans\n• How to get started\n• Expected results\n• Contracts & billing`
};

export function getReply(input: string): string {
  const msg = input.toLowerCase().trim();
  
  // Service queries
  if (msg.includes('service') || msg.includes('offer') || msg.includes('what do you do')) return replies.services;
  if (msg.includes('seo') || msg.includes('search engine') || msg.includes('organic')) return replies.seo;
  if (msg.includes('social media') || msg.includes('instagram') || msg.includes('linkedin') || msg.includes('social')) return replies.social;
  if (msg.includes('ads') || msg.includes('google ads') || msg.includes('meta ads') || msg.includes('ppc') || msg.includes('paid')) return replies.ads;
  
  // Pricing queries
  if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || msg.includes('how much') || msg.includes('plan') || msg.includes('package')) return replies.pricing;
  if (msg.includes('starter') || msg.includes('basic') || msg.includes('cheapest') || msg.includes('12000') || msg.includes('12k')) return replies.starter;
  if (msg.includes('growth') || msg.includes('popular') || msg.includes('28000') || msg.includes('28k')) return replies.growth;
  if (msg.includes('scale') || msg.includes('elite') || msg.includes('premium') || msg.includes('55000') || msg.includes('55k')) return replies.scale;
  
  // Process queries
  if (msg.includes('start') || msg.includes('begin') || msg.includes('how to') || msg.includes('get started') || msg.includes('process') || msg.includes('onboard')) return replies.started;
  if (msg.includes('contract') || msg.includes('lock') || msg.includes('cancel') || msg.includes('commitment') || msg.includes('binding')) return replies.contract;
  if (msg.includes('result') || msg.includes('roi') || msg.includes('return') || msg.includes('how long') || msg.includes('timeline') || msg.includes('expect')) return replies.results;
  
  // Contact queries
  if (msg.includes('human') || msg.includes('person') || msg.includes('talk') || msg.includes('call') || msg.includes('team') || msg.includes('phone') || msg.includes('email') || msg.includes('contact') || msg.includes('whatsapp')) return replies.human;
  if (msg.includes('where') || msg.includes('location') || msg.includes('office') || msg.includes('address') || msg.includes('delhi') || msg.includes('based')) return replies.location;
  if (msg.includes('international') || msg.includes('abroad') || msg.includes('uk') || msg.includes('usa') || msg.includes('uae') || msg.includes('dubai') || msg.includes('london') || msg.includes('outside india')) return replies.international;
  
  // Greetings
  if (msg.match(/^(hi|hey|hello|sup|yo|hola)/)) return `Hey there! 👋 Welcome to Ishdev.\n\nI can help you with info about our services, pricing, or how to get started. What would you like to know?`;
  if (msg.match(/^(thanks|thank you|thx|cheers)/)) return `You're welcome! 🙌 Let me know if you have any other questions.\n\nOr reach our team directly:\n📧 hello@ishdev.in\n💬 WhatsApp: wa.me/919810045231`;
  
  return replies.default;
}
