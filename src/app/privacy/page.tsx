import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";
import { privacyContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the ClimateWatch Privacy Policy and learn how information submitted through the website may be handled.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      {...privacyContent}
    />
  );
}