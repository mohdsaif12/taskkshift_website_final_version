"use client";

import { useState } from "react";
import { faq } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="faq-head">
        <p className="eyebrow">{faq.eyebrow}</p>
        <h2 className="h2">{faq.headline}</h2>
      </div>

      <div className="faq-list">
        {faq.items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="faq-item">
              <button
                className="faq-q"
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="faq-sign" aria-hidden="true">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="faq-a">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
        {/* Border at bottom of the list */}
        <div className="faq-list-end" />
      </div>
    </section>
  );
}
