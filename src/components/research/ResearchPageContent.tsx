import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { researchContent } from "@/content/research";

export function ResearchPageContent() {
  const {
    hero,
    introduction,
    currentResearch,
    fieldwork,
    evidence,
    standards,
    closing,
  } = researchContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="research-heading"
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
                  id="research-heading"
                  className="mt-7 max-w-3xl font-editorial text-[clamp(2.8rem,4.8vw,5.1rem)] font-medium leading-[1] tracking-[-0.045em] text-primary"
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
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.02)_45%,rgba(5,22,43,0.66)_100%)]"
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
          RESEARCH APPROACH
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
              <h2 className="max-w-3xl font-editorial text-[clamp(2.15rem,3.4vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.04em] text-primary">
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
          CURRENT RESEARCH
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="content-grid gap-y-8 border-t border-primary pt-6">
              <div className="col-span-12 lg:col-span-3">
                <p className="eyebrow text-primary">
                  {currentResearch.eyebrow}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <h2 className="max-w-3xl font-editorial text-[clamp(2.2rem,3.6vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.04em] text-primary">
                  {currentResearch.title}
                </h2>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <p className="body-copy">
                  {currentResearch.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-14 sm:mt-16">
            {currentResearch.workstreams.map(
              (workstream, index) => (
                <InView
                  key={workstream.id}
                  delay={index * 0.03}
                  amount={0.1}
                >
                  <article
                    id={workstream.id}
                    className="scroll-mt-32 border-b border-border"
                  >
                    <div className="grid gap-y-6 py-9 sm:py-10 lg:grid-cols-[0.55fr_1fr_2fr] lg:gap-x-10">
                      {/* NUMBER */}

                      <div>
                        <span className="editorial-index">
                          {workstream.number}
                        </span>
                      </div>

                      {/* CATEGORY */}

                      <div>
                        <p className="text-[0.61rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                          {workstream.category}
                        </p>
                      </div>

                      {/* CONTENT */}

                      <div>
                        <h3 className="max-w-3xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-primary sm:text-3xl">
                          {workstream.title}
                        </h3>

                        <p className="body-copy mt-5 max-w-3xl">
                          {workstream.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                          {workstream.topics.map(
                            (topic) => (
                              <span
                                key={topic}
                                className="border-b border-border pb-1 text-sm font-semibold text-primary"
                              >
                                {topic}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          FIELDWORK / CONTEXT
          ===================================== */}

      <section className="overflow-hidden bg-background">
        <div className="site-container section-shell-small">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
            {/* IMAGE */}

            <InView amount={0.1}>
              <div className="relative aspect-[16/11] overflow-hidden bg-primary-dark">
                <LoadedImage
                  src={fieldwork.image}
                  alt={fieldwork.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  darkLoader
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(5,22,43,0.68)_100%)]"
                />

                {fieldwork.imageCaption ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                    <p className="max-w-xl border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                      {fieldwork.imageCaption}
                    </p>

                    {/*
                      Photographer credit. Sits on the image itself rather
                      than in a page colophon, so it travels with the picture
                      wherever the section is read.
                    */}
                    {fieldwork.imageCredit ? (
                      <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-white/45">
                        {fieldwork.imageCredit}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </InView>

            {/* CONTENT */}

            <InView delay={0.05}>
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {fieldwork.eyebrow}
                  </p>
                </div>

                <h2 className="mt-7 max-w-xl font-editorial text-[clamp(2.15rem,3.4vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.04em] text-primary">
                  {fieldwork.title}
                </h2>

                <div className="mt-8 space-y-6">
                  {fieldwork.paragraphs.map(
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
          </div>
        </div>
      </section>

      {/* =====================================
          EVIDENCE HIERARCHY
          ===================================== */}

      <section className="bg-surface-soft">
        <div className="site-container section-shell">
          <InView>
            <div className="content-grid gap-y-8">
              <div className="col-span-12 lg:col-span-3">
                <p className="eyebrow text-primary">
                  {evidence.eyebrow}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <h2 className="max-w-3xl font-editorial text-[clamp(2.15rem,3.4vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.04em] text-primary">
                  {evidence.title}
                </h2>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <p className="body-copy">
                  {evidence.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-14 border-t border-primary">
            {evidence.levels.map(
              (level, index) => (
                <InView
                  key={level.number}
                  delay={index * 0.025}
                >
                  <div className="grid gap-y-5 border-b border-border py-7 sm:py-8 lg:grid-cols-[0.6fr_1.25fr_2.15fr] lg:gap-x-8">
                    <span className="editorial-index">
                      {level.number}
                    </span>

                    <h3 className="text-lg font-semibold leading-7 tracking-[-0.025em] text-primary">
                      {level.title}
                    </h3>

                    <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                      {level.description}
                    </p>
                  </div>
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          RESEARCH STANDARDS
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="border-t border-primary pt-6">
              <p className="eyebrow text-primary">
                {standards.eyebrow}
              </p>
            </div>
          </InView>

          <div className="mt-10 grid border-y border-border md:grid-cols-2">
            {standards.items.map(
              (item, index) => (
                <InView
                  key={item.number}
                  delay={index * 0.03}
                >
                  <article
                    className={[
                      "min-h-full p-7 sm:p-9",
                      index > 0
                        ? "border-t border-border md:border-t-0"
                        : "",
                      index % 2 !== 0
                        ? "md:border-l"
                        : "",
                      index >= 2
                        ? "md:border-t"
                        : "",
                    ].join(" ")}
                  >
                    <span className="editorial-index">
                      {item.number}
                    </span>

                    <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em] text-primary sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-8">
                      {item.description}
                    </p>
                  </article>
                </InView>
              ),
            )}
          </div>
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
                <h2 className="max-w-3xl font-editorial text-[clamp(2.1rem,3.4vw,3.7rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
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