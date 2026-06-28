"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/lib/content";
import { EASE } from "@/components/motion/easings";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq-section">
      <motion.div
        className="faq-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE.premium }}
      >
        <p className="eyebrow">{faq.eyebrow}</p>
        <h2 className="h2">{faq.headline}</h2>
      </motion.div>

      <div className="faq-list">
        {faq.items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={idx}
              className="faq-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE.natural, delay: idx * 0.06 }}
            >
              <button
                className="faq-q"
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <motion.span
                  className="faq-sign"
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE.natural }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE.natural }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {/* Border at bottom of the list */}
        <div className="faq-list-end" />
      </div>
    </section>
  );
}
