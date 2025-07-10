// animations/createPageVariants.ts
import { Variants } from "framer-motion";

interface PageVariantConfig {
    initial: Variants["initial"];
    animate: Variants["animate"];
    exit?: Variants["exit"] | "reverse";
}


// use initial state as exit (reversing the entrance).
export function createPageVariants(config: PageVariantConfig): Variants {
    const { initial, animate } = config;
    // we have custom exit? then we use that
    const exit = config.exit && config.exit !== "reverse"
        ? config.exit
        : { ...initial, transition: (animate as any)?.transition || {} };
    return { initial, animate, exit };
}
