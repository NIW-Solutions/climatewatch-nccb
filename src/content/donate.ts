/**
 * Donate content — src/content/donate.ts
 *
 * `methods` is deliberately EMPTY. Bank account numbers, IBANs and payment
 * links are details only ClimateWatch can supply, and inventing plausible
 * ones would be actively dangerous — a wrong account number on a live
 * donate page sends money to a stranger.
 *
 * Until an entry is added here, the page shows its fallback and points
 * people at email. To enable giving, append entries like:
 *
 *   {
 *     name: "Bank transfer",
 *     detail: "ClimateWatch",
 *     lines: ["Bank: …", "Account title: …", "IBAN: …"],
 *   }
 *
 * or, for a hosted payment page:
 *
 *   {
 *     name: "Card payment",
 *     detail: "Processed by our payment provider",
 *     href: "https://…",
 *   }
 */

export type DonateMethod = {
  name: string;
  detail: string;
  /** Literal lines shown verbatim, e.g. account details. */
  lines?: readonly string[];
  /** External payment page, if this method is a hosted link. */
  href?: string;
};

export const donateContent = {
  hero: {
    eyebrow: "Support our work",

    title:
      "Fund climate research that starts in the mountains.",

    description:
      "ClimateWatch is a youth-led climate think tank working across international climate policy, research and education. Support keeps our researchers in the field and our delegates in the room.",
  },

  impact: {
    eyebrow: "What support funds",

    title:
      "Three things your support pays for.",

    items: [
      {
        number: "01",
        title:
          "Fieldwork in Gilgit-Baltistan and Chitral",
        description:
          "Glacier and flood monitoring, community reporting and the travel that evidence-gathering in the mountain districts actually requires.",
      },
      {
        number: "02",
        title:
          "Representation at climate negotiations",
        description:
          "Getting Pakistani youth delegates to the UNFCCC sessions where decisions about their futures are made.",
      },
      {
        number: "03",
        title:
          "Open research and education",
        description:
          "Policy briefs, reports and educational material published free, so the evidence reaches the people who need it.",
      },
    ],
  },

  giving: {
    eyebrow: "How to give",

    title: "Ways to contribute.",

    description:
      "For institutional funding, partnerships or grants, please contact us directly and we will send the relevant documentation.",

    /**
     * Shown while `methods` is empty — see the note at the top of this file.
     */
    fallbackNote:
      "Our giving details are being finalised. In the meantime, please email us and we will send payment information and, where required, formal documentation for your finance team.",

    email:
      "info@climatewatch-nccb.org",
  },

  /*
   * Payment destinations. Treat every value here as money-critical: a
   * single wrong character sends donations to a stranger's account. Change
   * these only against something written down by ClimateWatch, never from
   * memory, and re-read the address character by character afterwards.
   */
  methods: [
    {
      name: "PayPal",

      detail:
        "Give any amount through PayPal. Please add a note with your name or organisation so we can acknowledge the gift.",

      /*
       * The account address is carried in the href rather than printed on
       * the page, so donors go through PayPal's own checkout instead of
       * copying an address by hand. `lines` stays supported for methods
       * that genuinely need visible details, such as a bank transfer.
       */
      href: "https://www.paypal.com/donate?business=cliamtewatch%40gmail.com",
    },
  ] as readonly DonateMethod[],

  assurance: {
    eyebrow: "Accountability",

    title:
      "ECOSOC-accredited, and answerable for it.",

    description:
      "ClimateWatch holds consultative status at the United Nations Economic and Social Council. We are happy to share governance and financial documentation with prospective funders on request.",
  },
} as const;

export type DonateContent =
  typeof donateContent;
