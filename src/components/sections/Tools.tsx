"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Video,
  Workflow,
  Database,
  Sparkles,
  Mic,
  AudioWaveform,
  Languages,
  Code2,
  Triangle,
  Smartphone,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { tools } from "@/lib/content";
import { EASE } from "@/components/motion/easings";

// Consistent line-icon set standing in for real brand logos — deliberate
// choice over mismatched stock logo images, which would look cheaper, not
// more credible.
const TOOL_ICONS: Record<string, LucideIcon> = {
  VAPI: Phone,
  LiveKit: Video,
  n8n: Workflow,
  Supabase: Database,
  OpenAI: Sparkles,
  ElevenLabs: Mic,
  Deepgram: AudioWaveform,
  "Sarvam AI": Languages,
  "Next.js": Code2,
  Vercel: Triangle,
  Flutter: Smartphone,
  "WhatsApp Business API": MessageCircle,
};

export default function Tools() {
  return (
    <section className="section tools-section" id="tools">
      <motion.p
        className="tools-label"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE.premium }}
      >
        {tools.label}
      </motion.p>
      <div className="tools-grid">
        {tools.items.map((tool, idx) => {
          const Icon = TOOL_ICONS[tool];
          return (
            <motion.div
              key={idx}
              className="tool-cell"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.5,
                ease: "backOut",
                delay: idx * 0.05,
              }}
              whileHover={{ scale: 1.06 }}
            >
              {Icon && <Icon size={22} strokeWidth={1.75} className="text-[var(--orange)]" />}
              <span>{tool}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
