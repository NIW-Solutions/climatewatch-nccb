import type { Metadata } from "next";

import { TeamPageContent } from "@/components/team/TeamPageContent";

export const metadata: Metadata = {
  title: "Our Team",

  description:
    "Meet the ClimateWatch team working across climate policy, research and development, education, project management, partnerships and technical engineering.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}