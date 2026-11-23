import type { Metadata } from "next";

import { NewsPageContent } from "@/components/news/NewsPageContent";
import { getNewsFeed } from "@/lib/news";

export const metadata: Metadata = {
  alternates: {
    canonical: "/news",
  },

  title: "News",
  description:
    "Climate news from ClimateWatch Pakistan: coverage from Gilgit-Baltistan, Chitral and Pakistan, UNFCCC negotiations, press briefings and youth climate spaces.",
};

/**
 * Rebuilt hourly. Must be a literal — Next requires the value to be
 * statically analysable, so `60 * 60` is rejected.
 */
export const revalidate = 3600;

export default async function NewsPage() {
  const feedSections =
    await getNewsFeed();

  return (
    <NewsPageContent
      feedSections={feedSections}
    />
  );
}
