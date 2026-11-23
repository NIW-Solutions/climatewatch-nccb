import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";
import { privacyContent } from "@/content/legal";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
  },

  title: "Privacy Policy",
  description:
    "The ClimateWatch Pakistan Privacy Policy: how information submitted through the website may be handled.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      {...privacyContent}
    />
  );
}