"use client";

import dynamic from "next/dynamic";
import {
  ArrowRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";

const HomeCoverageMap = dynamic(
  () =>
    import(
      "@/components/home/HomeCoverageMap"
    ).then(
      (module) =>
        module.HomeCoverageMap,
    ),
  {
    ssr: false,

    loading: () => (
      <MapLoadingState />
    ),
  },
);

export function HomeCoverage() {
  return (
    <section
      aria-labelledby="climate-geography-heading"
      className="relative overflow-hidden bg-surface-soft"
    >
      {/* =====================================
          SUBTLE BACKGROUND INDEX
          ===================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-0.05em] top-[-0.12em] hidden select-none font-editorial text-[18rem] font-medium leading-none tracking-[-0.08em] text-primary/[0.025] xl:block"
      >
        03
      </div>

      <div className="site-container section-shell">
        {/* =====================================
            SECTION INTRODUCTION
            ===================================== */}

        <InView>
          <header className="content-grid gap-y-10">
            {/* Left label */}

            <div className="col-span-12 lg:col-span-3">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  Geographic context
                </p>
              </div>

              <p className="mt-5 hidden max-w-[11rem] text-[0.58rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light lg:block">
                Pakistan
                <br />
                Climate vulnerability
              </p>
            </div>

            {/* Heading */}

            <div className="col-span-12 lg:col-span-5">
              <h2
                id="climate-geography-heading"
                className="max-w-3xl font-editorial text-[clamp(2.5rem,4.1vw,4.35rem)] font-medium leading-[1.02] tracking-[-0.045em] text-primary"
              >
                From the cryosphere of
                the north to the flood
                plains of the south.
              </h2>
            </div>

            {/* Copy */}

            <div className="col-span-12 lg:col-span-3 lg:col-start-10">
              <p className="body-copy-large max-w-xl">
                Climate vulnerability
                looks different across
                Pakistan. ClimateWatch
                connects evidence from
                affected landscapes and
                communities with research,
                policy analysis and wider
                climate processes.
              </p>

              <Link
                href="/about"
                className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
              >
                Our geographic approach

                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </header>
        </InView>

        {/* =====================================
            MAP FRAME
            ===================================== */}

        <InView
          delay={0.06}
          amount={0.06}
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          <div className="border-y border-border bg-surface">
            {/* =================================
                MAP HEADER
                ================================= */}

            <div className="grid min-h-16 border-b border-border md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex items-center gap-4 px-5 py-5 sm:px-7 lg:px-8">
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0 text-secondary"
                  strokeWidth={1.7}
                />

                <div>
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                    Climate geography
                  </p>

                  <p className="mt-1 text-sm font-semibold text-primary">
                    Pakistan
                  </p>
                </div>
              </div>

              <div className="border-t border-border px-5 py-4 md:border-l md:border-t-0 sm:px-7 lg:px-8">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  Cryosphere
                  <span className="mx-3 text-secondary">
                    →
                  </span>
                  Flood plains
                </p>
              </div>
            </div>

            {/* =================================
                INTERACTIVE MAP
                ================================= */}

            <div className="relative h-[32rem] sm:h-[38rem] lg:h-[44rem] xl:h-[46rem]">
              <HomeCoverageMap />
            </div>

            {/* =================================
                MAP FOOTER
                ================================= */}

            <div className="grid border-t border-border lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="px-5 py-5 sm:px-7 lg:px-8">
                <p className="max-w-3xl text-xs leading-6 text-muted">
                  The map presents
                  geographic climate
                  contexts connected to
                  ClimateWatch&apos;s
                  research and policy
                  perspective. It should
                  not be read as a list
                  of offices or service
                  locations.
                </p>
              </div>

              <div className="border-t border-border px-5 py-5 lg:border-l lg:border-t-0 lg:px-8">
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  Interactive climate atlas
                </p>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ==========================================
   MAP LOADER
   ========================================== */

function MapLoadingState() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e5eaec]">
      {/* Grid */}

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,58,109,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,58,109,0.07) 1px, transparent 1px)",
          backgroundSize:
            "64px 64px",
        }}
      />

      {/* Axis */}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px bg-primary/10"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-full w-px bg-primary/10"
      />

      {/* Loading state */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border border-border bg-surface px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="relative size-2 bg-secondary">
              <span className="absolute inset-0 animate-ping bg-secondary/40" />
            </span>

            <span className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-primary">
              Loading climate map
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}