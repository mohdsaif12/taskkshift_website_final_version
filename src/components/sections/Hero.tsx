"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { hero } from "@/lib/content";
import { EASE } from "@/components/motion/easings";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
import { BlinkingCursor } from "@/components/motion/primitives";
import { useScrollRange } from "@/components/motion/scroll-utils";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { handleMouseMove, handleMouseLeave } = useMagneticHover(4);

  // Parallax on the glow exactly like the HTML
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const glowY = useScrollRange(scrollYProgress, [0, 1], [0, 60]);

  return (
    <header id="top" ref={containerRef} className="hero min-h-[90vh] flex items-center">
      {/* .hero-glow — exact position/style from style.css */}
      <motion.div
        className="hero-glow"
        aria-hidden="true"
        style={{ y: glowY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "linear" }}
      />

      <div className="hero-inner w-full">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE.premium, delay: 0.2 }}
        >
          {hero.eyebrow}
        </motion.p>

        {/* Headline — exact markup from index.html with a blinking typewriter cursor */}
        <div style={{ overflow: "hidden" }} className="pr-4">
          <motion.h1
            className="hero-title"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.2, ease: EASE.cinematic, delay: 0.4 }}
          >
            Smarter automation for the businesses that{" "}
            <span className="accent">keep your town running</span>
            <BlinkingCursor className="text-[var(--blue)] font-light ml-1" />
          </motion.h1>
        </div>

        {/* Hero lead */}
        <motion.p
          className="hero-lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE.premium, delay: 1.1 }}
        >
          {hero.subline}
        </motion.p>

        {/* Hero note */}
        <motion.p
          className="hero-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE.premium, delay: 1.3 }}
        >
          {hero.note}
          <span className="accent-text">{hero.noteAccent}</span>.
        </motion.p>

        {/* CTA row + scroll hint */}
        <div className="hero-actions">
          {/* CTA button — magnetic hover */}
          <motion.a
            href={hero.cta.href}
            className="btn btn-orange"
            onMouseMove={
              handleMouseMove as React.MouseEventHandler<HTMLAnchorElement>
            }
            onMouseLeave={
              handleMouseLeave as React.MouseEventHandler<HTMLAnchorElement>
            }
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE.premium, delay: 1.0 }}
          >
            {hero.cta.label}
          </motion.a>

          {/* Scroll hint — Rotating circular text with a bobbing arrow */}
          <motion.div
            className="scroll-hint select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE.premium, delay: 1.6 }}
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Rotating circular SVG text path */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="transparent"
                  />
                  <text className="text-[8px] font-mono font-bold tracking-[0.16em] fill-[#7A7A76]">
                    <textPath href="#circlePath" startOffset="0%">
                      {hero.scrollBadge}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Centered bobbing arrow */}
              <motion.span
                className="text-lg font-bold text-[var(--orange)]"
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                ↓
              </motion.span>
            </div>
            <span className="scroll-label">
              Scroll
              <br />
              down
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
