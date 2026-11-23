import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },

  title: "Contact",

  description:
    "Contact ClimateWatch Pakistan, the youth-led climate think tank, for climate research, policy, programme, media, partnership and institutional enquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}