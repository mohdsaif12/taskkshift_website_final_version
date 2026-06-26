"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CollageReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Calculate smooth parallax translation for the single collage image using percentages
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="relative w-full bg-white py-12 md:py-16" ref={sectionRef}>
      {/* Outer container to allow overflow-visible for the corner line boxes */}
      <div className="relative w-[90%] max-w-[1280px] mx-auto overflow-visible">
        
        {/* Top-Left Green/Lime Hatch Box (Subtle Gray-Green) */}
        <div
          className="absolute top-[-20px] left-[-20px] w-[130px] h-[90px] md:top-[-45px] md:left-[-45px] md:w-[260px] md:h-[180px] z-20 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              135deg,
              rgba(170, 185, 150, 0.12) 0px,
              rgba(170, 185, 150, 0.12) 2.5px,
              transparent 2.5px,
              transparent 16px
            )`,
          }}
        />

        {/* Bottom-Right Blue Hatch Box (Subtle Gray-Blue) */}
        <div
          className="absolute bottom-[-20px] right-[-20px] w-[130px] h-[90px] md:bottom-[-45px] md:right-[-45px] md:w-[260px] md:h-[180px] z-20 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              135deg,
              rgba(150, 165, 195, 0.12) 0px,
              rgba(150, 165, 195, 0.12) 2.5px,
              transparent 2.5px,
              transparent 16px
            )`,
          }}
        />

        {/* The main rectangular collage box */}
        <div
          className="relative overflow-hidden w-full border border-[#E6E6E0] bg-[#F7F5F1] z-10 h-[250px] md:h-[400px]"
        >
          {/* Parallax Scrolling Collage Image */}
          <motion.div
            className="absolute inset-x-0 w-full h-[130%]"
            style={{
              y: yParallax,
              top: "-15%",
            }}
          >
            <img
              src="/ui_collage_placeholder.png"
              alt="UI Design Collage"
              className="w-full h-full object-cover filter brightness-[0.98]"
              loading="eager"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
