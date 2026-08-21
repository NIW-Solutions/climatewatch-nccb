import type { Metadata } from "next";

import { TeamPageContent } from "@/components/team/TeamPageContent";

export const metadata: Metadata = {
  title: "Members, Advisors & Board",

  description:
    "The people behind ClimateWatch: divisional leadership across climate policy, research and education, with our technical advisors and Board of Directors.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
