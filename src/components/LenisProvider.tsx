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
