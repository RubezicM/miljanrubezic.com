// animations/home.ts
import { Variants } from "framer-motion";
import { createPageVariants } from "./createPageVariants";

const duration = 0.4;
export const servicesAnimation: Record<string, Variants> = {
  item: createPageVariants({
    initial: { opacity: 0, y: -80 },
    animate: { opacity: 1, y: 0, transition: { duration } },
    exit: { opacity: 0, y: -80, transition: { duration } },
  }),
};

export const parent = {
  initial: {},
  animate: {
    transition: {
      duration,
      when: "beforeChildren",
      staggerChildren: 2,
      delayChildren: 0,
    },
  },
};
export default servicesAnimation;
