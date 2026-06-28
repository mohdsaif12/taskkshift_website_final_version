// ─────────────────────────────────────────────────────────────────────────────
// src/lib/content.ts — Single source of truth for all copy & data
// Components import from here. No inline string literals in components.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Nav ─────────────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "FAQs", href: "#faq" },
] as const;

export const navCTA = { label: "Book a free audit", href: "#contact" };

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "— AI Automation for Local Businesses",
  // Single headline block — rendered as one h1 with accent span inside
  headlinePlain: "Stop losing leads to a phone that ",
  headlineAccent: "doesn't get answered.",
  subline:
    "AI voice agents and WhatsApp automation that catch every call, every enquiry, every after-hours lead — so nothing slips through again.",
  note: "Built for local businesses, ",
  noteAccent: "end to end",
  // TODO(Saif): point this at a real recorded demo call once you have one —
  // until then it's pointing at the booking form, but the copy promises a
  // demo, so this is a placeholder, not the final destination.
  cta: { label: "See it answer a real call →", href: "#contact" },
  scrollBadge: "SCROLL · TO · EXPLORE ·",
};

// ─── Focus / What Sets Us Apart ───────────────────────────────────────────────
export const focus = {
  eyebrow: "— Our Focus",
  headlinePlain: "Why local businesses choose ",
  headlineAccent: "us.",
  lead: "We don't sell software and disappear. We build, integrate and tune the automations that take real work off your plate.",
  note: "Local-first, results-obsessed, always-on.",
  cards: [
    {
      color: "#D6E3C6" as const,
      offsetPx: 80,
      title: "Local-first",
      body: "We build for how local trades and storefronts actually run — not enterprise software you have to bend your business around.",
    },
    {
      color: "#AFC4F2" as const,
      offsetPx: 40,
      title: "Done for you",
      body: "Strategy, build and integration, handled end to end — so you never need an in-house developer or IT team.",
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
  headlinePlain: "Where We ",
  headlineAccent: "Start.",
  lead: "From the first ringing phone to the website that closes the deal — we automate the full journey.",
  link: { label: "Book a free audit", href: "#contact" },
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
  eyebrow: "— Selected Work",
  headlinePlain: "Things we've ",
  headlineAccent: "built.",
  lead: "A selection of systems and concept builds — from live voice agents to full automation pipelines.",
  link: { label: "Book a free audit", href: "#contact" },
  projects: [
    {
      title: "AI Voice Receptionist",
      tag: "Aesthetics Clinic · Concept",
      description: "Inbound call handling, appointment booking and WhatsApp confirmation.",
      imageUrl:
        "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "WhatsApp Booking Automation",
      tag: "Salon & Spa · Concept",
      description: "Automated booking confirmations, reminders and rebooking — all over WhatsApp.",
      imageUrl:
        "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "AI Chatbot Assistant",
      tag: "Real Estate · Concept",
      description: "A custom-trained chatbot that answers property questions instantly and books viewings — on the website and WhatsApp.",
      imageUrl:
        "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Immersive Web Build",
      tag: "Al Noor Hajj & Umrah · Build",
      description: "Video-backed cinematic hero with a curtain-split reveal for a travel brand.",
      imageUrl:
        "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Lead Generation Engine",
      tag: "B2B Outbound · Build",
      description: "Automated lead sourcing, enrichment and outreach pipeline — Apollo plus AI-generated targeting.",
      imageUrl:
        "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

// ─── Industries served (scrolling marquee band) ───────────────────────────────
export const industries = {
  items: [
    "Clinics",
    "Home Services",
    "Salons & Spas",
    "Restaurants",
    "Auto Shops",
    "Real Estate",
    "Fitness Studios",
    "Retail",
  ],
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = {
  eyebrow: "— By The Numbers",
  headline: "Built for measurable impact.",
  // Real client feedback. The Incorvia.ae / Underground Fitness quotes were
  // given verbally in Hindi with explicit permission to write them up in
  // English — paraphrased faithfully, not invented. Verification contact
  // details for the WeCare quote are kept off the public site, not lost —
  // ask Saif if you need them.
  testimonials: [
    {
      quote:
        "Saif helped us build an AI-powered podcast SaaS prototype using Make, Airtable and Perplexity for WeCareAi Solutions.",
      name: "Sipho Manana",
      role: "Co-Founder, WeCare Group",
    },
    {
      quote:
        "The website and animations look incredibly professional. Most agencies build sites that don't feel this polished — they used animation smartly, not just for show.",
      name: "Incorvia.ae",
      role: "Website & Brand Build",
    },
    {
      quote:
        "The WhatsApp automation reminds members about subscriptions, collects fees and reactivates old leads — it's increased our revenue significantly.",
      name: "Underground Fitness",
      role: "WhatsApp Automation Client",
    },
  ],
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
  headline: "Let's find your ",
  headlineAccent: "biggest leak.",
  lead: "30 minutes, no pitch. We map where you're losing leads and time, then show you exactly what we'd automate first.",
  cta: { label: "Book a free audit", href: "mailto:saif@taskkshiftai.com" },
  // Assumed +91 (India) country code prepended to the number given —
  // confirm this is correct if you intended a different country code.
  whatsappNumber: "917905581778",
  // background: #F7E7A8 (yellow) — from style.css .contact-section
  tags: [
    { text: "Dental",   position: { top: "36px", left: "6%" },     bg: "var(--blue)", color: "#fff",    rotate: -4, delay: 0   },
    { text: "Plumbing", position: { top: "120px", right: "8%" },   bg: "#CDBDF2",      color: "#1a1a1a", rotate:  5, delay: 0.5 },
    { text: "Salons",   position: { bottom: "90px", left: "10%" }, bg: "#fff",         color: "#1a1a1a", rotate:  3, delay: 1   },
    { text: "Auto",     position: { bottom: "60px", right: "12%" },bg: "#AFC4F2",      color: "#1a1a1a", rotate: -5, delay: 1.5 },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footer = {
  bigLink: { href: "#contact", word1: "Let's ", word2: "talk", word3: "." },
  connectLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Email", href: "mailto:saif@taskkshiftai.com" },
  ],
  bottomLeft: "© 2025 TaskShift AI · All rights reserved",
  bottomRight: "Lucknow, India · Dubai, UAE",
  tagline: "Capture every lead. Automate the rest.",
};
