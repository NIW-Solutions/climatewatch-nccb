export type PublicationCategory =
  | "publication"
  | "policy-report"
  | "blog";

export type PublicationItem = {
  number: string;
  slug: string;
  title: string;
  description: string;
  category: PublicationCategory;
  categoryLabel: string;
  year: string;
  href: string;
  featured?: boolean;
};

export const publicationsContent = {
  hero: {
    eyebrow: "Publications",

    title:
      "Research, policy analysis and climate commentary.",

    description:
      "ClimateWatch publications translate climate evidence, policy developments and public-finance questions into clear, traceable analysis.",
  },

  featured: {
    eyebrow: "Featured publication",

    title:
      "From Disaster Response to Climate Resilience",

    subtitle:
      "A Climate Budget Assessment of Gilgit-Baltistan’s FY2026–27 Interim Budget",

    description:
      "An assessment of how public spending connects with climate resilience, vulnerability and longer-term adaptation priorities in Gilgit-Baltistan.",

    type: "Climate budget assessment",

    year: "2026",

    href: "https://linktr.ee/Climatewatch",

    meta: [
      {
        label: "Geographic focus",
        value: "Gilgit-Baltistan",
      },
      {
        label: "Research area",
        value: "Climate finance",
      },
      {
        label: "Format",
        value: "Policy research",
      },
    ],
  },

  archive: {
    eyebrow: "Publication archive",

    description:
      "Browse ClimateWatch publications, policy reports and climate commentary.",
  },

  items: [
    {
      number: "01",

      slug:
        "from-disaster-response-to-climate-resilience",

      title:
        "From Disaster Response to Climate Resilience",

      description:
        "A climate-budget assessment focused on resilience, public spending and adaptation priorities in Gilgit-Baltistan.",

      category: "publication",

      categoryLabel:
        "Publication",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",

      featured: true,
    },

    {
      number: "02",

      slug:
        "pakistan-climate-budget-reduction",

      title:
        "Pakistan’s FY2026-27 Climate Budget Reduction: Implications for Resilience, Climate Finance, and Intergenerational Equity",

      description:
        "Policy analysis examining climate-budget priorities through resilience, finance and intergenerational considerations.",

      category: "publication",

      categoryLabel:
        "Publication",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",
    },

    {
      number: "03",

      slug:
        "wildlife-of-northern-pakistan",

      title:
        "Wildlife of Northern Pakistan — Gilgit-Baltistan & Chitral",

      description:
        "A reference publication focused on the wildlife and environmental context of northern Pakistan.",

      category: "publication",

      categoryLabel:
        "Publication",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",
    },

    {
      number: "04",

      slug:
        "ace-at-sb64",

      title:
        "Action for Climate Empowerment (ACE) at SB64",

      description:
        "A policy report examining Action for Climate Empowerment within the SB64 climate-policy process.",

      category: "policy-report",

      categoryLabel:
        "Policy report",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",
    },

    {
      number: "05",

      slug:
        "bonn-sb64-midway-media-brief",

      title:
        "Bonn SB64 Midway Media Brief",

      description:
        "A concise briefing on developments emerging from the SB64 climate negotiations in Bonn.",

      category: "policy-report",

      categoryLabel:
        "Policy report",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",
    },

    {
      number: "06",

      slug:
        "heat-stroke-in-pakistan",

      title:
        "Heat Stroke in Pakistan",

      description:
        "Climate commentary examining extreme heat and its implications in Pakistan.",

      category: "blog",

      categoryLabel:
        "Blog",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",
    },

    {
      number: "07",

      slug:
        "thirsty-ai",

      title:
        "Thirsty AI",

      description:
        "Climate commentary examining the environmental and resource implications associated with artificial intelligence.",

      category: "blog",

      categoryLabel:
        "Blog",

      year: "2026",

      href:
        "https://linktr.ee/Climatewatch",
    },
  ] satisfies readonly PublicationItem[],
} as const;