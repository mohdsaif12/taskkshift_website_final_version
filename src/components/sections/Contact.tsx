"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { EASE } from "@/components/motion/easings";

export default function Contact() {
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Free audit request — ${name || "New enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness type: ${businessType}\nPhone / WhatsApp: ${phone}`
    );
    window.location.href = `${contact.cta.href}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact-section">
      {/* Floating animated tags */}
      {contact.tags.map((tag, idx) => {
        // Determine a unique floating period for each tag
        const duration = 4 + idx * 0.5;

        return (
          <motion.div
            key={idx}
            className="tag hidden md:block select-none"
            style={{
              position: "absolute",
              background: tag.bg,
              color: tag.color,
              ...tag.position,
            }}
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
      <motion.div
        className="contact-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE.premium }}
      >
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 className="h2 contact-h2">
          {contact.headline}
          <span className="accent">{contact.headlineAccent}</span>
        </h2>
        <p className="contact-lead">{contact.lead}</p>

        {/* Primary path — WhatsApp, the channel this audience actually uses */}
        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
            "Hi! I'd like to book a free automation audit."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-orange inline-flex items-center gap-2 mx-auto"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Message us on WhatsApp
        </a>

        {/* Secondary path — short form for people who'd rather not WhatsApp */}
        <form
          onSubmit={handleSubmit}
          className="contact-form mt-10 mx-auto w-full max-w-[440px] flex flex-col gap-3"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#7A7A3C] mb-1">
            Or leave your details
          </p>
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="contact-input"
          />
          <input
            type="text"
            required
            placeholder="Business type (e.g. dental clinic)"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="contact-input"
          />
          <input
            type="tel"
            required
            placeholder="Phone / WhatsApp number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="contact-input"
          />
          <button type="submit" className="btn btn-outline mt-2">
            {contact.cta.label}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
