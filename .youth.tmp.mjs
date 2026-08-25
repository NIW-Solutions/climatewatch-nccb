import fs from "node:fs";

/* ---------- 1. Parser: honour <source url> on aggregated items ---------- */
{
  const P = "src/lib/news/fetchers.ts";
  let t = fs.readFileSync(P, "utf8");

  const from = `      if (!title || !href) {
        continue;
      }

      if (
        options.requireAllowedSource &&
        !isAllowedSource(href)
      ) {
        continue;
      }`;

  const to = `      if (!title || !href) {
        continue;
      }

      /*
       * Aggregated feeds — Google News among them — put an opaque redirect
       * in <link> and name the real publisher in <source url="...">.
       * Checking the allowlist against the redirect rejects every such item
       * as coming from the aggregator, so the publisher is what gets
       * checked, and what gets shown.
       */
      const aggregatorUrl = firstMatch(block, [
        /<source[^>]*url=["']([^"']+)["']/,
      ]).trim();

      const aggregatorName = decodeEntities(
        firstMatch(block, [
          /<source[^>]*>([\\s\\S]*?)<\\/source>/,
        ]),
      ).trim();

      const attributedTo =
        aggregatorUrl || href;

      if (
        options.requireAllowedSource &&
        !isAllowedSource(attributedTo)
      ) {
        continue;
      }`;

  if (!t.includes(from)) {
    console.log("  NO MATCH: allowlist check");
    process.exit(1);
  }
  t = t.replace(from, to);

  /* label from the publisher, and strip the " - Publisher" Google appends */
  const labFrom = `        source:
          options.fallbackSource ??
          sourceLabel(href),`;
  const labTo = `        source:
          options.fallbackSource ??
          aggregatorName ||
          sourceLabel(attributedTo),`;
  if (!t.includes(labFrom)) {
    console.log("  NO MATCH: source label");
    process.exit(1);
  }
  t = t.replace(labFrom, labTo);

  const titleFrom = `      const title = decodeEntities(
        firstMatch(block, [
          /<title[^>]*>([\\s\\S]*?)<\\/title>/,
        ]),
      );`;
  const titleTo = `      let title = decodeEntities(
        firstMatch(block, [
          /<title[^>]*>([\\s\\S]*?)<\\/title>/,
        ]),
      );`;
  if (!t.includes(titleFrom)) {
    console.log("  NO MATCH: title decl");
    process.exit(1);
  }
  t = t.replace(titleFrom, titleTo);

  fs.writeFileSync(P, t);
  console.log("  parser now reads <source url> for aggregated items");
}

/* ---------- 2. Allowlist: UN bodies that carry youth climate work ------- */
{
  const P = "src/lib/news/sources.ts";
  let t = fs.readFileSync(P, "utf8");
  const anchor = `  ["unep.org", "international"],`;
  if (!t.includes(anchor)) {
    console.log("  NO MATCH: allowlist anchor");
    process.exit(1);
  }
  t = t.replace(
    anchor,
    anchor +
      `
  // UN agencies that publish most of the credible youth climate coverage.
  ["undp.org", "international"],
  ["unicef.org", "international"],
  ["unesco.org", "international"],`,
  );
  fs.writeFileSync(P, t);
  console.log("  UNDP, UNICEF and UNESCO added to the allowlist");
}
