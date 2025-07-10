import React, { ReactNode, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useMinWidth } from "@/hooks/useMinWidth";

interface InfiniteSliderProps {
  children: ReactNode;
  speed?: number;
}

export function InfiniteSlider({ children, speed = 100 }: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(inViewRef, { once: true });
  const isDesktop = useMinWidth(768);

  // Only run slider animation on desktop
  useEffect(() => {
    if (!isDesktop) return;
    if (!trackRef.current) return;
    const fullWidth = trackRef.current.scrollWidth / 2;
    controls.start({
      x: [-fullWidth, 0],
      transition: {
        x: { repeat: Infinity, ease: "linear", duration: fullWidth / speed },
      },
    });
  }, [controls, speed, isDesktop]);

  // ---- DESKTOP: Infinite Slider ----
  if (isDesktop) {
    return (
      <div
        ref={inViewRef}
        className="relative w-full overflow-hidden py-5 lg:py-10 masked-edge"
        style={{ height: "auto" }}
      >
        {/* sliding track */}
        <motion.div
          ref={trackRef}
          className="flex whitespace-nowrap"
          animate={controls}
          style={{ willChange: "transform" }}
        >
          <>
            {React.Children.toArray(children)
              .concat(React.Children.toArray(children))
              .map((child, idx) => (
                <motion.div
                  key={idx}
                  className="mx-1 lg:mx-4 inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: inView ? idx * 0.1 : 0, duration: 0.3 }}
                  style={{ willChange: "transform" }}
                >
                  {child}
                </motion.div>
              ))}
          </>
        </motion.div>
      </div>
    );
  }

  // ---- MOBILE: Horizontal Scrollable List ----
  return (
    <div className="w-full overflow-x-auto flex gap-1 py-4 masked-edge">
      {React.Children.map(children, (child, idx) => (
        <div key={idx} className="inline-block mx-1">
          {child}
        </div>
      ))}
    </div>
  );
}
