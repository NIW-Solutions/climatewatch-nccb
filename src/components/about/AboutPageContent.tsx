import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { PakistanCoverageMap } from "@/components/shared/PakistanCoverageMap";
import { PartnerTicker } from "@/components/shared/PartnerTicker";
import { SectionAccordion } from "@/components/shared/SectionAccordion";
import { aboutContent } from "@/content/about";

export function AboutPageContent() {
  const {
    hero,
    introduction,
    mission,
    beliefs,
    method,
    geography,
    governance,
    closing,
  } = aboutContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="about-heading"
        className="overflow-hidden bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <div className="grid gap-10 border-t border-primary pt-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 xl:gap-20">
            {/* Content */}

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
                  id="about-heading"
                  className="mt-7 max-w-3xl font-editorial text-[clamp(2.8rem,4.8vw,5.2rem)] font-medium leading-[1] tracking-[-0.045em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              <p className="body-copy-large mt-10 max-w-xl lg:mt-16">
                {hero.description}
              </p>
            </InView>

            {/* Image */}

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
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.02)_45%,rgba(5,22,43,0.62)_100%)]"
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

      <SectionAccordion
        label="About ClimateWatch"
        items={[
          {
            id: "who-we-are",
            label: "Who we are",
            summary:
              "What ClimateWatch is, and the institution it sits within.",
            children: (
              <section className="bg-background">
                      <div className="site-container section-shell-small">
                        <div className="content-grid gap-y-10">
                          <InView className="col-span-12 lg:col-span-3">
                            <p className="eyebrow text-primary">
                              {introduction.eyebrow}
                            </p>

                            <p className="mt-6 max-w-xs text-sm leading-7 text-muted">
                              {introduction.lead}
                            </p>
                          </InView>

                          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                            <InView>
                              <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
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

                            <InView
                              delay={0.05}
                              className="mt-10 border-t border-primary pt-8 sm:mt-12"
                            >
                              <p className="max-w-4xl font-editorial text-[clamp(1.85rem,3vw,3rem)] font-medium leading-[1.16] tracking-[-0.03em] text-primary">
                                {introduction.statement}
                              </p>
                            </InView>
                          </div>
                        </div>
                      </div>
                    </section>
            ),
          },
          {
            id: "mission",
            label: "Our mission",
            summary:
              "What we are trying to change, and for whom.",
            children: (
              <section className="overflow-hidden bg-surface">
                      <div className="site-container section-shell-small">
                        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                          {/* Image */}

                          <InView amount={0.1}>
                            <div className="relative aspect-[4/3] overflow-hidden bg-primary-dark lg:h-full lg:min-h-[38rem] lg:aspect-auto">
                              <LoadedImage
                                src={mission.image}
                                alt={mission.imageAlt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                className="object-cover"
                                darkLoader
                              />

                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,22,43,0.68)_100%)]"
                              />

                              {mission.imageCaption ? (
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                                  <p className="max-w-xl border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                                    {mission.imageCaption}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </InView>

                          {/* Mission content */}

                          <InView
                            delay={0.05}
                            className="flex flex-col justify-center bg-primary px-7 py-12 text-white sm:px-10 sm:py-14 lg:px-12 xl:px-14"
                          >
                            <div className="flex items-center gap-4">
                              <span
                                aria-hidden="true"
                                className="h-px w-10 bg-secondary"
                              />

                              <p className="eyebrow text-white/55">
                                {mission.eyebrow}
                              </p>
                            </div>

                            <h2 className="mt-7 max-w-xl font-editorial text-[clamp(2.3rem,3.6vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                              {mission.title}
                            </h2>

                            <p className="mt-7 max-w-xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9">
                              {mission.description}
                            </p>
                          </InView>
                        </div>
                      </div>
                    </section>
            ),
          },
          {
            id: "beliefs",
            label: "What we believe",
            summary:
              "The principles that decide what we take on and how.",
            children: (
              <section className="bg-background">
                      <div className="site-container section-shell">
                        <InView>
                          <header className="content-grid gap-y-8 border-t border-primary pt-6">
                            <div className="col-span-12 lg:col-span-3">
                              <p className="eyebrow text-primary">
                                {beliefs.eyebrow}
                              </p>
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                              <h2 className="max-w-3xl font-editorial text-[clamp(2.25rem,3.7vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-primary">
                                {beliefs.title}
                              </h2>
                            </div>
                          </header>
                        </InView>

                        <div className="mt-12 sm:mt-14">
                          {beliefs.items.map(
                            (item, index) => (
                              <InView
                                key={item.number}
                                delay={Math.min(index, 5) * 0.07}
                                amount={0.12}
                              >
                                <article className="group grid gap-y-5 border-b border-border py-8 sm:py-9 lg:grid-cols-[0.7fr_1.4fr_2.4fr] lg:gap-x-8">
                                  <span className="editorial-index">
                                    {item.number}
                                  </span>

                                  <h3 className="max-w-md text-xl font-semibold leading-[1.15] tracking-[-0.035em] text-primary sm:text-2xl">
                                    {item.title}
                                  </h3>

                                  <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                                    {item.description}
                                  </p>
                                </article>
                              </InView>
                            ),
                          )}
                        </div>
                      </div>
                    </section>
            ),
          },
          {
            id: "method",
            label: "Our method",
            summary:
              "How evidence is gathered, tested and carried into policy.",
            children: (
              <section className="bg-surface-soft">
                      <div className="site-container section-shell-small">
                        <InView>
                          <div className="content-grid gap-y-8">
                            <div className="col-span-12 lg:col-span-3">
                              <p className="eyebrow text-primary">
                                {method.eyebrow}
                              </p>
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                              <h2 className="max-w-3xl font-editorial text-[clamp(2.15rem,3.4vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.04em] text-primary">
                                {method.title}
                              </h2>

                              <p className="body-copy mt-6 max-w-2xl">
                                {method.description}
                              </p>
                            </div>
                          </div>
                        </InView>

                        <div className="mt-12 grid border-y border-border sm:grid-cols-2 lg:grid-cols-3">
                          {method.steps.map(
                            (step, index) => (
                              <InView
                                key={step.number}
                                delay={Math.min(index, 5) * 0.07}
                              >
                                <div
                                  className={[
                                    "min-h-[10rem] p-6 sm:min-h-[11rem] sm:p-7",
                                    index > 0
                                      ? "border-t border-border sm:border-t-0"
                                      : "",
                                    index % 2 !== 0
                                      ? "sm:border-l"
                                      : "",
                                    index >= 2
                                      ? "lg:border-l"
                                      : "",
                                    index >= 3
                                      ? "lg:border-t"
                                      : "",
                                  ].join(" ")}
                                >
                                  <span className="editorial-index">
                                    {step.number}
                                  </span>

                                  <p className="mt-8 text-lg font-semibold tracking-[-0.03em] text-primary">
                                    {step.title}
                                  </p>
                                </div>
                              </InView>
                            ),
                          )}
                        </div>
                      </div>
                    </section>
            ),
          },
          {
            id: "geography",
            label: "Geographic context",
            summary:
              "Where we work, and why those places matter.",
            children: (
              <section className="overflow-hidden bg-background">
                      <div className="site-container section-shell">
                        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
                          {/* Content */}

                          <InView>
                            <div className="max-w-xl">
                              <div className="flex items-center gap-4">
                                <span
                                  aria-hidden="true"
                                  className="h-px w-10 bg-secondary"
                                />

                                <p className="eyebrow text-primary">
                                  {geography.eyebrow}
                                </p>
                              </div>

                              <h2 className="mt-7 font-editorial text-[clamp(2.3rem,3.6vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-primary">
                                {geography.title}
                              </h2>

                              <div className="mt-8 space-y-6">
                                {geography.paragraphs.map(
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
                            </div>
                          </InView>

                          {/* Image */}

                          <InView
                            delay={0.05}
                            amount={0.1}
                          >
                            <div className="relative aspect-[16/11] overflow-hidden bg-primary-dark">
                              <LoadedImage
                                src={geography.image}
                                alt={geography.imageAlt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover"
                                darkLoader
                              />

                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,22,43,0.66)_100%)]"
                              />

                              {geography.imageCaption ? (
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                                  <p className="max-w-xl border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                                    {geography.imageCaption}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </InView>
                        </div>
                      </div>
                    </section>
            ),
          },
          {
            id: "governance",
            label: "Institutional structure",
            summary:
              "How ClimateWatch is governed and held to account.",
            children: (
              <section className="bg-surface">
                      <div className="site-container section-shell-small">
                        <InView>
                          <div className="content-grid gap-y-8">
                            <div className="col-span-12 lg:col-span-3">
                              <p className="eyebrow text-primary">
                                {governance.eyebrow}
                              </p>
                            </div>

                            <div className="col-span-12 lg:col-span-7">
                              <h2 className="max-w-3xl font-editorial text-[clamp(2.15rem,3.4vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.04em] text-primary">
                                {governance.title}
                              </h2>

                              <p className="body-copy mt-6 max-w-3xl">
                                {governance.description}
                              </p>
                            </div>
                          </div>
                        </InView>

                        <InView className="mt-12">
                          <div className="border-y border-border">
                            {governance.items.map(
                              (item) => (
                                <div
                                  key={item.label}
                                  className="grid gap-3 border-b border-border py-6 last:border-b-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8"
                                >
                                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                                    {item.label}
                                  </p>

                                  <p className="max-w-3xl text-sm font-semibold leading-7 text-primary sm:text-base">
                                    {item.value}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>

                          <p className="mt-6 max-w-3xl text-xs leading-6 text-muted">
                            {governance.note}
                          </p>
                        </InView>
                      </div>
                    </section>
            ),
          },
        ]}
      />

      <PakistanCoverageMap />

      <PartnerTicker />

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
                <h2 className="max-w-3xl font-editorial text-[clamp(2.15rem,3.5vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
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