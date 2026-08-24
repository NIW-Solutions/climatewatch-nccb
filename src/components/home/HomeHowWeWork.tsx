import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { homeContent } from "@/content/home";

export function HomeHowWeWork() {
  const { howWeWork } = homeContent;

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="overflow-hidden bg-background"
    >
      <div className="site-container section-shell">
        <div className="content-grid gap-y-14">
          {/* =====================================
              LEFT COLUMN
              ===================================== */}

          <div className="col-span-12 lg:col-span-5">
            <InView>
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {howWeWork.eyebrow}
                  </p>
                </div>

                <h2
                  id="how-we-work-heading"
                  className="section-heading mt-7 max-w-xl text-primary"
                >
                  {howWeWork.title}
                </h2>

                <p className="body-copy-large mt-8 max-w-xl">
                  {howWeWork.description}
                </p>

                <Link
                  href={howWeWork.action.href}
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                >
                  <span className="border-b border-primary pb-1 transition-colors group-hover:border-secondary">
                    {howWeWork.action.label}
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </Link>

                {/* =====================================
                    DESKTOP IMAGE

                    IMAGE REQUIRED:
                    public/images/home/how-we-work-2026-08.webp
                    ===================================== */}

                <div className="group relative mt-12 hidden h-[30rem] overflow-hidden bg-primary-dark lg:block xl:h-[34rem]">
                  <LoadedImage
                    src={howWeWork.image}
                    alt={howWeWork.imageAlt}
                    fill
                    sizes="(max-width: 1279px) 42vw, 38vw"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.025]"
                    darkLoader
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.04)_25%,rgba(5,22,43,0.82)_100%)]"
                  />

                  {howWeWork.imageCaption ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
                      <p className="max-w-md border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                        {howWeWork.imageCaption}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </InView>
          </div>

          {/* =====================================
              EVIDENCE PIPELINE
              ===================================== */}

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <InView>
              <div className="flex items-center justify-between gap-5 border-t border-primary pt-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-secondary">
                  Evidence pipeline
                </p>

                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-light">
                  {String(howWeWork.steps.length).padStart(2, "0")} stages
                </p>
              </div>
            </InView>

            <div className="mt-3">
              {howWeWork.steps.map((step, index) => (
                <InView
                  key={step.number}
                  delay={Math.min(index, 5) * 0.07}
                  amount={0.14}
                >
                  <article className="group relative grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-border py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-7 sm:py-9">
                    {/* Number */}

                    <div className="relative">
                      <span className="editorial-index">
                        {step.number}
                      </span>

                      {index < howWeWork.steps.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute left-[0.28rem] top-7 hidden h-[calc(100%+1.5rem)] w-px bg-border sm:block"
                        />
                      ) : null}
                    </div>

                    {/* Content */}

                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.035em] text-primary transition-colors duration-300 group-hover:text-secondary sm:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                        {step.description}
                      </p>
                    </div>

                    {/* Direction */}

                    <div className="hidden pt-1 sm:block">
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-muted-light transition-all duration-300 group-hover:translate-x-1 group-hover:text-secondary"
                        strokeWidth={1.6}
                      />
                    </div>
                  </article>
                </InView>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================
            MOBILE / TABLET IMAGE

            IMAGE REQUIRED:
            public/images/home/how-we-work-2026-08.webp
            ===================================== */}

        <InView
          amount={0.1}
          className="mt-12 lg:hidden"
        >
          <div className="group relative h-[25rem] overflow-hidden bg-primary-dark sm:h-[34rem]">
            <LoadedImage
              src={howWeWork.image}
              alt={howWeWork.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              darkLoader
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.04)_30%,rgba(5,22,43,0.82)_100%)]"
            />

            {howWeWork.imageCaption ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                <p className="max-w-lg border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                  {howWeWork.imageCaption}
                </p>
              </div>
            ) : null}
          </div>
        </InView>
      </div>
    </section>
  );
}