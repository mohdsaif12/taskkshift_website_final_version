"use client";

import { contact } from "@/lib/content";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      {/* Floating animated tags */}
      {contact.tags.map((tag, idx) => {
        // Parse the style string to extract positioning
        const styleObj: React.CSSProperties = {
          position: "absolute",
          background: tag.bg,
          color: tag.color,
        };

        tag.style.split(";").forEach((part) => {
          if (!part.trim()) return;
          const [key, value] = part.split(":");
          if (key && value) {
            (styleObj as any)[key.trim()] = value.trim();
          }
        });

        // Determine a unique floating period for each tag
        const duration = 4 + idx * 0.5;

        return (
          <motion.div
            key={idx}
            className="tag hidden md:block select-none"
            style={styleObj}
            animate={{
              y: [-6, 6, -6],
              rotate: [tag.rotate - 1, tag.rotate + 1, tag.rotate - 1],
            }}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay: tag.delay,
            }}
            whileHover={{
              scale: 1.08,
              rotate: tag.rotate * 1.2,
              transition: { duration: 0.2 },
            }}
          >
            {tag.text}
          </motion.div>
        );
      })}

      {/* Main inner block */}
      <div className="contact-inner">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 className="h2 contact-h2">
          {contact.headline}
          <span className="accent">{contact.headlineAccent}</span>
        </h2>
        <p className="contact-lead">{contact.lead}</p>
        <a href={contact.cta.href} className="btn btn-outline">
          {contact.cta.label}
        </a>
      </div>
    </section>
  );
}
