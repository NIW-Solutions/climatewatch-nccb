export type BlogTopic =
  | "climate-science"
  | "policy"
  | "energy"
  | "community"
  | "technology";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  topic: BlogTopic;
  topicLabel: string;
  date: string;
  readingTime: string;
  author: string;
  authorRole: string;
  href: string;
  featured?: boolean;
};

const resourceHub =
  "https://linktr.ee/Climatewatch";

export const blogContent = {
  hero: {
    eyebrow: "Blog",

    title:
      "Climate commentary, field notes and perspective.",

    description:
      "Shorter, faster writing from the ClimateWatch team — reflections from negotiations and fieldwork, explainers on climate science, and commentary on the decisions shaping Pakistan’s climate future.",
  },

  distinction: {
    eyebrow: "Blog vs publications",

    title:
      "Commentary here, formal research in Publications.",

    description:
      "The blog carries opinion, explainers and field reporting written in the author’s voice. Peer-reviewed research, policy reports and briefings — with downloadable PDFs — live in the publications archive.",

    linkLabel:
      "Go to publications",

    href: "/publications",
  },

  topics: [
    {
      value: "all",
      label: "All posts",
    },
    {
      value: "climate-science",
      label: "Climate science",
    },
    {
      value: "policy",
      label: "Policy",
    },
    {
      value: "energy",
      label: "Energy",
    },
    {
      value: "community",
      label: "Community",
    },
    {
      value: "technology",
      label: "Technology",
    },
  ],

  posts: [
    {
      slug: "heat-stroke-in-pakistan",

      title:
        "Heat Stroke in Pakistan: the emergency we keep treating as weather",

      excerpt:
        "Every summer the same headlines return, and every summer the response arrives late. Extreme heat is not a seasonal inconvenience — it is a public-health emergency that our institutions are still not structured to prevent.",

      topic: "climate-science",

      topicLabel: "Climate science",

      date: "July 2026",

      readingTime: "6 min read",

      author: "Atia Fehmi",

      authorRole:
        "Head of Research and Development",

      href: resourceHub,

      featured: true,
    },

    {
      slug: "thirsty-ai",

      title:
        "Thirsty AI: what data centres cost a water-stressed country",

      excerpt:
        "The conversation about artificial intelligence rarely mentions water. In a country already rationing it, the arithmetic of cooling server halls deserves far more scrutiny than it currently receives.",

      topic: "technology",

      topicLabel: "Technology",

      date: "June 2026",

      readingTime: "8 min read",

      author: "Mubeen Ishfaq",

      authorRole:
        "Head of Technical and Engineering",

      href: resourceHub,
    },

    {
      slug: "notes-from-bonn",

      title:
        "Notes from Bonn: what SB64 felt like from the back of the room",

      excerpt:
        "Between the formal plenaries and the corridor conversations, a picture emerged of where the adaptation finance conversation is actually heading — and how little of it reaches mountain regions.",

      topic: "policy",

      topicLabel: "Policy",

      date: "June 2026",

      readingTime: "7 min read",

      author: "Pervez Aly",

      authorRole:
        "Head of International Climate Policy",

      href: resourceHub,
    },

    {
      slug:
        "glacier-school-field-diary",

      title:
        "Glacier School field diary: teaching climate where it is visible",

      excerpt:
        "You can explain glacial retreat in a classroom, or you can walk students to the terminus and let them measure it. One of these produces climate scientists.",

      topic: "community",

      topicLabel: "Community",

      date: "May 2026",

      readingTime: "5 min read",

      author: "Didar Ali",

      authorRole:
        "Head of Education for Sustainable Development",

      href: resourceHub,
    },

    {
      slug:
        "solar-is-arriving-faster",

      title:
        "Solar is arriving faster than the grid can absorb it",

      excerpt:
        "Rooftop solar has scaled remarkably quickly across Pakistani cities. The distribution network, tariff structure and storage capacity have not — and that gap is becoming the story.",

      topic: "energy",

      topicLabel: "Energy",

      date: "May 2026",

      readingTime: "9 min read",

      author: "Kamran Shafiq",

      authorRole:
        "GIS and Remote Sensing Engineer",

      href: resourceHub,
    },

    {
      slug:
        "who-counts-as-climate-vulnerable",

      title:
        "Who counts as climate vulnerable, and who decides?",

      excerpt:
        "Vulnerability indices shape where money goes. When mountain districts score poorly on data availability rather than on actual risk, the classification becomes the harm.",

      topic: "policy",

      topicLabel: "Policy",

      date: "April 2026",

      readingTime: "7 min read",

      author: "Nasreen Bibi",

      authorRole:
        "Senior Policy Analyst",

      href: resourceHub,
    },

    {
      slug: "the-flood-after-the-flood",

      title:
        "The flood after the flood: what recovery actually looks like",

      excerpt:
        "Media attention leaves within a fortnight. Reconstruction takes years, and the second disaster — of displacement, debt and lost schooling — unfolds entirely off camera.",

      topic: "community",

      topicLabel: "Community",

      date: "April 2026",

      readingTime: "6 min read",

      author: "Sadia Rehman",

      authorRole:
        "Project Officer, Field Operations",

      href: resourceHub,
    },

    {
      slug: "reading-a-climate-budget",

      title:
        "How to read a climate budget without being misled",

      excerpt:
        "Governments increasingly tag spending as climate-relevant. A practical guide to telling genuine adaptation investment apart from relabelled business as usual.",

      topic: "policy",

      topicLabel: "Policy",

      date: "March 2026",

      readingTime: "10 min read",

      author: "Ayesha Karim",

      authorRole:
        "Research Fellow, Climate Finance",

      href: resourceHub,
    },

    {
      slug:
        "permafrost-and-infrastructure",

      title:
        "What thawing ground means for mountain infrastructure",

      excerpt:
        "Roads, bridges and irrigation channels in high-altitude Pakistan were built for ground that stayed frozen. That assumption is quietly expiring.",

      topic: "climate-science",

      topicLabel: "Climate science",

      date: "February 2026",

      readingTime: "8 min read",

      author: "Zainab Shah",

      authorRole:
        "Glaciology Research Associate",

      href: resourceHub,
    },
  ] satisfies readonly BlogPost[],

  closing: {
    eyebrow: "Write with us",

    title:
      "We publish contributed climate commentary.",

    description:
      "If you work on climate policy, research, energy or community resilience and want to write for the ClimateWatch blog, send us an outline.",

    email:
      "info@climatewatch-nccb.org",
  },
} as const;
