"use client";

import { MotionValue, useTransform, EasingFunction } from "framer-motion";

/**
 * Drop-in replacement for `useTransform(progress, range, output)` when
 * `progress` is a scrollYProgress-style value.
 *
 * Framer Motion automatically accelerates scroll-linked useTransform calls
 * by routing them through the browser's native ScrollTimeline/ViewTimeline
 * API when supported. In this codebase that fast path computes progress
 * independently per styled element (based on that element's own position)
 * rather than from the shared scrollYProgress value, which produces
 * inconsistent, incorrect results for elements stacked inside a
 * position: sticky pinned section. Routing through an intermediate
 * clamp:false step, then a manual JS clamp, opts out of the native
 * acceleration path (it only activates for plain array-range transforms)
 * and forces the reliable JS-computed path while preserving identical
 * clamped output.
 *
 * An optional `ease` shapes the local 0-1 progress before it's mapped to
 * `output`, so a scroll-linked reveal doesn't feel like a strictly linear
 * (mechanical) tween.
 */
export function useScrollRange<T extends number | string>(
  progress: MotionValue<number>,
  range: [number, number],
  output: [T, T],
  ease?: EasingFunction
): MotionValue<T> {
  const raw = useTransform(progress, range, [0, 1], { clamp: false });
  const clamped = useTransform(raw, (v) => {
    const t = Math.min(Math.max(v, 0), 1);
    return ease ? ease(t) : t;
  });
  return useTransform(clamped, [0, 1], output);
}
