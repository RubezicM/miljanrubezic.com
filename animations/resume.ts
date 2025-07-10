// animations/home.ts
import { Variants } from "framer-motion";
import { createPageVariants } from "./createPageVariants";

const duration = 0.4;

export const resumeTimelineAnimations: Record<string, Variants> = {
  timelineDot: createPageVariants({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration, delay: 0.2 } },
  }),
  timelineLine: createPageVariants({
    initial: { opacity: 0, y: 150 },
    animate: { opacity: 1, y: 0, transition: { duration, delay: 0.4 } },
    exit: { opacity: 0, y: 150, transition: { duration } },
  }),
  dotPulse: createPageVariants({
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration,
      },
    },
  }),
  cardLeft: createPageVariants({
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0, transition: { duration } },
    exit: { opacity: 0, x: -80, transition: { duration } },
  }),
  cardRight: createPageVariants({
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0, transition: { duration } },
  }),
  timeLineStagger: createPageVariants({
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration } },
    exit: { opacity: 0, x: -50, transition: { duration } },
  }),
};

export const timelineStaggerParent = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration,
      staggerChildren: 0.075,
      staggerDirection: -1,
    },
  },
};
