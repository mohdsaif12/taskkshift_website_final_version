"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext,
} from "@/components/ui/animated-slideshow";
import { work } from "@/lib/content";
import { EASE } from "@/components/motion/easings";
import { useMediaQuery } from "@/lib/useMediaQuery";

// ─── Desktop: hover-driven project list ──────────────────────────────────────
function ProjectList() {
  const { activeSlide } = useHoverSliderContext();

  return (
    <div className="flex flex-col gap-9 md:gap-12 shrink-0 md:w-[30%]">
      {work.projects.map((project, index) => {
        const isActive = activeSlide === index;
        return (
          <div key={project.title}>
            <TextStaggerHover
              index={index}
              text={project.title}
              className={`cursor-pointer text-xl md:text-[28px] leading-tight tracking-tight transition-[color,opacity] duration-500 ${
                isActive ? "font-extrabold text-[#0E0E0E] opacity-100" : "font-medium text-[#0E0E0E] opacity-35"
              }`}
            />
            <p
              className={`text-[11px] font-mono uppercase tracking-[0.22em] mt-2 transition-opacity duration-500 ${
                isActive ? "text-[#9A9A94] opacity-100" : "opacity-0"
              }`}
            >
              {project.tag}
            </p>
            <div className="mt-3 min-h-[48px] md:min-h-[44px]">
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.p
                    key={project.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE.natural }}
                    className="text-sm leading-relaxed text-[#4A4A48] max-w-[32ch]"
                  >
                    {project.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Mobile: each project is a self-contained card (text then image) ──────────
function MobileProjectList() {
  return (
    <div className="flex flex-col gap-12">
      {work.projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE.premium, delay: index * 0.07 }}
          className="flex flex-col gap-4"
        >
          {/* Text */}
          <div>
            <p className="font-extrabold text-[22px] leading-tight tracking-tight text-[#0E0E0E]">
              {project.title}
            </p>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] mt-2 text-[#9A9A94]">
              {project.tag}
            </p>
            <p className="text-sm leading-relaxed text-[#4A4A48] mt-3 max-w-[38ch]">
              {project.description}
            </p>
          </div>

          {/* Image directly below the text */}
          <div className="w-full aspect-[4/3] border border-[#E6E6E0] overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Work() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section className="relative w-full bg-white py-28 md:py-44" id="work">
      {isDesktop ? (
        // ── Desktop: animated hover-slideshow ──────────────────────────────
        <HoverSlider className="w-[88%] max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <p className="eyebrow">{work.eyebrow}</p>
            <h2 className="h2 h2-tight mb-8 md:mb-10">
              {work.headlinePlain}
              <span className="accent">{work.headlineAccent}</span>
            </h2>
            <p className="lead mb-20 md:mb-28 max-w-[46ch]">{work.lead}</p>
          </motion.div>

          <motion.div
            className="flex flex-row items-start gap-[12%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE.premium, delay: 0.1 }}
          >
            <ProjectList />

            {/* Sticky image panel — stays in view while list scrolls */}
            <div className="w-[58%] sticky top-28">
              <HoverSliderImageWrap className="aspect-[4/3] border border-[#E6E6E0]">
                {work.projects.map((project, index) => (
                  <HoverSliderImage
                    key={project.title}
                    index={index}
                    src={project.imageUrl}
                    alt={project.title}
                    className="size-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ))}
              </HoverSliderImageWrap>
            </div>
          </motion.div>
        </HoverSlider>
      ) : (
        // ── Mobile: each project card = text + image ────────────────────────
        <div className="w-[88%] mx-auto px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <p className="eyebrow">{work.eyebrow}</p>
            <h2 className="h2 h2-tight mb-6">
              {work.headlinePlain}
              <span className="accent">{work.headlineAccent}</span>
            </h2>
            <p className="lead mb-12 max-w-[46ch]">{work.lead}</p>
          </motion.div>

          <MobileProjectList />
        </div>
      )}
    </section>
  );
}
