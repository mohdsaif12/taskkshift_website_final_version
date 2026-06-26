// ─────────────────────────────────────────────────────────────────────────────
// src/lib/content.ts — Single source of truth for all copy & data
// Components import from here. No inline string literals in components.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Nav ─────────────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faq" },
] as const;

export const navCTA = { label: "Get in Touch", href: "#contact" };

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "— AI Automation Agency",
  // Single headline block — rendered as one h1 with accent span inside
  headlinePlain: "Smarter automation for the businesses that ",
  headlineAccent: "keep your town running",
  headlineLines: [
    "Smarter automation for the businesses that keep your town running.",
  ],
  subline:
    "TaskShift AI builds voice agents, WhatsApp automations and custom tools that catch every lead and handle the busywork — 24/7, so you can focus on the work that matters.",
  note: "Built for local businesses, ",
  noteAccent: "end to end",
  cta: { label: "Request a free audit", href: "#contact" },
  scrollBadge: "SCROLL · TO · EXPLORE ·",
};

// ─── Focus / What Sets Us Apart ───────────────────────────────────────────────
export const focus = {
  eyebrow: "— Our Focus",
  headline: "What sets us apart.",
  lead: "We don't sell software and disappear. We build, integrate and tune the automations that take real work off your plate.",
  note: "Local-first, results-obsessed, always-on.",
  cards: [
    {
      color: "#D6E3C6" as const,
      offsetPx: 80,
      title: "Local-first",
      body: "Built for the realities of clinics, trades and storefronts — not bloated enterprise software.",
    },
    {
      color: "#AFC4F2" as const,
      offsetPx: 40,
      title: "Done for you",
      body: "Strategy, build, integration and ongoing tuning — fully handled, no technical work on your side.",
    },
    {
      color: "#CDBDF2" as const,
      offsetPx: 0,
      title: "Always-on",
      body: "Your automations answer, reply and book around the clock, so no lead ever slips through.",
    },
  ],
};

// ─── Services ─────────────────────────────────────────────────────────────────
export const services = {
  eyebrow: "— Our Services",
  headlinePlain: "What We ",
  headlineAccent: "Offer!",
  lead: "From the first ringing phone to the website that closes the deal — we automate the full journey.",
  link: { label: "Contact Us", href: "#contact" },
  bands: [
    {
      num: "01",
      color: "#D6E3C6" as const,
      title: "Voice Automation",
      body: "AI phone agents that answer instantly, qualify callers and book jobs straight into your calendar — in a natural, human voice that never takes a day off.",
    },
    {
      num: "02",
      color: "#AFC4F2" as const,
      title: "WhatsApp Automation",
      body: "Instant replies, smart follow-ups and bookings on the channel your customers already use — responding in under 30 seconds, every time.",
    },
    {
      num: "03",
      color: "#CDBDF2" as const,
      title: "Custom Automations",
      body: "We connect your tools and kill the repetitive admin — CRM sync, invoicing, reminders and lead routing all running quietly in the background.",
    },
    {
      num: "04",
      color: "#F7E7A8" as const,
      title: "Apps & Websites",
      body: "Custom-built, conversion-first sites and apps — fast, modern and on-brand, with automation baked in from day one.",
    },
  ],
};

// ─── Work / Selected Work ────────────────────────────────────────────────────
export const work = {
  eyebrow: "— Our Work",
  headlinePlain: "Check Out\nOur ",
  headlineAccent: "Wins!",
  lead: "A look at the automations we've shipped for local businesses — and what they changed.",
  link: { label: "Learn More", href: "#contact" },
  projects: [
    {
      metric: "+38%",
      industry: "Dental clinic",
      body: "A 24/7 voice agent caught every after-hours call and pushed booked appointments up 38%.",
    },
    {
      metric: "0",
      industry: "Home services",
      body: "Zero missed calls in 90 days — every enquiry answered, qualified and routed automatically.",
    },
    {
      metric: "11h",
      industry: "Salon & spa",
      body: "Eleven hours a week saved on admin once WhatsApp bookings and reminders went automatic.",
    },
  ],
};

// ─── Tools / Powered By ───────────────────────────────────────────────────────
export const tools = {
  label: "The tools that power our automations",
  items: [
    "VAPI",
    "LiveKit",
    "n8n",
    "Supabase",
    "OpenAI",
    "ElevenLabs",
    "Deepgram",
    "Sarvam AI",
    "Next.js",
    "Vercel",
    "Flutter",
    "WhatsApp Business API",
  ],
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = {
  eyebrow: "— By The Numbers",
  headline: "Built for measurable impact.",
  honestLine: "Early-stage studio. Selective client list. Founder-led builds.",
  items: [
    {
      value: "24/7",
      label: "Always-on operations",
      countable: false,
    },
    {
      value: 7,
      suffix: " Days",
      label: "Average time to deploy",
      countable: true,
    },
    {
      value: 100,
      suffix: "%",
      label: "Custom-built systems",
      countable: true,
    },
    {
      value: 3,
      label: "Languages supported (EN · HI · AR)",
      countable: true,
    },
  ],
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faq = {
  eyebrow: "— FAQs",
  headline: "Questions, answered.",
  items: [
    {
      question: "How long until I'm up and running?",
      answer:
        "Most voice and WhatsApp automations go live within 1–2 weeks. Custom builds depend on scope, but we'll give you a clear timeline on the first call.",
    },
    {
      question: "Will the AI sound robotic to my customers?",
      answer:
        "No. We use natural, human-sounding voices and train each agent on your business, tone and FAQs so callers get a smooth, on-brand experience.",
    },
    {
      question: "Does it work with the tools I already use?",
      answer:
        "Yes. We integrate with most calendars, CRMs and booking systems. If you use something unusual, we'll confirm compatibility during the audit.",
    },
    {
      question: "Do I need any technical knowledge?",
      answer:
        "None at all. We handle strategy, build, integration and ongoing tuning end to end. You just watch the leads and bookings come in.",
    },
    {
      question: "What if it doesn't work for my business?",
      answer:
        "We start with a free audit so we only build what makes sense. Plans are month-to-month and you can cancel anytime — no long lock-ins.",
    },
  ],
};

// ─── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  eyebrow: "— Book A Call",
  headline: "Book your ",
  headlineAccent: "free audit!",
  lead: "30 minutes, no pitch. We map where you're losing leads and time, then show you exactly what we'd automate first.",
  cta: { label: "Request a Consultation", href: "mailto:hello@taskkshiftai.com" },
  // background: #F7E7A8 (yellow) — from style.css .contact-section
  tags: [
    { text: "Dental",   style: "top:36px; left:6%;",    bg: "var(--blue)",     color: "#fff",    rotate: -4, delay: 0   },
    { text: "Plumbing", style: "top:120px; right:8%;",  bg: "#CDBDF2",         color: "#1a1a1a", rotate:  5, delay: 0.5 },
    { text: "Salons",   style: "bottom:90px; left:10%;",bg: "#fff",            color: "#1a1a1a", rotate:  3, delay: 1   },
    { text: "Auto",     style: "bottom:60px; right:12%;",bg: "#AFC4F2",        color: "#1a1a1a", rotate: -5, delay: 1.5 },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footer = {
  bigLink: { href: "#contact", word1: "Let's ", word2: "talk", word3: "." },
  connectLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Email", href: "mailto:hello@taskkshiftai.com" },
  ],
  bottomLeft: "© 2025 TaskShift AI · All rights reserved",
  bottomRight: "Lucknow, India · Dubai, UAE",
};
