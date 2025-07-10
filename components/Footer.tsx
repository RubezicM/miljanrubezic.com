import SideElement from "@/components/SideElement";
import Socials from "@/components/Socials";
import React from "react";
import { FaEnvelope } from "react-icons/fa6";
import { ComponentSharedFooter } from "@/gql/graphql";

interface FooterProps {
  data: ComponentSharedFooter;
}

const Footer = ({ data }: FooterProps) => {
  const githubUrl = data.github_url;
  const linkedinUrl = data.linkedin_url;

  return (
    <>
      <SideElement orientation="left">
        <Socials
          containerStyles="flex flex-col mb-6 items-center gap-4"
          iconStyles="hover:-translate-y-[5px] transition-all text-3xl"
          githubUrl={githubUrl || ""}
          linkedinUrl={linkedinUrl || ""}
        />
      </SideElement>
      <SideElement orientation="right">
        <div className="flex flex-col items-center w-full">
          <a
            href={`mailto:${data.email}`}
            className="font-secondary text-xs side-email tracking-widest my-4 p-2 leading-[1.1] text-light transition-all hover:-translate-y-[5px] hover:text-accent"
          >
            {data.email}
          </a>
        </div>
      </SideElement>

      <footer className="w-full p-2 md:hidden">
        <div className="container">
          <div className="border-t border-slate-400 border-opacity-5 ">
            <a
              href={`mailto:${data.email}`}
              className="font-secondary text-sm my-4 p-2 leading-[1.1] text-light transition-all hover:-translate-y-[5px] hover:text-accent border rounded-lg border-slate-600 inline-flex"
            >
              <FaEnvelope />
              &nbsp;{data.email}
            </a>
            <div className="flex md:hidden justify-between w-full">
              <span className="opacity-35">© {data.copyright}</span>
              <Socials
                containerStyles="flex flex-row items-center gap-4 md:hidden"
                iconStyles="hover:-translate-y-[5px] transition-all text-2xl"
                githubUrl={githubUrl || ""}
                linkedinUrl={linkedinUrl || ""}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
