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
 */

export type CareerOpening = {
  /** Stable id. Changing it re-triggers the first-visit announcement. */
  slug: string;
  title: string;
  /** Division name as it appears on the team page. */
  division: string;
  /** "Internship", "Volunteer", "Part-time", "Full-time", "Consultancy". */
  commitment: string;
  location: string;
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
      "Open roles, internships and volunteer positions at ClimateWatch, a youth-led climate think tank working across policy, research and education in Pakistan.",
  },

  hero: {
    eyebrow: "Careers",

    title:
      "Work on climate policy, research and education in Pakistan.",

    description:
      "ClimateWatch collaborates with contributors across climate policy, research, education and technical work. If your work connects with ours, we would like to hear from you.",
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
        title: "A short note",
        description:
          "A few paragraphs on why this work interests you and which division you want to join. We would rather read something specific than a form letter.",
      },
      {
        title: "Name the role in the subject line",
        description:
          "If you are applying to an advertised role, put its title in the subject. General applications are welcome without one.",
      },
    ],
  },

  contact: {
    eyebrow: "Applications",

    title: "Send applications to our Human Resources division.",

    email: "HR@climatewatch-nccb.org",

    note: "We read everything that arrives. A reply may take time — the team is small and most of it is volunteering alongside study or other work.",
  },

  /*
   * Open roles. Empty by design until ClimateWatch supplies real postings.
   * See the note at the top of this file before adding anything here.
   */
  openings: [] as readonly CareerOpening[],
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
