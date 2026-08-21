export const researchContent = {
  hero: {
    eyebrow: "Research",

    title:
      "Climate research built on traceable evidence.",

    description:
      "ClimateWatch examines climate policy, public finance, vulnerability and international negotiations through research designed to be verified, questioned and used.",

    image:
      "/images/research/research-hero-2026-08.webp",

    imageAlt:
      "Snow in the foreground above a river valley and mountain range in northern Pakistan.",

    imageCaption:
      "ClimateWatch research connects policy questions with evidence from institutions, communities and climate-vulnerable environments.",
  },

  introduction: {
    eyebrow: "Research approach",

    title:
      "Evidence first. Interpretation second.",

    paragraphs: [
      "ClimateWatch research begins by establishing what can be supported by primary documents, credible research and direct evidence before drawing wider policy conclusions.",

      "Our work spans international climate negotiations, climate finance, adaptation, public policy and community-level climate vulnerability, with an emphasis on keeping the source of each claim visible.",
    ],
  },

  currentResearch: {
    eyebrow: "Current work",

    title:
      "Research across climate policy, finance and participation.",

    description:
      "Current workstreams follow policy processes that can shape Pakistan’s climate response while examining how those commitments connect with finance, institutions and implementation.",

    workstreams: [
      {
        number: "01",

        id: "unfccc-negotiation-tracking",

        category:
          "International climate policy",

        title:
          "UNFCCC negotiation tracking",

        description:
          "Tracking international climate negotiations and translating developments across climate finance, adaptation, mitigation and related policy processes into research relevant to Pakistan.",

        topics: [
          "Climate finance",
          "Adaptation",
          "Mitigation",
          "Loss and damage",
          "Article 6.8",
        ],
      },

      {
        number: "02",

        id: "action-for-climate-empowerment",

        category:
          "Climate participation",

        title:
          "Action for Climate Empowerment",

        description:
          "Following developments under Action for Climate Empowerment and examining how climate education, public participation, access to information and engagement are represented within international climate governance.",

        topics: [
          "Climate education",
          "Public participation",
          "Access to information",
          "Public awareness",
          "International cooperation",
        ],
      },

      {
        number: "03",

        id: "climate-finance",

        category:
          "Public finance",

        title:
          "Climate finance and budget accountability",

        description:
          "Examining the relationship between climate commitments and public spending, with attention to climate-tagged expenditure, adaptation finance, budget transparency and institutional coordination.",

        topics: [
          "Climate budgets",
          "Adaptation finance",
          "Public spending",
          "Budget transparency",
          "Climate commitments",
        ],
      },


      {
        number: "04",

        id: "press-monitoring",

        category:
          "Policy monitoring",

        title:
          "Negotiation press monitoring",

        description:
          "Monitoring official press conferences and public statements during climate negotiations to document decisions, positions and developments alongside primary negotiation material.",

        topics: [
          "Official statements",
          "Negotiation updates",
          "Policy positions",
          "Public record",
        ],
      },
    ],
  },

  fieldwork: {
    eyebrow: "From evidence to analysis",

    title:
      "Research should stay connected to the realities behind the documents.",

    paragraphs: [
      "Policy documents and international negotiations provide one part of the evidence base. Community experience, environmental conditions and primary research provide another.",

      "Bringing those forms of evidence together helps ClimateWatch examine not only what climate policy says, but how climate vulnerability, resilience and implementation are experienced in practice.",
    ],

    image:
      "/images/research/research-fieldwork-focus-2026-08.webp",

    imageAlt:
      "An aerial view of a flooded valley in Gilgit-Baltistan, with buildings and trees standing in the water.",

    imageCaption:
      "Primary evidence and field context help connect formal climate policy with conditions on the ground.",

    /* Supplied by ClimateWatch and taken by FOCUS Pakistan, so the credit is
       rendered on the image rather than buried in a colophon. */
    imageCredit:
      "Photograph: FOCUS Pakistan",
  },

  evidence: {
    eyebrow: "Evidence hierarchy",

    title:
      "A clear order of evidence guides our research.",

    description:
      "Different sources serve different purposes. ClimateWatch prioritises material that can be traced back to authoritative or primary evidence.",

    levels: [
      {
        number: "01",

        title:
          "Peer-reviewed literature",

        description:
          "Academic and peer-reviewed research used to establish the wider scientific and policy evidence base.",
      },

      {
        number: "02",

        title:
          "Primary official documents",

        description:
          "Budgets, development programmes, NDCs, legislation, official advisories, Finance Acts and other primary government material.",
      },

      {
        number: "03",

        title:
          "International institutions",

        description:
          "Research, data and official material from relevant multilateral and international institutions.",
      },

      {
        number: "04",

        title:
          "Pakistani research institutions",

        description:
          "Research and policy analysis from credible domestic institutions and specialist research organisations.",
      },

      {
        number: "05",

        title:
          "Press reporting",

        description:
          "Used primarily to document public reactions, quotations and decisions when the underlying primary material is not yet available.",
      },
    ],
  },

  standards: {
    eyebrow: "Research standards",

    items: [
      {
        number: "01",

        title:
          "Trace the source",

        description:
          "Claims should be connected to evidence that readers can identify and examine.",
      },

      {
        number: "02",

        title:
          "Separate evidence from interpretation",

        description:
          "Research should distinguish what a source establishes from the conclusions drawn from it.",
      },

      {
        number: "03",

        title:
          "Avoid unsupported precision",

        description:
          "Figures and headline claims should not be published until the primary evidence behind them has been verified.",
      },

      {
        number: "04",

        title:
          "Keep policy context visible",

        description:
          "Climate evidence becomes more useful when institutions, budgets and decision-making processes are part of the analysis.",
      },
    ],
  },

  closing: {
    eyebrow: "Research outputs",

    title:
      "Explore the publications produced from ClimateWatch research.",

    primaryAction: {
      label: "View publications",
      href: "/publications",
    },

    secondaryAction: {
      label: "Explore projects",
      href: "/projects",
    },
  },
} as const;

export type ResearchContent =
  typeof researchContent;