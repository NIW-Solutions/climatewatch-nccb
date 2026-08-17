import type { Metadata } from "next";

import { TeamPageContent } from "@/components/team/TeamPageContent";

export const metadata: Metadata = {
  title: "Members, Advisors & Board",

  description:
    "Meet the people behind ClimateWatch: divisional leadership across climate policy, research, education, partnerships, engineering, projects and communications, alongside our technical advisors and Board of Directors.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
