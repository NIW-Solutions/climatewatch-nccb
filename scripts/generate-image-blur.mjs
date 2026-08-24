/**
 * Blur placeholder generator — scripts/generate-image-blur.mjs
 *
 * Writes src/lib/image-blur.ts: a map from public image path to a tiny
 * base64 data URL. LoadedImage looks each one up and hands it to next/image
 * as blurDataURL, so a visitor sees the shape and colour of a photograph
 * immediately rather than a shimmer for the seconds a 400 KB hero takes on a
 * slow connection.
 *
 * Next can generate these automatically, but only for images imported as
 * modules. This site references them by string path — which is what lets
 * content files name a photo without the build knowing about it — so they
 * have to be generated here instead.
 *
 * Run with: npm run blur
 * Re-run after adding or replacing any image in public/images/.
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/images";
const OUT = "src/lib/image-blur.ts";

/** Eight pixels wide. Big enough to read as the photograph, small enough
 *  that the whole map costs a few kilobytes in the bundle. */
const WIDTH = 8;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(webp|png|jpe?g)$/i.test(entry.name) ? [full] : [];
  });
}

const entries = [];

for (const file of walk(ROOT).sort()) {
  const buf = await sharp(file)
    .resize(WIDTH, null, { fit: "inside" })
    .webp({ quality: 30 })
    .toBuffer();

  const publicPath = "/" + path.relative("public", file).split(path.sep).join("/");
  entries.push([publicPath, `data:image/webp;base64,${buf.toString("base64")}`]);
}

const body = entries
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  .join("\n");

fs.writeFileSync(
  OUT,
  `/**
 * Blur placeholders — GENERATED, DO NOT EDIT BY HAND.
 *
 * Written by scripts/generate-image-blur.mjs. Run \`npm run blur\` after
 * adding or replacing an image in public/images/.
 *
 * Each value is an eight-pixel-wide webp as a data URL, handed to
 * next/image as blurDataURL so something appears in the frame immediately
 * instead of a shimmer.
 */

export const imageBlur: Readonly<Record<string, string>> = {
${body}
};
`,
);

const bytes = entries.reduce((n, [, v]) => n + v.length, 0);
console.log(
  `  ${entries.length} placeholders, ${(bytes / 1024).toFixed(1)} KB total`,
);
