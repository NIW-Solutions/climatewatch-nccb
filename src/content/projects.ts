export const projectsContent = {
  hero: {
    eyebrow: "Projects",

    title:
      "Climate work tested through education, research, community evidence and applied innovation.",

    description:
      "ClimateWatch projects translate programme priorities into practical work across climate education, community engagement, policy tracking and emerging research tools.",

    image:
      "/images/projects/projects-hero.webp",

    imageAlt:
      "Mountain landscape representing ClimateWatch project work in climate-vulnerable regions.",

    imageCaption:
      "Projects connect ClimateWatch research and programme priorities with practical climate contexts.",
  },

  introduction: {
    eyebrow: "Current work",

    title:
      "Projects shaped by real climate questions.",

    paragraphs: [
      "ClimateWatch projects sit across its programme divisions rather than operating as isolated activities. Education, policy research, community evidence and applied innovation often overlap.",

      "Some projects are already in delivery, some recur as part of ongoing research practice, and others remain in development while their technical and institutional requirements are explored.",
    ],
  },

  projects: [
    {
      number: "01",

      id: "glacier-school",

      name: "Glacier School",

      status: "In delivery",

      division:
        "Education for Sustainable Development",

      region:
        "Gilgit-Baltistan & Chitral",

      title:
        "Climate and earth-science learning rooted in mountain environments.",

      description:
        "Glacier School is ClimateWatch’s longest-running education project, connecting students, trainers and communities with climate science, environmental knowledge and the changing realities of mountain regions.",

      paragraphs: [
        "The project brings climate and earth-science education closer to the places where glacier change, water systems and climate risk are part of everyday life.",

        "Its approach draws on Education for Sustainable Development, Action for Climate Empowerment and Traditional Ecological Knowledge while keeping learning connected to local environmental context.",
      ],

      focus: [
        "Climate education",
        "Earth science",
        "Mountain environments",
        "Traditional Ecological Knowledge",
        "ESD 2030",
        "Action for Climate Empowerment",
      ],

      image:
        "/images/projects/glacier-school.webp",

      imageAlt:
        "Climate and earth-science education in a mountain community.",

      imageCaption:
        "Glacier School connects climate learning with mountain environments, local knowledge and practical observation.",

      action: {
        label: "Explore education programmes",
        href:
          "/programmes#education-for-sustainable-development",
      },
    },

    {
      number: "02",

      id: "climate-bethaak",

      name: "Climate Bethaak",

      status: "Recurring",

      division: "Cross-divisional",

      format:
        "Community convening",

      title:
        "A place for climate-affected communities to speak before policy is written.",

      description:
        "Climate Bethaak is a recurring community convening where people living with climate impacts speak directly about their experience and policy researchers listen.",

      paragraphs: [
        "The format is designed to generate primary evidence before conclusions are formed, allowing community experience to shape the questions that research and policy analysis investigate.",

        "Climate Bethaak also creates a practical connection between community knowledge, research priorities and the wider policy processes ClimateWatch engages with.",
      ],

      focus: [
        "Community evidence",
        "Climate impacts",
        "Primary research",
        "Policy listening",
        "Local knowledge",
      ],

      image:
        "/images/projects/climate-bethaak.webp",

      imageAlt:
        "Community discussion focused on climate impacts and local experience.",

      imageCaption:
        "Climate Bethaak places community experience at the beginning of the research process.",

      action: {
        label: "Explore our research approach",
        href: "/research",
      },
    },

    {
      number: "03",

      id: "autonomous-drones",

      name:
        "Autonomous Drones for Remote Sensing",

      status:
        "In development",

      division:
        "Research & Development",

      focusLabel:
        "GLOF prediction & monitoring",

      title:
        "Exploring remote sensing for better observation of changing mountain risk.",

      description:
        "An applied engineering concept exploring how autonomous aerial systems and remote sensing could support monitoring of glacial lakes, unstable slopes and other environments associated with GLOF risk.",

      paragraphs: [
        "The concept sits within ClimateWatch’s wider interest in early-warning systems and applied climate-risk research, particularly where difficult terrain limits conventional monitoring.",

        "The proposal remains in development. Technical, financing and institutional discussions are part of that process and should not be treated as concluded partnerships.",
      ],

      focus: [
        "Remote sensing",
        "Glacial lakes",
        "Slope monitoring",
        "GLOF risk",
        "Early warning",
        "Applied engineering",
      ],

      image:
        "/images/projects/autonomous-drones.webp",

      imageAlt:
        "Remote sensing and environmental monitoring in mountainous terrain.",

      imageCaption:
        "Applied research explores how remote sensing could strengthen observation of climate-related mountain hazards.",

      action: {
        label: "Explore Research & Development",
        href:
          "/programmes#research-and-development",
      },
    },

    {
      number: "04",

      id: "unfccc-negotiations",

      name:
        "UNFCCC Negotiation Tracking",

      status: "Ongoing",

      division:
        "International Climate Policy",

      scope:
        "UNFCCC process",

      title:
        "Following climate negotiations from agenda item to policy relevance.",

      description:
        "UNFCCC Negotiation Tracking is an ongoing ClimateWatch research stream following international negotiations and translating developments into policy-relevant analysis.",

      paragraphs: [
        "The work follows negotiation tracks across climate finance, adaptation, mitigation, Action for Climate Empowerment and related areas of international climate governance.",

        "Outputs are intended to make complex negotiation processes easier to follow while keeping attention on what emerging decisions could mean for Pakistan and climate-vulnerable communities.",
      ],

      focus: [
        "UNFCCC",
        "Climate finance",
        "Adaptation",
        "Mitigation",
        "Action for Climate Empowerment",
        "Policy analysis",
      ],

      image:
        "/images/projects/unfccc-negotiations.webp",

      imageAlt:
        "International climate-policy negotiations and institutional discussion.",

      imageCaption:
        "Negotiation tracking connects international climate-policy developments with research relevant to Pakistan.",

      action: {
        label: "Explore policy research",
        href:
          "/research#unfccc-negotiation-tracking",
      },
    },
  ],

  closing: {
    eyebrow: "Explore further",

    title:
      "Projects are one part of a wider evidence-to-policy process.",

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

export type ProjectsContent =
  typeof projectsContent;