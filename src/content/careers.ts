/**
 * Careers — src/content/careers.ts
 *
 * ONLY LIST ROLES THAT ARE GENUINELY OPEN.
 *
 * People arrange their lives around job listings. A stale posting wastes an
 * applicant's time and a fabricated one is worse, so the bar here is the same
 * as everywhere else on this site: real, current, supplied by ClimateWatch.
 *
 * TO POST A ROLE: add an entry to `openings` below. Nothing else needs
 * editing — the page, the navigation and the first-visit announcement all
 * read from this array.
 *
 * TO CLOSE A ROLE: delete its entry. When the array is empty the page shows
 * the general "we still want to hear from you" state instead, and no
 * announcement is shown to visitors.
 *
 * THE FIRST-VISIT POPUP keys off the set of slugs below. Adding a role
 * changes that signature, so the announcement reappears for people who
 * dismissed the previous one — which is the point. Editing the wording of an
 * existing role does not re-trigger it; only adding or removing roles does.
 *
 * EVERY ROLE IS UNPAID. That is stated on the page in its own right rather
 * than buried in a bullet, because someone deciding whether to spend three
 * months of their life on this should learn it in the first screenful.
 */

export type CareerOpening = {
  /** Stable id. Changing it re-triggers the first-visit announcement. */
  slug: string;
  title: string;
  /** Division name as it appears on the team page. */
  division: string;
  /** "Internship", "Volunteer", "Divisional lead". */
  commitment: string;
  location: string;
  /** How long the role runs, e.g. "3 months, extendable to 6". */
  term: string;
  /** Expected time, e.g. "At least 15 hours per week". */
  hours: string;
  /** Month and year, e.g. "August 2026". */
  posted: string;
  /** Optional deadline. Omit when applications are reviewed on a rolling basis. */
  closes?: string;
  summary: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  /** Where applications go. Defaults to the HR address when omitted. */
  applyEmail?: string;
};

export const careersContent = {
  meta: {
    title: "Careers",
    description:
      "Open roles, internships and divisional lead positions at ClimateWatch, a youth-led climate think tank working across policy, research and education in Pakistan.",
  },

  hero: {
    eyebrow: "Careers",

    title:
      "Work on climate policy, research and education in Pakistan.",

    description:
      "ClimateWatch collaborates with contributors across climate policy, research, education and technical work. If your work connects with ours, we would like to hear from you.",
  },

  /*
   * Stated before the roles, not after them. Every item here is a term
   * someone would otherwise discover only after investing time in an
   * application.
   */
  terms: {
    eyebrow: "Before you apply",

    title: "What these positions are.",

    items: [
      {
        title: "Unpaid",
        description:
          "ClimateWatch is a youth-led organisation, and every position we advertise — up to and including divisional leads — is voluntary and unpaid. Better that you know now than at the interview.",
      },
      {
        title: "Remote",
        description:
          "The team works across Gilgit-Baltistan, Chitral, the rest of Pakistan and abroad. Roles are remote unless a posting says otherwise.",
      },
      {
        title: "Internships run three months",
        description:
          "Extendable to six depending on performance. Divisional lead positions, when we advertise them, run a minimum of one year at roughly two hours a day, Monday to Friday.",
      },
      {
        title: "Mandatory institutional internships accepted",
        description:
          "If your university or college requires a supervised internship, we can host it. You are assigned a supervisor within your division, work to an agreed reporting schedule, and receive a completion certificate after at least 20 to 25 hours. ClimateWatch holds ECOSOC Special Consultative Status, which institutions generally accept for accreditation.",
      },
    ],
  },

  openingsSection: {
    eyebrow: "Open roles",

    title: "Current openings.",

    /* Shown when `openings` is empty. */
    emptyTitle:
      "No open roles at the moment.",

    emptyDescription:
      "We are not advertising a specific position right now. We still read every message, and divisions take on interns and volunteers through the year — send your CV and a short note about the work you want to do.",
  },

  process: {
    eyebrow: "How to apply",

    title: "What to send us.",

    steps: [
      {
        title: "A CV",
        description:
          "One or two pages. Include anything relevant to climate policy, research, education or technical work, whether or not it was paid.",
      },
      {
        title: "A motivation letter",
        description:
          "A few paragraphs on why this work interests you and which division you want to join. We would rather read something specific than a form letter.",
      },
      {
        title: "Name the role in the subject line",
        description:
          "Put the role title in the subject so it reaches the right division. General applications are welcome without one.",
      },
    ],
  },

  contact: {
    eyebrow: "Applications",

    title: "Send applications to our Human Resources division.",

    email: "HR@climatewatch-nccb.org",

    note: "We read everything that arrives. A reply may take time — the team is small and most of it is volunteering alongside study or other work.",
  },

  openings: [
    {
      slug: "web-development-intern",
      title: "Web Development Intern",
      division: "Technical and Engineering",
      commitment: "Internship",
      location: "Remote",
      term: "3 months, extendable to 6",
      hours: "At least 15 hours per week",
      posted: "August 2026",

      summary:
        "Support the development, maintenance and optimisation of ClimateWatch's website and digital platforms — the work that carries our research and policy analysis to the people who use it.",

      responsibilities: [
        "Develop, maintain and update website content and features.",
        "Improve website performance, responsiveness and user experience.",
        "Troubleshoot technical issues and implement effective solutions.",
        "Assist with website security, hosting and regular maintenance.",
        "Collaborate with different teams to support digital campaigns and organisational initiatives.",
        "Apply basic SEO best practices to improve website visibility.",
      ],

      requirements: [
        "Students or recent graduates in Computer Science, Software Engineering, Information Technology or a related field.",
        "Proficiency in HTML, CSS and JavaScript. Experience with WordPress or another CMS is useful background, though this site runs on Next.js, React and TypeScript — you would be working in that codebase rather than a CMS.",
        "Familiarity with responsive web design, Git and GitHub, website hosting, security and basic SEO.",
        "A portfolio, GitHub profile or previous web development projects to showcase your skills.",
        "Strong communication, creativity, reliability and the ability to work independently.",
        "Interest in climate action, sustainability or the nonprofit sector is an added advantage.",
      ],
    },

  ] as readonly CareerOpening[],
} as const;

export type CareersContent = typeof careersContent;

/**
 * Signature of the current set of roles, used by the first-visit
 * announcement to decide whether a visitor has already seen these openings.
 * Derived from the slugs, so adding or removing a role changes it and
 * re-editing an existing one does not.
 */
export function openingsSignature(): string {
  return careersContent.openings
    .map((opening) => opening.slug)
    .sort()
    .join("|");
}
