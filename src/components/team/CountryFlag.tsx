/**
 * Country badge — src/components/team/CountryFlag.tsx
 *
 * Renders a real flag as inline SVG, on a tinted plate, with the country
 * named beside it.
 *
 * Three decisions worth keeping:
 *
 * The flag is SVG, not emoji. Windows ships no flag glyphs, so a large share
 * of visitors would see the two-letter code instead of a flag. SVG renders
 * identically everywhere, scales cleanly, and costs no network request.
 *
 * Every flag sits on a plate tinted from its own colours. Poland is white
 * over red, and on the site's light card the white band simply disappeared —
 * the flag read as a single red bar. A tint drawn from the flag itself fixes
 * that without looking bolted on, and works for any flag carrying white.
 *
 * Drawn locally rather than pulled from a flag CDN, so the team page takes no
 * third-party dependency for something this small.
 *
 * TO ADD A COUNTRY: add an entry to FLAGS keyed by its ISO 3166-1 alpha-2
 * code — the name, the bands on a 5 x 3 viewBox, and a `tint` taken from the
 * flag's dominant colour. Nothing else needs changing.
 */

type FlagDrawing = Readonly<{
  /** Written beside the flag. */
  name: string;
  /** Background of the plate. A pale wash of the flag's dominant colour. */
  tint: string;
  /** Border of the plate, the same hue a shade stronger. */
  edge: string;
  bands: readonly {
    fill: string;
    rect: readonly [number, number, number, number];
  }[];
}>;

const FLAGS: Readonly<
  Record<string, FlagDrawing>
> = {
  PL: {
    name: "Poland",
    tint: "#fdf0f2",
    edge: "#e8c2c9",
    bands: [
      { fill: "#ffffff", rect: [0, 0, 5, 1.5] },
      { fill: "#dc143c", rect: [0, 1.5, 5, 1.5] },
    ],
  },
};

export function CountryFlag({
  code,
  className = "",
}: Readonly<{
  /** ISO 3166-1 alpha-2, e.g. "PL". */
  code: string;
  className?: string;
}>) {
  const flag = FLAGS[code.toUpperCase()];

  if (!flag) {
    return null;
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
        viewBox="0 0 5 3"
        role="img"
        aria-label={`Flag of ${flag.name}`}
        className="inline-block h-[0.72rem] w-auto shrink-0 rounded-[1px] ring-1 ring-inset ring-black/20"
      >
        {flag.bands.map((b, i) => (
          <rect
            key={i}
            x={b.rect[0]}
            y={b.rect[1]}
            width={b.rect[2]}
            height={b.rect[3]}
            fill={b.fill}
          />
        ))}
      </svg>

      <span className="text-[0.6875rem] font-semibold tracking-[0.02em] text-primary">
        {flag.name}
      </span>
    </span>
  );
}
