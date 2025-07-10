"use client";

import { motion } from "framer-motion";
import {
  resumeTimelineAnimations as anims,
  timelineStaggerParent,
} from "@/animations/resume";
import { marked } from "marked";
import { useMinWidth } from "@/hooks/useMinWidth";
import type { Experience } from "@/gql/graphql";

marked.use({
  breaks: true,
  gfm: true,
});

interface ExperienceTimelineProps {
  data: Experience[] | undefined;
}

export default function ExperienceTimeline({ data }: ExperienceTimelineProps) {
  const isDesktop = useMinWidth(768);
  return (
    <div className="flex flex-col items-center py-8 relative gap-6">
      {data &&
        data.map((exp, i) => {
          const cardVariant = isDesktop
            ? anims[exp.side === "left" ? "cardLeft" : "cardRight"]
            : anims.timelineDot;
          return (
            <motion.div
              key={i}
              variants={timelineStaggerParent}
              initial="initial"
              animate="animate"
              className="relative xl:w-[90%]"
            >
              <div className="hidden lg:block absolute transform right-1/2 translate-x-[50%] bottom-1/2 translate-y-[50%] w-6 h-6">
                <motion.div
                  className="w-6 h-6 rounded-full bg-[#00A2FF] border-[#36B5FF] border-2 shadow-xl"
                  variants={anims.timelineDot}
                  initial="initial"
                  whileInView={isDesktop ? "animate" : ""}
                  viewport={{ once: true, amount: 0.3 }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-6 h-6 rounded-full bg-sky-500 blur-md"
                  variants={anims.dotPulse}
                  whileInView={isDesktop ? "animate" : ""}
                  viewport={{ once: true, amount: 0.3 }}
                />
              </div>

              <motion.div
                className={`mt-4 lg:w-1/2  ${exp.side === "left" ? "lg:pr-12" : "lg:ml-auto lg:pl-12 lg:pr-0"}`}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.4 }}
                variants={cardVariant}
              >
                <div className="bg-[#121212] text-white shadow-xl p-3 lg:p-7 rounded-xl hover:shadow-md hover:bg-[#2a2a30] border-slate-500 border-opacity-55 border-4 transition cursor-none ">
                  <div className="grid grid-cols-[60px_minmax(0,1fr)_auto] md:grid-cols-[120px_1fr_auto] items-center gap-2 md:gap-3 mb-4 border-b-2 border-b-slate-500 border-opacity-35 pb-2">
                    <span className="text-accent font-bold text-xs sm:text-sm">
                      {exp.duration}
                    </span>
                    <h3 className="uppercase font-bold text-xs sm:text-sm min-w-0">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-3">
                      <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                      <p className="text-white/60 text-xs sm:text-sm min-w-0 truncate">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <div>
                    {exp.bullets && (
                      <div
                        className="mt-2 text-white/70 space-y-1 description-content text-lg md:text-xl pl-3"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(exp.bullets),
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      <motion.div
        variants={anims.timelineLine}
        initial="initial"
        whileInView={isDesktop ? "animate" : ""}
        animate="animate"
        className="absolute top-0 left-1/2 w-0 transform translate-x-[50%] border-l-[1px] border-dashed opacity-25 h-full border-slate-600 z-[-1]"
      />
    </div>
  );
}
