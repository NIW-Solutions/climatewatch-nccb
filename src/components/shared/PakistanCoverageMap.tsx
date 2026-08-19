"use client";

import { useState } from "react";

import { PAKISTAN_MAP } from "@/components/shared/pakistan-map-paths";

/**
 * Pakistan coverage map — src/components/shared/PakistanCoverageMap.tsx
 *
 * Inline SVG rather than another Leaflet instance. The map in the homepage
 * "Where we work" panel needs tiles, a client bundle and a measurable
 * container — it broke outright the first time it rendered inside a
 * collapsed accordion. This one is static geometry with a little state on
 * top: no network, no tiles, no layout dependency.
 *
 * Geometry: geoBoundaries (CC BY 4.0), attributed on screen.
 *
 * EVERY FIGURE BELOW IS SOURCED. Glacier, lake and flood numbers are the
 * kind of thing that gets quoted back at an organisation, so each carries
 * its attribution in `source` and is rendered with it. Do not add a fact
 * here without one, and do not round a figure into something tidier than
 * the source states.
 */

type FocusArea = {
  label: string;
  lens: string;
  facts: readonly {
    value: string;
    label: string;
  }[];
  source: string;
};

const FOCUS: Readonly<
  Record<string, FocusArea>
> = {
  "Gilgit-Baltistan": {
    label: "Gilgit-Baltistan",
    lens: "Cryosphere and mountain climate risk",
    facts: [
      {
        value: "3,044",
        label:
          "glacial lakes across Gilgit-Baltistan and Khyber Pakhtunkhwa",
      },
      {
        value: "33",
        label:
          "assessed as hazardous and liable to burst",
      },
      {
        value: "7.1m",
        label:
          "people exposed to outburst flood risk in the two regions",
      },
    ],
    source:
      "UNDP / Green Climate Fund, GLOF-II",
  },

  Chitral: {
    label: "Chitral",
    lens: "Mountain communities and climate education",
    facts: [
      {
        value: "Hindu Kush",
        label:
          "range feeding the district's glaciers and rivers",
      },
      {
        value: "GLOF-II",
        label:
          "district covered by the national outburst-flood programme",
      },
      {
        value: "Sheshi Koh, Drosh, Karimabad",
        label:
          "valleys with documented outburst flood damage",
      },
    ],
    source:
      "UNDP Pakistan, GLOF-II district reporting",
  },

  Sindh: {
    label: "Sindh",
    lens: "Flood plains, displacement and recovery",
    facts: [
      {
        value: "23",
        label:
          "districts declared calamity-hit in the 2022 monsoon floods",
      },
      {
        value: "14.5m",
        label:
          "people affected — the worst-hit province in the country",
      },
      {
        value: "1.9m",
        label:
          "houses damaged or destroyed",
      },
    ],
    source:
      "NDMA, via UN OCHA situation reporting",
  },
};

const FOCUS_NAMES = Object.keys(FOCUS);

export function PakistanCoverageMap({
  eyebrow = "Where we work",
  title = "Three landscapes, one water system.",
  description = "The glaciated north and the flood plains of the south sit at opposite ends of the same rivers. Hover a highlighted region — or focus it with the keyboard — to see what the record shows.",
}: Readonly<{
  eyebrow?: string;
  title?: string;
  description?: string;
}>) {
  const [active, setActive] =
    useState<string | null>(null);

  const shown =
    active ?? FOCUS_NAMES[0];
  const area = FOCUS[shown];

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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          {/* =====================================
              MAP
              ===================================== */}

          <div className="border border-border bg-background p-5 sm:p-8">
            <svg
              viewBox={`0 0 ${PAKISTAN_MAP.width} ${PAKISTAN_MAP.height}`}
              role="img"
              aria-label="Map of Pakistan with Gilgit-Baltistan, Chitral and Sindh highlighted as ClimateWatch focus areas."
              className="h-auto w-full overflow-visible"
              onMouseLeave={() =>
                setActive(null)
              }
            >
              {PAKISTAN_MAP.regions.map(
                (region) => {
                  const focus =
                    FOCUS[region.name];

                  const isActive =
                    active ===
                    region.name;

                  return (
                    <path
                      key={region.name}
                      d={region.d}
                      tabIndex={
                        focus ? 0 : undefined
                      }
                      role={
                        focus
                          ? "button"
                          : undefined
                      }
                      aria-label={
                        focus
                          ? `${focus.label}: ${focus.lens}`
                          : undefined
                      }
                      onMouseEnter={() =>
                        focus &&
                        setActive(
                          region.name,
                        )
                      }
                      onFocus={() =>
                        focus &&
                        setActive(
                          region.name,
                        )
                      }
                      fill={
                        focus
                          ? "var(--color-secondary)"
                          : "var(--color-surface-muted)"
                      }
                      fillOpacity={
                        focus
                          ? isActive
                            ? 1
                            : 0.82
                          : 1
                      }
                      stroke="var(--color-background)"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      style={{
                        transformOrigin: `${region.cx}px ${region.cy}px`,
                        transform: isActive
                          ? "scale(1.06)"
                          : "scale(1)",
                        transition:
                          "transform 300ms ease, fill-opacity 300ms ease",
                        cursor: focus
                          ? "pointer"
                          : "default",
                        outline: "none",
                      }}
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
              FACT PANEL
              ===================================== */}

          <div aria-live="polite">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-3 shrink-0 bg-secondary"
              />

              <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                {active
                  ? "Focus area"
                  : "Focus areas — hover the map"}
              </p>
            </div>

            <h3 className="mt-5 font-editorial text-[clamp(1.6rem,2.4vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.03em] text-primary">
              {area.label}
            </h3>

            <p className="mt-2 text-sm leading-7 text-muted">
              {area.lens}
            </p>

            <dl className="mt-7">
              {area.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-t border-border py-4"
                >
                  <dt className="font-editorial text-2xl font-medium leading-[1.1] tracking-[-0.03em] text-secondary">
                    {fact.value}
                  </dt>

                  <dd className="mt-1 text-sm leading-6 text-muted">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 border-t border-border pt-4 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-muted-light">
              Source: {area.source}
            </p>

            {/* Keyboard and touch users get the same switch as hover. */}
            <div className="mt-7 flex flex-wrap gap-2">
              {FOCUS_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() =>
                    setActive(name)
                  }
                  aria-pressed={
                    shown === name
                  }
                  className={[
                    "border px-4 py-2 text-[0.58rem] font-bold uppercase tracking-[0.1em] transition-colors",

                    shown === name
                      ? "border-secondary bg-secondary text-white"
                      : "border-border text-muted hover:border-secondary hover:text-secondary",
                  ].join(" ")}
                >
                  {FOCUS[name].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
