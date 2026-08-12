export type PublicationCategory =
  | "publication"
  | "policy-report"
  | "briefing";

export type PublicationItem = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: PublicationCategory;
  categoryLabel: string;
  year: string;
  date: string;

  /**
   * Cover artwork for the publication.
   *
   * When omitted the archive renders a generated
   * typographic cover from the title and metadata.
   */
  cover?: string;
  coverAlt?: string;

  /**
   * Downloadable PDF, served from `public/documents`.
   *
   * File naming convention: `/documents/<slug>.pdf`
   */
  pdf: string;
  pdfSize?: string;
  pages?: string;

  /** External source or landing page, when one exists. */
  href?: string;

  topics: readonly string[];
  featured?: boolean;
};

const resourceHub =
  "https://linktr.ee/Climatewatch";

export const publicationsContent = {
  hero: {
    eyebrow: "Publications",

    title:
      "Research, policy analysis and climate evidence.",

    description:
      "ClimateWatch publications translate climate evidence, policy developments and public-finance questions into clear, traceable analysis. Every title is available to download as a PDF.",
  },

  featured: {
    eyebrow: "Featured publication",

    slug:
      "from-disaster-response-to-climate-resilience",
  },

  archive: {
    eyebrow: "Publication archive",

    title:
      "Browse the full archive.",

    description:
      "Filter by publication type to find research papers, policy reports and briefings. Each entry links to a downloadable PDF.",
  },

  filters: [
    {
      value: "all",
      label: "All publications",
    },
    {
      value: "publication",
      label: "Research publications",
    },
    {
      value: "policy-report",
      label: "Policy reports",
    },
    {
      value: "briefing",
      label: "Briefings",
    },
  ],

  items: [
    {
      slug:
        "from-disaster-response-to-climate-resilience",

      title:
        "From Disaster Response to Climate Resilience",

      subtitle:
        "A Climate Budget Assessment of Gilgit-Baltistan’s FY2026–27 Interim Budget",

      description:
        "An assessment of how public spending connects with climate resilience, vulnerability and longer-term adaptation priorities in Gilgit-Baltistan.",

      category: "publication",

      categoryLabel: "Publication",

      year: "2026",

      date: "June 2026",

      pdf:
        "/documents/from-disaster-response-to-climate-resilience.pdf",

      pdfSize: "4.2 MB",

      pages: "48 pages",

      href: resourceHub,

      topics: [
        "Climate finance",
        "Gilgit-Baltistan",
        "Adaptation",
      ],

      featured: true,
    },

    {
      slug:
        "pakistan-climate-budget-reduction",

      title:
        "Pakistan’s FY2026–27 Climate Budget Reduction",

      subtitle:
        "Implications for Resilience, Climate Finance and Intergenerational Equity",

      description:
        "Policy analysis examining climate-budget priorities through resilience, finance and intergenerational considerations.",

      category: "publication",

      categoryLabel: "Publication",

      year: "2026",

      date: "June 2026",

      pdf:
        "/documents/pakistan-climate-budget-reduction.pdf",

      pdfSize: "2.8 MB",

      pages: "32 pages",

      href: resourceHub,

      topics: [
        "Climate finance",
        "Pakistan",
        "Public budgets",
      ],
    },

    {
      slug:
        "wildlife-of-northern-pakistan",

      title:
        "Wildlife of Northern Pakistan",

      subtitle:
        "Gilgit-Baltistan & Chitral",

      description:
        "A reference publication documenting the wildlife and environmental context of northern Pakistan’s mountain systems.",

      category: "publication",

      categoryLabel: "Publication",

      year: "2026",

      date: "April 2026",

      pdf:
        "/documents/wildlife-of-northern-pakistan.pdf",

      pdfSize: "12.6 MB",

      pages: "96 pages",

      href: resourceHub,

      topics: [
        "Biodiversity",
        "Mountain ecosystems",
        "Reference",
      ],
    },

    {
      slug: "ace-at-sb64",

      title:
        "Action for Climate Empowerment (ACE) at SB64",

      subtitle:
        "Tracking the ACE agenda through the Bonn climate conference",

      description:
        "A policy report examining Action for Climate Empowerment within the SB64 climate-policy process.",

      category: "policy-report",

      categoryLabel: "Policy report",

      year: "2026",

      date: "June 2026",

      pdf: "/documents/ace-at-sb64.pdf",

      pdfSize: "1.9 MB",

      pages: "24 pages",

      href: resourceHub,

      topics: [
        "UNFCCC",
        "Climate education",
        "ACE",
      ],
    },

    {
      slug:
        "bonn-sb64-midway-media-brief",

      title:
        "Bonn SB64 Midway Media Brief",

      subtitle:
        "Negotiation developments at the halfway point of SB64",

      description:
        "A concise briefing on developments emerging from the SB64 climate negotiations in Bonn.",

      category: "briefing",

      categoryLabel: "Briefing",

      year: "2026",

      date: "June 2026",

      pdf:
        "/documents/bonn-sb64-midway-media-brief.pdf",

      pdfSize: "0.9 MB",

      pages: "8 pages",

      href: resourceHub,

      topics: [
        "UNFCCC",
        "Negotiations",
        "Media",
      ],
    },

    {
      slug:
        "glof-risk-northern-pakistan",

      title:
        "Glacial Lake Outburst Flood Risk in Northern Pakistan",

      subtitle:
        "Hazard mapping and community exposure across Gilgit-Baltistan",

      description:
        "Research assessing glacier-lake hazard formation, downstream exposure and early-warning readiness in high-mountain valleys.",

      category: "publication",

      categoryLabel: "Publication",

      year: "2026",

      date: "March 2026",

      pdf:
        "/documents/glof-risk-northern-pakistan.pdf",

      pdfSize: "6.4 MB",

      pages: "56 pages",

      topics: [
        "Glaciology",
        "Disaster risk",
        "Early warning",
      ],
    },

    {
      slug:
        "loss-and-damage-readiness",

      title:
        "Loss and Damage Readiness in Pakistan",

      subtitle:
        "Institutional capacity, data gaps and access pathways",

      description:
        "A policy report reviewing how national and provincial institutions are positioned to access and deploy loss and damage finance.",

      category: "policy-report",

      categoryLabel: "Policy report",

      year: "2025",

      date: "November 2025",

      pdf:
        "/documents/loss-and-damage-readiness.pdf",

      pdfSize: "3.1 MB",

      pages: "40 pages",

      topics: [
        "Loss and damage",
        "Climate finance",
        "Governance",
      ],
    },

    {
      slug:
        "climate-education-baseline",

      title:
        "Climate Education Baseline Study",

      subtitle:
        "Climate literacy across secondary schools in Gilgit-Baltistan",

      description:
        "Baseline research measuring climate literacy, curriculum coverage and teacher confidence across participating schools.",

      category: "publication",

      categoryLabel: "Publication",

      year: "2025",

      date: "September 2025",

      pdf:
        "/documents/climate-education-baseline.pdf",

      pdfSize: "2.2 MB",

      pages: "36 pages",

      topics: [
        "Education",
        "Climate literacy",
        "Research",
      ],
    },

    {
      slug: "cop30-position-brief",

      title:
        "COP30 Position Brief",

      subtitle:
        "Priorities for mountain communities and youth constituencies",

      description:
        "A briefing setting out ClimateWatch priorities entering COP30, focused on adaptation finance and mountain-region representation.",

      category: "briefing",

      categoryLabel: "Briefing",

      year: "2025",

      date: "October 2025",

      pdf:
        "/documents/cop30-position-brief.pdf",

      pdfSize: "1.1 MB",

      pages: "12 pages",

      topics: [
        "COP30",
        "Advocacy",
        "Adaptation",
      ],
    },
  ] satisfies readonly PublicationItem[],

  closing: {
    eyebrow: "Request a publication",

    title:
      "Need a print copy, dataset or citation reference?",

    description:
      "We can provide print editions, underlying data and full citation details for any ClimateWatch publication.",

    email:
      "info@climatewatch-nccb.org",
  },
} as const;
