import type { Metadata } from "next";

import { CareersPageContent } from "@/components/careers/CareersPageContent";
import { careersContent } from "@/content/careers";

export const metadata: Metadata = {
  alternates: {
    canonical: "/careers",
  },

  title: careersContent.meta.title,
  description: careersContent.meta.description,
};

export default function CareersPage() {
  return <CareersPageContent />;
}
