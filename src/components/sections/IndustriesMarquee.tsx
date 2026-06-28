"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/content";
import { Marquee } from "@/components/motion/primitives";
import { EASE } from "@/components/motion/easings";

export default function IndustriesMarquee() {
  return (
    <section className="relative w-full bg-white py-10 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: EASE.premium }}
      >
        <Marquee duration={26} gapClass="gap-6 md:gap-10">
          {industries.items.map((item, idx) => (
            <span key={idx} className="industries-marquee-text flex items-center gap-6 md:gap-10">
              {item}
              <span className="text-[var(--orange)]">—</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
