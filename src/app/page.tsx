import { HomeClosing } from "@/components/home/HomeClosing";
import { HomeCoverage } from "@/components/home/HomeCoverage";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeHowWeWork } from "@/components/home/HomeHowWeWork";
import { HomeIntroduction } from "@/components/home/HomeIntroduction";
import { HomeProgrammes } from "@/components/home/HomeProgrammes";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomePublication } from "@/components/home/HomePublication";
import { HomeResearch } from "@/components/home/HomeResearch";
import { SectionAccordion } from "@/components/shared/SectionAccordion";

/**
 * Home.
 *
 * The hero and the closing call to action stay open: one is the landing
 * impression, the other is the thing we want people to act on, and burying
 * either behind a click would defeat the point. Everything between them
 * stacks as rows that open in place.
 *
 * The section components are unchanged and still render their own
 * headings — they are passed through as children, so they render on the
 * server and the accordion only shows and hides them.
 */
export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <SectionAccordion
        label="Explore ClimateWatch"
        items={[
          {
            id: "who-we-are",
            label: "Who we are",
            summary:
              "A youth-led climate think tank working across policy, research and education in Pakistan.",
            children: <HomeIntroduction />,
          },
          {
            id: "where-we-work",
            label: "Where we work",
            summary:
              "From the cryosphere of the north to the flood plains of the south.",
            children: <HomeCoverage />,
          },
          {
            id: "how-we-work",
            label: "How we work",
            summary:
              "Evidence gathered with communities, carried into policy rooms.",
            children: <HomeHowWeWork />,
          },
          {
            id: "programmes",
            label: "Our programmes",
            summary:
              "International climate policy, education for sustainable development, and research.",
            children: <HomeProgrammes />,
          },
          {
            id: "projects",
            label: "Projects",
            summary:
              "Community education, climate monitoring and negotiation tracking.",
            children: <HomeProjects />,
          },
          {
            id: "research",
            label: "Research",
            summary:
              "Evidence standards, current workstreams and climate-policy analysis.",
            children: <HomeResearch />,
          },
          {
            id: "featured-publication",
            label:
              "Featured publication",
            summary:
              "The latest report from the ClimateWatch research programme.",
            children: <HomePublication />,
          },
        ]}
      />

      <HomeClosing />
    </main>
  );
}
