import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";
import { termsContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the ClimateWatch Terms of Use covering website access, research materials, external links and acceptable use.",
};

export default function TermsPage() {
  return (
    <LegalPage
      {...termsContent}
    />
  );
}