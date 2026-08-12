export type LegalSection = {
  number: string;
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export const privacyContent = {
  eyebrow: "Privacy",
  title: "Privacy Policy",
  description:
    "This policy explains how information submitted through the ClimateWatch website may be handled.",
  updated: "11 August 2026",

  sections: [
    {
      number: "01",
      title: "About this website",
      paragraphs: [
        "This website is operated for ClimateWatch, a youth-led climate think tank working across international climate policy, research and development.",
        "This Privacy Policy applies to information provided through the ClimateWatch website and its contact channels.",
      ],
    },

    {
      number: "02",
      title: "Information you provide",
      paragraphs: [
        "You may choose to provide information when contacting ClimateWatch through a website form, email or another communication channel.",
      ],
      items: [
        "Your name",
        "Email address",
        "Organisation or institution",
        "Type of enquiry",
        "Information included in your message",
      ],
    },

    {
      number: "03",
      title: "How information may be used",
      paragraphs: [
        "Information you provide may be used to understand and respond to your enquiry and to direct it to the appropriate ClimateWatch team.",
      ],
      items: [
        "Responding to research, programme or policy enquiries",
        "Responding to media and institutional requests",
        "Providing requested documents or resources",
        "Managing correspondence relating to ClimateWatch activities",
      ],
    },

    {
      number: "04",
      title: "Information sharing",
      paragraphs: [
        "ClimateWatch does not publish personal information submitted through private enquiries unless permission has been provided or disclosure is otherwise required.",
        "Information may be shared internally where necessary to respond to an enquiry.",
      ],
    },

    {
      number: "05",
      title: "Third-party websites",
      paragraphs: [
        "The ClimateWatch website may link to external websites, publications, social platforms and institutional resources.",
        "ClimateWatch is not responsible for the privacy practices or content of third-party websites. Their own policies apply when you leave this website.",
      ],
    },

    {
      number: "06",
      title: "Data security",
      paragraphs: [
        "Reasonable steps should be taken to protect information submitted through the website and associated communication channels.",
        "No internet-based transmission or storage method can be guaranteed to be completely secure.",
      ],
    },

    {
      number: "07",
      title: "Retention",
      paragraphs: [
        "Information may be retained for as long as reasonably necessary to manage correspondence, maintain institutional records or respond to the purpose for which it was provided.",
      ],
    },

    {
      number: "08",
      title: "Your enquiries",
      paragraphs: [
        "If you have a question about information you previously submitted to ClimateWatch, you may contact the organisation directly.",
      ],
    },

    {
      number: "09",
      title: "Changes to this policy",
      paragraphs: [
        "This Privacy Policy may be updated when the website, organisational processes or applicable requirements change.",
        "The latest version will be published on this page with an updated revision date.",
      ],
    },
  ] satisfies readonly LegalSection[],

  contact: {
    label: "Privacy enquiries",
    email: "info@climatewatch-nccb.org",
  },
} as const;

export const termsContent = {
  eyebrow: "Terms",
  title: "Terms of Use",
  description:
    "These terms govern access to and use of the ClimateWatch website and its published materials.",
  updated: "11 August 2026",

  sections: [
    {
      number: "01",
      title: "About these terms",
      paragraphs: [
        "These Terms of Use apply to your use of the ClimateWatch website.",
        "ClimateWatch is a youth-led climate think tank working across international climate policy, research and development.",
        "By using this website, you agree to use it lawfully and in accordance with these terms.",
      ],
    },

    {
      number: "02",
      title: "Website content",
      paragraphs: [
        "The website provides information about ClimateWatch research, programmes, projects, publications, resources and institutional activities.",
        "Content is provided for general informational, research and public-interest purposes.",
      ],
    },

    {
      number: "03",
      title: "Research and policy material",
      paragraphs: [
        "Research, policy analysis, commentary and other published material may reflect the evidence, analysis and context available at the time of publication.",
        "Users should consult the original publication, cited evidence and relevant primary sources when relying on research material for professional or institutional purposes.",
      ],
    },

    {
      number: "04",
      title: "No professional advice",
      paragraphs: [
        "Information on this website is not intended to constitute legal, financial or other professional advice.",
        "Users remain responsible for obtaining appropriate professional advice where required.",
      ],
    },

    {
      number: "05",
      title: "Intellectual property",
      paragraphs: [
        "Unless otherwise indicated, original ClimateWatch website content and materials remain associated with ClimateWatch or their respective rights holders.",
        "Third-party materials, names, logos, publications and resources remain the property of their respective owners.",
      ],
    },

    {
      number: "06",
      title: "Referencing ClimateWatch",
      paragraphs: [
        "ClimateWatch materials may be referenced for research, reporting and educational purposes where appropriate attribution is provided.",
        "Use of ClimateWatch branding, logos or visual identity should not imply endorsement, partnership or institutional approval where none exists.",
      ],
    },

    {
      number: "07",
      title: "External links",
      paragraphs: [
        "The website may contain links to external organisations, publications, social platforms and third-party resources.",
        "External links are provided for reference or convenience and do not necessarily represent endorsement of all content on those websites.",
      ],
    },

    {
      number: "08",
      title: "Website availability",
      paragraphs: [
        "ClimateWatch may update, modify, remove or reorganise website content when necessary.",
        "Continuous or uninterrupted availability of every page, publication or external link cannot be guaranteed.",
      ],
    },

    {
      number: "09",
      title: "Acceptable use",
      paragraphs: [
        "You must not intentionally misuse this website, interfere with its operation or attempt unauthorised access to its systems or infrastructure.",
      ],
    },

    {
      number: "10",
      title: "Changes to these terms",
      paragraphs: [
        "These Terms of Use may be revised as the website or relevant organisational requirements change.",
        "The latest version will be made available on this page.",
      ],
    },
  ] satisfies readonly LegalSection[],

  contact: {
    label: "Questions about these terms",
    email: "info@climatewatch-nccb.org",
  },
} as const;