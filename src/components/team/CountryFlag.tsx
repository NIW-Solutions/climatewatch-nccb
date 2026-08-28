/**
 * Country flag — src/components/team/CountryFlag.tsx
 *
 * Two ways to render a flag, both from the same drawing:
 *
 *   <CountryFlag code="PL" />            a small badge, flag plus country
 *                                        name, beside a person's name
 *
 *   <CountryFlag code="PK" variant="banner" />
 *                                        the flag on its own at section size
 *
 * Flags are inline SVG, not emoji. Windows ships no flag glyphs, so a large
 * share of visitors would see the two-letter code instead of a flag. SVG
 * renders identically everywhere, scales cleanly, and costs no request.
 *
 * The badge sits on a plate tinted from the flag's own colours. Poland is
 * white over red, and on the light card the white band vanished — the flag
 * read as a single red bar. A tint drawn from the flag itself fixes that for
 * any flag carrying white without looking bolted on.
 *
 * Drawn locally rather than fetched from a flag CDN, so the team page takes
 * no third-party dependency for something this small.
 *
 * TO ADD A COUNTRY: add an entry to FLAGS keyed by its ISO 3166-1 alpha-2
 * code — a name, a viewBox, the shapes, and tint and edge colours taken from
 * the flag. Nothing else needs changing.
 */

type Shape =
  | {
      kind: "rect";
      fill: string;
      x: number;
      y: number;
      w: number;
      h: number;
    }
  | {
      kind: "circle";
      fill: string;
      cx: number;
      cy: number;
      r: number;
    }
  | {
      kind: "polygon";
      fill: string;
      points: string;
    }
  | {
      kind: "path";
      fill: string;
      d: string;
    };

type FlagDrawing = Readonly<{
  /** Written beside the flag in the badge. */
  name: string;
  viewBox: string;
  /** Plate background for the badge. A pale wash of the dominant colour. */
  tint: string;
  /** Plate border, the same hue a shade stronger. */
  edge: string;
  shapes: readonly Shape[];
}>;

const FLAGS: Readonly<
  Record<string, FlagDrawing>
> = {
  EG: {
    name: "Egypt",
    viewBox: "0 0 900 600",
    /* Tinted from the gold of the eagle rather than the red band, so the
       badge does not read as a second Poland at a glance. */
    tint: "#fbf5e6",
    edge: "#ddcb9e",
    shapes: [
      { kind: "rect", fill: "#ce1126", x: 0, y: 0, w: 900, h: 200 },
      { kind: "rect", fill: "#ffffff", x: 0, y: 200, w: 900, h: 200 },
      { kind: "rect", fill: "#000000", x: 0, y: 400, w: 900, h: 200 },
      /*
       * The Eagle of Saladin, simplified: head, two spread wings, breast
       * shield and tail. Without an emblem this flag is indistinguishable
       * from Yemen's, so leaving it out was not an option — but the real
       * eagle carries a striped shield and an Arabic scroll that cannot be
       * drawn honestly at the sizes used here.
       */
      { kind: "path", fill: "#c09300", d: "M450 236 q-14 0 -19 10 l-30 -8 26 17 q7 6 23 5 z" },
      { kind: "path", fill: "#c09300", d: "M450 258 q-70 0 -108 22 q-20 12 -22 24 q30 -14 62 -16 q-22 12 -30 26 q34 -14 58 -14 q-14 12 -18 24 q30 -14 58 -16 z" },
      { kind: "path", fill: "#c09300", d: "M450 258 q70 0 108 22 q20 12 22 24 q-30 -14 -62 -16 q22 12 30 26 q-34 -14 -58 -14 q14 12 18 24 q-30 -14 -58 -16 z" },
      { kind: "path", fill: "#c09300", d: "M426 292 h48 v30 q0 20 -24 30 q-24 -10 -24 -30 z" },
      { kind: "path", fill: "#c09300", d: "M434 354 h32 l-5 24 h-22 z" },
    ],
  },

  PK: {
    name: "Pakistan",
    viewBox: "0 0 900 600",
    tint: "#eef5f0",
    edge: "#b7cfc0",
    shapes: [
      /* White hoist band is a quarter of the width; the rest is the green
         field. The crescent is one white disc with a green one laid over it,
         which is how the flag is actually constructed. */
      { kind: "rect", fill: "#ffffff", x: 0, y: 0, w: 225, h: 600 },
      { kind: "rect", fill: "#01411c", x: 225, y: 0, w: 675, h: 600 },
      { kind: "circle", fill: "#ffffff", cx: 619, cy: 253, r: 145 },
      { kind: "circle", fill: "#01411c", cx: 670, cy: 232, r: 145 },
      {
        kind: "polygon",
        fill: "#ffffff",
        points:
          "682.8,111.5 713.5,153.8 763.2,137.7 732.5,180.0 763.2,222.3 713.5,206.2 682.8,248.5 682.7,196.2 633.0,180.0 682.7,163.8",
      },
    ],
  },

  PL: {
    name: "Poland",
    viewBox: "0 0 5 3",
    tint: "#fdf0f2",
    edge: "#e8c2c9",
    shapes: [
      { kind: "rect", fill: "#ffffff", x: 0, y: 0, w: 5, h: 1.5 },
      { kind: "rect", fill: "#dc143c", x: 0, y: 1.5, w: 5, h: 1.5 },
    ],
  },
};

function Shapes({
  shapes,
}: Readonly<{ shapes: readonly Shape[] }>) {
  return (
    <>
      {shapes.map((s, i) => {
        if (s.kind === "rect") {
          return (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              fill={s.fill}
            />
          );
        }

        if (s.kind === "circle") {
          return (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill={s.fill}
            />
          );
        }

        if (s.kind === "polygon") {
          return (
            <polygon
              key={i}
              points={s.points}
              fill={s.fill}
            />
          );
        }

        return (
          <path
            key={i}
            d={s.d}
            fill={s.fill}
          />
        );
      })}
    </>
  );
}

export function CountryFlag({
  code,
  variant = "badge",
  className = "",
}: Readonly<{
  /** ISO 3166-1 alpha-2, e.g. "PK". */
  code: string;
  /** "badge" beside a name; "banner" for a section heading. */
  variant?: "badge" | "banner";
  className?: string;
}>) {
  const flag = FLAGS[code.toUpperCase()];

  if (!flag) {
    return null;
  }

  if (variant === "banner") {
    return (
      <svg
        viewBox={flag.viewBox}
        role="img"
        aria-label={`Flag of ${flag.name}`}
        className={[
          /* A hairline edge so a flag with a white band keeps its shape
             against a light background, the same reason the badge has one. */
          "block h-auto w-full rounded-[2px] shadow-sm ring-1 ring-inset ring-black/15",
          className,
        ].join(" ")}
      >
        <Shapes shapes={flag.shapes} />
      </svg>
    );
  }

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-[3px] border px-1.5 py-0.5 align-middle",
        className,
      ].join(" ")}
      style={{
        backgroundColor: flag.tint,
        borderColor: flag.edge,
      }}
    >
      <svg
        viewBox={flag.viewBox}
        role="img"
        aria-label={`Flag of ${flag.name}`}
        className="inline-block h-[0.72rem] w-auto shrink-0 rounded-[1px] ring-1 ring-inset ring-black/20"
      >
        <Shapes shapes={flag.shapes} />
      </svg>

      <span className="text-[0.6875rem] font-semibold tracking-[0.02em] text-primary">
        {flag.name}
      </span>
    </span>
  );
}
