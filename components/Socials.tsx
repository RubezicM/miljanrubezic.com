import Link from "next/link";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

type SocialProps = {
  containerStyles?: string;
  iconStyles?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

const Socials = ({
  containerStyles = "",
  iconStyles = "",
  githubUrl,
  linkedinUrl,
}: SocialProps) => {
  const socialLinks = [
    {
      href: githubUrl,
      icon: (
        <FaGithub className="hover:fill-accent" fill="var(--color-slate)" />
      ),
      label: "GitHub",
    },
    {
      href: linkedinUrl,
      icon: (
        <FaLinkedinIn className="hover:fill-accent" fill="var(--color-slate)" />
      ),
      label: "LinkedIn",
    },
  ].filter((link) => link.href);

  return (
    <div className={containerStyles || ""}>
      {socialLinks.map((item, index) => {
        return (
          <Link
            href={item.href!}
            className={iconStyles}
            key={`${item.label}-${index}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
          >
            <>{item.icon}</>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
