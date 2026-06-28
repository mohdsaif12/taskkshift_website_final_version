"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, navCTA } from "@/lib/content";
import { EASE } from "@/components/motion/easings";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["top", "services", "work", "faq", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <motion.nav
      className="nav"
      id="nav"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE.premium, delay: 0.2 }}
      aria-label="Main navigation"
      style={{ position: "sticky" }}
    >
      {/* Logo — exact structure from index.html */}
      <a href="#top" className="logo" aria-label="TaskShift AI — home">
        <Image src="/logo.png" alt="TaskShift AI" width={172} height={34} priority />
      </a>

      {/* Hamburger toggle — visible only on mobile */}
      <button
        className={`nav-toggle${menuOpen ? " is-open" : ""}`}
        id="navToggle"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls="navLinks"
        aria-label={menuOpen ? "Close navigation menu" : "Toggle navigation menu"}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Nav links — exact structure from index.html */}
      <AnimatePresence>
        <div
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          id="navLinks"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`nav-link${activeSection === link.href.replace("#", "") ? " is-active" : ""}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: EASE.premium }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href={navCTA.href}
            className="btn btn-dark"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + navLinks.length * 0.06, duration: 0.5, ease: EASE.premium }}
          >
            {navCTA.label}
          </motion.a>
        </div>
      </AnimatePresence>
    </motion.nav>
  );
}
