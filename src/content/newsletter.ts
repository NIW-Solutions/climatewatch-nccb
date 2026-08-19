/**
 * Newsletter content — src/content/newsletter.ts
 */

export const newsletterContent = {
  hero: {
    eyebrow: "Newsletter",

    title:
      "Climate policy from the mountains, in your inbox.",

    description:
      "A periodic briefing from ClimateWatch: what is changing in Gilgit-Baltistan and Chitral, what is moving inside the UNFCCC process, and what our research is finding.",
  },

  signup: {
    eyebrow: "Subscribe",

    title:
      "Get the briefing.",

    description:
      "No more than one email per month. We do not share addresses, and every issue carries a one-click unsubscribe.",

    label: "Email address",

    placeholder:
      "you@organisation.org",

    action: "Subscribe",
  },

  expectations: {
    eyebrow: "What you get",

    title:
      "Written for people who work on this.",

    items: [
      {
        number: "01",
        title:
          "Field evidence from the mountain districts",
        description:
          "Glacier and flood monitoring, community reporting and what our teams are seeing in Gilgit-Baltistan and Chitral.",
      },
      {
        number: "02",
        title:
          "Negotiation tracking",
        description:
          "What actually moved at the SBs and COPs, and what it means for Pakistan's position and for mountain communities.",
      },
      {
        number: "03",
        title:
          "Research and publications first",
        description:
          "New ClimateWatch papers, policy briefs and reports go to subscribers before they are announced anywhere else.",
      },
    ],
  },
} as const;

export type NewsletterContent =
  typeof newsletterContent;
