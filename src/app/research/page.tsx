import type { Metadata } from "next";

import { ResearchPageContent } from "@/components/research/ResearchPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/research",
  },

  title: "Research",
  description:
    "Explore ClimateWatch research across international climate policy, climate finance, adaptation, participation and climate vulnerability.",
};

export default function ResearchPage() {
  return <ResearchPageContent />;
}