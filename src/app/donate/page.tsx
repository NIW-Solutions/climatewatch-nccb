import type { Metadata } from "next";

import { DonatePageContent } from "@/components/donate/DonatePageContent";

export const metadata: Metadata = {
  title: "Donate",

  description:
    "Support ClimateWatch — youth-led climate research, fieldwork in Gilgit-Baltistan and Chitral, and representation at UN climate negotiations.",
};

export default function DonatePage() {
  return <DonatePageContent />;
}
