import fs from "node:fs";

/* allowlist */
{
  const P = "src/lib/news/sources.ts";
  let t = fs.readFileSync(P, "utf8");
  const i = t.indexOf('"unep.org"');
  if (i < 0) { console.log("unep.org not found"); process.exit(1); }
  const lineEnd = t.indexOf("\n", i);
  t =
    t.slice(0, lineEnd + 1) +
    `
  // UN agencies publish most of the credible youth climate coverage, and
  // dominate the youth feeds below. Without these the section stays empty.
  ["undp.org", "international"],
  ["unicef.org", "international"],
  ["unesco.org", "international"],
  ["weforum.org", "international"],
` +
    t.slice(lineEnd + 1);
  fs.writeFileSync(P, t);
  console.log("  allowlist: UNDP, UNICEF, UNESCO, WEF added");
}

/* youth feeds */
{
  const P = "src/lib/news/index.ts";
  let t = fs.readFileSync(P, "utf8");
  const anchor = `    "https://climatenetwork.org/feed/",`;
  if (!t.includes(anchor)) { console.log("anchor not found"); process.exit(1); }

  t = t.replace(
    anchor,
    anchor +
      `
  ] as const;

  /*
   * Youth climate, as dedicated sources rather than a filter over general
   * news. Almost no youth climate organisation publishes a working feed —
   * Fridays for Future's has not updated since February 2024, and UNICEF's
   * and Climate Cardinals' return 404 — so these are Google News queries,
   * which carry real publishers in <source url> and are checked against the
   * allowlist like anything else.
   *
   * The narrower Pakistan query runs first so regional coverage is preferred
   * over the global one.
   */
  const YOUTH_FEEDS = [
    "https://news.google.com/rss/search?q=youth%20climate%20Pakistan&hl=en&gl=PK&ceid=PK:en",
    "https://news.google.com/rss/search?q=%22youth%20climate%22&hl=en&gl=US&ceid=US:en",
    "https://news.google.com/rss/search?q=%22young%20people%22%20climate%20activists&hl=en&gl=US&ceid=US:en",`,
  );
  fs.writeFileSync(P, t);
  console.log("  three youth feeds added");
}
