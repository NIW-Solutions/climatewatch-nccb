import type { Metadata } from "next";

import { ProgrammesPageContent } from "@/components/programmes/ProgrammesPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/programmes",
  },

  title: "Programmes",
  description:
    "ClimateWatch Pakistan programmes: ClimateWatch International Climate Policy, ClimateWatch Research and Development, and Education for Sustainable Development.",
};

export default function ProgrammesPage() {
  return <ProgrammesPageContent />;
}