import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { homeContent } from "@/content/home";

export function HomeProgrammes() {
  const {
    programmes,
    divisions,
  } = homeContent;

  return (
    <section
      id="programmes"
      aria-labelledby="programmes-heading"
      className="overflow-hidden bg-surface"
    >
      {/* =====================================
          SECTION INTRO
          ===================================== */}

      <div className="site-container section-shell">
        <InView>
          <header className="content-grid gap-y-9 border-b border-border pb-12 sm:pb-14 lg:items-end">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {programmes.eyebrow}
                </p>
              </div>

              <h2
                id="programmes-heading"
                className="section-heading mt-7 max-w-5xl text-primary"
              >
                {programmes.title}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="body-copy-large max-w-xl">
                {programmes.description}
              </p>

              <Link
                href={programmes.action.href}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
              >
                <span className="border-b border-primary pb-1 transition-colors group-hover:border-secondary">
                  {programmes.action.label}
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </header>
        </InView>

        {/* =====================================
            THREE PROGRAMME DIVISIONS
            ===================================== */}

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24 lg:mt-24 lg:space-y-32">
          {divisions.map(
            (division, index) => {
              const imageFirst =
                index % 2 === 0;

              return (
                <InView
                  key={division.slug}
                  amount={0.1}
                >
                  <article className="content-grid items-center gap-y-10 lg:gap-y-0">
                    {/* IMAGE */}

                    <div
                      className={[
                        "col-span-12",
                        imageFirst
                          ? "lg:col-span-7"
                          : "lg:order-2 lg:col-span-7 lg:col-start-6",
                      ].join(" ")}
                    >
                      <Link
                        href={division.href}
                        aria-label={`Explore ${division.title}`}
                        className="group block"
                      >
                        <div className="relative aspect-[16/11] overflow-hidden bg-surface-muted sm:aspect-[16/10]">
                          <LoadedImage
                            src={division.image}
                            alt={division.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.025]"
                          />

                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,22,43,0.78)_100%)]"
                          />

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 p-5 sm:p-7 lg:p-8">
                            <div>
                              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white/50">
                                Programme division
                              </p>

                              {division.imageCaption ? (
                                <p className="mt-2 max-w-md text-xs leading-6 text-white/72">
                                  {division.imageCaption}
                                </p>
                              ) : null}
                            </div>

                            <span className="grid size-11 shrink-0 place-items-center border border-white/40 bg-primary-dark/25 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary">
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                strokeWidth={1.7}
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* CONTENT */}

                    <div
                      className={[
                        "col-span-12",
                        imageFirst
                          ? "lg:col-span-4 lg:col-start-9"
                          : "lg:order-1 lg:col-span-4",
                      ].join(" ")}
                    >
                      <div className="border-t border-primary pt-6">
                        <div className="flex items-center justify-between gap-5">
                          <span className="editorial-index">
                            {division.number}
                          </span>

                          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                            ClimateWatch
                          </p>
                        </div>

                        <h3 className="mt-7 max-w-lg text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-primary sm:text-4xl lg:text-[2.85rem]">
                          {division.title}
                        </h3>

                        <p className="body-copy mt-6 max-w-lg">
                          {division.description}
                        </p>

                        {division.focus ? (
                          <div className="mt-7 border-l-2 border-secondary pl-5">
                            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                              Focus
                            </p>

                            <p className="mt-2 max-w-md text-sm font-semibold leading-7 text-primary">
                              {division.focus}
                            </p>
                          </div>
                        ) : null}

                        <Link
                          href={division.href}
                          className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                        >
                          Explore this programme

                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                            strokeWidth={1.7}
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                </InView>
              );
            },
          )}
        </div>
      </div>

      {/* =====================================
          SHARED APPROACH
          ===================================== */}

      <div className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="content-grid gap-y-8 py-11 sm:py-14 lg:items-center lg:py-16">
              <div className="col-span-12 lg:col-span-3">
                <p className="eyebrow text-white/50">
                  Shared approach
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <p className="max-w-3xl font-editorial text-[clamp(1.6rem,2.4vw,2.3rem)] font-medium leading-[1.25] tracking-[-0.025em] text-white">
                  Policy, education and
                  research are separate
                  divisions — but they are
                  connected by the same
                  evidence-led approach.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-3 lg:text-right">
                <Link
                  href="/programmes"
                  className="group inline-flex min-h-12 items-center gap-3 border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:!text-primary"
                >
                  View all programmes

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}