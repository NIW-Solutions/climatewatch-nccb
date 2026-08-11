import type { Metadata } from "next";

import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore ClimateWatch projects across climate education, community evidence, applied research and international climate-policy tracking.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}