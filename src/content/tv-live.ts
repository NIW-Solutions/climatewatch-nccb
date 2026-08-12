export type Broadcast = {
  /**
   * YouTube video id.
   *
   * NOTE: every id below is a well-known public placeholder video.
   * Replace each one with the real ClimateWatch broadcast id before launch.
   */
  videoId: string;

  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
};

export const tvLiveContent = {
  hero: {
    eyebrow: "ClimateWatch TV",

    title:
      "Climate policy, live from the room.",

    description:
      "Live coverage of negotiations, field reporting from mountain communities, briefings and recorded conversations — streamed on our YouTube channel.",
  },

  live: {
    eyebrow: "Now streaming",

    /**
     * PLACEHOLDER broadcast. Swap `videoId` for the real stream id, or
     * set `useChannelLiveStream` to true to always embed whatever is
     * currently live on the channel below.
     */
    videoId: "jNQXAC9IVRw",

    title:
      "SB64 daily wrap — adaptation finance and the mountain agenda",

    description:
      "Our negotiation team reviews the day’s developments in the adaptation finance track and what they mean for mountain regions.",

    status: "Live now",

    scheduleNote:
      "Streams weekdays during negotiation sessions, 18:00 PKT.",

    useChannelLiveStream: false,

    channelId:
      "UC39uvi0nzWeDZpXbpwH4lbg",

    channelUrl:
      "https://www.youtube.com/channel/UC39uvi0nzWeDZpXbpwH4lbg",
  },

  schedule: {
    eyebrow: "Programming",

    title:
      "What we broadcast.",

    items: [
      {
        slot: "Negotiation wraps",
        detail:
          "Daily during UNFCCC subsidiary body and COP sessions.",
      },
      {
        slot: "Field reports",
        detail:
          "Monthly dispatches from glacier monitoring and community programmes.",
      },
      {
        slot: "Policy briefings",
        detail:
          "Publication launches and budget analysis, streamed live with Q&A.",
      },
      {
        slot: "Climate conversations",
        detail:
          "Recorded interviews with researchers, negotiators and practitioners.",
      },
    ],
  },

  archive: {
    eyebrow: "Past broadcasts",

    title:
      "Watch previous streams and recordings.",

    description:
      "The full back catalogue is available on the ClimateWatch YouTube channel.",
  },

  broadcasts: [
    {
      videoId: "dQw4w9WgXcQ",

      title:
        "Bonn SB64 — opening day briefing",

      description:
        "Setting out what is on the table at the June session and the issues we are tracking.",

      category: "Negotiation wrap",

      date: "June 2026",

      duration: "42:18",
    },

    {
      videoId: "9bZkp7q19f0",

      title:
        "Glacier School 2026 — field dispatch from Passu",

      description:
        "Students measure glacier retreat alongside our research team in upper Hunza.",

      category: "Field report",

      date: "May 2026",

      duration: "28:04",
    },

    {
      videoId: "kJQP7kiw5Fk",

      title:
        "Launch: From Disaster Response to Climate Resilience",

      description:
        "Publication launch and panel discussion on the Gilgit-Baltistan climate budget assessment.",

      category: "Policy briefing",

      date: "June 2026",

      duration: "1:06:52",
    },

    {
      videoId: "JGwWNGJdvx8",

      title:
        "What loss and damage finance actually reaches communities",

      description:
        "A conversation on access pathways, institutional readiness and the gap between pledge and delivery.",

      category: "Climate conversation",

      date: "April 2026",

      duration: "51:37",
    },

    {
      videoId: "OPf0YbXqDm0",

      title:
        "GLOF early warning — how the system works",

      description:
        "Walking through hazard monitoring, alert thresholds and community response protocols.",

      category: "Field report",

      date: "March 2026",

      duration: "34:11",
    },

    {
      videoId: "fJ9rUzIMcZQ",

      title:
        "Reading Pakistan’s FY2026–27 climate budget",

      description:
        "Line-by-line analysis of what was cut, what was relabelled and what it means for resilience.",

      category: "Policy briefing",

      date: "June 2026",

      duration: "58:29",
    },
  ] satisfies readonly Broadcast[],

  closing: {
    eyebrow: "Subscribe",

    title:
      "Never miss a live briefing.",

    description:
      "Subscribe on YouTube to be notified when we go live during negotiation sessions and publication launches.",
  },
} as const;
