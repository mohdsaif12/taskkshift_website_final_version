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

export default function Work() {
  return (
    <section className="relative w-full bg-white py-28 md:py-44" id="work">
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
          className="flex flex-col md:flex-row items-start gap-16 md:gap-[12%]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE.premium, delay: 0.1 }}
        >
          <ProjectList />

          {/* Sticky within the row only — plain CSS, no scroll-jacking.
              Keeps the image in view while the (taller) list scrolls past
              beside it, instead of the image scrolling away before you
              reach the last project. */}
          <div className="w-full md:w-[58%] md:sticky md:top-28">
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
    </section>
  );
}
