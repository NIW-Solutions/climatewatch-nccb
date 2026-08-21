export const programmesContent = {
  hero: {
    eyebrow: "Programmes",

    title:
      "Three specialist divisions connecting evidence, learning and climate policy.",

    description:
      "ClimateWatch works through International Climate Policy, Education for Sustainable Development, and Research & Development.",

    /*
     * Stored at 1152x720, its native scale. The source is a 1280x720 screen
     * export rather than a camera original, and upscaling it to the 2560px
     * the other section images use would add no detail.
     */
    image:
      "/images/programmes/programmes-hero-debris-2026-08.webp",

    imageAlt:
      "People shovelling rock and silt debris from land in northern Pakistan.",

    imageCaption:
      "ClimateWatch programmes connect research, education and policy with climate-vulnerable contexts.",
  },

  introduction: {
    eyebrow: "Our programme structure",

    title:
      "Different disciplines. A shared evidence-led approach.",

    paragraphs: [
      "Each ClimateWatch division has its own programme focus, but the work is designed to connect across research, community evidence, climate education and policy engagement.",

      "This allows knowledge generated in one part of the institution to inform work elsewhere — from international policy analysis to local climate education and applied research.",
    ],
  },

  divisions: [
    {
      number: "01",

      id: "international-climate-policy",

      eyebrow:
        "International Climate Policy",

      title:
        "Following the climate-policy processes that shape national decisions.",

      description:
        "The International Climate Policy division tracks global climate governance and examines what international commitments, negotiations and finance mechanisms mean for Pakistan.",

      paragraphs: [
        "The division follows the UNFCCC process, the Paris Agreement and related international climate-policy developments with attention to their implications for national policy and climate-vulnerable communities.",

        "Research and policy work covers climate finance, adaptation, mitigation, loss and damage, Action for Climate Empowerment and wider questions of implementation and accountability.",
      ],

      focus: [
        "UNFCCC processes",
        "Paris Agreement",
        "Climate finance",
        "Action for Climate Empowerment",
        "Loss and damage",
        "Climate-policy analysis",
      ],

      image:
        "/images/programmes/international-climate-policy.webp",

      imageAlt:
        "Institutional climate-policy discussion and international policy engagement.",

      imageCaption:
        "Connecting international climate-policy developments with their relevance for Pakistan.",

      action: {
        label: "Explore related research",
        href: "/research",
      },
    },

    {
      number: "02",

      id: "education-for-sustainable-development",

      eyebrow:
        "Education for Sustainable Development",

      title:
        "Climate learning grounded in place, knowledge and experience.",

      description:
        "The Education for Sustainable Development division connects climate and earth-science education with community knowledge and the realities of climate-vulnerable regions.",

      paragraphs: [
        "Its work draws on the principles of UNESCO’s Education for Sustainable Development agenda while recognising that climate learning should also reflect the environmental knowledge held within communities.",

        "Programmes such as Glacier School bring together students, trainers and communities around climate science, mountain environments and practical understanding of environmental change.",
      ],

      focus: [
        "Education for Sustainable Development",
        "Glacier School",
        "Climate and earth science",
        "Traditional Ecological Knowledge",
        "Community learning",
        "Climate literacy",
      ],

      image:
        "/images/programmes/glacier-school-2026-08.webp",

      imageAlt:
        "A glacier below a snow-covered summit in northern Pakistan.",

      imageCaption:
        "Climate education connected to mountain environments, local knowledge and practical learning.",

      action: {
        label: "Explore Glacier School",
        href: "/projects#glacier-school",
      },
    },

    {
      number: "03",

      id: "research-and-development",

      eyebrow:
        "Research & Development",

      title:
        "Applied research for climate vulnerability, resilience and adaptation.",

      description:
        "The Research & Development division investigates climate vulnerability, adaptation gaps, public finance and applied tools that can strengthen resilience.",

      paragraphs: [
        "Research combines policy analysis with primary evidence and practical questions emerging from climate-vulnerable environments.",

        "The division also explores applied technologies including remote sensing and early-warning approaches where they can contribute to better climate-risk monitoring and decision-making.",
      ],

      focus: [
        "Climate vulnerability",
        "Adaptation gaps",
        "Climate finance",
        "Primary research",
        "Remote sensing",
        "Early-warning approaches",
      ],

      image:
        "/images/programmes/research-development-2026-08.webp",

      imageAlt:
        "Water droplets held on a leaf.",

      imageCaption:
        "Research connecting climate evidence with practical questions of resilience and risk.",

      action: {
        label: "Explore research",
        href: "/research",
      },
    },
  ],

  connection: {
    eyebrow:
      "Across the divisions",

    title:
      "The programme areas are separate by discipline, not by purpose.",

    description:
      "Policy analysis, climate education and applied research reinforce one another. Community evidence can inform research, research can strengthen policy engagement, and education can build the capacity needed to use both.",
  },

  closing: {
    eyebrow:
      "Explore the work",

    title:
      "See how ClimateWatch programmes become research and practical projects.",

    primaryAction: {
      label: "View projects",
      href: "/projects",
    },

    secondaryAction: {
      label: "Explore research",
      href: "/research",
    },
  },
} as const;

export type ProgrammesContent =
  typeof programmesContent;