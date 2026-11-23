import type { Metadata } from "next";

import { NewsletterPageContent } from "@/components/newsletter/NewsletterPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/newsletter",
  },

  title: "Newsletter",

  description:
    "A periodic ClimateWatch Pakistan briefing on climate impacts in Gilgit-Baltistan and Chitral, UNFCCC negotiations and new climate policy research.",
};

export default function NewsletterPage() {
  return <NewsletterPageContent />;
}
