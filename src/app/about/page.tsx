import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },

  title: "About",
  description:
    "Learn about ClimateWatch, its institutional role, mission, research approach and climate-policy work across Pakistan.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}