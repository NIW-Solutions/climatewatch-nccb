import { HomeClosing } from "@/components/home/HomeClosing";
import { HomeCoverage } from "@/components/home/HomeCoverage";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeHowWeWork } from "@/components/home/HomeHowWeWork";
import { HomeIntroduction } from "@/components/home/HomeIntroduction";
import { HomeProgrammes } from "@/components/home/HomeProgrammes";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomePublication } from "@/components/home/HomePublication";
import { HomeResearch } from "@/components/home/HomeResearch";

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <HomeIntroduction />

      <HomeCoverage />

      <HomeHowWeWork />

      <HomeProgrammes />

      <HomeProjects />

      <HomeResearch />

      <HomePublication />

      <HomeClosing />
    </main>
  );
}