import fs from "node:fs";
const P = "src/lib/news/fetchers.ts";
let t = fs.readFileSync(P, "utf8");

const from = `        source:
          options.fallbackSource ??
          aggregatorName ||
          sourceLabel(attributedTo),`;

/* Parenthesised: a caller-supplied label wins, then the publisher named by
   the feed, then whatever the domain resolves to. */
const to = `        source:
          options.fallbackSource ??
          (aggregatorName ||
            sourceLabel(attributedTo)),`;

if (!t.includes(from)) { console.log("NO MATCH"); process.exit(1); }
fs.writeFileSync(P, t.replace(from, to));
console.log("  precedence fixed");
