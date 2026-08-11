export type TeamMember = {
  number: string;
  name: string;
  team: string;
  designation: string;
  linkedin: string;
  instagram?: string;
};

export const teamContent = {
  hero: {
    eyebrow: "Our team",

    title:
      "The people behind ClimateWatch’s research, programmes and policy work.",

    description:
      "ClimateWatch brings together leadership across climate policy, research and development, education, project management, partnerships and technical work.",
  },

  leadership: {
    eyebrow: "Leadership",

    description:
      "Institutional and project leadership across ClimateWatch.",
  },

  leadershipMembers: [
    {
      number: "01",
      name: "Syed Kiram",
      team: "Director",
      designation: "Director",
      linkedin:
        "https://www.linkedin.com/in/syed-kiram-828377193/",
      instagram:
        "https://www.instagram.com/syedkiram/",
    },

    {
      number: "02",
      name: "Riaz Ahmed",
      team: "Project Management",
      designation: "Head of Department",
      linkedin:
        "http://www.linkedin.com/in/riaz-ahmed56",
      instagram:
        "https://www.instagram.com/thisisriiaz?igsh=OXhqZ3VtMDB4emsw",
    },
  ] satisfies readonly TeamMember[],

  divisions: {
    eyebrow: "Division leadership",

    title:
      "Leadership across ClimateWatch’s specialist areas.",
  },

  divisionMembers: [
    {
      number: "03",
      name: "Pervez Aly",
      team: "International Climate Policy",
      designation: "Head of Division",
      linkedin:
        "https://www.linkedin.com/in/pervezaly/",
      instagram:
        "https://www.instagram.com/_aka.aly/",
    },

    {
      number: "04",
      name: "Atia Fehmi",
      team: "Research and Development",
      designation: "Head of Division",
      linkedin:
        "https://www.linkedin.com/in/atia-f-a66553182/",
    },

    {
      number: "05",
      name: "Didar Ali",
      team:
        "Education for Sustainable Development",
      designation: "Head of Division",
      linkedin:
        "https://www.linkedin.com/in/didar-ali-/",
      instagram:
        "https://www.instagram.com/didar.aly?igsh=MW1jbmU2eWcxZmtndA%3D%3D&utm_source=qr",
    },

    {
      number: "06",
      name: "Mehtab Kamal",
      team: "Partnership and Outreach",
      designation: "Head of Division",
      linkedin:
        "https://www.linkedin.com/in/mehtab-kamal-a75673387/",
      instagram:
        "https://www.instagram.com/mehtab_kml/",
    },

    {
      number: "07",
      name: "Mubeen Ishfaq",
      team:
        "Technical and Engineering Division",
      designation: "Head of Division",
      linkedin:
        "https://www.linkedin.com/in/mubeen-ishfaq/",
      instagram:
        "https://www.instagram.com/mubeenishfaq7/",
    },
  ] satisfies readonly TeamMember[],

  closing: {
    eyebrow: "Contact",

    title:
      "For institutional, research or programme enquiries.",

    email:
      "info@climatewatch-nccb.org",
  },
} as const;