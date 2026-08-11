import type { Metadata } from "next";

import { PublicationsPageContent } from "@/components/publications/PublicationsPageContent";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Browse ClimateWatch publications, climate-policy reports, research and commentary.",
};

export default function PublicationsPage() {
  return <PublicationsPageContent />;
}