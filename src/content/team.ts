export type TeamMember = {
  name: string;
  department: string;
  designation: string;
  focus: string;
  image?: string;
  linkedin?: string;
  instagram?: string;

  /**
   * Placeholder entries are illustrative staff records used to
   * populate the directory ahead of the real roster.
   *
   * Replace or delete every member carrying this flag before launch.
   */
  placeholder?: boolean;
};

export type TeamDepartment = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

export const teamContent = {
  hero: {
    eyebrow: "Members & staff",

    title:
      "The people behind ClimateWatch.",

    description:
      "ClimateWatch brings together climate policy specialists, researchers, educators, engineers and communicators working across Pakistan and international climate processes.",

    image:
      "/images/team/team-hero.webp",

    imageAlt:
      "ClimateWatch team members working with mountain communities in northern Pakistan.",

    imageCaption:
      "Our team works between mountain communities, national policy institutions and international climate negotiations.",
  },

  stats: [
    {
      label: "Team members",
      value: "22",
    },
    {
      label: "Departments",
      value: "08",
    },
    {
      label: "Based in",
      value: "Pakistan",
    },
  ],

  directory: {
    eyebrow: "Directory",

    title:
      "Organised across eight departments.",

    description:
      "Each department carries its own programme responsibilities while contributing to shared research, policy and education work.",
  },

  departments: [
    {
      id: "directorate",

      name: "Directorate",

      shortName: "Directorate",

      description:
        "Institutional leadership, strategy and organisational representation.",
    },

    {
      id: "international-climate-policy",

      name: "International Climate Policy",

      shortName: "Climate Policy",

      description:
        "UNFCCC processes, negotiation tracking, climate finance and policy analysis.",
    },

    {
      id: "research-development",

      name: "Research and Development",

      shortName: "Research",

      description:
        "Evidence generation, climate data, glaciology and applied research methods.",
    },

    {
      id: "education-sustainable-development",

      name: "Education for Sustainable Development",

      shortName: "Education",

      description:
        "Curriculum design, training, climate literacy and youth engagement.",
    },

    {
      id: "partnerships-outreach",

      name: "Partnership and Outreach",

      shortName: "Partnerships",

      description:
        "Institutional partnerships, donor relations and stakeholder engagement.",
    },

    {
      id: "technical-engineering",

      name: "Technical and Engineering",

      shortName: "Engineering",

      description:
        "Monitoring instrumentation, geospatial systems and digital infrastructure.",
    },

    {
      id: "project-management",

      name: "Project Management",

      shortName: "Projects",

      description:
        "Programme delivery, field operations, planning and reporting.",
    },

    {
      id: "communications-media",

      name: "Communications and Media",

      shortName: "Communications",

      description:
        "Editorial output, broadcast production and public climate communication.",
    },
  ] satisfies readonly TeamDepartment[],

  members: [
    /* ==========================================
       DIRECTORATE
       ========================================== */

    {
      name: "Syed Kiram",

      department: "directorate",

      designation: "Director",

      focus:
        "Institutional strategy, climate policy direction and organisational representation.",

      linkedin:
        "https://www.linkedin.com/in/syed-kiram-828377193/",

      instagram:
        "https://www.instagram.com/syedkiram/",
    },

    /* ==========================================
       INTERNATIONAL CLIMATE POLICY
       ========================================== */

    {
      name: "Pervez Aly",

      department:
        "international-climate-policy",

      designation: "Head of Division",

      focus:
        "UNFCCC negotiation tracking, climate policy analysis and international engagement.",

      linkedin:
        "https://www.linkedin.com/in/pervezaly/",

      instagram:
        "https://www.instagram.com/_aka.aly/",
    },

    {
      name: "Nasreen Bibi",

      department:
        "international-climate-policy",

      designation:
        "Senior Policy Analyst",

      focus:
        "Climate finance architecture, adaptation finance and public budget analysis.",

      placeholder: true,
    },

    {
      name: "Hassan Raza",

      department:
        "international-climate-policy",

      designation:
        "Climate Negotiations Associate",

      focus:
        "Subsidiary body sessions, loss and damage, and negotiation briefing notes.",

      placeholder: true,
    },

    /* ==========================================
       RESEARCH AND DEVELOPMENT
       ========================================== */

    {
      name: "Atia Fehmi",

      department:
        "research-development",

      designation: "Head of Division",

      focus:
        "Research design, evidence standards and applied climate development work.",

      linkedin:
        "https://www.linkedin.com/in/atia-f-a66553182/",
    },

    {
      name: "Ayesha Karim",

      department:
        "research-development",

      designation:
        "Research Fellow, Climate Finance",

      focus:
        "Climate budget assessment, expenditure tracking and fiscal resilience research.",

      placeholder: true,
    },

    {
      name: "Fahad Iqbal",

      department:
        "research-development",

      designation:
        "Data and Monitoring Analyst",

      focus:
        "Climate datasets, indicator frameworks and monitoring methodology.",

      placeholder: true,
    },

    {
      name: "Zainab Shah",

      department:
        "research-development",

      designation:
        "Glaciology Research Associate",

      focus:
        "Glacier monitoring, GLOF risk assessment and cryosphere fieldwork.",

      placeholder: true,
    },

    /* ==========================================
       EDUCATION FOR SUSTAINABLE DEVELOPMENT
       ========================================== */

    {
      name: "Didar Ali",

      department:
        "education-sustainable-development",

      designation: "Head of Division",

      focus:
        "Climate education programmes, training design and community learning.",

      linkedin:
        "https://www.linkedin.com/in/didar-ali-/",

      instagram:
        "https://www.instagram.com/didar.aly?igsh=MW1jbmU2eWcxZmtndA%3D%3D&utm_source=qr",
    },

    {
      name: "Imran Baig",

      department:
        "education-sustainable-development",

      designation:
        "Education Programme Coordinator",

      focus:
        "School partnerships, programme delivery and teacher training.",

      placeholder: true,
    },

    {
      name: "Sana Mir Ali",

      department:
        "education-sustainable-development",

      designation:
        "Curriculum and Training Officer",

      focus:
        "Curriculum development, climate literacy material and learning assessment.",

      placeholder: true,
    },

    {
      name: "Bilal Hussain",

      department:
        "education-sustainable-development",

      designation:
        "Youth Engagement Officer",

      focus:
        "Youth networks, student climate councils and volunteer coordination.",

      placeholder: true,
    },

    /* ==========================================
       PARTNERSHIP AND OUTREACH
       ========================================== */

    {
      name: "Mehtab Kamal",

      department:
        "partnerships-outreach",

      designation: "Head of Division",

      focus:
        "Institutional partnerships, outreach strategy and stakeholder relations.",

      linkedin:
        "https://www.linkedin.com/in/mehtab-kamal-a75673387/",

      instagram:
        "https://www.instagram.com/mehtab_kml/",
    },

    {
      name: "Rabia Noor",

      department:
        "partnerships-outreach",

      designation:
        "Partnerships Manager",

      focus:
        "Civil society coordination, network building and collaborative programmes.",

      placeholder: true,
    },

    {
      name: "Usman Tariq",

      department:
        "partnerships-outreach",

      designation:
        "Grants and Donor Liaison",

      focus:
        "Proposal development, donor reporting and funding compliance.",

      placeholder: true,
    },

    /* ==========================================
       TECHNICAL AND ENGINEERING
       ========================================== */

    {
      name: "Mubeen Ishfaq",

      department:
        "technical-engineering",

      designation: "Head of Division",

      focus:
        "Technical systems, engineering projects and applied climate technology.",

      linkedin:
        "https://www.linkedin.com/in/mubeen-ishfaq/",

      instagram:
        "https://www.instagram.com/mubeenishfaq7/",
    },

    {
      name: "Kamran Shafiq",

      department:
        "technical-engineering",

      designation:
        "GIS and Remote Sensing Engineer",

      focus:
        "Satellite analysis, hazard mapping and geospatial data pipelines.",

      placeholder: true,
    },

    {
      name: "Areeba Nadeem",

      department:
        "technical-engineering",

      designation:
        "Software and Systems Engineer",

      focus:
        "Monitoring platforms, data infrastructure and internal tooling.",

      placeholder: true,
    },

    /* ==========================================
       PROJECT MANAGEMENT
       ========================================== */

    {
      name: "Riaz Ahmed",

      department:
        "project-management",

      designation: "Head of Department",

      focus:
        "Programme delivery, project planning and operational coordination.",

      linkedin:
        "http://www.linkedin.com/in/riaz-ahmed56",

      instagram:
        "https://www.instagram.com/thisisriiaz?igsh=OXhqZ3VtMDB4emsw",
    },

    {
      name: "Sadia Rehman",

      department:
        "project-management",

      designation:
        "Project Officer, Field Operations",

      focus:
        "Field logistics, community coordination and activity reporting.",

      placeholder: true,
    },

    /* ==========================================
       COMMUNICATIONS AND MEDIA
       ========================================== */

    {
      name: "Hina Aslam",

      department:
        "communications-media",

      designation:
        "Communications Lead",

      focus:
        "Editorial direction, media relations and public climate communication.",

      placeholder: true,
    },

    {
      name: "Danish Ali",

      department:
        "communications-media",

      designation:
        "Multimedia and Broadcast Producer",

      focus:
        "Video production, live broadcast and documentary field coverage.",

      placeholder: true,
    },
  ] satisfies readonly TeamMember[],

  join: {
    eyebrow: "Work with us",

    title:
      "We work with researchers, educators and climate practitioners.",

    description:
      "ClimateWatch collaborates with contributors across climate policy, research, education and technical work. If your work connects with ours, we would like to hear from you.",
  },

  closing: {
    eyebrow: "Contact",

    title:
      "For institutional, research or programme enquiries.",

    email:
      "info@climatewatch-nccb.org",
  },
} as const;
