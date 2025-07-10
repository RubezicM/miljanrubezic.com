"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useCursor } from "@/context/CursorContext";
import { useMinWidth } from "@/hooks/useMinWidth";

interface HoverEffectProps {
  children: React.ReactNode;
  effectSize?: number;
  showUnderline?: boolean;
}

const HoverEffect = ({
  children,
  effectSize = 120,
  showUnderline = true,
}: HoverEffectProps) => {
  const isDesktop = useMinWidth(768);

  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { setHideCursor, setCursorVisible } = useCursor(); // Get setCursorVisible from context
  const hoverRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const HOTSPOT_OFFSET_X = -(effectSize / 2);
  const HOTSPOT_OFFSET_Y = -(effectSize / 2);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseEnter = () => {
    if (hoverRef.current) {
      const rect = hoverRef.current.getBoundingClientRect();
      setUnderlineWidth(rect.width);
    }
    setHideCursor(true);
    setCursorVisible(false);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHideCursor(false);
    setCursorVisible(true);
    setHovered(false);
  };

  if (!isDesktop) {
    return <>{children}</>;
  }
  const hoverStyle = hovered
    ? {
        left: cursorPos.x + HOTSPOT_OFFSET_X,
        top: cursorPos.y + HOTSPOT_OFFSET_Y,
        width: effectSize,
        height: effectSize,
      }
    : undefined;
  return (
    <span
      ref={hoverRef}
      className="hoverable relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        <>
          {hovered && isDesktop && (
            <>
              <motion.div
                className="hover-effect"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={hoverStyle}
              />
              {showUnderline && (
                <motion.div
                  className="hover-underline"
                  initial={{ width: 0 }}
                  animate={{ width: underlineWidth }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </>
          )}
        </>
      </AnimatePresence>
      {children}
    </span>
  );
};

export default HoverEffect;
