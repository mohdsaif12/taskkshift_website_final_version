"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { focus } from "@/lib/content";
import { EASE, easeOutCubic } from "@/components/motion/easings";
import { useScrollRange } from "@/components/motion/scroll-utils";

export default function Focus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor resize to apply scroll animations only on desktop
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Monitor scroll progress relative to this section (creates pinning track)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Each card's y / opacity / clip-path share the exact same scroll range so
  // they settle in unison — mismatched sub-ranges (e.g. opacity finishing
  // before y) read as janky. easeOutCubic softens the otherwise strictly
  // linear scroll-tied motion so the reveal doesn't feel mechanical.
  const CARD_RANGES: [number, number][] = [
    [0.0, 0.18],
    [0.27, 0.45],
    [0.54, 0.72],
  ];
  const HIDDEN_CLIP = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
  const REVEALED_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

  // Card 1 scroll-linked transforms (Research / Local-first)
  const y1 = useScrollRange(scrollYProgress, CARD_RANGES[0], [60, 0], easeOutCubic);
  const opacity1 = useScrollRange(scrollYProgress, CARD_RANGES[0], [0, 1], easeOutCubic);
  const clipPath1 = useScrollRange(scrollYProgress, CARD_RANGES[0], [HIDDEN_CLIP, REVEALED_CLIP], easeOutCubic);

  // Card 2 scroll-linked transforms (Strategy / Done for you)
  const y2 = useScrollRange(scrollYProgress, CARD_RANGES[1], [60, 0], easeOutCubic);
  const opacity2 = useScrollRange(scrollYProgress, CARD_RANGES[1], [0, 1], easeOutCubic);
  const clipPath2 = useScrollRange(scrollYProgress, CARD_RANGES[1], [HIDDEN_CLIP, REVEALED_CLIP], easeOutCubic);

  // Card 3 scroll-linked transforms (Execution / Always-on)
  // Finishes at 0.72, leaving 0.72 - 1.0 as a reading halt before unpinning
  const y3 = useScrollRange(scrollYProgress, CARD_RANGES[2], [60, 0], easeOutCubic);
  const opacity3 = useScrollRange(scrollYProgress, CARD_RANGES[2], [0, 1], easeOutCubic);
  const clipPath3 = useScrollRange(scrollYProgress, CARD_RANGES[2], [HIDDEN_CLIP, REVEALED_CLIP], easeOutCubic);

  // Subtle global vertical translation for the card column to balance scroll centering
  const yContainer = useScrollRange(scrollYProgress, [0, 1], [60, -60]);

  // Mobile fallback reveal — the section isn't pinned below the md breakpoint,
  // so scrollYProgress simply tracks the section's natural (un-inflated) height.
  // Driven from scrollYProgress rather than whileInView, since whileInView does
  // not reliably fire for content inside this layout (see RevealIn note above).
  const mY1 = useScrollRange(scrollYProgress, [0, 0.3], [40, 0]);
  const mOpacity1 = useScrollRange(scrollYProgress, [0, 0.3], [0, 1]);
  const mY2 = useScrollRange(scrollYProgress, [0.12, 0.42], [40, 0]);
  const mOpacity2 = useScrollRange(scrollYProgress, [0.12, 0.42], [0, 1]);
  const mY3 = useScrollRange(scrollYProgress, [0.24, 0.54], [40, 0]);
  const mOpacity3 = useScrollRange(scrollYProgress, [0.24, 0.54], [0, 1]);

  // Text column scroll-linked reveal (replaces a whileInView reveal that does
  // not reliably fire for content inside this pinned/sticky layout).
  const textOpacity = useScrollRange(scrollYProgress, [0, 0.06], [0, 1]);
  const textY = useScrollRange(scrollYProgress, [0, 0.06], [20, 0]);

  // Consolidate conditional styles based on viewport size
  const cardStyles = [
    isDesktop
      ? { y: y1, opacity: opacity1, clipPath: clipPath1 }
      : { y: mY1, opacity: mOpacity1 },
    isDesktop
      ? { y: y2, opacity: opacity2, clipPath: clipPath2 }
      : { y: mY2, opacity: mOpacity2 },
    isDesktop
      ? { y: y3, opacity: opacity3, clipPath: clipPath3 }
      : { y: mY3, opacity: mOpacity3 },
  ];

  const containerStyle = isDesktop ? { y: yContainer } : {};

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white md:h-[260vh]"
      id="focus"
    >
      {/* Sticky viewport container (pins on desktop, scrolls normally on mobile) */}
      <div className="relative w-full md:sticky md:top-0 md:h-screen flex items-center py-16 md:py-0 overflow-hidden">
        
        {/* Main Grid Content */}
        <div className="w-[90%] max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-[44%_50%] gap-12 md:gap-[6%] items-center h-full">
          
          {/* Left Column: Fixed Text Copy */}
          <div className="flex flex-col justify-center">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <p className="eyebrow">{focus.eyebrow}</p>
              <h2 className="h2">
                What Sets Us <span className="accent">Apart</span>!
              </h2>
              <p className="lead">{focus.lead}</p>
              <p className="note">
                Local-first, results-obsessed,{" "}
                <span className="accent-text">always-on</span>.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Scroll-Revealing Cards */}
          <motion.div
            style={containerStyle}
            className="flex flex-col gap-6 md:gap-8"
          >
            {focus.cards.map((card, idx) => {
              const marginLeftStyle = card.offsetPx > 0 ? `${card.offsetPx}px` : undefined;

              return (
                <motion.div
                  key={card.title}
                  style={{
                    background: card.color,
                    marginLeft: isDesktop ? marginLeftStyle : undefined,
                    ...cardStyles[idx],
                  }}
                  className="focus-card w-full"
                  whileHover={{ y: -4 }}
                  transition={
                    !isDesktop
                      ? { duration: 0.8, ease: EASE.premium }
                      : { duration: 0.4, ease: EASE.natural }
                  }
                >
                  {/* Card decorator dots */}
                  <div className="dots">
                    <motion.span whileHover={{ scale: 1.25 }} />
                    <motion.span whileHover={{ scale: 1.25 }} />
                    <motion.span whileHover={{ scale: 1.25 }} />
                    <motion.span whileHover={{ scale: 1.25 }} />
                  </div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
