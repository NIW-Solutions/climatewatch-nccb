import type { Metadata } from "next";

import { ResourcesPageContent } from "@/components/resources/ResourcesPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/resources",
  },

  title: "Resources",
  description:
    "ClimateWatch working resources for climate research, project design, proposal development, reference materials and media enquiries.",
};

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}