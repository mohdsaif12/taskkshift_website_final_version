"use client";

import { motion } from "framer-motion";
import { footer } from "@/lib/content";
import { Marquee } from "@/components/motion/primitives";
import { EASE } from "@/components/motion/easings";

export default function Footer() {
  return (
    <footer className="footer bg-[#FBFBF8] pt-16 pb-10 overflow-hidden border-t border-[#E6E6E0]">
      <motion.div
        className="footer-top"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE.premium }}
      >
        <div className="footer-cols">
          <div className="footer-col">
            <a href="#top" className="hover:text-[var(--blue)] transition-colors">Home</a>
            <a href="#work" className="hover:text-[var(--blue)] transition-colors">Work</a>
            <a href="#services" className="hover:text-[var(--blue)] transition-colors">Services</a>
          </div>
          <div className="footer-col">
            <a href="#faq" className="hover:text-[var(--blue)] transition-colors">FAQs</a>
            <a href="#contact" className="hover:text-[var(--blue)] transition-colors">Contact</a>
          </div>
        </div>
        <div className="footer-col footer-social">
          {footer.connectLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-[var(--blue)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Infinite Horizontal Marquee CTA */}
      <motion.a
        href={footer.bigLink.href}
        className="block my-16 md:my-24 overflow-hidden text-decoration-none group/footer-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE.premium, delay: 0.1 }}
      >
        <Marquee duration={20} gapClass="gap-16 md:gap-32" className="py-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <span
              key={idx}
              className="footer-cta-text flex items-center gap-8 md:gap-16 select-none"
            >
              <span>
                {footer.bigLink.word1}
                <span className="accent">{footer.bigLink.word2}</span>
              </span>
              <span className="inline-flex items-center justify-center bg-[var(--blue)] text-white rounded-full w-[54px] h-[54px] md:w-[120px] md:h-[120px] text-xl md:text-5xl transition-transform duration-300 group-hover/footer-cta:translate-x-4">
                →
              </span>
            </span>
          ))}
        </Marquee>
      </motion.a>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE.premium, delay: 0.2 }}
      >
        <span>{footer.bottomLeft}</span>
        <span>{footer.tagline}</span>
        <span>{footer.bottomRight}</span>
      </motion.div>
    </footer>
  );
}
