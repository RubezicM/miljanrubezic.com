"use client";

import dynamic from "next/dynamic";

import React from "react";
import { motion } from "framer-motion";
import servicesAnimation, { parent } from "@/animations/services";
import { BsArrowDownRight } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const HoverEffect = dynamic(() => import("@/components/HoverEffect"), {
  ssr: false,
});
const InfiniteSlider = dynamic(() => import("@/components/InfiniteSlider"), {
  ssr: false,
});
import type {
  ComponentSharedServicesSection,
  Service,
  Skill,
} from "@/gql/graphql";

interface ServicesSectionProps {
  data: ComponentSharedServicesSection;
}

const ServicesSection = ({ data }: ServicesSectionProps) => {
  const validServices =
    data?.services.filter((service): service is Service => service !== null) ||
    [];
  const validSkills =
    data?.skills.filter((skill): skill is Skill => skill !== null) || [];
  return (
    <section className="my-6" id="services">
      <div className="container mx-auto">
        <h2 className="font-bold uppercase text-[clamp(32px,8vw,100px)] tracking-tight">
          Services
        </h2>
        <motion.div
          variants={parent}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1"
        >
          <>
            {validServices &&
              validServices.map((service: Service) => (
                <motion.div
                  key={service.documentId}
                  variants={servicesAnimation.item}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.6 }}
                  className="border-t py-6 lg:py-12 border-white/20 last:border-b"
                >
                  <HoverEffect
                    effectSize={72}
                    showUnderline={false}
                    key={service.documentId}
                  >
                    <div className="flex-1 flex flex-col justify-center gap-3 group cursor-none">
                      <div className="w-full flex justify-between items-center">
                        <div className="text-lg md:text-5xl font-extrabold text-outline text-accent group-hover:text-outline-hover transition-all duration-500">
                          / {service.mark}
                        </div>
                        <h2 className="text-xl md:text-3xl font-bold leading-[1.5] text-white group-hover:text-accent transition-all duration-500 mr-auto ml-4">
                          {service.title}
                        </h2>
                        <span className="w-[30px] h-[30px] md:w-[70px] md:h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center group-hover:-rotate-45">
                          <BsArrowDownRight className="text-primary md:text-3xl" />
                        </span>
                      </div>
                      <p className="text-white/80 group-hover:text-accent pl-2 pr-2 transition-all duration-500 text-lg md:text-xl xl:w-1/2">
                        {service.description}
                      </p>
                    </div>
                  </HoverEffect>
                </motion.div>
              ))}
          </>
        </motion.div>
        <div className="">
          <TooltipProvider>
            <InfiniteSlider>
              {validSkills.map((skill: Skill) => {
                return (
                  <Tooltip key={skill.documentId}>
                    <TooltipTrigger
                      key={skill.documentId}
                      className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] bg-[#121212] rounded-xl flex justify-center items-center group border-slate-500 border-opacity-55 border-2 p-2 md:p-6"
                    >
                      <div className="w-full h-full group-hover:text-accent transition-all duration-300 relative p-2 md:p-6">
                        <Image
                          alt={`${skill.name} logo`}
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${skill.icon?.url}`}
                          fill
                          sizes="(max-width: 768px) 60px, 120px"
                          className="object-contain rounded-sm"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="capitalize">{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </InfiniteSlider>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
