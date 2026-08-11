import type { Metadata } from "next";

import { NewsPageContent } from "@/components/news/NewsPageContent";

export const metadata: Metadata = {
  title: "News",
  description:
    "Read ClimateWatch policy updates, research releases, climate commentary and institutional news.",
};

export default function NewsPage() {
  return <NewsPageContent />;
}