import type { Metadata } from "next";

import { TvLivePageContent } from "@/components/tv-live/TvLivePageContent";
import { tvLiveContent } from "@/content/tv-live";
import { fetchYouTube } from "@/lib/news/fetchers";

export const metadata: Metadata = {
  alternates: {
    canonical: "/tv-live",
  },

  title: "TV Live",

  description:
    "Live coverage of climate negotiations, field reporting from mountain communities, briefings and recorded conversations from ClimateWatch.",
};

/** Rebuilt hourly so new uploads appear without a deploy. */
export const revalidate = 3600;

export default async function TvLivePage() {
  /*
   * The broadcast list is the channel feed. It is fetched rather than
   * hard-coded so the page cannot advertise a video that does not exist —
   * see the note in src/content/tv-live.ts.
   */
  const videos = await fetchYouTube(
    tvLiveContent.channel.id,
    12,
  );

  return (
    <TvLivePageContent
      videos={videos}
    />
  );
}
