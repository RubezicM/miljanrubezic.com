"use client";

import { useEffect, useRef } from "react";
import { useMinWidth } from "@/hooks/useMinWidth";

const RainbowCursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMinWidth(768);

  useEffect(() => {
    if (!isDesktop) return;
    const moveGlow = (e: MouseEvent) => {
      if (glowRef.current) {
        const { clientX: x, clientY: y } = e;
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.top = `${y}px`;
      }
    };

    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, [isDesktop]);
  if (!isDesktop) return null;
  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl mix-blend-screen"
      style={{
        background: `radial-gradient(circle at center,
                 rgba(1,153,203,0.3),
    rgba(216, 70, 255, 0.1)
  )`,
      }}
    />
  );
};

export default RainbowCursorGlow;
