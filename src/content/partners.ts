/**
 * Partner organisations — src/content/partners.ts
 *
 * ONLY ADD ORGANISATIONS THAT ACTUALLY PARTNER WITH CLIMATEWATCH.
 *
 * Claiming a partner that has not agreed to be listed is the kind of error
 * that costs a relationship, so the bar here is evidence, not plausibility.
 * Both lists were supplied directly by ClimateWatch.
 *
 * There are two tiers, rendered as two separate tickers:
 *
 *   official      — the shorter, centred ticker
 *   collaborating — the full-width ticker beneath it
 *
 * Every logo was identified by opening the artwork and reading it rather
 * than trusting a filename. That mattered at least once: the file named
 * "Dastak Foundation" is in fact The Zameek Community's mark.
 *
 * TO ADD A LOGO: upload the image to public/images/partners/ using exactly
 * the filename in the `logo` line. Nothing here needs editing. A partner
 * whose file is missing falls back to a wordmark — PartnerTicker checks the
 * filesystem on the server — so nothing breaks in between.
 *
 * Both tickers sit on white, so a logo needs a transparent or white ground.
 * Check any new logo against white before adding it — a white-on-dark mark
 * disappears, and a dark-on-black one becomes a box.
 *
 * TO ADD A WEBSITE: add an `href` line. Each URL supplied so far was checked
 * to return 200 before being added.
 */

export type Partner = {
  name: string;
  /** What the collaboration covers. Only where confirmed. */
  detail?: string;
  href?: string;
  logo?: string;
};

export const partnersContent = {
  official: {
    eyebrow: "Official Partners",

    title:
      "Our official partners.",

    description:
      "Organisations we work with formally across research, education and climate policy.",

    emptyNote:
      "Official partners will be listed here.",

    partners: [
      {
        name:
          "Sustainable Development Policy Institute",
        logo: "/images/partners/sustainable-development-policy-institute.png",
        href: "https://sdpi.org/",
      },
      {
        name:
          "Institute of Strategic Studies Islamabad",
        logo: "/images/partners/institute-of-strategic-studies-islamabad.png",
        href: "https://issi.org.pk/",
      },
      {
        name: "Herspace",
        logo: "/images/partners/herspace.png",
        href: "https://www.instagram.com/herspace_youth/",
      },
      {
        name:
          "Fridays for Future Pakistan",
        logo: "/images/partners/fridays-for-future-pakistan.png",
        href: "https://www.instagram.com/fridaysforfuturepk/",
      },
      {
        /*
         * Their own brand file: white on green. An earlier version inverted
         * the white-on-black artwork to black, which was legible but was our
         * alteration rather than their mark. The green ground shows as a
         * coloured panel on the white strip, exactly as Herspace's purple
         * does — that is the brand, not a background to strip.
         */
        name: "Nustainable",
        logo: "/images/partners/nustainable.png",
      },
      {
        /*
         * Glacier School is ClimateWatch's own project — its logo reads
         * "A Project by ClimateWatch" — rather than an outside partner.
         * Listed here at ClimateWatch's request.
         */
        name: "Glacier School",
        logo: "/images/partners/glacier-school.png",
      },
      {
        /*
         * The stacked lockup rather than the wide one: at 2.58:1 the
         * horizontal version would hit the width cap and render far smaller
         * than everything beside it.
         */
        name:
          "Misbah Sports Academy",
        logo: "/images/partners/misbah-sports-academy.png",
        href: "https://www.instagram.com/misbahvolleyballacademy/?hl=en",
      },
    ] as readonly Partner[],
  },

  collaborating: {
    eyebrow: "Collaborating Partners",

    title:
      "We work alongside others.",

    description:
      "Research, education and advocacy delivered with partner organisations across Pakistan and internationally.",

    emptyNote:
      "Partner organisations will be listed here.",

    partners: [
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
        href: "https://taqalum.com/",
      },
      {
        name:
          "The Zameek Community",
        logo: "/images/partners/the-zameek-community.png",
        href: "https://www.instagram.com/thezameekcommunity/",
      },
    ] as readonly Partner[],
  },
} as const;

export type PartnersContent =
  typeof partnersContent;
