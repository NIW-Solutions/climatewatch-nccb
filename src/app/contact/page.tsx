import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Contact ClimateWatch for climate research, policy, programme, media, partnership and institutional enquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}