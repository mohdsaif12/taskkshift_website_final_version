"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { services } from "@/lib/content";
import { EASE } from "@/components/motion/easings";
import { useScrollRange } from "@/components/motion/scroll-utils";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Monitor scroll progress for the whole pinned section — header and band
  // stack share the same pin/track, exactly like Focus's text-column +
  // card-reveal pairing. The header itself doesn't animate; it just sits
  // still at the top of the pinned viewport while the bands stack below it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Each band slides up from below and stacks on top of the previous one
  // (increasing zIndex) while the section is pinned.
  const y1 = useScrollRange(scrollYProgress, [0.0, 0.2], [120, 0]);
  const y2 = useScrollRange(scrollYProgress, [0.2, 0.42], [600, 40]);
  const y3 = useScrollRange(scrollYProgress, [0.42, 0.64], [600, 80]);
  const y4 = useScrollRange(scrollYProgress, [0.64, 0.85], [600, 120]);

  const opacity1 = useScrollRange(scrollYProgress, [0.0, 0.15], [0.4, 1]);
  const opacity2 = useScrollRange(scrollYProgress, [0.18, 0.35], [0, 1]);
  const opacity3 = useScrollRange(scrollYProgress, [0.4, 0.57], [0, 1]);
  const opacity4 = useScrollRange(scrollYProgress, [0.62, 0.79], [0, 1]);

  const bandStyles = [
    isDesktop ? { y: y1, opacity: opacity1, zIndex: 10 } : {},
    isDesktop ? { y: y2, opacity: opacity2, zIndex: 20 } : {},
    isDesktop ? { y: y3, opacity: opacity3, zIndex: 30 } : {},
    isDesktop ? { y: y4, opacity: opacity4, zIndex: 40 } : {},
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FBFBF8] md:h-[320vh]"
      id="services"
    >
      {/* Sticky viewport — header and band stack pinned together, exactly
          like Focus's text column + card track. */}
      <div className="relative w-full md:sticky md:top-0 md:h-screen flex flex-col md:justify-center overflow-hidden py-16 md:py-0">
        {/* Header — stays in place at the top of the pinned viewport */}
        <div className="w-[90%] max-w-[1320px] mx-auto px-4 md:px-8 pt-0 md:pt-16 pb-8 md:pb-10 shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-[44%_50%] gap-10 md:gap-[6%] items-end">
            <div>
              <p className="eyebrow">{services.eyebrow}</p>
              <h2 className="h2 h2-tight">
                {services.headlinePlain}
                <span className="accent">{services.headlineAccent}</span>
              </h2>
            </div>
            <div>
              <p className="lead mb-4">{services.lead}</p>
              <a href={services.link.href} className="text-link">
                {services.link.label}
              </a>
            </div>
          </div>
        </div>

        {/* Band stack — compact fixed height matching the reference (~354px
            at this width), boxed within the same container width as the
            header above it (white gutters left/right), not full-bleed. */}
        {isDesktop ? (
          <div className="relative w-[90%] max-w-[1320px] mx-auto h-[240px] md:h-[280px] shrink-0">
            {services.bands.map((band, idx) => (
              <motion.div
                key={band.num}
                style={{ background: band.color, ...bandStyles[idx] }}
                className="service-band absolute inset-0 w-full h-full border border-[#E6E6E0]"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3, ease: EASE.natural }}
              >
                <div className="service-inner">
                  <div className="service-num">
                    <span className="num">{band.num}</span>
                    <div className="dots dots-lg">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div>
                    <h3>{band.title}</h3>
                    <p>{band.body}</p>
                    <motion.a
                      href="#faq"
                      className="text-link"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: EASE.natural }}
                    >
                      Learn More
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full gap-3 px-4 pb-4">
            {services.bands.map((band, idx) => (
              <motion.div
                key={band.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, ease: EASE.premium, delay: idx * 0.08 }}
                className="service-band w-full border border-[#E6E6E0] rounded-sm"
                style={{ background: band.color }}
              >
                <div className="service-inner">
                  <div className="service-num">
                    <span className="num">{band.num}</span>
                    <div className="dots dots-lg">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div>
                    <h3>{band.title}</h3>
                    <p>{band.body}</p>
                    <a href="#faq" className="text-link">
                      Learn More
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
