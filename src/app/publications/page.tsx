import type { Metadata } from "next";

import { PublicationsPageContent } from "@/components/publications/PublicationsPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/publications",
  },

  title: "Publications",
  description:
    "ClimateWatch Pakistan publications: climate policy briefs, policy reports, outcome texts and research from Pakistan's youth-led climate think tank.",
};

export default function PublicationsPage() {
  return <PublicationsPageContent />;
}