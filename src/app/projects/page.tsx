import type { Metadata } from "next";

import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/projects",
  },

  title: "Projects",
  description:
    "Explore ClimateWatch projects across climate education, community evidence, applied research and international climate-policy tracking.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}