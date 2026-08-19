import { PAKISTAN_MAP } from "@/components/shared/pakistan-map-paths";

/**
 * Pakistan coverage map — src/components/shared/PakistanCoverageMap.tsx
 *
 * Inline SVG rather than another Leaflet instance. The map on the homepage
 * "Where we work" panel needs map tiles, a client bundle and a measurable
 * container — it broke outright the first time it was rendered inside a
 * collapsed accordion. This one is static markup: no network, no
 * JavaScript, no layout dependency, and it renders identically wherever it
 * is placed.
 *
 * Geometry comes from geoBoundaries (CC BY 4.0), attributed below.
 */

/** The three areas the organisation actually works in. */
const FOCUS: Readonly<
  Record<
    string,
    { label: string; note: string }
  >
> = {
  "Gilgit-Baltistan": {
    label: "Gilgit-Baltistan",
    note: "Cryosphere and mountain climate risk",
  },
  Chitral: {
    label: "Chitral",
    note: "Mountain communities and climate education",
  },
  Sindh: {
    label: "Sindh",
    note: "Flood plains and displacement",
  },
};

export function PakistanCoverageMap({
  eyebrow = "Where we work",
  title = "Three landscapes, one climate system.",
  description = "Our fieldwork concentrates on the glaciated north and the flood plains of the south — the two ends of the same water system, and the places where climate impacts arrive first.",
}: Readonly<{
  eyebrow?: string;
  title?: string;
  description?: string;
}>) {
  return (
    <section
      aria-labelledby="coverage-map-heading"
      className="bg-surface"
    >
      <div className="site-container section-shell">
        <div className="border-t border-border-strong pt-6">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-primary">
              {eyebrow}
            </p>
          </div>

          <h2
            id="coverage-map-heading"
            className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary"
          >
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          {/* =====================================
              MAP
              ===================================== */}

          <div className="border border-border bg-background p-5 sm:p-8">
            <svg
              viewBox={`0 0 ${PAKISTAN_MAP.width} ${PAKISTAN_MAP.height}`}
              role="img"
              aria-label="Map of Pakistan with Gilgit-Baltistan, Chitral and Sindh highlighted as ClimateWatch focus areas."
              className="h-auto w-full"
            >
              {PAKISTAN_MAP.regions.map(
                (region) => {
                  const focus =
                    FOCUS[region.name];

                  return (
                    <path
                      key={region.name}
                      d={region.d}
                      fill={
                        focus
                          ? "var(--color-secondary)"
                          : "var(--color-surface-muted)"
                      }
                      fillOpacity={
                        focus ? 0.92 : 1
                      }
                      stroke="var(--color-background)"
                      strokeWidth={2}
                      strokeLinejoin="round"
                    />
                  );
                },
              )}
            </svg>

            <p className="mt-5 text-[0.54rem] font-bold uppercase tracking-[0.11em] text-muted-light">
              Boundaries: geoBoundaries
              (CC BY 4.0)
            </p>
          </div>

          {/* =====================================
              LEGEND
              ===================================== */}

          <div>
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
              Focus areas
            </p>

            <dl className="mt-6">
              {Object.entries(FOCUS).map(
                ([key, area]) => (
                  <div
                    key={key}
                    className="border-t border-border py-5"
                  >
                    <dt className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="size-3 shrink-0 bg-secondary"
                      />

                      <span className="font-editorial text-xl font-medium leading-[1.15] tracking-[-0.025em] text-primary">
                        {area.label}
                      </span>
                    </dt>

                    <dd className="mt-2 pl-6 text-sm leading-7 text-muted">
                      {area.note}
                    </dd>
                  </div>
                ),
              )}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
