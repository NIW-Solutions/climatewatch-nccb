/**
 * Country flag — src/components/team/CountryFlag.tsx
 *
 * Renders a real flag as inline SVG, not an emoji.
 *
 * Emoji flags were rejected for this, and they would have been the wrong
 * tool anyway: Windows ships no flag glyphs at all, so a large share of
 * visitors would see the two-letter country code instead of a flag. An
 * inline SVG renders identically everywhere, scales cleanly, and costs no
 * network request.
 *
 * Drawn locally rather than pulled from a flag CDN so the team page has no
 * third-party dependency for something this small.
 *
 * TO ADD A COUNTRY: add an entry to FLAGS keyed by its ISO 3166-1 alpha-2
 * code, drawn on a 5 x 3 viewBox. Nothing else needs changing.
 */

type FlagDrawing = Readonly<{
  label: string;
  paths: readonly {
    d?: string;
    fill: string;
    rect?: readonly [number, number, number, number];
  }[];
}>;

const FLAGS: Readonly<Record<string, FlagDrawing>> = {
  PL: {
    label: "Poland",
    paths: [
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
    <svg
      viewBox="0 0 5 3"
      role="img"
      aria-label={flag.label}
      className={[
        /* A hairline border so a flag with a white band still reads as a
           flag against the light card rather than dissolving into it. */
        "inline-block h-[0.95em] w-auto shrink-0 rounded-[1px] align-[-0.1em] ring-1 ring-inset ring-black/15",
        className,
      ].join(" ")}
    >
      {flag.paths.map((p, i) =>
        p.rect ? (
          <rect
            key={i}
            x={p.rect[0]}
            y={p.rect[1]}
            width={p.rect[2]}
            height={p.rect[3]}
            fill={p.fill}
          />
        ) : (
          <path
            key={i}
            d={p.d}
            fill={p.fill}
          />
        ),
      )}
    </svg>
  );
}
