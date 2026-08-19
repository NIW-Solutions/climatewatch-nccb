/**
 * TV Live content — src/content/tv-live.ts
 *
 * There is no hard-coded broadcast list here any more, and there must not
 * be one again. The previous version shipped seven invented broadcasts,
 * each pointing at a famous music video: "Bonn SB64 — opening day briefing"
 * played Rick Astley, "Glacier School 2026 — field dispatch from Passu"
 * played Gangnam Style, and the "Live now" slot played "Me at the zoo".
 * The page was publicly reachable and indexed the whole time.
 *
 * Broadcasts now come from the ClimateWatch YouTube channel feed at request
 * time, so the page can only ever show videos that genuinely exist. Copy in
 * this file describes formats, never a schedule or a volume the channel
 * cannot evidence.
 */

export const tvLiveContent = {
  hero: {
    eyebrow: "ClimateWatch TV",

    title:
      "Climate policy, live from the room.",

    description:
      "Live coverage of negotiations, field reporting from mountain communities, briefings and recorded conversations — published on our YouTube channel.",
  },

  channel: {
    id: "UC39uvi0nzWeDZpXbpwH4lbg",

    url: "https://www.youtube.com/channel/UC39uvi0nzWeDZpXbpwH4lbg",
  },

  featured: {
    eyebrow: "Latest broadcast",

    /*
     * Deliberately not a promise of frequency. The previous copy advertised
     * daily negotiation wraps and monthly field dispatches; the channel
     * carries a handful of videos, so that was a claim the record did not
     * support.
     */
    scheduleNote:
      "We stream during negotiation sessions and publication launches. Subscribe on YouTube to be notified when we go live.",
  },

  schedule: {
    eyebrow: "Programming",

    title:
      "What we broadcast.",

    items: [
      {
        slot: "Negotiation wraps",
        detail:
          "Reviews of developments during UNFCCC subsidiary body and COP sessions.",
      },
      {
        slot: "Field reports",
        detail:
          "Dispatches from glacier monitoring and community programmes.",
      },
      {
        slot: "Policy briefings",
        detail:
          "Publication launches and budget analysis.",
      },
      {
        slot:
          "Climate conversations",
        detail:
          "Recorded interviews with researchers, negotiators and practitioners.",
      },
    ],
  },

  archive: {
    eyebrow: "Broadcasts",

    title:
      "Watch our streams and recordings.",

    description:
      "Everything below is published on the ClimateWatch YouTube channel.",

    emptyNote:
      "The channel feed could not be reached just now. Visit the ClimateWatch channel on YouTube to watch our broadcasts.",
  },

  closing: {
    eyebrow: "Subscribe",

    title:
      "Never miss a live briefing.",

    description:
      "Subscribe on YouTube to be notified when we go live during negotiation sessions and publication launches.",
  },
} as const;

export type TvLiveContent =
  typeof tvLiveContent;
