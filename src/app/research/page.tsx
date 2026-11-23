import type { Metadata } from "next";

import { ResearchPageContent } from "@/components/research/ResearchPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/research",
  },

  title: "Research",
  description:
    "ClimateWatch Research and Development: research from ClimateWatch Pakistan on international climate policy, climate finance, adaptation and climate vulnerability.",
};

export default function ResearchPage() {
  return <ResearchPageContent />;
}