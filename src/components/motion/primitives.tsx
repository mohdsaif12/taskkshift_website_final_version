"use client";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { motion, useInView, MotionValue } from "framer-motion";
import { EASE } from "./easings";

// ─── SlideIn ──────────────────────────────────────────────────────────────────
export function SlideIn({
  children,
  delay = 0,
  duration = 1.2,
  y = 40,
  amount = 0.5,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE.premium, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
export function FadeIn({
  children,
  delay = 0,
  duration = 1.4,
  amount = 0.5,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE.premium, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── BlurIn ───────────────────────────────────────────────────────────────────
export function BlurIn({
  children,
  delay = 0,
  amount = 0.5,
  className,
}: {
  children: ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 2, ease: "linear", delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealIn ─────────────────────────────────────────────────────────────────
export function RevealIn({
  children,
  delay = 0,
  duration = 1,
  amount = 0.5,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE.cinematic, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── WinkIn ───────────────────────────────────────────────────────────────────
export function WinkIn({
  children,
  delay = 0,
  amount = 0.4,
  className,
}: {
  children: ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "circle(0% at 50% 50%)", rotate: -8, opacity: 0 }}
      whileInView={{
        clipPath: "circle(100% at 50% 50%)",
        rotate: 0,
        opacity: 1,
      }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.2, ease: EASE.cinematic, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerGroup + staggerChild ──────────────────────────────────────────────
export const staggerChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE.premium },
  },
};

export function StaggerGroup({
  children,
  stagger = 0.12,
  amount = 0.3,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
// Two trigger modes:
// - `progress` (a scroll-linked MotionValue) drives the count directly off
//   scroll position. Preferred inside pinned/sticky sections, where
//   IntersectionObserver-based viewport detection (whileInView/useInView)
//   does not reliably fire.
// - Without `progress`, falls back to the original useInView + rAF count-up.
export function Counter({
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  progress,
  range = [0, 0.3],
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  progress?: MotionValue<number>;
  range?: [number, number];
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!progress) return;
    const [from, to2] = range;
    const apply = (v: number) => {
      const t = Math.min(Math.max((v - from) / (to2 - from), 0), 1);
      setCount(Math.round(to * t));
    };
    apply(progress.get());
    return progress.on("change", apply);
  }, [progress, to, range]);

  useEffect(() => {
    if (progress || !inView) return;
    const start = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, progress]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
export function Marquee({
  children,
  duration = 30,
  direction = "left",
  className,
  gapClass = "gap-[30px]",
}: {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  className?: string;
  gapClass?: string;
}) {
  return (
    <div className={`group/marquee overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex whitespace-nowrap animate-marquee"
        style={{ display: "flex", flexWrap: "nowrap" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className={`flex shrink-0 items-center ${gapClass}`}>{children}</div>
        <div className={`flex shrink-0 items-center ${gapClass}`} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// ─── BlinkingCursor ───────────────────────────────────────────────────────────
export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <motion.span
      className={className}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        times: [0, 0.5, 1],
      }}
    >
      |
    </motion.span>
  );
}

// ─── RotatingRing ─────────────────────────────────────────────────────────────
export function RotatingRing({
  children,
  duration = 7,
  className,
}: {
  children?: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}
