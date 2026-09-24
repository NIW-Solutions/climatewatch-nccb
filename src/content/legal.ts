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
    "How ClimateWatch collects, uses and protects personal data through this website, and the rights you have over it under the General Data Protection Regulation.",
  updated: "24 September 2026",

  sections: [
    {
      number: "01",
      title: "Who is responsible for your data",
      paragraphs: [
        "ClimateWatch is a youth-led climate think tank working across international climate policy, research, education and applied innovation, with ECOSOC Special Consultative Status. For the purposes of the General Data Protection Regulation (GDPR), ClimateWatch is the controller of the personal data described in this policy.",
        "Questions about this policy, or any request about your own data, can be sent to info@climatewatch-nccb.org.",
      ],
    },

    {
      number: "02",
      title: "What this policy covers",
      paragraphs: [
        "This policy applies to www.climatewatch-nccb.org and to the forms, newsletter signup and contact channels on it. It does not cover other organisations' websites you reach by following a link from here.",
      ],
    },

    {
      number: "03",
      title: "What we collect, why, and on what legal basis",
      paragraphs: [
        "ClimateWatch collects personal data only where there is a lawful basis for it under Article 6 of the GDPR. The basis relied on is set out against each purpose below.",
      ],
      items: [
        "Enquiries and correspondence — your name, email address, organisation and the content of your message, so that we can read and answer you. Legal basis: legitimate interests, in responding to someone who has chosen to contact us.",
        "Applications and registrations submitted through a form on this site — whatever that form asks for, which may include your name, contact details, affiliation and documents you attach such as a CV or motivation letter. Each form states its own purpose above the submit button. Legal basis: your consent, given by submitting the form, and, where an application is being considered, steps taken at your request before entering into an agreement.",
        "Newsletter subscription — your email address, so we can send you the newsletter. Legal basis: your consent, which you can withdraw through the unsubscribe link in every issue.",
        "Website analytics — pages visited, approximate location, referring site, device and browser. Collected only if you accept analytics cookies. Legal basis: your consent.",
        "Technical logs kept by our hosting provider, including IP addresses, for security and to keep the site running. Legal basis: legitimate interests, in operating a secure website.",
      ],
    },

    {
      number: "04",
      title: "Cookies and analytics",
      paragraphs: [
        "This website sets no analytics cookies unless you accept them. You are asked once, and declining is as easy as accepting. Until you accept, nothing is requested from Google and no analytics cookies are set.",
        "If you accept, Google Analytics is loaded and sets cookies that distinguish visitors and sessions. IP addresses are anonymised. ClimateWatch uses this in aggregate only, to understand which pages are read and how people find the site — never to identify an individual visitor, and never linked to anything you send through a form.",
        "You can change your mind at any time through the Cookie settings link in the footer of every page. Declining after having accepted clears the analytics cookies this site set.",
        "A single entry is kept in your browser's local storage to remember your choice. It holds nothing else, and exists so that you are not asked again on every page.",
      ],
    },

    {
      number: "05",
      title: "Who else processes your data",
      paragraphs: [
        "ClimateWatch does not sell personal data and does not share it for anyone else's marketing. The providers below handle data as processors, on our instructions.",
      ],
      items: [
        "Amazon Web Services — website hosting and data storage. Form responses and uploaded documents are held in AWS data centres in Frankfurt, Germany, inside the EU.",
        "Google (Google Analytics) — website analytics, only where you have accepted. Google may process this outside the EU, including in the United States, under the European Commission's standard contractual clauses and the EU-US Data Privacy Framework.",
        "Sender — delivery of the newsletter, for subscribers only.",
        "Amazon Simple Email Service — notifying ClimateWatch staff that a form response has arrived. Those notifications do not contain your answers.",
      ],
    },

    {
      number: "06",
      title: "International transfers",
      paragraphs: [
        "The website and the data submitted through its forms are hosted inside the European Union, in Frankfurt.",
        "Where a provider processes data outside the EU or the UK — Google Analytics being the main example — the transfer is made under the safeguards recognised in Chapter V of the GDPR, principally the European Commission's standard contractual clauses. You can ask us which safeguards apply.",
      ],
    },

    {
      number: "07",
      title: "How long we keep it",
      paragraphs: [
        "Personal data is kept only as long as it is needed for the purpose it was collected for.",
      ],
      items: [
        "Documents uploaded through a form, such as CVs and motivation letters, are deleted automatically twelve months after they are submitted.",
        "Form responses are kept while the activity they relate to is live, and reviewed periodically afterwards.",
        "Correspondence is kept for as long as needed to deal with the matter it concerns, and for our records afterwards.",
        "Newsletter subscriptions are kept until you unsubscribe.",
        "Analytics data is retained by Google for the period set on the ClimateWatch property.",
      ],
    },

    {
      number: "08",
      title: "Your rights",
      paragraphs: [
        "Under the GDPR you have the rights below over your personal data. Exercising them is free, and we will respond within one month.",
      ],
      items: [
        "Access — to be told whether we hold data about you, and to receive a copy.",
        "Rectification — to have inaccurate or incomplete data corrected.",
        "Erasure — to have your data deleted, where there is no overriding reason to keep it.",
        "Restriction — to have processing paused while a question about your data is resolved.",
        "Portability — to receive data you gave us in a machine-readable form, or to have it sent to another organisation.",
        "Objection — to object to processing carried out on the basis of legitimate interests.",
        "Withdrawal of consent — to withdraw consent at any time where consent is the basis we rely on. Withdrawing does not affect processing already carried out.",
      ],
    },

    {
      number: "09",
      title: "How to exercise your rights, or complain",
      paragraphs: [
        "Write to info@climatewatch-nccb.org. We may ask for enough information to be sure who you are before acting, so that we do not disclose someone's data to the wrong person.",
        "If you are not satisfied with how we have handled your data, you have the right to complain to a data protection supervisory authority — in the EU, the authority where you live, where you work, or where you believe the problem occurred. Coming to us first is welcome, but not required.",
      ],
    },

    {
      number: "10",
      title: "How your data is protected",
      paragraphs: [
        "Data submitted through this website travels over an encrypted connection and is stored encrypted at rest. Uploaded documents are held in private storage that is not publicly reachable, and are retrieved through short-lived links available only to authorised ClimateWatch staff.",
        "Access to form responses is limited to the ClimateWatch staff who need it. No security is absolute, and no method of transmission over the internet is completely secure.",
      ],
    },

    {
      number: "11",
      title: "Children",
      paragraphs: [
        "This website is not directed at children, and ClimateWatch does not knowingly collect personal data from anyone under 16. If you believe a child has given us personal data, write to info@climatewatch-nccb.org and we will delete it.",
      ],
    },

    {
      number: "12",
      title: "Automated decision-making",
      paragraphs: [
        "ClimateWatch does not make decisions about you by automated means alone, and does not carry out profiling that produces legal or similarly significant effects.",
      ],
    },

    {
      number: "13",
      title: "Third-party websites",
      paragraphs: [
        "This website links to external websites, publications, social platforms and institutional resources.",
        "ClimateWatch is not responsible for the privacy practices or content of third-party websites. Their own policies apply once you leave this site.",
      ],
    },

    {
      number: "14",
      title: "Changes to this policy",
      paragraphs: [
        "This policy may be updated when the website, our processes or the applicable law change. The current version is always published here with the date it was last revised.",
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