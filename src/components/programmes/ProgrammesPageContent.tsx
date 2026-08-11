import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { programmesContent } from "@/content/programmes";

export function ProgrammesPageContent() {
  const {
    hero,
    introduction,
    divisions,
    connection,
    closing,
  } = programmesContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="programmes-heading"
        className="overflow-hidden bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <div className="grid gap-10 border-t border-primary pt-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 xl:gap-20">
            <InView className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {hero.eyebrow}
                  </p>
                </div>

                <h1
                  id="programmes-heading"
                  className="mt-7 max-w-3xl font-editorial text-[clamp(2.8rem,4.8vw,5.2rem)] font-medium leading-[1] tracking-[-0.045em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              <p className="body-copy-large mt-10 max-w-xl lg:mt-16">
                {hero.description}
              </p>
            </InView>

            <InView
              delay={0.05}
              amount={0.1}
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-primary-dark sm:aspect-[16/10]">
                <LoadedImage
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  darkLoader
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.02)_45%,rgba(5,22,43,0.65)_100%)]"
                />

                {hero.imageCaption ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                    <p className="max-w-xl border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                      {hero.imageCaption}
                    </p>
                  </div>
                ) : null}
              </div>
            </InView>
          </div>

          <div className="mt-12 border-b border-border sm:mt-16" />
        </div>
      </section>

      {/* =====================================
          INTRODUCTION
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="content-grid gap-y-9">
            <InView className="col-span-12 lg:col-span-3">
              <p className="eyebrow text-primary">
                {introduction.eyebrow}
              </p>
            </InView>

            <InView className="col-span-12 lg:col-span-8 lg:col-start-5">
              <h2 className="max-w-3xl font-editorial text-[clamp(2.2rem,3.6vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.04em] text-primary">
                {introduction.title}
              </h2>

              <div className="mt-8 grid gap-7 border-t border-border pt-7 sm:grid-cols-2 sm:gap-10">
                {introduction.paragraphs.map(
                  (paragraph) => (
                    <p
                      key={paragraph}
                      className="body-copy"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* =====================================
          DIVISIONS
          ===================================== */}

      <section className="bg-surface">
        <div>
          {divisions.map(
            (division, index) => {
              const imageFirst =
                index % 2 === 0;

              return (
                <article
                  key={division.id}
                  id={division.id}
                  className="scroll-mt-32 border-t border-border"
                >
                  <div className="site-container section-shell-small">
                    <div className="content-grid gap-y-10 lg:items-start">
                      {/* IMAGE */}

                      <InView
                        amount={0.1}
                        className={[
                          "col-span-12",
                          imageFirst
                            ? "lg:col-span-6"
                            : "lg:order-2 lg:col-span-6 lg:col-start-7",
                        ].join(" ")}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-primary-dark">
                          <LoadedImage
                            src={division.image}
                            alt={division.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            darkLoader
                          />

                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(5,22,43,0.66)_100%)]"
                          />

                          {division.imageCaption ? (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                              <p className="max-w-lg border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                                {division.imageCaption}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </InView>

                      {/* CONTENT */}

                      <InView
                        delay={0.05}
                        className={[
                          "col-span-12",
                          imageFirst
                            ? "lg:col-span-5 lg:col-start-8"
                            : "lg:order-1 lg:col-span-5",
                        ].join(" ")}
                      >
                        <div className="border-t border-primary pt-5">
                          <div className="flex items-center justify-between gap-5">
                            <span className="editorial-index">
                              {division.number}
                            </span>

                            <p className="text-[0.6rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                              ClimateWatch
                            </p>
                          </div>

                          <p className="eyebrow mt-8 text-primary">
                            {division.eyebrow}
                          </p>

                          <h2 className="mt-5 max-w-xl font-editorial text-[clamp(2.15rem,3.5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em] text-primary">
                            {division.title}
                          </h2>

                          <p className="body-copy-large mt-6 max-w-xl">
                            {division.description}
                          </p>

                          <div className="mt-8 space-y-5">
                            {division.paragraphs.map(
                              (paragraph) => (
                                <p
                                  key={paragraph}
                                  className="body-copy"
                                >
                                  {paragraph}
                                </p>
                              ),
                            )}
                          </div>

                          {/* FOCUS */}

                          <div className="mt-9 border-t border-border pt-6">
                            <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                              Areas of focus
                            </p>

                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                              {division.focus.map(
                                (item) => (
                                  <span
                                    key={item}
                                    className="border-b border-border pb-1 text-sm font-semibold text-primary"
                                  >
                                    {item}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>

                          <Link
                            href={division.action.href}
                            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                          >
                            {division.action.label}

                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                              strokeWidth={1.7}
                            />
                          </Link>
                        </div>
                      </InView>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </section>

      {/* =====================================
          CONNECTION
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="content-grid gap-y-8 border-t border-primary pt-6">
              <div className="col-span-12 lg:col-span-3">
                <p className="eyebrow text-primary">
                  {connection.eyebrow}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <h2 className="max-w-3xl font-editorial text-[clamp(2.1rem,3.3vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.04em] text-primary">
                  {connection.title}
                </h2>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <p className="body-copy">
                  {connection.description}
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          CLOSING
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-9 py-14 sm:py-16 lg:grid-cols-[0.75fr_1.65fr_0.6fr] lg:items-end lg:py-20">
              <div>
                <p className="eyebrow text-white/50">
                  {closing.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-3xl font-editorial text-[clamp(2.1rem,3.4vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                  {closing.title}
                </h2>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href={closing.primaryAction.href}
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-secondary"
                >
                  {closing.primaryAction.label}

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>

                <Link
                  href={closing.secondaryAction.href}
                  className="group inline-flex items-center gap-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {closing.secondaryAction.label}

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
      </section>
    </main>
  );
}