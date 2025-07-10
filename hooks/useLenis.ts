// /hooks/useLenis.tsx

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * useLenis
 *
 * Initializes Lenis for smooth, inertial scrolling across the entire page.
 * Call this hook once.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenisRef.current) return;

    // 1) Create the Lenis instance with preferred options.
    const lenis = new Lenis({
      duration: 1.3,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
