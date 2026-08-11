import type { Metadata } from "next";

import { ProgrammesPageContent } from "@/components/programmes/ProgrammesPageContent";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Explore ClimateWatch programmes across international climate policy, education for sustainable development, and research and development.",
};

export default function ProgrammesPage() {
  return <ProgrammesPageContent />;
}