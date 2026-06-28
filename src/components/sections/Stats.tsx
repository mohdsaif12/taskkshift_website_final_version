"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stats } from "@/lib/content";
import { Counter } from "@/components/motion/primitives";
import { EASE } from "@/components/motion/easings";

const AUTO_ROTATE_MS = 6000;

function TestimonialRotator() {
  const [index, setIndex] = useState(0);
  const count = stats.testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Auto-rotate, resetting the timer whenever the visitor navigates
  // manually so a click doesn't get immediately undone by the timer.
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [next, count, index]);

  const active = stats.testimonials[index];

  return (
    <motion.div
      className="testimonial-rotator"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE.premium, delay: 0.15 }}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          className="testimonial"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE.natural }}
        >
          <blockquote>&ldquo;{active.quote}&rdquo;</blockquote>
          <figcaption>
            <span className="t-name">{active.name}</span>
            <span className="t-role">{active.role}</span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {count > 1 && (
        <div className="testimonial-nav">
          <button type="button" onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={next} aria-label="Next testimonial">
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default function Stats() {
  const statsRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: statsRowRef,
    offset: ["start end", "start 0.3"],
  });

  return (
    <section className="stats-section w-full bg-white" id="stats">
      <div className="stats-bg-visual" aria-hidden="true" />
      <div className="relative w-[90%] max-w-[1320px] mx-auto px-4 md:px-8">
        {/* Centered header */}
        <motion.div
          className="stats-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE.premium }}
        >
          <p className="eyebrow">{stats.eyebrow}</p>
          <h2 className="h2 h2-tight">{stats.headline}</h2>
        </motion.div>

        {/* Centered stat row */}
        <div className="stats-row" ref={statsRowRef}>
          {stats.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE.natural, delay: idx * 0.08 }}
            >
              <div className="stat-num">
                {item.countable ? (
                  <Counter to={item.value as number} suffix={item.suffix} progress={scrollYProgress} range={[0, 0.6]} />
                ) : (
                  String(item.value)
                )}
              </div>
              <div className="stat-label">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Rotating client testimonial — fades in after the stats row,
            cycling automatically or via the left/right arrows. */}
        <TestimonialRotator />
      </div>
    </section>
  );
}
