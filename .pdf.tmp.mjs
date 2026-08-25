import fs from "node:fs";
import zlib from "node:zlib";

const raw = fs.readFileSync("/Users/_aka.aly/Downloads/The Carbon League.pdf");
const latin = raw.toString("latin1");

/* --- inflate every FlateDecode stream --- */
const chunks = [];
const re = /stream\r?\n?/g;
let m;
while ((m = re.exec(latin))) {
  const start = m.index + m[0].length;
  const end = latin.indexOf("endstream", start);
  if (end < 0) continue;
  const buf = raw.subarray(start, end);
  try {
    chunks.push(zlib.inflateSync(buf).toString("latin1"));
  } catch {
    try {
      chunks.push(zlib.inflateRawSync(buf).toString("latin1"));
    } catch { /* not a flate stream */ }
  }
}

console.log("  inflated streams: " + chunks.length);

/* --- pull text-showing operators --- */
const out = [];
for (const c of chunks) {
  if (!/\bTJ\b|\bTj\b/.test(c)) continue;
  // TJ arrays and Tj strings
  const parts = c.match(/\[(?:[^\][\\]|\\.)*\]\s*TJ|\((?:[^()\\]|\\.)*\)\s*Tj/g) || [];
  for (const p of parts) {
    const strs = p.match(/\((?:[^()\\]|\\.)*\)/g) || [];
    const text = strs
      .map((s) =>
        s
          .slice(1, -1)
          .replace(/\\([()\\])/g, "$1")
          .replace(/\\(\d{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8))),
      )
      .join("");
    if (text.trim()) out.push(text);
  }
  out.push("\n");
}

fs.writeFileSync("/tmp/carbon.txt", out.join(""));
const words = out.join("").split(/\s+/).filter(Boolean).length;
console.log("  extracted words: " + words);

/* --- hyperlinks from annotations --- */
const uris = [...new Set((latin.match(/\/URI\s*\(([^)]+)\)/g) || []).map((s) => s.match(/\(([^)]+)\)/)[1]))];
console.log("  hyperlinks found: " + uris.length);
for (const u of uris) console.log("    " + u);
