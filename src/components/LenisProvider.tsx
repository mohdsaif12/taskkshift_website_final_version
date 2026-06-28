"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Prevent the browser from restoring the last scroll position on refresh.
    // Without this, browsers (especially Chrome/Safari) replay the previous
    // scroll offset before JS runs, landing the user somewhere mid-page or
    // at the footer instead of the top.
    if (typeof history !== "undefined") {
      history.scrollRestoration = "manual";
    }

    // Ensure we always start at the very top of the page.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.7,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
