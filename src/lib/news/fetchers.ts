/**
 * News fetchers — src/lib/news/fetchers.ts
 *
 * Every fetcher here is failure-tolerant on purpose: a wire service being
 * down must never fail `next build`, because a failed build means Amplify
 * keeps serving the previous deploy. On any error we return an empty list
 * and the section simply renders fewer cards.
 *
 * Responses are cached through Next's fetch cache, so the upstream APIs are
 * hit once per revalidation window rather than once per visitor.
 */

import {
  isAllowedSource,
  isFillerHeadline,
  sourceLabel,
} from "./sources";

/** One story, whatever the upstream source was. */
export type FeedItem = {
  title: string;
  href: string;
  /** ISO 8601. Empty when the source gave us nothing usable. */
  publishedAt: string;
  /** Absolute URL, or undefined when the source carries no image. */
  image?: string;
  source: string;
  /** Plain-text summary, used for topic matching. Not always rendered. */
  summary: string;
};

const REVALIDATE_SECONDS = 3600;

const USER_AGENT =
  "climatewatch-nccb/1.0 (+https://www.climatewatch-nccb.org)";

/*
 * Both budgets are deliberately tight. This work runs inside Amplify's ISR
 * regeneration, which is time-limited: an unbounded retry loop would blow
 * the budget and leave the page stale rather than merely thin. A skipped
 * source costs a few cards; a timed-out regeneration costs the whole page.
 */
const REQUEST_TIMEOUT_MS = 8_000;

const RETRY_BACKOFF_MS = 4_000;

function pause(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms),
  );
}

/**
 * GDELT answers 429 with a plain-text notice rather than JSON when queries
 * arrive too fast, and its window is stricter than the documented five
 * seconds in practice. Without a retry a single 429 empties a whole
 * section for the rest of the revalidation hour, so back off and try again.
 */
async function getText(
  url: string,
  attempts = 2,
): Promise<string | null> {
  for (
    let attempt = 0;
    attempt < attempts;
    attempt += 1
  ) {
    try {
      const response = await fetch(
        url,
        {
          headers: {
            "user-agent": USER_AGENT,
          },
          // A hung upstream must not hold the regeneration open.
          signal:
            AbortSignal.timeout(
              REQUEST_TIMEOUT_MS,
            ),
          next: {
            revalidate:
              REVALIDATE_SECONDS,
          },
        },
      );

      if (response.ok) {
        return await response.text();
      }

      const retryable =
        response.status === 429 ||
        response.status >= 500;

      if (
        !retryable ||
        attempt === attempts - 1
      ) {
        return null;
      }

      await pause(RETRY_BACKOFF_MS);
    } catch {
      if (attempt === attempts - 1) {
        return null;
      }

      await pause(RETRY_BACKOFF_MS);
    }
  }

  return null;
}

/* ==========================================
   SHARED XML HELPERS

   The feeds consumed here are plain RSS 2.0
   and Atom. A dependency-free reader keeps
   the install surface small; if a feed ever
   needs real XML handling, swap this for a
   parser rather than growing the regexes.
   ========================================== */

function decodeEntities(
  value: string,
): string {
  return value
    .replace(
      /<!\[CDATA\[([\s\S]*?)\]\]>/g,
      "$1",
    )
    .replace(/&#8217;|&#39;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function firstMatch(
  block: string,
  patterns: readonly RegExp[],
): string {
  for (const pattern of patterns) {
    const match = block.match(pattern);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
}

function toIso(value: string): string {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);

  return Number.isNaN(
    parsed.getTime(),
  )
    ? ""
    : parsed.toISOString();
}

/**
 * Reads `<item>` (RSS) or `<entry>` (Atom) blocks out of a feed.
 * `requireAllowedSource` is off for first-party feeds such as our own
 * YouTube channel, which will never appear on the publisher allowlist.
 */
function parseFeed(
  xml: string,
  options: {
    limit: number;
    requireAllowedSource: boolean;
    fallbackSource?: string;
  },
): FeedItem[] {
  const blocks =
    xml.match(
      /<(item|entry)[\s>][\s\S]*?<\/\1>/g,
    ) ?? [];

  const items: FeedItem[] = [];

  for (const block of blocks) {
    let title = decodeEntities(
      firstMatch(block, [
        /<title[^>]*>([\s\S]*?)<\/title>/,
      ]),
    );

    const href = firstMatch(block, [
      /<link[^>]*href=["']([^"']+)["']/,
      /<link[^>]*>([\s\S]*?)<\/link>/,
      /<guid[^>]*>([\s\S]*?)<\/guid>/,
    ]).trim();

    if (!title || !href) {
      continue;
    }

    /*
     * Aggregated feeds — Google News among them — put an opaque redirect in
     * <link> and name the real publisher in <source url="...">. Checking
     * the allowlist against the redirect rejects every such item as coming
     * from the aggregator, so the publisher is what gets checked, and what
     * gets shown.
     */
    const aggregatorUrl = firstMatch(block, [
      /<source[^>]*url=["']([^"']+)["']/,
    ]).trim();

    const aggregatorName = decodeEntities(
      firstMatch(block, [
        /<source[^>]*>([\s\S]*?)<\/source>/,
      ]),
    ).trim();

    const attributedTo = aggregatorUrl || href;

    /*
      Google News appends " - Publisher" to every headline, sometimes with a
      stray pipe. The publisher is already shown beside the item, so the
      suffix is duplication that eats the width a headline has to work in.
    */
    if (aggregatorName) {
      title = title
        .replace(
          new RegExp(
            `\\s*-\\s*\\|?\\s*${aggregatorName.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&",
            )}\\s*$`,
            "i",
          ),
          "",
        )
        .trim();
    }

    if (
      options.requireAllowedSource &&
      !isAllowedSource(attributedTo)
    ) {
      continue;
    }

    const image =
      firstMatch(block, [
        /<media:thumbnail[^>]*url=["']([^"']+)["']/,
        /<media:content[^>]*url=["']([^"']+)["']/,
        /<enclosure[^>]*url=["']([^"']+)["']/,
        /<img[^>]*src=["']([^"']+)["']/,
      ]) || undefined;

    items.push({
      title,
      href,
      publishedAt: toIso(
        firstMatch(block, [
          /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/,
          /<published[^>]*>([\s\S]*?)<\/published>/,
          /<updated[^>]*>([\s\S]*?)<\/updated>/,
          /<dc:date[^>]*>([\s\S]*?)<\/dc:date>/,
        ]),
      ),
      image,
      source:
        options.fallbackSource ??
        (aggregatorName ||
          sourceLabel(attributedTo)),
      summary: decodeEntities(
        firstMatch(block, [
          /<description[^>]*>([\s\S]*?)<\/description>/,
          /<summary[^>]*>([\s\S]*?)<\/summary>/,
          /<media:description[^>]*>([\s\S]*?)<\/media:description>/,
        ]),
      ).slice(0, 400),
    });

    if (items.length >= options.limit) {
      break;
    }
  }

  return items;
}

export async function fetchRss(
  url: string,
  limit: number,
): Promise<FeedItem[]> {
  const xml = await getText(url);

  if (!xml) {
    return [];
  }

  return parseFeed(xml, {
    limit,
    requireAllowedSource: false,
  });
}

/* ==========================================
   GDELT

   Free, no API key, and the only source here
   that reliably carries a thumbnail. It rate
   limits to roughly one request every five
   seconds, so callers must sequence requests
   rather than firing them in parallel.
   ========================================== */

type GdeltArticle = {
  url?: string;
  title?: string;
  seendate?: string;
  socialimage?: string;
  domain?: string;
};

/** GDELT stamps dates as `20260817T040000Z`. */
function parseGdeltDate(
  value: string | undefined,
): string {
  if (!value || value.length < 15) {
    return "";
  }

  const iso = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}:${value.slice(13, 15)}Z`;

  return toIso(iso);
}

export async function fetchGdelt(
  query: string,
  limit: number,
  timespan = "21d",
): Promise<FeedItem[]> {
  const endpoint = new URL(
    "https://api.gdeltproject.org/api/v2/doc/doc",
  );

  endpoint.searchParams.set(
    "query",
    `${query} sourcelang:english`,
  );
  endpoint.searchParams.set(
    "mode",
    "artlist",
  );
  endpoint.searchParams.set(
    "format",
    "json",
  );
  endpoint.searchParams.set(
    "sort",
    "datedesc",
  );
  endpoint.searchParams.set(
    "timespan",
    timespan,
  );
  endpoint.searchParams.set(
    "maxrecords",
    String(
      Math.min(limit * 8, 75),
    ),
  );

  const body = await getText(
    endpoint.toString(),
  );

  if (!body) {
    return [];
  }

  let articles: GdeltArticle[] = [];

  try {
    const parsed = JSON.parse(body) as {
      articles?: GdeltArticle[];
    };

    articles = parsed.articles ?? [];
  } catch {
    // GDELT returns a plain-text notice instead of JSON when rate limited.
    return [];
  }

  const seen = new Set<string>();
  const items: FeedItem[] = [];

  for (const article of articles) {
    const href = article.url ?? "";
    const title = article.title ?? "";

    if (
      !href ||
      !title ||
      !isAllowedSource(href) ||
      isFillerHeadline(title)
    ) {
      continue;
    }

    const key = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);

    items.push({
      title: decodeEntities(title),
      href,
      publishedAt: parseGdeltDate(
        article.seendate,
      ),
      image:
        article.socialimage ||
        undefined,
      source: sourceLabel(href),
      summary: "",
    });

    if (items.length >= limit) {
      break;
    }
  }

  return items;
}

/* ==========================================
   YOUTUBE

   Public channel feed — no key, no OAuth.
   LinkedIn and Instagram have no equivalent:
   both require an approved platform app plus
   OAuth, so they are added in `social.ts`
   only once credentials exist.
   ========================================== */

export async function fetchYouTube(
  channelId: string,
  limit: number,
): Promise<FeedItem[]> {
  const xml = await getText(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
  );

  if (!xml) {
    return [];
  }

  return parseFeed(xml, {
    limit,
    requireAllowedSource: false,
    fallbackSource: "YouTube",
  });
}
