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
          "ClimateWatch is a youth-led organisation, and every position here — including the divisional leads — is voluntary and unpaid. Better that you know now than at the interview.",
      },
      {
        title: "Remote",
        description:
          "The team works across Gilgit-Baltistan, Chitral, the rest of Pakistan and abroad. Roles are remote unless a posting says otherwise.",
      },
      {
        title: "Internships run three months",
        description:
          "Extendable to six depending on performance. Divisional lead positions are a minimum of one year, at roughly two hours a day, Monday to Friday.",
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

    {
      slug: "human-resources-intern",
      title: "Human Resources Intern",
      division: "Human Resources",
      commitment: "Internship",
      location: "Remote",
      term: "3 months, extendable to 6",
      hours: "Around 8 hours per week",
      posted: "August 2026",

      summary:
        "Support the division that keeps a distributed volunteer team working: recruitment, onboarding, records, and the supervision and reporting that institutional internships depend on.",

      responsibilities: [
        "Support recruitment for open positions, from advertising a role through to scheduling interviews.",
        "Onboard new interns and volunteers, and make sure each one knows who they report to and what is expected of them.",
        "Maintain accurate team records across the divisions — contact details, roles, and internship start and end dates.",
        "Coordinate mandatory institutional internships: supervisor assignment, agreed reporting schedules and completion certificates.",
        "Track hours and reporting for interns who need documentation for their university or college.",
        "Help divisional leads plan for the people they need, and flag where a division is stretched.",
      ],

      requirements: [
        "Students or recent graduates in Human Resource Management, Business Administration, Psychology, Public Administration or a related field.",
        "Organised and reliable with written records. Much of this role is making sure nothing about a person's placement is lost or forgotten.",
        "Clear, considerate written communication — you are often the first person an applicant or new intern hears from.",
        "Comfortable handling personal information with discretion.",
        "Working knowledge of spreadsheets and shared documents.",
        "Interest in climate action, sustainability or the nonprofit sector is an added advantage.",
      ],
    },

    {
      slug: "head-of-division-research-development",
      title: "Head of Division — Research and Development",
      division: "Research and Development",
      commitment: "Divisional lead",
      location: "Remote",
      term: "Minimum 1 year",
      hours: "Around 2 hours a day, Monday to Friday",
      posted: "August 2026",

      summary:
        "Lead the division that produces ClimateWatch's research: policy analysis on climate finance and adaptation, evidence from Gilgit-Baltistan, Chitral and Sindh, and the standards that keep every claim traceable to its source.",

      responsibilities: [
        "Set the division's research agenda and decide which questions ClimateWatch takes on.",
        "Supervise research associates and interns, review their work, and give a small team the direction it needs.",
        "Hold the line on evidence: every published figure traceable to a primary document or named source, and nothing asserted beyond what that evidence supports.",
        "Take publications from draft through review to release, working with the Media and Communications division.",
        "Connect research questions to community evidence gathered through Climate Bethaak and fieldwork.",
        "Represent the division's work to partner institutions and in policy discussions.",
      ],

      requirements: [
        "A degree in Environmental Science, Climate Studies, Public Policy, Economics, Development Studies or a related field. A postgraduate qualification or published research is an advantage.",
        "Demonstrated research experience — a thesis, published paper, policy brief or comparable body of work you can point to.",
        "A sound grasp of research methods, and of what a given piece of evidence can and cannot be used to claim.",
        "Experience supervising or mentoring others, formally or otherwise.",
        "Familiarity with Pakistan's climate policy landscape, and ideally with the UNFCCC process.",
        "The consistency to commit around two hours a day for at least a year. This is the part most applicants underestimate.",
      ],
    },

    {
      slug: "head-of-division-partnership-outreach",
      title: "Head of Division — Partnership and Outreach",
      division: "Partnership and Outreach",
      commitment: "Divisional lead",
      location: "Remote",
      term: "Minimum 1 year",
      hours: "Around 2 hours a day, Monday to Friday",
      posted: "August 2026",

      summary:
        "Lead the division that builds and holds ClimateWatch's relationships — with research institutes, youth movements, community organisations and international bodies — and turns them into work that actually happens.",

      responsibilities: [
        "Maintain the organisation's existing partnerships, making sure each one has a live point of contact rather than a logo on a page.",
        "Identify and open conversations with new partner organisations where the work genuinely overlaps.",
        "Negotiate and document memoranda of understanding and collaboration agreements.",
        "Coordinate joint activities across divisions, so that a partnership produces research, an event or a programme rather than an announcement.",
        "Represent ClimateWatch at convenings, and prepare others on the team to do the same.",
        "Supervise the associates and interns in the division, and give them real work to lead.",
      ],

      requirements: [
        "A degree in International Relations, Development Studies, Communications, Public Policy, Business or a related field.",
        "Experience building working relationships with organisations — partnerships, outreach, community organising, student societies or comparable.",
        "Confident written and spoken communication in English. Urdu is an advantage, and a regional language of Gilgit-Baltistan or Chitral more so.",
        "Organised follow-through. Partnerships are lost to unanswered emails far more often than to disagreement.",
        "An understanding of the climate and development sector in Pakistan, and of where youth-led organisations sit within it.",
        "The consistency to commit around two hours a day for at least a year.",
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
