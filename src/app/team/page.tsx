import type { Metadata } from "next";

import { TeamPageContent } from "@/components/team/TeamPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/team",
  },

  title: "Members, Advisors & Board",

  description:
    "The people behind ClimateWatch Pakistan, the youth-led climate think tank: divisional leadership in climate policy, research and education, advisors and Board.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
