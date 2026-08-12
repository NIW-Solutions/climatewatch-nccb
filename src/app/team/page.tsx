import type { Metadata } from "next";

import { TeamPageContent } from "@/components/team/TeamPageContent";

export const metadata: Metadata = {
  title: "Members & Staff",

  description:
    "Meet the ClimateWatch team across climate policy, research and development, education, partnerships, engineering, projects and communications.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}