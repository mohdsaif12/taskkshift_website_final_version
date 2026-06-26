"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { work } from "@/lib/content";
import { EASE } from "@/components/motion/easings";
import { useScrollRange } from "@/components/motion/scroll-utils";

export default function Work() {
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

  // Vertical scroll transformation for the right column on desktop
  // Starts lower and scrolls up, stopping at 0.85 for a reading pause
  const yRight = useScrollRange(scrollYProgress, [0, 0.85], [180, -420]);

  // Card opacity reveals mapped to scroll progression
  const opacity1 = useScrollRange(scrollYProgress, [0, 0.25], [1, 1]); // first card always visible
  const opacity2 = useScrollRange(scrollYProgress, [0.15, 0.45], [0.3, 1]);
  const opacity3 = useScrollRange(scrollYProgress, [0.45, 0.75], [0.3, 1]);

  // Mobile fallback reveal — driven from scrollYProgress rather than
  // whileInView, since whileInView does not reliably fire for content
  // inside this layout (see note on the text column below).
  const mOpacity1 = useScrollRange(scrollYProgress, [0, 0.3], [0, 1]);
  const mY1 = useScrollRange(scrollYProgress, [0, 0.3], [40, 0]);
  const mOpacity2 = useScrollRange(scrollYProgress, [0.12, 0.42], [0, 1]);
  const mY2 = useScrollRange(scrollYProgress, [0.12, 0.42], [40, 0]);
  const mOpacity3 = useScrollRange(scrollYProgress, [0.24, 0.54], [0, 1]);
  const mY3 = useScrollRange(scrollYProgress, [0.24, 0.54], [40, 0]);

  // Text column scroll-linked reveal (replaces a whileInView reveal that does
  // not reliably fire for content inside this pinned/sticky layout).
  const textOpacity = useScrollRange(scrollYProgress, [0, 0.06], [0, 1]);
  const textY = useScrollRange(scrollYProgress, [0, 0.06], [20, 0]);

  const rightStyle = isDesktop ? { y: yRight } : {};
  const cardOpacities = [
    isDesktop ? { opacity: opacity1 } : { opacity: mOpacity1, y: mY1 },
    isDesktop ? { opacity: opacity2 } : { opacity: mOpacity2, y: mY2 },
    isDesktop ? { opacity: opacity3 } : { opacity: mOpacity3, y: mY3 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white md:h-[220vh]"
      id="work"
    >
      {/* Sticky viewport container (pins on desktop, scrolls normally on mobile) */}
      <div className="relative w-full md:sticky md:top-0 md:h-screen flex items-center py-16 md:py-0 overflow-hidden">
        
        {/* Main Grid Content */}
        <div className="w-[90%] max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-[44%_50%] gap-12 md:gap-[6%] items-center h-full">
          
          {/* Left Column: Fixed Text Copy */}
          <div className="flex flex-col justify-center">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <p className="eyebrow">{work.eyebrow}</p>
              <h2 className="h2 h2-tight mb-6">
                Check Out
                <br />
                Our <span className="accent">{work.headlineAccent}</span>
              </h2>
              <p className="lead mb-6">{work.lead}</p>
              <a href={work.link.href} className="text-link">
                {work.link.label}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Scroll-Translating Project Cards */}
          <motion.div
            style={rightStyle}
            className="flex flex-col gap-10 md:gap-16 w-full"
          >
            {work.projects.map((project, idx) => (
              <motion.article
                key={idx}
                style={cardOpacities[idx]}
                className="work-card w-full"
                whileHover={{ y: -4 }}
                transition={
                  !isDesktop
                    ? { duration: 0.8, ease: EASE.premium }
                    : { duration: 0.4, ease: EASE.natural }
                }
              >
                {/* Project Shot Placeholder */}
                <div className="work-shot w-full">
                  <span>project shot</span>
                </div>
                {/* Project Meta Metrics */}
                <div className="work-meta">
                  <span className="metric">{project.metric}</span>
                  <span className="industry">{project.industry}</span>
                </div>
                <p>{project.body}</p>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
