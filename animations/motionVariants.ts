import { Variants } from "framer-motion";

export type Direction = "left" | "right" | "up" | "down";

export function slideIn(
  direction: Direction,
  delay = 0,
  duration = 0.7,
  useParentTiming = false,
): Variants {
  let x = 0,
    y = 0;
  switch (direction) {
    case "left":
      x = -80;
      break;
    case "right":
      x = 50;
      break;
    case "up":
      y = 80;
      break;
    case "down":
      y = -20;
      break;
  }

  const transition = useParentTiming
    ? {}
    : { delay, duration, ease: [0.42, 0, 0.58, 1] };

  return {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition,
    },
  };
}
