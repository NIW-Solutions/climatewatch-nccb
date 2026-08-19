/**
 * News sources — src/lib/news/sources.ts
 *
 * The feed is automatic but not open. Every story has to come from a domain
 * on `ALLOWED_SOURCES`, because unrestricted queries pull in weather-desk
 * filler ("Lahore rain update today") that has no place next to research
 * output. Add a domain here to let it through; nothing else is rendered.
 *
 * Matching is on the registrable domain, so `www.dawn.com` and
 * `images.dawn.com` both match the `dawn.com` entry.
 */

export type SourceTier =
  | "regional"
  | "specialist"
  | "international";

export const ALLOWED_SOURCES: Readonly<
  Record<string, SourceTier>
> = {
  // Pakistan national and regional desks
  "dawn.com": "regional",
  "tribune.com.pk": "regional",
  "thenews.com.pk": "regional",
  "brecorder.com": "regional",
  "nation.com.pk": "regional",
  "pamirtimes.net": "regional",
  "arabnews.pk": "regional",
  "app.com.pk": "regional",
  "geo.tv": "regional",
  "dailytimes.com.pk": "regional",

  // Climate and development specialists
  "dialogue.earth": "specialist",
  "thethirdpole.net": "specialist",
  "climatechangenews.com": "specialist",
  "carbonbrief.org": "specialist",
  "climatenetwork.org": "specialist",
  "scidev.net": "specialist",
  "downtoearth.org.in": "specialist",

  // Multilateral and international
  "reliefweb.int": "international",
  "unfccc.int": "international",
  "un.org": "international",
  "unep.org": "international",
  "wmo.int": "international",
  "theguardian.com": "international",
  "bbc.com": "international",
  "reuters.com": "international",
  "aljazeera.com": "international",
  "nature.com": "international",
};

/**
 * Reduces a hostname to its registrable domain so subdomains still match.
 * Handles the two-part public suffixes actually present in the list above
 * (`.com.pk`, `.org.in`, `.co.uk`) rather than shipping a full PSL.
 */
export function registrableDomain(
  hostname: string,
): string {
  const host = hostname
    .toLowerCase()
    .replace(/^www\./, "");

  const parts = host.split(".");

  if (parts.length <= 2) {
    return host;
  }

  const lastTwo = parts
    .slice(-2)
    .join(".");

  const twoPartSuffixes = [
    "com.pk",
    "org.in",
    "co.uk",
    "org.uk",
    "gov.pk",
  ];

  if (
    twoPartSuffixes.includes(lastTwo)
  ) {
    return parts
      .slice(-3)
      .join(".");
  }

  return lastTwo;
}

export function isAllowedSource(
  url: string,
): boolean {
  try {
    const domain = registrableDomain(
      new URL(url).hostname,
    );

    return domain in ALLOWED_SOURCES;
  } catch {
    return false;
  }
}

/**
 * Headlines to drop even when the publisher is trusted.
 *
 * Credible outlets run a daily weather desk, and a query about floods and
 * glaciers pulls that in alongside the reporting we actually want. These
 * patterns reject the forecast filler — "Islamabad rain forecast today",
 * "Lahore rain update" — without excluding the outlet itself.
 */
const FILLER_HEADLINE_PATTERNS: readonly RegExp[] =
  [
    /\brain\s+(forecast|update|alert|expected)\b/i,
    /\bweather\s+(update|forecast|report|today)\b/i,
    /\b(showers?|thundershowers?)\s+(likely|expected|bring)\b/i,
    /\bforecast\s+(for\s+)?today\b/i,
    /\btemperature\s+(to\s+)?(rise|drop|soar)\b/i,
    /\bhoroscope\b/i,
    /\b(gold|petrol|dollar)\s+(rate|price)\b/i,
  ];

export function isFillerHeadline(
  title: string,
): boolean {
  return FILLER_HEADLINE_PATTERNS.some(
    (pattern) => pattern.test(title),
  );
}

/** Human-readable publisher name for a story URL. */
export function sourceLabel(
  url: string,
): string {
  try {
    return registrableDomain(
      new URL(url).hostname,
    );
  } catch {
    return "";
  }
}
