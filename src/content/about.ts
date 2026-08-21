export const aboutContent = {
  hero: {
    eyebrow: "About ClimateWatch",

    title:
      "Climate research grounded in the realities it is meant to represent.",

    description:
      "ClimateWatch is a youth-led climate think tank based in Pakistan, working across International climate policy, research and Development, education for sustainable Development and Circular Economy.",

    image:
      "/images/about/about-hero-2026-08.webp",

    imageAlt:
      "A wide valley of terraced fields and settlements between mountain ranges in northern Pakistan.",

    imageCaption:
      "ClimateWatch works from the realities of climate-vulnerable communities towards policy and institutional processes.",
  },

  introduction: {
    eyebrow: "Who we are",

    lead:
      "ClimateWatch works across international climate policy, research and development.",

    paragraphs: [
      "ClimateWatch is a youth-led climate think tank based in Pakistan, working across international climate policy, research and development, with consultative status at the United Nations Economic and Social Council.",

      "Our work connects climate-policy analysis, primary research, education and applied development with the experiences of communities already living with climate risk.",
    ],

    statement:
      "We do policy research, and we do advocacy. The first is what makes the second worth listening to.",
  },

  mission: {
    eyebrow: "Our mission",

    title:
      "Climate policy should represent the people living with its consequences.",

    description:
      "Our mission is to help ensure that Pakistan’s climate-vulnerable communities — from the cryosphere regions of Gilgit-Baltistan to the flood plains of Sindh — are represented in the climate-policy decisions that affect them.",

    image:
      "/images/about/mission-community-2026-08.webp",

    imageAlt:
      "Residents clearing rock and mud debris from around houses in northern Pakistan.",

    imageCaption:
      "Climate evidence begins with the communities, landscapes and lived experience behind policy questions.",
  },

  beliefs: {
    eyebrow: "What we believe",

    title:
      "Five principles shape how we approach climate work.",

    items: [
      {
        number: "01",
        title: "Evidence should begin where impacts land.",
        description:
          "Climate research should be informed by the communities, landscapes and institutions experiencing climate risk directly.",
      },
      {
        number: "02",
        title:
          "Affected communities should be present in decision-making.",
        description:
          "People living with climate impacts, including young people, should have meaningful routes into the policy processes that shape their future.",
      },
      {
        number: "03",
        title:
          "Climate finance should be transparent and traceable.",
        description:
          "Public climate commitments matter most when budgets, spending and implementation can be examined against them.",
      },
      {
        number: "04",
        title:
          "Resilience requires long-term capacity, not short-term response.",
        description:
          "Adaptation, education, institutional capacity and practical preparedness need to extend beyond individual emergencies.",
      },
      {
        number: "05",
        title:
          "Commitments and public spending should align.",
        description:
          "Climate policy should be assessed not only by what is promised, but by what is financed, implemented and sustained.",
      },
    ],
  },

  method: {
    eyebrow: "Our method",

    title:
      "From community evidence to policy engagement.",

    description:
      "Our research process is designed to move evidence from lived experience into policy analysis while keeping the chain of evidence visible.",

    steps: [
      {
        number: "01",
        title: "Community listening",
      },
      {
        number: "02",
        title: "Pattern analysis",
      },
      {
        number: "03",
        title: "Policy mapping",
      },
      {
        number: "04",
        title: "Evidence brief",
      },
      {
        number: "05",
        title: "Submission",
      },
      {
        number: "06",
        title: "Return",
      },
    ],
  },

  geography: {
    eyebrow: "Geographic context",

    title:
      "National policy work informed by climate-vulnerable regions.",

    paragraphs: [
      "ClimateWatch works nationally while maintaining a strong research and programme focus on Pakistan’s northern mountain regions, including Gilgit-Baltistan and areas such as Chitral.",

      "These landscapes sit at the intersection of glacier change, water security, extreme weather, infrastructure risk, livelihoods and wider questions of climate resilience.",
    ],

    image:
      "/images/about/geographic-scope-2026-08.webp",

    imageAlt:
      "A cultivated river valley running between high mountain ranges in northern Pakistan.",

    imageCaption:
      "Mountain regions provide an important frontline context for ClimateWatch research, education and applied work.",
  },

  governance: {
    eyebrow: "Institutional structure",

    title:
      "How ClimateWatch is organised.",

    description:
      "ClimateWatch works across international climate policy, research and development, with programme leadership and advisory input supporting its work.",

    items: [
      {
        label: "Organisation",
        value: "ClimateWatch",
      },
      {
        label: "Areas of work",
        value:
          "International Climate Policy, Research and Development",
      },
      {
        label: "Institutional status",
        value:
          "Consultative status at the United Nations Economic and Social Council",
      },
      {
        label: "Advisory role",
        value:
          "External advisory input supports programme and research direction without replacing organisational governance",
      },
    ],

    note:
      "Formal legal-registration wording, office designation and detailed governance language will be published once final institutional wording has been confirmed.",
  },

  closing: {
    eyebrow: "Continue exploring",

    title:
      "See how ClimateWatch turns its institutional approach into programmes and research.",

    primaryAction: {
      label: "Explore programmes",
      href: "/programmes",
    },

    secondaryAction: {
      label: "View research",
      href: "/research",
    },
  },
} as const;

export type AboutContent =
  typeof aboutContent;
