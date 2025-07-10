"use client";

import React, { Suspense, useState } from "react";
import type { ComponentSharedHeroSection } from "@/gql/graphql";

const LazyPhoto = React.lazy(() => import("@/components/AvatarPhoto"));

interface HeroSectionProps {
  data: ComponentSharedHeroSection;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen 2xl:gap-12"
      id="home"
    >
      <div className="container">
        <div className="flex flex-col items-center xl:pt-8 xl:pb-24">
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <span className="hero-greeting text-md text-accent text-center w-full block mb-3 font-secondary">
              {data.greeting}
            </span>
            <Suspense
              fallback={
                <div className="h-[264px] w-[264px] xl:w-[430px] xl:h-[430px]" />
              }
            >
              <LazyPhoto externalHover={ctaHover} />
            </Suspense>
          </div>

          <div className="text-center xl:order-none order-2 space-y-4 mt-2 h-full">
            <h1 className="hero-title text-[clamp(40px,6vw,80px)] leading-[1.1] font-bold text-white uppercase">
              {data.headline}
            </h1>
            <h2 className="hero-subtitle text-[clamp(20px,4vw,48px)] leading-[1.1] font-semibold text-semilight">
              {data.subheadline}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
