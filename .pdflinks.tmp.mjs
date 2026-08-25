import fs from "node:fs";
import zlib from "node:zlib";

const raw = fs.readFileSync("/Users/_aka.aly/Downloads/The Carbon League.pdf");
const latin = raw.toString("latin1");

/* Link annotations: /Rect [x0 y0 x1 y1] ... /URI (...) */
const annots = [];
const objRe = /<<[^<>]*(?:<<[^<>]*>>[^<>]*)*>>/g;
let m;
while ((m = objRe.exec(latin))) {
  const o = m[0];
  if (!o.includes("/URI")) continue;
  const rect = o.match(/\/Rect\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  const uri = o.match(/\/URI\s*\(([^)]+)\)/);
  if (rect && uri) {
    annots.push({
      uri: uri[1],
      x0: +rect[1], y0: +rect[2], x1: +rect[3], y1: +rect[4],
    });
  }
}
console.log("  link annotations with rectangles: " + annots.length);

/* Text runs with positions, per content stream */
const runs = [];
const sre = /stream\r?\n?/g;
let s;
let page = 0;
while ((s = sre.exec(latin))) {
  const start = s.index + s[0].length;
  const end = latin.indexOf("endstream", start);
  if (end < 0) continue;
  let c;
  try { c = zlib.inflateSync(raw.subarray(start, end)).toString("latin1"); }
  catch { continue; }
  if (!/\bTJ\b|\bTj\b/.test(c)) continue;
  page++;
  let x = 0, y = 0;
  const tok = c.match(/[-\d.]+\s+[-\d.]+\s+Td|[-\d.]+\s+[-\d.]+\s+[-\d.]+\s+[-\d.]+\s+([-\d.]+)\s+([-\d.]+)\s+Tm|\[(?:[^\][\\]|\\.)*\]\s*TJ|\((?:[^()\\]|\\.)*\)\s*Tj/g) || [];
  for (const t of tok) {
    if (t.endsWith("Tm")) {
      const p = t.trim().split(/\s+/);
      x = +p[4]; y = +p[5];
    } else if (t.endsWith("Td")) {
      const p = t.trim().split(/\s+/);
      x += +p[0]; y += +p[1];
    } else {
      const strs = t.match(/\((?:[^()\\]|\\.)*\)/g) || [];
      const text = strs.map((v) => v.slice(1, -1).replace(/\\([()\\])/g, "$1")).join("");
      if (text.trim()) runs.push({ page, x, y, text });
    }
  }
}
console.log("  positioned text runs: " + runs.length);
console.log();

for (const a of annots) {
  const near = runs.filter((r) => r.y >= a.y0 - 4 && r.y <= a.y1 + 4 && r.x >= a.x0 - 30 && r.x <= a.x1 + 30);
  console.log("  " + a.uri.slice(0, 62));
  console.log("    rect y " + a.y0.toFixed(0) + "-" + a.y1.toFixed(0) + "  x " + a.x0.toFixed(0) + "-" + a.x1.toFixed(0));
  console.log("    anchor text: " + (near.map((r) => r.text).join("").trim() || "(no match)"));
  console.log();
}
