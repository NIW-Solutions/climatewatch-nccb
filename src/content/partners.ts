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
 * Two logo files are in place: Climate Forward Pakistan and Progressive
 * Climate Foundation, identified by reading the artwork itself rather than
 * guessing from filenames. The remaining seven show as wordmarks until
 * their files are uploaded.
 *
 * `detail` and `href` are deliberately absent for most entries. Descriptions
 * and links were not supplied and were not guessed — an invented line about
 * what a partnership covers is exactly the kind of claim that should not be
 * on a public site. Fill them in as they are confirmed.
 *
 * TO ADD A LOGO: upload the image to public/images/partners/ using exactly
 * the filename already written in the `logo` line below — for example
 * herspace.png. Nothing here needs editing.
 *
 * Every partner already names a logo path even though most of the files do
 * not exist yet. That is safe: PartnerLogo falls back to the partner's name
 * when a file is missing, so logos can be added one at a time and an entry
 * without artwork simply shows as a wordmark.
 *
 * TO ADD A WEBSITE: add an `href` line, e.g.
 *   href: "https://example.org",
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
      logo: "/images/partners/herspace.png",
    },
    {
      name:
        "Institute of Strategic Studies Islamabad",
      logo: "/images/partners/institute-of-strategic-studies-islamabad.png",
    },
    {
      name:
        "Sustainable Development Policy Institute",
      logo: "/images/partners/sustainable-development-policy-institute.png",
    },
    {
      name:
        "Fridays for Future Pakistan",
      logo: "/images/partners/fridays-for-future-pakistan.png",
    },
    {
      name: "Skillistan",
      logo: "/images/partners/skillistan.png",
    },
    {
      name: "Nutrashine",
      logo: "/images/partners/nutrashine.png",
    },
    {
      name:
        "Karokoram Impact Network",
      logo: "/images/partners/karokoram-impact-network.png",
    },
    {
      name:
        "Climate Forward Pakistan",
      logo: "/images/partners/climate-forward-pakistan.png",
    },
    {
      name:
        "Progressive Climate Foundation",
      logo: "/images/partners/progressive-climate-foundation.png",
    },
  ] as readonly Partner[],
} as const;

export type PartnersContent =
  typeof partnersContent;
