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
 * Every partner has a logo. Each was identified by opening the artwork and
 * reading it rather than trusting a filename — which mattered: the file
 * named "Dastak Foundation" is in fact The Zameek Community's mark. That one
 * carries no text at all, so it was confirmed by ClimateWatch rather than
 * from the artwork.
 *
 * Websites were supplied by ClimateWatch and each was checked to return 200
 * before being added. Taqalum has none yet, so its entry renders as a plain
 * logo rather than a link.
 *
 * `detail` is still absent everywhere — no descriptions were supplied, and an
 * invented line about what a partnership covers is exactly the kind of claim
 * that should not be on a public site.
 *
 * TO ADD A LOGO: upload the image to public/images/partners/ using exactly
 * the filename already written in the `logo` line below — for example
 * herspace.png. Nothing here needs editing.
 *
 * A partner whose file is missing falls back to a wordmark — PartnerTicker
 * checks the filesystem on the server, so a logo can be added or removed
 * without touching code and nothing breaks in between.
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
      href: "https://www.instagram.com/herspace_youth/",
    },
    {
      name:
        "Institute of Strategic Studies Islamabad",
      logo: "/images/partners/institute-of-strategic-studies-islamabad.png",
      href: "https://issi.org.pk/",
    },
    {
      name:
        "Sustainable Development Policy Institute",
      logo: "/images/partners/sustainable-development-policy-institute.png",
      href: "https://sdpi.org/",
    },
    {
      name:
        "Fridays for Future Pakistan",
      logo: "/images/partners/fridays-for-future-pakistan.png",
      href: "https://www.instagram.com/fridaysforfuturepk/",
    },
    {
      name: "Nutrashine",
      logo: "/images/partners/nutrashine.png",
      href: "https://nutrashine.org/",
    },
    {
      name:
        "Karakoram Impact Network",
      logo: "/images/partners/karakoram-impact-network.png",
      href: "https://www.instagram.com/karakorumimpactnetwork/",
    },
    {
      name:
        "Climate Forward Pakistan",
      logo: "/images/partners/climate-forward-pakistan.png",
      href: "https://cfpakistan.org/",
    },
    {
      name:
        "Progressive Climate Foundation",
      logo: "/images/partners/progressive-climate-foundation.png",
      href: "https://progressiveclimatefoundation.org/",
    },
    {
      name:
        "Gilgit-Baltistan Climate Watch",
      logo: "/images/partners/gilgit-baltistan-climate-watch.png",
      href: "https://www.linkedin.com/company/gilgit-baltistan-climate-watch/",
    },
    {
      name: "Ibtida",
      logo: "/images/partners/ibtida.png",
      href: "https://www.instagram.com/ibtada_official/",
    },
    {
      name: "Taqalum",
      logo: "/images/partners/taqalum.png",
    },
    {
      name: "The Zameek Community",
      logo: "/images/partners/the-zameek-community.png",
      href: "https://www.instagram.com/thezameekcommunity/",
    },
  ] as readonly Partner[],
} as const;

export type PartnersContent =
  typeof partnersContent;
