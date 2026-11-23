import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },

  title: "About",
  description:
    "About ClimateWatch Pakistan, a youth-led climate policy think tank: its mission, research approach and climate-policy work across Pakistan.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}