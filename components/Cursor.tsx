// components/Cursor.tsx

"use client";

import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { useMinWidth } from "@/hooks/useMinWidth";

const OUTER_SIZE = 30;
const INNER_SIZE = 6;

const Cursor = () => {
  const { hideCursor, cursorVisible, setCursorVisible } = useCursor();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothOuterX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothOuterY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const smoothInnerX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const smoothInnerY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const innerX = useTransform(
    smoothInnerX,
    (val) => val + OUTER_SIZE / 2 - INNER_SIZE / 2,
  );
  const innerY = useTransform(
    smoothInnerY,
    (val) => val + OUTER_SIZE / 2 - INNER_SIZE / 2,
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - OUTER_SIZE / 2);
      mouseY.set(e.clientY - OUTER_SIZE / 2);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      <>
        {!hideCursor && (
          <motion.div
            className="target-cursor"
            style={{
              opacity: cursorVisible ? 1 : 0,
              pointerEvents: "none",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="outer-circle"
              style={{
                left: smoothOuterX,
                top: smoothOuterY,
              }}
            />
            <motion.div
              className="inner-circle"
              style={{
                left: innerX,
                top: innerY,
              }}
            />
          </motion.div>
        )}
      </>
    </AnimatePresence>
  );
};

export default Cursor;
