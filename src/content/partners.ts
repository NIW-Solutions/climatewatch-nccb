/**
 * Partner organisations — src/content/partners.ts
 *
 * ONLY ADD ORGANISATIONS THAT ACTUALLY PARTNER WITH CLIMATEWATCH.
 *
 * Claiming a partner that has not agreed to be listed is the kind of error
 * that costs a relationship, so the bar here is evidence, not plausibility.
 *
 * The list below was supplied directly by ClimateWatch.
 *
 * `detail` and `href` are deliberately absent for most entries. Descriptions
 * and links were not supplied and were not guessed — an invented line about
 * what a partnership covers is exactly the kind of claim that should not be
 * on a public site. Fill them in as they are confirmed.
 *
 * `logo` is optional — drop files into public/images/partners/ and
 * reference them to replace the wordmark with an image.
 */

export type Partner = {
  name: string;
  /** What the collaboration covers. Only where confirmed. */
  detail?: string;
  href?: string;
  logo?: string;
};

export const partnersContent = {
  eyebrow: "Partners",

  title:
    "We work alongside others.",

  description:
    "Research, education and advocacy delivered with partner organisations across Pakistan and internationally.",

  emptyNote:
    "Partner organisations will be listed here.",

  partners: [
    {
      name: "Herspace",
    },
    {
      name:
        "Institute of Strategic Studies Islamabad",
    },
    {
      name: "Sustainable Development Policy Institute",
    },
    {
      name:
        "Fridays for Future Pakistan",
    },
    {
      name: "Skillistan",
    },
    {
      name: "Nutrashine",
    },
    {
      name:
        "Karokoram Impact Network",
    },
    {
      name:
        "Climate Forward Pakistan",
    },
    {
      name:
        "Progressive Climate Foundation",
    },
  ] as readonly Partner[],
} as const;

export type PartnersContent =
  typeof partnersContent;
