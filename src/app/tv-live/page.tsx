import type { Metadata } from "next";

import { TvLivePageContent } from "@/components/tv-live/TvLivePageContent";

export const metadata: Metadata = {
  title: "TV Live",

  description:
    "Watch ClimateWatch live on YouTube — negotiation wraps, field reports, policy briefings and climate conversations, plus the full broadcast archive.",
};

export default function TvLivePage() {
  return <TvLivePageContent />;
}
