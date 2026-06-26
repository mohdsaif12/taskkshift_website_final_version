"use client";

import { useCallback } from "react";

/**
 * Returns an onMouseMove handler that gives a magnetic drift effect.
 * The element will translate up to `maxDrift` px toward the cursor.
 * Attach ref to the element, onMouseMove to the same element, and
 * call reset() on onMouseLeave.
 */
export function useMagneticHover(maxDrift = 4) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / rect.width) * maxDrift * 2;
      const dy = ((e.clientY - cy) / rect.height) * maxDrift * 2;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [maxDrift]
  );

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 400ms ease";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return { handleMouseMove, handleMouseLeave };
}
