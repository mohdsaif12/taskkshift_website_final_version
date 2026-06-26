"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { stats } from "@/lib/content";
import { Counter, Marquee } from "@/components/motion/primitives";
import { useScrollRange } from "@/components/motion/scroll-utils";

export default function Stats() {
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

  // Staggered scroll transforms for the right column sub-components
  const yStats = useScrollRange(scrollYProgress, [0.0, 0.3], [100, 0]);
  
  const yHonestLine = useScrollRange(scrollYProgress, [0.25, 0.55], [120, 0]);
  const opacityHonestLine = useScrollRange(scrollYProgress, [0.25, 0.45], [0, 1]);
  
  const yMarquee = useScrollRange(scrollYProgress, [0.55, 0.85], [120, 0]);
  const opacityMarquee = useScrollRange(scrollYProgress, [0.55, 0.75], [0, 1]);

  // Mobile fallback reveal — driven from scrollYProgress rather than
  // whileInView, since whileInView does not reliably fire for content
  // inside this layout.
  const mYHonestLine = useScrollRange(scrollYProgress, [0, 0.3], [30, 0]);
  const mOpacityHonestLine = useScrollRange(scrollYProgress, [0, 0.3], [0, 1]);
  const mYMarquee = useScrollRange(scrollYProgress, [0.15, 0.45], [30, 0]);
  const mOpacityMarquee = useScrollRange(scrollYProgress, [0.15, 0.45], [0, 1]);

  // Text column scroll-linked reveal (replaces a whileInView reveal that does
  // not reliably fire for content inside this pinned/sticky layout).
  const textOpacity = useScrollRange(scrollYProgress, [0, 0.06], [0, 1]);
  const textY = useScrollRange(scrollYProgress, [0, 0.06], [20, 0]);

  const statsStyle = isDesktop ? { y: yStats } : {};
  const honestLineStyle = isDesktop
    ? { y: yHonestLine, opacity: opacityHonestLine }
    : { y: mYHonestLine, opacity: mOpacityHonestLine };
  const marqueeStyle = isDesktop
    ? { y: yMarquee, opacity: opacityMarquee }
    : { y: mYMarquee, opacity: mOpacityMarquee };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white md:h-[240vh]"
      id="stats"
    >
      {/* Sticky viewport container (pins on desktop, scrolls normally on mobile) */}
      <div className="relative w-full md:sticky md:top-0 md:h-screen flex items-center py-16 md:py-0 overflow-hidden">
        
        {/* Main Grid Content */}
        <div className="w-[90%] max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-[40%_54%] gap-12 md:gap-[6%] items-center h-full">
          
          {/* Left Column: Fixed Text Copy */}
          <div className="flex flex-col justify-center">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <p className="eyebrow">{stats.eyebrow}</p>
              <h2 className="h2 h2-tight mb-4">{stats.headline}</h2>
            </motion.div>
          </div>

          {/* Right Column: Scroll-animated Stats, Testimonial and Marquee */}
          <div className="flex flex-col w-full">
            {/* Stats Row */}
            <motion.div
              style={statsStyle}
              className="grid grid-cols-2 gap-8 border-y border-[#E6E6E0] py-8 w-full"
            >
              {stats.items.map((item, idx) => (
                <div key={idx} className="flex flex-col justify-start">
                  <div className="stat-num text-4xl md:text-6xl font-extrabold text-[#0E0E0E] tracking-tight">
                    {item.countable ? (
                      <Counter
                        to={item.value as number}
                        suffix={item.suffix}
                        progress={scrollYProgress}
                        range={[0, 0.3]}
                      />
                    ) : (
                      String(item.value)
                    )}
                  </div>
                  <div className="stat-label text-xs font-mono uppercase tracking-widest text-[#7A7A76] mt-3">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Testimonial / Honest Line */}
            <motion.div style={honestLineStyle} className="mt-8 text-left">
              <blockquote className="font-italic italic text-2xl md:text-3xl text-[#0E0E0E] leading-tight">
                “{stats.honestLine}”
              </blockquote>
            </motion.div>

            {/* Partners Logo Marquee */}
            <motion.div
              style={marqueeStyle}
              className="mt-12 w-full border-t border-[#E6E6E0] pt-6"
            >
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#9A9A94] mb-4">
                Our Integration Partners
              </p>
              <Marquee duration={18} className="py-3 bg-[#FBFBF8] border-y border-[#E6E6E0] w-full">
                {["OpenAI", "Vapi", "n8n", "Supabase", "LiveKit", "ElevenLabs", "Deepgram"].map((partner, idx) => (
                  <span
                    key={idx}
                    className="mx-6 text-sm font-bold uppercase tracking-wider text-[#3A3A38]"
                  >
                    {partner}
                  </span>
                ))}
              </Marquee>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
