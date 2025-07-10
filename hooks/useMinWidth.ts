"use client";
import { useState, useEffect } from "react";

export function useMinWidth(minWidth: number) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= minWidth;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = `(min-width: ${minWidth}px)`;
    const mql = window.matchMedia(query);

    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mql.addEventListener("change", handler);

    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [minWidth]);

  return matches;
}
