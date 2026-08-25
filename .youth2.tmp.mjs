import fs from "node:fs";

const P = "src/lib/news/fetchers.ts";
let lines = fs.readFileSync(P, "utf8").split("\n");

/* the allowlist guard */
const gi = lines.findIndex((l) => l.includes("!isAllowedSource(href)"));
if (gi < 0) { console.log("guard not found"); process.exit(1); }

/* walk back to the `if (` that opens it */
let open = gi;
while (open > 0 && !lines[open].trim().startsWith("if (")) open--;
const ind = lines[open].match(/^\s*/)[0];

/* walk forward to its closing brace */
let close = gi;
while (close < lines.length && lines[close].trim() !== "}") close++;

const block = [
  ind + "/*",
  ind + " * Aggregated feeds — Google News among them — put an opaque redirect in",
  ind + " * <link> and name the real publisher in <source url=\"...\">. Checking",
  ind + " * the allowlist against the redirect rejects every such item as coming",
  ind + " * from the aggregator, so the publisher is what gets checked, and what",
  ind + " * gets shown.",
  ind + " */",
  ind + "const aggregatorUrl = firstMatch(block, [",
  ind + "  /<source[^>]*url=[\"']([^\"']+)[\"']/,",
  ind + "]).trim();",
  "",
  ind + "const aggregatorName = decodeEntities(",
  ind + "  firstMatch(block, [",
  ind + "    /<source[^>]*>([\\s\\S]*?)<\\/source>/,",
  ind + "  ]),",
  ind + ").trim();",
  "",
  ind + "const attributedTo = aggregatorUrl || href;",
  "",
  ind + "if (",
  ind + "  options.requireAllowedSource &&",
  ind + "  !isAllowedSource(attributedTo)",
  ind + ") {",
  ind + "  continue;",
  ind + "}",
];

lines.splice(open, close - open + 1, ...block);
let t = lines.join("\n");

/* prefer the publisher's own name for the label */
const labFrom = `          sourceLabel(href),`;
const labTo = `          aggregatorName ||
          sourceLabel(attributedTo),`;
if (!t.includes(labFrom)) { console.log("label not found"); process.exit(1); }
t = t.replace(labFrom, labTo);

fs.writeFileSync(P, t);
console.log("  parser now reads <source url> for aggregated items");
