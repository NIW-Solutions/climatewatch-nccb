export const programmesContent = {
  hero: {
    eyebrow: "Programmes",

    title:
      "Three specialist divisions connecting evidence, learning and climate policy.",

    description:
      "ClimateWatch works through International Climate Policy, Education for Sustainable Development, and Research & Development.",

    /*
     * Stored at 1152x720, its native scale. The source is a 1280x720 screen
     * export rather than a camera original, and upscaling it to the 2560px
     * the other section images use would add no detail.
     */
    image: "/images/programmes/programmes-hero-debris-2026-08.webp",

    imageAlt:
      "People shovelling rock and silt debris from land in northern Pakistan.",

    imageCaption:
      "ClimateWatch programmes connect research, education and policy with climate-vulnerable contexts.",
  },

  introduction: {
    eyebrow: "Our programme structure",

    title: "Different disciplines. A shared evidence-led approach.",

    paragraphs: [
      "Each ClimateWatch division has its own programme focus, but the work is designed to connect across research, community evidence, climate education and policy engagement.",

      "This allows knowledge generated in one part of the institution to inform work elsewhere — from international policy analysis to local climate education and applied research.",
    ],
  },

  divisions: [
    {
      number: "01",

      id: "international-climate-policy",

      eyebrow: "International Climate Policy",

      title:
        "Following the climate-policy processes that shape national decisions.",

      description:
        "The International Climate Policy division tracks global climate governance and examines what international commitments, negotiations and finance mechanisms mean for Pakistan.",

      paragraphs: [
        "The division follows the UNFCCC process, the Paris Agreement and related international climate-policy developments with attention to their implications for national policy and climate-vulnerable communities.",

        "Research and policy work covers climate finance, adaptation, mitigation, loss and damage, Action for Climate Empowerment and wider questions of implementation and accountability.",
      ],

      focus: [
        "UNFCCC processes",
        "Paris Agreement",
        "Climate finance",
        "Action for Climate Empowerment",
        "Loss and damage",
        "Climate-policy analysis",
      ],

      image: "/images/programmes/international-climate-policy-2026-08.webp",

      imageAlt:
        "Youth delegates seated behind a YOUTH NGOs nameplate at an international climate negotiation session.",

      imageCaption:
        "Connecting international climate-policy developments with their relevance for Pakistan.",

      action: {
        label: "Explore related research",
        href: "/research",
      },
    },

    {
      number: "02",

      id: "education-for-sustainable-development",

      eyebrow: "Education for Sustainable Development",

      title: "Climate learning grounded in place, knowledge and experience.",

      description:
        "The Education for Sustainable Development division connects climate and earth-science education with community knowledge and the realities of climate-vulnerable regions.",

      paragraphs: [
        "Its work draws on the principles of UNESCO’s Education for Sustainable Development agenda while recognising that climate learning should also reflect the environmental knowledge held within communities.",

        "Programmes such as Glacier School bring together students, trainers and communities around climate science, mountain environments and practical understanding of environmental change.",
      ],

      focus: [
        "Education for Sustainable Development",
        "Glacier School",
        "Climate and earth science",
        "Traditional Ecological Knowledge",
        "Community learning",
        "Climate literacy",
      ],

      image: "/images/programmes/glacier-school-2026-08.webp",

      imageAlt: "A glacier below a snow-covered summit in northern Pakistan.",

      imageCaption:
        "Climate education connected to mountain environments, local knowledge and practical learning.",

      action: {
        label: "Explore Glacier School",
        href: "/projects#glacier-school",
      },
    },

    {
      number: "03",

      id: "research-and-development",

      eyebrow: "Research & Development",

      title:
        "Applied research for climate vulnerability, resilience and adaptation.",

      description:
        "The Research & Development division investigates climate vulnerability, adaptation gaps, public finance and applied tools that can strengthen resilience.",

      paragraphs: [
        "Research combines policy analysis with primary evidence and practical questions emerging from climate-vulnerable environments.",

        "The division also explores applied technologies including remote sensing and early-warning approaches where they can contribute to better climate-risk monitoring and decision-making.",
      ],

      focus: [
        "Climate vulnerability",
        "Adaptation gaps",
        "Climate finance",
        "Primary research",
        "Remote sensing",
        "Early-warning approaches",
      ],

      image: "/images/programmes/research-development-2026-08.webp",

      imageAlt: "Water droplets held on a leaf.",

      imageCaption:
        "Research connecting climate evidence with practical questions of resilience and risk.",

      action: {
        label: "Explore research",
        href: "/research",
      },
    },
  ],

  /* ============================================================
     EVENTS

     A page advertising a date that has passed is worse than no
     listing — but an event that has happened and produced
     something is not an advertisement, it is a record. Either take
     the entry down or turn it into one, as the Pre-COP31
     consultation was: registration removed, `status` set to
     "Held", and an `outcome` block put where the call to register
     used to be.

     `status` drives the label on the card.
     ============================================================ */

  events: {
    eyebrow: "Events",

    title: "Where the programmes meet the people who decide.",

    description:
      "ClimateWatch convenes consultations and roundtables that bring government, research institutions and civil society into the same room ahead of the moments that matter in the international climate calendar.",

    /* Shown when `scheduled` is empty. */
    emptyTitle: "No scheduled events at the moment.",

    emptyDescription:
      "Nothing is in the calendar right now. Events are announced here and through the newsletter.",

    scheduled: [
      {
        slug: "pre-cop31-consultation-islamabad",

        status: "Held",

        title: "From Belém to Antalya: Pakistan's Position",

        subtitle: "Pre-COP31 Multi-Stakeholder Consultation",

        /*
          HELD ON 21 OCTOBER, NOT 6 OCTOBER. The poster this entry was built
          from advertised 6 October. The adopted text gives the date three
          times, once with the weekday ("Wednesday 21 October 2026"), and
          its cover prints it again; the photograph below has the printed
          date on the backdrop masked for the same reason. The record of
          the room is the authority, so the date follows it.
        */

        /* Machine-readable date for the Event structured data. */
        dateISO: "2026-10-21",

        date: "21 October 2026",

        /* Collapsed-banner label. Short enough for a pill on a phone. */
        bannerLabel: "Pre-COP31 Consultation · 21 Oct",

        venue: "Institute of Strategic Studies Islamabad",

        city: "Islamabad",

        description:
          "A multi-stakeholder consultation on the position Pakistan carries from COP30 in Belém to COP31 in Antalya. The room negotiated and adopted the Islamabad Outcome Text, a position text for COP31 on just transition, adaptation finance, and loss and damage.",

        /*
         * The poster groups four items under "thematic areas", but its own
         * text says two streams take up "the three thematic areas" — the
         * fourth describes the format. It is set out separately below as
         * `format` for that reason.
         */
        themes: [
          {
            title: "Adaptation finance",
            description:
              "Pakistan's adaptation priorities and the distance between assessed need and available support.",
          },
          {
            title: "Just transition",
            description:
              "Pakistan's solar boom is running ahead of national energy policy, reaching health facilities, schools, water schemes and remote settlements.",
          },
          {
            title: "Loss and damage",
            description:
              "Pakistan's access to the Fund responding to Loss and Damage and to other channels.",
          },
        ],

        format: {
          title: "How the position was shaped",
          description:
            "A draft of twenty-one operative paragraphs, a preamble and a youth annex was circulated in advance. The room negotiated it paragraph by paragraph across four sessions, recording each paragraph as agreed, agreed as amended, to be redrafted, or not agreed.",
        },

        convening: [
          "Ministry of Climate Change and Environmental Coordination",
          "Ministry of Foreign Affairs",
          "Ministry of Planning and Development",
          "Youth negotiators and observers",
          "Women representatives",
          "Civil society organisations",
        ],

        partners: [
          {
            name: "Sustainable Development Policy Institute",
            shortName: "SDPI",
          },
          {
            name: "Institute of Strategic Studies Islamabad",
            shortName: "ISSI",
          },
        ],

        /*
          The consultation has happened, so what stood where the registration
          stood is what came out of it. Three lines, not a report: the
          Islamabad Outcome Text is the long form, and `publication` is the
          way through to it.

          Every line here is taken from that text and its record of
          proceedings (Annex A) rather than from the poster, which described
          a format the day did not follow. Two things to keep if this is
          ever reworded: who took part is the record's list, not
          "government"; and `paper` carries the text's own disclaimer, which
          its cover prints too. The positions are those of the institutions
          and organisations in the room.
        */
        outcome: {
          title: "What came out of the room.",

          points: [
            "Negotiators, research institutes, civil society, youth organisations and mountain and frontline communities negotiated a position text for COP31, paragraph by paragraph.",
            "Four sessions took up just transition, adaptation finance, loss and damage, and cross-cutting and youth asks.",
            "The room adopted the Islamabad Outcome Text: twenty-one operative paragraphs and a youth annex.",
          ],

          paper:
            "The text is published in full. It records the positions of the institutions and organisations that took part, and does not represent the position of the Government of Pakistan.",

          /* The adopted text itself, in Publications. */
          publication: {
            label: "Read the Islamabad Outcome Text",
            href: "/publications/islamabad-outcome-text",
          },
        },

        /*
          REPLACING THIS IMAGE MEANS A NEW FILENAME, not new bytes at the
          same path. next/image serves optimised copies under
          /_next/image?url=... with max-age=2592000, so overwriting a file
          in place leaves everyone who has already loaded the page looking
          at the old one for thirty days.

          This was the poster advertising registration. Registration closed
          when the room did, so it is now a photograph of the consultation
          itself — the same image carries the card, the highlight on
          Programmes and Projects, and the dialog on arrival.
        */
        image: "/images/programmes/pre-cop31-consultation-outcome-2026-10.webp",

        /*
          The photograph's own proportions. The frame is built from these
          rather than from a hard-coded ratio, so swapping a landscape image
          for a portrait one is a file and two numbers \u2014 nothing
          letterboxes and nothing crops.
        */
        imageWidth: 2400,
        imageHeight: 1287,

        imageAlt:
          "The Pre-COP31 Multi-Stakeholder Consultation under way at the Institute of Strategic Studies Islamabad on 21 October 2026, four speakers at the head table beneath a backdrop reading From Bel\u00e9m to Antalya: Pakistan's Position.",
      },
    ],
  },

  connection: {
    eyebrow: "Across the divisions",

    title: "The programme areas are separate by discipline, not by purpose.",

    description:
      "Policy analysis, climate education and applied research reinforce one another. Community evidence can inform research, research can strengthen policy engagement, and education can build the capacity needed to use both.",
  },

  closing: {
    eyebrow: "Explore the work",

    title:
      "See how ClimateWatch programmes become research and practical projects.",

    primaryAction: {
      label: "View projects",
      href: "/projects",
    },

    secondaryAction: {
      label: "Explore research",
      href: "/research",
    },
  },
} as const;

export type ProgrammesContent = typeof programmesContent;

/**
 * The next scheduled event, or null when there is none to show.
 *
 * An event stays listed through the whole of its own day and disappears
 * afterwards — a banner advertising a date that has passed is worse than no
 * banner, and nobody is going to remember to take it down by hand.
 *
 * CALL THIS FROM AN EFFECT, NOT DURING RENDER. It reads the clock, so a
 * server pass and the first client pass could disagree and break hydration.
 */
/**
 * The slug of the item shown as the site-wide highlight: the top of
 * Programmes and Projects, and the dialog on arrival. One constant, so
 * moving the spotlight to the next thing is a single edit rather than a
 * hunt through three components.
 *
 * Deliberately NOT derived from the date. The highlight is an editorial
 * choice about what matters now, and what matters now is usually something
 * that has just happened rather than something about to.
 */
const HIGHLIGHT_SLUG = "pre-cop31-consultation-islamabad";

/** Null when the slug matches nothing, which is how you turn it off. */
export function currentHighlight(): ScheduledEvent | null {
  return (
    programmesContent.events.scheduled.find(
      (event) => event.slug === HIGHLIGHT_SLUG,
    ) ?? null
  );
}

export function upcomingEvent() {
  const today = new Date();

  return (
    programmesContent.events.scheduled.find((event) => {
      const end = new Date(`${event.dateISO}T23:59:59`);

      return end.getTime() >= today.getTime();
    }) ?? null
  );
}

export type ScheduledEvent =
  (typeof programmesContent.events.scheduled)[number];
