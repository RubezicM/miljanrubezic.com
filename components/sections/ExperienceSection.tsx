import ExperienceTimeline from "@/components/ExperienceTimeline";
import type { Experience, ComponentSharedAboutMeSection } from "@/gql/graphql";

interface ExperienceSectionProps {
  data: ComponentSharedAboutMeSection;
}

const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  const validExperiences = data.experiences.filter(
    (exp): exp is Experience => exp !== null,
  );
  return (
    <section id="about">
      <div className="container mx-auto">
        <h2 className="font-bold uppercase text-[clamp(32px,8vw,100px)] tracking-tight">
          {data.title || "Experience"}
        </h2>
        <p
          className="text-lg md:text-2xl"
          dangerouslySetInnerHTML={{ __html: data.description || "" }}
        ></p>
        <div className="mt-16">
          <ExperienceTimeline data={validExperiences} />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
