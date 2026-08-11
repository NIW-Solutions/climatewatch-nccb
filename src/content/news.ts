export type NewsCategory =
  | "climate"
  | "policy"
  | "research"
  | "event"
  | "institutional";

export type NewsItem = {
  number: string;
  slug: string;
  category: NewsCategory;
  categoryLabel: string;
  date: string;
  title: string;
  description: string;
  href: string;
};

const linkedIn =
  "https://www.linkedin.com/company/climatewatch-pk/";

export const newsContent = {
  hero: {
    eyebrow: "News & updates",

    title:
      "What ClimateWatch is working on, publishing and responding to.",

    description:
      "Research releases, policy engagement, climate developments, events and institutional updates from across ClimateWatch.",
  },

  featured: {
    eyebrow: "Lead story",

    category:
      "Climate response",

    date:
      "August 2026",

    title:
      "Climate emergency in Gilgit-Baltistan & Chitral",

    description:
      "ClimateWatch is drawing attention to intensifying climate risks across northern Pakistan, including glacier-related hazards, flash floods, landslides and growing pressure on mountain communities.",

    href: linkedIn,
  },

  highlights: [
    {
      number: "01",

      slug:
        "gys-2026-contributions",

      category: "policy",

      categoryLabel:
        "Policy engagement",

      date:
        "July 2026",

      title:
        "Contributions invited for the Global Youth Statement 2026",

      description:
        "ClimateWatch invited youth and climate stakeholders to contribute perspectives across climate finance, adaptation, loss and damage, disaster risk reduction and wider climate priorities.",

      href: linkedIn,
    },

    {
      number: "02",

      slug:
        "disaster-response-climate-resilience",

      category: "research",

      categoryLabel:
        "Research release",

      date:
        "July 2026",

      title:
        "From Disaster Response to Climate Resilience",

      description:
        "ClimateWatch released a climate-budget assessment examining resilience, public spending and longer-term adaptation priorities in Gilgit-Baltistan.",

      href: linkedIn,
    },

    {
      number: "03",

      slug:
        "pakistan-heatwaves",

      category: "climate",

      categoryLabel:
        "Climate update",

      date:
        "July 2026",

      title:
        "Understanding Pakistan’s intensifying heatwaves",

      description:
        "A ClimateWatch update examining extreme heat through public-health, labour, climate-risk and climate-justice perspectives.",

      href: linkedIn,
    },
  ] satisfies readonly NewsItem[],

  archive: {
    eyebrow:
      "Newsroom",

    title:
      "Latest from ClimateWatch",

    description:
      "A running record of research activity, events, policy engagement and institutional developments.",
  },

  items: [
    {
      number: "01",

      slug:
        "climate-emergency-gb-chitral",

      category: "climate",

      categoryLabel:
        "Climate response",

      date:
        "August 2026",

      title:
        "Climate emergency in Gilgit-Baltistan & Chitral",

      description:
        "A public update drawing attention to intensifying climate risk across mountain communities in Gilgit-Baltistan and Chitral.",

      href: linkedIn,
    },

    {
      number: "02",

      slug:
        "gys-2026-contributions",

      category: "policy",

      categoryLabel:
        "Policy engagement",

      date:
        "July 2026",

      title:
        "Contributions invited for the Global Youth Statement 2026",

      description:
        "An invitation for youth perspectives across international climate-policy priorities and negotiation themes.",

      href: linkedIn,
    },

    {
      number: "03",

      slug:
        "disaster-response-climate-resilience",

      category: "research",

      categoryLabel:
        "Research release",

      date:
        "July 2026",

      title:
        "From Disaster Response to Climate Resilience",

      description:
        "A ClimateWatch assessment of climate resilience and public spending in Gilgit-Baltistan’s FY2026–27 interim budget.",

      href: linkedIn,
    },

    {
      number: "04",

      slug:
        "pakistan-heatwaves",

      category: "climate",

      categoryLabel:
        "Climate update",

      date:
        "July 2026",

      title:
        "Pakistan’s intensifying heatwaves",

      description:
        "Climate commentary examining extreme heat and its growing implications for people, livelihoods and climate resilience.",

      href: linkedIn,
    },

    {
      number: "05",

      slug:
        "external-advisory-board",

      category:
        "institutional",

      categoryLabel:
        "Institutional",

      date:
        "July 2026",

      title:
        "External Advisory Board call",

      description:
        "An institutional update relating to external advisory participation in ClimateWatch’s research and programme environment.",

      href: linkedIn,
    },

    {
      number: "06",

      slug:
        "education-sustainable-development-lecture",

      category: "event",

      categoryLabel:
        "Event",

      date:
        "2026",

      title:
        "Education for Sustainable Development lecture",

      description:
        "A ClimateWatch learning session focused on Education for Sustainable Development and its role in climate education and public participation.",

      href: linkedIn,
    },
  ] satisfies readonly NewsItem[],

  source: {
    eyebrow:
      "Follow the work",

    title:
      "News develops faster than a website archive.",

    description:
      "ClimateWatch also publishes active updates through its public social channels, including research releases, events and policy engagement.",

    action: {
      label:
        "Follow on LinkedIn",

      href: linkedIn,
    },
  },

  press: {
    eyebrow:
      "Press & media",

    title:
      "For research, media or institutional enquiries.",

    email:
      "info@climatewatch-nccb.org",
  },
} as const;

export type NewsContent =
  typeof newsContent;