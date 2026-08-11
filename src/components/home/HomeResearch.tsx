import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { homeContent } from "@/content/home";

export function HomeResearch() {
  const { research } = homeContent;

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="overflow-hidden bg-surface"
    >
      <div className="site-container section-shell">
        {/* =====================================
            INTRO
            ===================================== */}

        <InView>
          <header className="content-grid gap-y-9 border-b border-border pb-12 sm:pb-14 lg:items-end">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {research.eyebrow}
                </p>
              </div>

              <h2
                id="research-heading"
                className="section-heading mt-7 max-w-5xl text-primary"
              >
                {research.title}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="body-copy-large max-w-xl">
                {research.description}
              </p>

              <Link
                href={research.action.href}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
              >
                <span className="border-b border-primary pb-1 transition-colors group-hover:border-secondary">
                  {research.action.label}
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
            FEATURED RESEARCH
            ===================================== */}

        <InView
          amount={0.1}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <article className="grid border-y border-primary lg:grid-cols-[1.35fr_0.65fr]">
            {/* FEATURED CONTENT */}

            <div className="border-b border-primary p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12 xl:p-14">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="bg-secondary px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.11em] text-white">
                  Current workstream
                </span>

                <p className="text-[0.6rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {research.featured.category}
                </p>
              </div>

              <h3 className="mt-8 max-w-4xl font-editorial text-[clamp(2.7rem,5vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-primary">
                {research.featured.title}
              </h3>

              <p className="body-copy-large mt-8 max-w-3xl">
                {research.featured.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href={research.featured.href}
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                >
                  Explore this workstream

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>

            {/* RESEARCH POSITION */}

            <div className="relative overflow-hidden bg-primary p-7 text-white sm:p-10 lg:p-12 xl:p-14">
              <span
                aria-hidden="true"
                className="absolute -right-5 -top-8 select-none font-editorial text-[11rem] font-medium leading-none tracking-[-0.08em] text-white/[0.035]"
              >
                R
              </span>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="eyebrow text-white/45">
                    Research position
                  </p>

                  <p className="mt-7 max-w-xl font-editorial text-[clamp(1.8rem,2.8vw,2.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white">
                    {research.position}
                  </p>
                </div>

                <div className="mt-14 border-t border-white/20 pt-6">
                  <p className="max-w-md text-sm leading-7 text-white/60">
                    Evidence is assessed against
                    a clear hierarchy of sources,
                    with primary and official
                    material taking precedence.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </InView>

        {/* =====================================
            WORKSTREAMS
            ===================================== */}

        <div className="mt-20 sm:mt-24 lg:mt-28">
          <InView>
            <div className="flex items-end justify-between gap-8 border-b border-primary pb-5">
              <p className="eyebrow text-primary">
                Research workstreams
              </p>

              <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.11em] text-muted-light sm:block">
                Current areas of analysis
              </p>
            </div>
          </InView>

          <div>
            {research.workstreams.map(
              (workstream, index) => (
                <InView
                  key={workstream.number}
                  delay={index * 0.035}
                  amount={0.12}
                >
                  <article className="group grid gap-y-5 border-b border-border py-8 sm:py-10 lg:grid-cols-[0.7fr_1.3fr_2.6fr_0.4fr] lg:items-start lg:gap-x-8">
                    {/* NUMBER */}

                    <div>
                      <span className="editorial-index">
                        {workstream.number}
                      </span>
                    </div>

                    {/* LABEL */}

                    <div>
                      <p className="text-sm font-semibold leading-6 text-primary">
                        {workstream.label}
                      </p>
                    </div>

                    {/* CONTENT */}

                    <div>
                      <h3 className="max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-primary transition-colors duration-300 group-hover:text-secondary sm:text-3xl">
                        {workstream.title}
                      </h3>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                        {workstream.description}
                      </p>
                    </div>

                    {/* ARROW */}

                    <div className="hidden justify-end lg:flex">
                      <Link
                        href={workstream.href}
                        aria-label={`Explore ${workstream.title}`}
                        className="grid size-11 place-items-center border border-border-strong text-primary transition-[background-color,border-color,color] duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white"
                      >
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </Link>
                    </div>
                  </article>
                </InView>
              ),
            )}
          </div>
        </div>

        {/* =====================================
            EVIDENCE HIERARCHY
            ===================================== */}

        <InView
          amount={0.12}
          className="mt-20 sm:mt-24 lg:mt-28"
        >
          <div className="grid border-t border-primary lg:grid-cols-[0.75fr_2.25fr]">
            {/* INTRO */}

            <div className="border-b border-border py-8 lg:border-b-0 lg:border-r lg:py-10 lg:pr-10">
              <p className="eyebrow text-primary">
                Evidence hierarchy
              </p>

              <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
                Research is only as useful as
                the evidence it is built on.
              </p>
            </div>

            {/* LEVELS */}

            <div className="lg:pl-10">
              {research.evidenceHierarchy.map(
                (item, index) => (
                  <div
                    key={item.level}
                    className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:grid-cols-[4rem_1fr] sm:gap-7"
                  >
                    <span className="editorial-index">
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div>
                      <p className="text-base font-semibold text-primary">
                        {item.level}
                      </p>

                      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </InView>

        {/* =====================================
            BOTTOM CTA
            ===================================== */}

        <InView className="mt-10 flex justify-end sm:mt-12">
          <Link
            href="/research"
            className="button-secondary group"
          >
            Explore all research

            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.7}
            />
          </Link>
        </InView>
      </div>
    </section>
  );
}