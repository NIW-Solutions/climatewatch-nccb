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

        return (
          <polygon
            key={i}
            points={s.points}
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
