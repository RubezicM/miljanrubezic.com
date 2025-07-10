import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ClientWrapper from "@/components/pages/ClientWrapper";

import type {
  ComponentSharedHeroSection,
  ComponentSharedAboutMeSection,
  ComponentSharedServicesSection,
  ComponentSharedFooter,
} from "@/gql/graphql";
import Footer from "@/components/Footer";
import React from "react";

interface HomepageProps {
  data: {
    hero: ComponentSharedHeroSection;
    about: ComponentSharedAboutMeSection;
    services: ComponentSharedServicesSection;
    footer: ComponentSharedFooter;
  };
}

const Homepage = ({ data }: HomepageProps) => {
  return (
    <ClientWrapper>
      <HeroSection data={data.hero} />
      <ExperienceSection data={data.about} />
      <ServicesSection data={data.services} />
      <Footer data={data.footer} />
    </ClientWrapper>
  );
};

export default Homepage;
