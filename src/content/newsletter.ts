/**
 * Newsletter content — src/content/newsletter.ts
 *
 * `issues` is intentionally empty. Add real issues as they are published
 * rather than shipping placeholder entries — the team page carried
 * illustrative records for months and it was not obvious which were real.
 *
 * To add an issue, drop the PDF in public/documents/newsletter/ and append:
 *
 *   {
 *     number: "01",
 *     slug: "2026-09-mountain-frontlines",
 *     title: "…",
 *     date: "September 2026",
 *     summary: "…",
 *     href: "/documents/newsletter/2026-09.pdf",
 *   }
 */

export type NewsletterIssue = {
  number: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  href: string;
};

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

  archive: {
    eyebrow: "Archive",

    title: "Past issues.",

    description:
      "Every issue stays available to read in full.",

    emptyNote:
      "The first issue is in preparation. Subscribe above and it will reach you directly.",
  },

  issues:
    [] as readonly NewsletterIssue[],
} as const;

export type NewsletterContent =
  typeof newsletterContent;
