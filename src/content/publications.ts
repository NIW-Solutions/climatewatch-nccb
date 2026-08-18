/**
 * Publications — src/content/publications.ts
 *
 * Every entry below is backed by an actual PDF. Titles, subtitles, authors,
 * dates, page counts and file sizes were read out of the documents themselves,
 * not estimated.
 *
 * The four invented entries (GLOF risk, Loss and Damage Readiness, Climate
 * Education Baseline, COP30 Position Brief) have been removed. All seven
 * remaining titles are published and downloadable; nothing is pending.
 *
 * PDFs live at public/documents/<slug>.pdf
 */

export type PublicationCategory =
  | "publication"
  | "policy-report"
  | "Research Publication"
  | "Budget Analysis"
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

  /** e.g. "Policy Brief Series No. 003" — printed on the document itself. */
  series?: string;

  /** Named authors, in the order printed on the document. */
  authors?: readonly string[];

  /** Editor or supervising author, where the document names one. */
  editor?: string;

  /** Contributing teams or divisions, where named. */
  contributors?: string;

  /** Suggested citation, taken verbatim from the document where it gives one. */
  citation?: string;

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
   *
   * Omitted for forthcoming titles.
   */
  pdf?: string;
  pdfSize?: string;
  pages?: string;

  /** Announced but not yet released. Renders without download actions. */
  forthcoming?: boolean;

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
      "ClimateWatch publications translate climate evidence, policy developments and public-finance questions into clear, traceable analysis. Every title can be read in the browser or downloaded as a PDF.",
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
      "Filter by publication type to find research publications, policy reports and briefings. Each entry opens a reader page with the full document, a share link and a download.",
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
    /* ==========================================
       POLICY BRIEFS
       ========================================== */
    {
      slug:
        "from-disaster-response-to-climate-resilience",

      cover:
        "/images/publications/from-disaster-response-to-climate-resilience.webp",

      coverAlt:
        "Cover of From Disaster Response to Climate Resilience, a ClimateWatch policy brief on Gilgit-Baltistan’s FY2026–27 interim budget.",

      title:
        "From Disaster Response to Climate Resilience",

      subtitle:
        "A Climate Budget Assessment of Gilgit-Baltistan’s FY2026–27 Interim Budget",

      description:
        "A rapid assessment of Gilgit-Baltistan’s interim budget, presented on 13 July 2026, examining how public spending connects with climate resilience, vulnerability and longer-term adaptation priorities. Figures are triangulated across three independent outlets pending publication of the official budget documents.",

      category: "Budget Analysis",

      categoryLabel: "Budget Analysis",

      year: "2026",

      date: "July 2026",

      authors: ["Pervez Ali"],

      contributors:
        "ClimateWatch R&D and ESD Division",

      citation:
        "Ali, P. (2026). From Disaster Response to Climate Resilience: A Climate Budget Assessment of Gilgit-Baltistan’s FY2026–27 Interim Budget. ClimateWatch – International Climate Policy & Research and Development Division.",

      pdf:
        "/documents/from-disaster-response-to-climate-resilience.pdf",

      pdfSize: "8.0 MB",

      pages: "24 pages",

      href: resourceHub,

      topics: [
        "Climate finance",
        "Gilgit-Baltistan",
        "Public budgets",
      ],

      featured: true,
    },

    {
      slug:
        "pakistan-climate-budget-reduction",

      cover:
        "/images/publications/pakistan-climate-budget-reduction.webp",

      coverAlt:
        "Cover of Pakistan’s FY2026–27 Climate Budget Reduction, ClimateWatch Policy Brief Series No. 003.",

      title:
        "Pakistan’s FY2026–27 Climate Budget Reduction",

      subtitle:
        "Implications for Resilience, Climate Finance and Intergenerational Equity",

      description:
        "The full policy paper on the federal climate budget reduction, which set the Ministry of Climate Change PSDP allocation at Rs2.48 billion — the smallest in at least five years and part of an 83% decline since FY2021–22. Examined through administrative, local, international and youth lenses.",

      category: "policy-report",

      categoryLabel: "Policy paper",

      year: "2026",

      date: "June 2026",

      series:
        "Policy Brief Series No. 003",

      authors: [
        "Sania Asim",
        "Fatimah Muneer",
      ],

      editor: "Pervez Ali",

      pdf:
        "/documents/pakistan-climate-budget-reduction.pdf",

      pdfSize: "9.4 MB",

      pages: "17 pages",

      href: resourceHub,

      topics: [
        "Climate finance",
        "Pakistan",
        "Public budgets",
      ],
    },

    {
      // NEEDS CONFIRMATION: this is the same Policy Brief No. 003 as the entry
      // above, in a shorter divisional edition. The documents do not name
      // themselves differently, so the distinguishing title is mine.
      slug:
        "pakistan-climate-budget-reduction-summary",

      cover:
        "/images/publications/pakistan-climate-budget-reduction-summary.webp",

      coverAlt:
        "Cover of the divisional summary edition of ClimateWatch Policy Brief Series No. 003.",

      title:
        "Pakistan’s FY2026–27 Climate Budget Reduction: Divisional Summary",

      subtitle:
        "Implications for Resilience, Climate Finance and Intergenerational Equity",

      description:
        "The short-form edition of Policy Brief No. 003, prepared by the International Climate Policy and Research & Development Divisions. Covers the same analysis as the full paper in a briefer format.",

      category: "briefing",

      categoryLabel: "Briefing",

      year: "2026",

      date: "June 2026",

      series:
        "Policy Brief Series No. 003",

      pdf:
        "/documents/pakistan-climate-budget-reduction-summary.pdf",

      pdfSize: "1.4 MB",

      pages: "13 pages",

      href: resourceHub,

      topics: [
        "Climate finance",
        "Pakistan",
        "Public budgets",
      ],
    },

    /* ==========================================
       UNFCCC PROCESS
       ========================================== */
    {
      slug: "ace-at-sb64",

      cover:
        "/images/publications/ace-at-sb64.webp",

      coverAlt:
        "Cover of ACE at the SB64, a ClimateWatch policy report on Action for Climate Empowerment in Bonn.",

      title: "ACE at the SB64",

      subtitle:
        "Dialogue, Technical Workshop, and Negotiations",

      description:
        "A report on Action for Climate Empowerment at the sixty-fourth sessions of the Subsidiary Bodies in Bonn. With the Glasgow Work Programme and its action plan ending in 2026, SB64 carried a midterm review expected to shape whether a successor plan is mandated ahead of COP31.",

      category: "policy-report",

      categoryLabel: "Policy report",

      year: "2026",

      date: "22 June 2026",

      authors: [
        "Babar Nasir",
        "Mutahira Gillani",
        "Rafia Imtiaz",
        "Syeda Hoorain Imran",
      ],

      contributors:
        "International Climate Policy Division",

      pdf: "/documents/ace-at-sb64.pdf",

      pdfSize: "4.9 MB",

      pages: "10 pages",

      href: resourceHub,

      topics: [
        "UNFCCC",
        "Climate education",
        "ACE",
      ],
    },

    {
      // Slug changed from "bonn-sb64-midway-media-brief" to match the
      // document's actual title.
      slug: "state-of-play-at-bonn",

      cover:
        "/images/publications/state-of-play-at-bonn.webp",

      coverAlt:
        "Cover of State of Play at Bonn, the ClimateWatch SB64 midway media brief.",

      title: "State of Play at Bonn",

      subtitle:
        "SB64 Midway Media Brief",

      description:
        "A stocktake of the first week of SB64, assessing how far discussions were translating into negotiated outcomes across the Global Goal on Adaptation, the Just Transition Work Programme, mitigation and energy transition, and climate finance.",

      category: "briefing",

      categoryLabel: "Briefing",

      year: "2026",

      date: "15 June 2026",

      series: "Policy Brief No. 004",

      authors: [
        "Mutahira Hasnain Gillani",
        "Pervez Aly",
      ],

      contributors:
        "International Climate Policy Division",

      pdf:
        "/documents/state-of-play-at-bonn.pdf",

      pdfSize: "1.3 MB",

      pages: "7 pages",

      href: resourceHub,

      topics: [
        "UNFCCC",
        "Negotiations",
        "Media",
      ],
    },

    {
      slug:
        "mountain-frontlines-youth-futures",

      cover:
        "public/images/publications/mountain-frontlines-youth-futures.webp",

      coverAlt:
        "Cover of Mountain Frontlines, Youth Futures and Direct Climate Finance, ClimateWatch’s submission to the YOUNGO Global Youth Statement 2026.",

      title:
        "Mountain Frontlines, Youth Futures and Direct Climate Finance",

      subtitle:
        "ClimateWatch submission to the YOUNGO Global Youth Statement 2026",

      description:
        "Policy demands from Pakistan’s mountain and climate-vulnerable communities ahead of COP31 in Antalya. Carries three linked packages: frontline access to loss-and-damage and climate finance; preventive adaptation, disaster risk reduction and people-centred early warning; and youth participation.",

      category: "publication",

      categoryLabel: "Submission",

      year: "2026",

      date: "July 2026",

      authors: [
        "International Climate Policy, Education for Sustainable Development & Research and Development Divisions",
      ],

      editor: "Pervez Ali",

      citation:
        "ClimateWatch (2026). Mountain Frontlines, Youth Futures and Direct Climate Finance: Submission to the YOUNGO Global Youth Statement 2026. ClimateWatch – International Climate Policy & R&D Division. Ed. Pervez Ali.",

      pdf:
        "/documents/mountain-frontlines-youth-futures.pdf",

      pdfSize: "5.6 MB",

      pages: "16 pages",

      href: resourceHub,

      topics: [
        "COP31",
        "Loss and damage",
        "Youth policy",
      ],
    },

    /* ==========================================
       REFERENCE
       ========================================== */
    {
      slug:
        "wildlife-of-northern-pakistan",

      cover:
        "/images/publications/wildlife-of-northern-pakistan.webp",

      coverAlt:
        "Cover of Wildlife of Northern Pakistan, a ClimateWatch reference publication on Gilgit-Baltistan and Chitral.",

      title:
        "Wildlife of Northern Pakistan",

      subtitle:
        "Gilgit-Baltistan & Chitral",

      description:
        "A reference publication on the wildlife of northern Pakistan\u2019s mountain systems, covering biodiversity, endangered species, protected areas and the threats they face. Includes a glossary of the conservation bodies and monitoring frameworks operating across the region.",

      category: "publication",

      categoryLabel: "Publication",

      year: "2026",

      date: "8 March 2026",

      authors: [
        "ClimateWatch Research Team",
      ],

      pdf:
        "/documents/wildlife-of-northern-pakistan.pdf",

      pdfSize: "0.7 MB",

      pages: "19 pages",

      href: resourceHub,

      topics: [
        "Biodiversity",
        "Mountain ecosystems",
        "Protected areas",
      ],
    },
  ] satisfies readonly PublicationItem[],

  reader: {
    downloadLabel: "Download PDF",
    shareLabel: "Share",
    shareCopied: "Link copied",
    openLabel: "Open PDF",
    citationLabel: "Suggested citation",
    forthcomingLabel: "Forthcoming",
    forthcomingNote:
      "This publication has not been released yet. Contact us if you would like to be notified when it is available.",
    backLabel: "All publications",
  },

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
