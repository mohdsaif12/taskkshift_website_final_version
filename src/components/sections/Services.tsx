"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { services } from "@/lib/content";
import { EASE } from "@/components/motion/easings";
import { useScrollRange } from "@/components/motion/scroll-utils";

export default function Services() {
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

  // Slide-up scroll transforms for the 4 cards
  // Each card has its own staggered scroll range to slide in and stack
  const y1 = useScrollRange(scrollYProgress, [0.0, 0.2], [120, 0]);
  const y2 = useScrollRange(scrollYProgress, [0.2, 0.42], [600, 40]);
  const y3 = useScrollRange(scrollYProgress, [0.42, 0.64], [600, 80]);
  const y4 = useScrollRange(scrollYProgress, [0.64, 0.85], [600, 120]);

  // Card opacity transforms for smooth entrances
  const opacity1 = useScrollRange(scrollYProgress, [0.0, 0.15], [0.4, 1]);
  const opacity2 = useScrollRange(scrollYProgress, [0.18, 0.35], [0, 1]);
  const opacity3 = useScrollRange(scrollYProgress, [0.4, 0.57], [0, 1]);
  const opacity4 = useScrollRange(scrollYProgress, [0.62, 0.79], [0, 1]);

  const cardStyles = [
    isDesktop ? { y: y1, opacity: opacity1, zIndex: 10 } : {},
    isDesktop ? { y: y2, opacity: opacity2, zIndex: 20 } : {},
    isDesktop ? { y: y3, opacity: opacity3, zIndex: 30 } : {},
    isDesktop ? { y: y4, opacity: opacity4, zIndex: 40 } : {},
  ];

  // Text column scroll-linked reveal (replaces a whileInView reveal that does
  // not reliably fire for content inside this pinned/sticky layout).
  const textOpacity = useScrollRange(scrollYProgress, [0, 0.06], [0, 1]);
  const textY = useScrollRange(scrollYProgress, [0, 0.06], [20, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FBFBF8] md:h-[240vh]"
      id="services"
    >
      {/* Sticky viewport container (pins on desktop, scrolls normally on mobile) */}
      <div className="relative w-full md:sticky md:top-0 md:h-screen flex items-center py-16 md:py-0 overflow-hidden">
        
        {/* Main Grid Content */}
        <div className="w-[90%] max-w-[1320px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-[44%_50%] gap-12 md:gap-[6%] items-center h-full">
          
          {/* Left Column: Fixed Text Copy */}
          <div className="flex flex-col justify-center">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <p className="eyebrow">{services.eyebrow}</p>
              <h2 className="h2 h2-tight mb-6">
                {services.headlinePlain}
                <span className="accent">{services.headlineAccent}</span>
              </h2>
              <p className="lead mb-6">{services.lead}</p>
              <a href={services.link.href} className="text-link">
                {services.link.label}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Scroll-stacking Cards on Desktop, Normal Layout on Mobile */}
          <div className="relative w-full h-[520px] md:h-[540px] flex items-center md:block">
            {isDesktop ? (
              // Desktop Stacking Layout
              services.bands.map((band, idx) => (
                <motion.div
                  key={band.num}
                  style={{
                    background: band.color,
                    ...cardStyles[idx],
                  }}
                  className="absolute top-0 left-0 w-full h-[380px] p-8 border border-[#E6E6E0] flex flex-col justify-between"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, ease: EASE.natural }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="service-num">
                      <span className="num">{band.num}</span>
                      <div className="dots dots-lg">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-grow flex flex-col justify-end pb-4">
                    <h3 className="text-2xl font-bold mb-3">{band.title}</h3>
                    <p className="text-sm text-[#4A4A48] leading-relaxed mb-4 max-w-[44ch]">{band.body}</p>
                    <motion.a
                      href="#contact"
                      className="text-link self-start"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: EASE.natural }}
                    >
                      Learn More
                    </motion.a>
                  </div>
                </motion.div>
              ))
            ) : (
              // Mobile Stacked List Layout
              <div className="flex flex-col gap-6 w-full h-auto py-4">
                {services.bands.map((band) => (
                  <div
                    key={band.num}
                    className="service-band w-full p-6 border border-[#E6E6E0]"
                    style={{ background: band.color }}
                  >
                    <div className="service-num mb-4">
                      <span className="num">{band.num}</span>
                      <div className="dots dots-lg">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{band.title}</h3>
                      <p className="text-sm mb-4">{band.body}</p>
                      <motion.a
                        href="#contact"
                        className="text-link inline-block"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2, ease: EASE.natural }}
                      >
                        Learn More
                      </motion.a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
