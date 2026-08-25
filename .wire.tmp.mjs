import fs from "node:fs";
const P = "src/lib/news/index.ts";
let t = fs.readFileSync(P, "utf8");

/* fetch the youth feeds alongside the rest */
const from = `    const [
      rssResults,
      videos,
    ] = await Promise.all([
      Promise.all(
        RSS_FEEDS.map((url) =>
          fetchRss(url, 30),
        ),
      ),`;

const to = `    const [
      rssResults,
      youthResults,
      videos,
    ] = await Promise.all([
      Promise.all(
        RSS_FEEDS.map((url) =>
          fetchRss(url, 30),
        ),
      ),
      /*
       * Fetched with the rest rather than after GDELT, so the youth section
       * no longer depends on a rate-limited service to have anything in it.
       */
      Promise.all(
        YOUTH_FEEDS.map((url) =>
          fetchRss(url, 30),
        ),
      ),`;

if (!t.includes(from)) { console.log("NO MATCH: fetch block"); process.exit(1); }
t = t.replace(from, to);

/* add them to the pool */
const poolFrom = `    const pool = [
      ...supplementary,
      ...youthSupplementary,
      ...rssResults.flat(),
    ]`;
const poolTo = `    const pool = [
      ...supplementary,
      ...youthSupplementary,
      ...youthResults.flat(),
      ...rssResults.flat(),
    ]`;
if (!t.includes(poolFrom)) { console.log("NO MATCH: pool"); process.exit(1); }
t = t.replace(poolFrom, poolTo);

fs.writeFileSync(P, t);
console.log("  youth feeds fetched and pooled");
