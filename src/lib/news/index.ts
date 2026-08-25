/**
 * News feed — src/lib/news/index.ts
 *
 * Assembles the four sections rendered on /news.
 *
 * Sourcing strategy: publisher RSS is the primary source and GDELT is a
 * best-effort supplement, not the other way round. GDELT is the only source
 * that reliably carries a thumbnail, but it rate limits hard — 429s persist
 * for well over a minute from a single IP, and Amplify builds run from
 * shared AWS addresses where that is worse. Building the page on it alone
 * produced empty sections. Publisher feeds have no rate limit, no key, and
 * are trusted by construction, so they carry the page and GDELT adds reach
 * when it happens to answer.
 *
 * Nothing here throws: every section degrades independently, so one dead
 * upstream never takes out the page or the build.
 */

import {
  fetchGdelt,
  fetchRss,
  fetchYouTube,
  type FeedItem,
} from "./fetchers";
import { isFillerHeadline } from "./sources";

export type { FeedItem };

export type FeedSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: readonly FeedItem[];
  emptyNote: string;
};

const ITEMS_PER_SECTION = 5;

const CLIMATEWATCH_YOUTUBE_CHANNEL =
  "UC39uvi0nzWeDZpXbpwH4lbg";

/**
 * Publisher feeds. Every one of these is on the source allowlist.
 *
 * Regional coverage is deliberately spread across several hosts. Dawn
 * answers from a laptop but returned nothing at all on the first Amplify
 * build — it appears to refuse datacentre IPs — which left the frontline
 * section filled with global stories under a Gilgit-Baltistan heading.
 * ReliefWeb's Pakistan feed is UN-hosted and answers from AWS, so it is
 * the dependable regional source; the newspaper feeds are a bonus when
 * they happen to answer.
 */
const RSS_FEEDS = [
  // Regional — Pakistan and the mountain districts
  "https://reliefweb.int/updates/rss.xml?legacy-river=country/pak",
  "https://www.dawn.com/feeds/home",
  "https://www.dawn.com/feeds/pakistan",
  "https://www.thenews.com.pk/rss/1/1",

  // Specialist climate desks
  "https://dialogue.earth/en/feed/",
  "https://www.climatechangenews.com/feed/",
  "https://climatenetwork.org/feed/",
] as const;

/* ==========================================
   TOPIC MATCHING

   Publisher feeds are general-interest — the
   Dawn front page is mostly politics — so
   items are matched into sections on subject
   terms rather than taken wholesale.
   ========================================== */

const CLIMATE_TERMS = [
  "climate",
  "glacier",
  "glacial",
  "glof",
  "flood",
  "drought",
  "heatwave",
  "heat wave",
  "monsoon",
  "emission",
  "warming",
  "carbon",
  "landslide",
  "water scarcity",
  "water crisis",
  "environment",
  "biodiversity",
  "deforestation",
  "smog",
  "air quality",
  "disaster",
  // Weather words matter here: "heavy rain lashes Rawalpindi" is exactly
  // the flood reporting this section is for. The filler blocklist in
  // sources.ts is what keeps the forecast desk out, not their absence.
  "rain",
  "rainfall",
  "storm",
  "cloudburst",
  "avalanche",
  "snowmelt",
  "erosion",
  "torrential",
  "washed away",
  "inundat",
] as const;

const MOUNTAIN_TERMS = [
  "gilgit",
  "baltistan",
  "chitral",
  "hunza",
  "glof",
  "glacial lake",
  "karakoram",
  "himalaya",
  "hindu kush",
  "skardu",
  "shimshal",
] as const;

/**
 * Place names, not just the country name. Regional reporting rarely says
 * "Pakistan" in the headline — it says Rawalpindi, Sindh or the Indus.
 * Matching the country word alone dropped most of the coverage this
 * section exists to carry.
 */
const PAKISTAN_TERMS = [
  "pakistan",
  "sindh",
  "punjab",
  "balochistan",
  "khyber",
  "pakhtunkhwa",
  "islamabad",
  "karachi",
  "lahore",
  "rawalpindi",
  "peshawar",
  "quetta",
  "multan",
  "faisalabad",
  "azad kashmir",
  "swat",
  "indus",
] as const;

const NEGOTIATION_TERMS = [
  "unfccc",
  "cop29",
  "cop30",
  "cop31",
  "conference of the parties",
  "negotiation",
  "climate finance",
  "loss and damage",
  "paris agreement",
  "ndc",
  "adaptation fund",
  "sb62",
  "sb63",
  "sb64",
  "bonn climate",
  "green climate fund",
  "ipcc",
  "united nations",
] as const;

const YOUTH_TERMS = [
  "youth",
  "young people",
  "students",
  "student",
  "children",
  "schools",
  "next generation",
  "climate education",
] as const;

function haystack(item: FeedItem): string {
  return `${item.title} ${item.summary}`.toLowerCase();
}

/**
 * Substring match — intended for topic words, where partial matching is
 * useful ("emission" catching "emissions", "inundat" catching both
 * "inundated" and "inundation").
 */
function matchesAny(
  item: FeedItem,
  terms: readonly string[],
): boolean {
  const text = haystack(item);

  return terms.some((term) =>
    text.includes(term),
  );
}

/**
 * Topic match against the headline only.
 *
 * General-news feeds carry climate vocabulary in body text that has
 * nothing to do with climate — "Russia ready to mediate Pakistan's issues
 * with India" reached the regional section on a stray body-text match.
 * A subject word in the headline is a far better signal of what a story
 * is actually about.
 */
function matchesTitle(
  item: FeedItem,
  terms: readonly string[],
): boolean {
  const title = item.title.toLowerCase();

  return terms.some((term) =>
    title.includes(term),
  );
}

/**
 * Whole-word match, for place names.
 *
 * Substring matching is wrong here: "indus" is inside "industry", which
 * pulled two global stories about advertising and AI into the regional
 * section purely because they mentioned industrial emissions.
 */
function matchesPlace(
  item: FeedItem,
  terms: readonly string[],
): boolean {
  const text = haystack(item);

  return terms.some((term) => {
    const escaped = term.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    return new RegExp(
      `\\b${escaped}\\b`,
    ).test(text);
  });
}

function normaliseKey(
  title: string,
): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function byNewest(
  a: FeedItem,
  b: FeedItem,
): number {
  return (b.publishedAt || "").localeCompare(
    a.publishedAt || "",
  );
}

/** Mountain districts lead, then Pakistan, then everything else. */
function frontlineRank(
  item: FeedItem,
): number {
  if (
    matchesPlace(
      item,
      MOUNTAIN_TERMS,
    )
  ) {
    return 0;
  }

  return matchesPlace(
    item,
    PAKISTAN_TERMS,
  )
    ? 1
    : 2;
}

export async function getNewsFeed(): Promise<
  readonly FeedSection[]
> {
  const [
    rssResults,
    videos,
  ] = await Promise.all([
    Promise.all(
      RSS_FEEDS.map((url) =>
        fetchRss(url, 30),
      ),
    ),
    fetchYouTube(
      CLIMATEWATCH_YOUTUBE_CHANNEL,
      ITEMS_PER_SECTION,
    ),
  ]);

  /*
   * Best-effort only, and deliberately a single query rather than one per
   * section: each extra call makes a 429 more likely, and the publisher
   * feeds above already cover every section.
   */
  const supplementary =
    await fetchGdelt(
      "(Gilgit OR Baltistan OR Chitral OR Hunza OR GLOF) (climate OR flood OR glacier OR drought)",
      ITEMS_PER_SECTION,
      "45d",
    );

  /*
   * The publisher feeds carry very little youth coverage, so this section
   * leans on GDELT more than the others. Still best-effort: if the rate
   * limit bites, the section shows its empty note until the next revalidate.
   */
  const youthSupplementary =
    await fetchGdelt(
      '(youth OR "young people" OR students) (climate OR "climate justice" OR COP)',
      ITEMS_PER_SECTION,
      "45d",
    );

  const pool = [
    ...supplementary,
    ...youthSupplementary,
    ...rssResults.flat(),
  ].filter(
    (item) =>
      item.title.length > 12 &&
      !isFillerHeadline(item.title),
  );

  /*
   * Assigned in priority order and never repeated: a Gilgit flood story
   * belongs in the frontline section, not in three sections at once.
   */
  const claimed = new Set<string>();

  function take(
    predicate: (
      item: FeedItem,
    ) => boolean,
    rank?: (
      item: FeedItem,
    ) => number,
  ): FeedItem[] {
    const picked: FeedItem[] = [];
    const seen = new Set<string>();

    for (const item of pool) {
      const key = normaliseKey(
        item.title,
      );

      if (
        !key ||
        seen.has(key) ||
        claimed.has(key) ||
        !predicate(item)
      ) {
        continue;
      }

      seen.add(key);
      picked.push(item);
    }

    picked.sort((a, b) => {
      if (rank) {
        const delta =
          rank(a) - rank(b);

        if (delta !== 0) {
          return delta;
        }
      }

      return byNewest(a, b);
    });

    const result = picked.slice(
      0,
      ITEMS_PER_SECTION,
    );

    for (const item of result) {
      claimed.add(
        normaliseKey(item.title),
      );
    }

    return result;
  }

  const frontline = take(
    (item) =>
      matchesTitle(
        item,
        CLIMATE_TERMS,
      ) &&
      (matchesPlace(
        item,
        MOUNTAIN_TERMS,
      ) ||
        matchesPlace(
          item,
          PAKISTAN_TERMS,
        )),
    frontlineRank,
  );

  /*
   * Youth claims before negotiations because it is the narrowest filter and
   * was otherwise stripped of its few matches by the broader sections.
   *
   * The climate conjunction is not optional. Matching youth terms alone
   * pulled "2 students dead in Philippines school shooting" and "At a Gaza
   * zoo, war takes its toll on the animals" onto the page — "student" and
   * "children" are common words in general news. An empty section is far
   * better than an off-topic one, so this stays strict and the empty note
   * carries it when there is genuinely nothing.
   */
  const youth = take(
    (item) =>
      matchesAny(item, YOUTH_TERMS) &&
      matchesAny(
        item,
        CLIMATE_TERMS,
      ),
  );

  const negotiations = take((item) =>
    matchesAny(
      item,
      NEGOTIATION_TERMS,
    ),
  );

  /*
   * No backfill. Both attempts at one made the section worse: relaxing the
   * region filled a "Gilgit-Baltistan, Chitral and Pakistan" heading with
   * Brazil and the UK, and relaxing the topic filled it with Pakistani
   * cricket and counter-terrorism reporting. The section now renders only
   * stories that are both regional and climate-related, however few that
   * is. A short, accurate list is the point.
   */
  const frontlineFilled = frontline;

  return [
    {
      id: "frontline",
      eyebrow: "Climate impacts",
      title:
        "Gilgit-Baltistan, Chitral and Pakistan on the frontline.",
      description:
        "Floods, glacial lake outburst events, drought and landslides across the mountain districts first, then Pakistan and the wider region.",
      items: frontlineFilled,
      emptyNote:
        "No coverage from our source list in the current cycle.",
    },
    {
      id: "negotiations",
      eyebrow: "Negotiations & press",
      title:
        "UNFCCC processes and civil-society briefings.",
      description:
        "Conference outcomes, negotiation tracking and press releases from Climate Action Network International and specialist climate desks.",
      items: negotiations,
      emptyNote:
        "No briefings published in the current cycle.",
    },
    {
      id: "youth",
      eyebrow: "Youth & climate",
      title:
        "Young people in climate spaces.",
      description:
        "Youth delegations, climate education and the spaces where young people are shaping climate decisions.",
      items: youth,
      emptyNote:
        "No youth-focused coverage from our source list this cycle.",
    },
    {
      id: "climatewatch",
      /*
       * YouTube only, for now. The channel feed always returns the most
       * recent uploads, so when nothing new is posted the existing items
       * stay put — which is the behaviour we want. LinkedIn and Instagram
       * both need an approved platform app plus OAuth; they slot in here
       * once those credentials exist.
       */
      eyebrow: "From ClimateWatch",
      title:
        "Our own broadcasts and updates.",
      description:
        "The latest from the ClimateWatch channel. LinkedIn and Instagram join this section once platform access is approved.",
      items: videos,
      emptyNote:
        "Nothing published on the channel yet.",
    },
  ];
}
