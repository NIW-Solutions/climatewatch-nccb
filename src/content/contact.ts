export const contactContent = {
  hero: {
    eyebrow: "Contact",
    title:
      "Start with the right conversation.",
    description:
      "Contact ClimateWatch for research, policy, programme, media and institutional enquiries.",
  },

  routes: {
    eyebrow: "Enquiries",
    title:
      "What would you like to discuss?",

    items: [
      {
        number: "01",
        label: "Research",
        title: "Research & evidence",
        description:
          "Questions relating to ClimateWatch research, evidence, publications or ongoing research work.",
        subject:
          "ClimateWatch Research Enquiry",
      },

      {
        number: "02",
        label: "Policy",
        title: "Climate policy",
        description:
          "Enquiries relating to international climate policy, UNFCCC processes, climate finance and policy engagement.",
        subject:
          "ClimateWatch Policy Enquiry",
      },

      {
        number: "03",
        label: "Programmes",
        title: "Programmes & projects",
        description:
          "Questions relating to ClimateWatch programmes, projects, education work and applied initiatives.",
        subject:
          "ClimateWatch Programme Enquiry",
      },

      {
        number: "04",
        label: "Media",
        title: "Press & media",
        description:
          "Interview requests, media enquiries, institutional references and requests for official ClimateWatch materials.",
        subject:
          "ClimateWatch Media Enquiry",
      },

      {
        number: "05",
        label: "Institutional",
        title: "Partnerships & outreach",
        description:
          "Institutional correspondence relating to partnerships, outreach or potential areas of collaboration.",
        subject:
          "ClimateWatch Institutional Enquiry",
      },
    ],
  },

  form: {
    eyebrow: "Send an enquiry",
    title:
      "Tell us what you need.",
    description:
      "Provide a little context and the relevant ClimateWatch team can respond appropriately.",

    enquiryTypes: [
      "Research",
      "Climate policy",
      "Programmes & projects",
      "Press & media",
      "Partnerships & outreach",
      "General enquiry",
    ],
  },

  direct: {
    eyebrow: "Direct contact",
    title:
      "Prefer email?",

    email:
      "info@climatewatch-nccb.org",

    description:
      "For general enquiries, institutional correspondence, research requests and media contact.",
  },

  organisation: {
    eyebrow: "Organisation",

    title:
      "ClimateWatch works across international climate policy, research and development.",

    description:
      "ClimateWatch is an ECOSOC-accredited organisation.",
  },
} as const;