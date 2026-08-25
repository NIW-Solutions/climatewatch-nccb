import { ArrowUpRight, Mail } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { donateContent } from "@/content/donate";

export function DonatePageContent() {
  const {
    hero,
    impact,
    giving,
    methods,
    assurance,
  } = donateContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="donate-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="border-t border-border pt-6">
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
                id="donate-heading"
                className="mt-8 max-w-4xl font-editorial text-[clamp(2.2rem,3.6vw,3.85rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary"
              >
                {hero.title}
              </h1>

              <p className="body-copy-large mt-7 max-w-3xl">
                {hero.description}
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          WHAT SUPPORT FUNDS
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell">
          <InView>
            <div className="border-t border-border-strong pt-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {impact.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {impact.title}
              </h2>
            </div>
          </InView>

          <InView delay={0.05}>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {impact.items.map(
                (item) => (
                  <div
                    key={item.number}
                    className="border-t border-border pt-6"
                  >
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-secondary">
                      {item.number}
                    </p>

                    <h3 className="mt-4 font-editorial text-xl font-medium leading-[1.15] tracking-[-0.025em] text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          HOW TO GIVE
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="border-t border-border-strong pt-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {giving.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {giving.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {giving.description}
              </p>
            </div>
          </InView>

          <InView delay={0.05}>
            <div className="mt-10">
              {methods.length === 0 ? (
                <p className="max-w-2xl border-t border-border pt-6 text-sm leading-7 text-muted-light">
                  {giving.fallbackNote}
                </p>
              ) : (
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                  {methods.map(
                    (method) => (
                      <div
                        key={method.name}
                        className="border-t border-border pt-6"
                      >
                        <h3 className="font-editorial text-xl font-medium leading-[1.15] tracking-[-0.025em] text-primary">
                          {method.name}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-muted">
                          {method.detail}
                        </p>

                        {/*
                          Payment details are rendered as selectable text
                          so they can be copied exactly rather than
                          retyped from the screen.
                        */}

                        {method.lines ? (
                          <div className="mt-4 border border-border bg-background px-4 py-3">
                            {method.lines.map(
                              (line) => (
                                <p
                                  key={line}
                                  className="select-all break-all font-mono text-sm leading-7 text-primary"
                                >
                                  {line}
                                </p>
                              ),
                            )}
                          </div>
                        ) : null}

                        {/*
                          An anchor styled as a button: it navigates to
                          PayPal, so it stays a link for keyboard, middle
                          click and screen-reader behaviour rather than
                          becoming a <button>.
                        */}

                        {method.href ? (
                          <a
                            href={
                              method.href
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-6 inline-flex min-h-11 items-center gap-3 bg-secondary px-6 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark hover:!text-white"
                          >
                            Donate with {method.name}

                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              strokeWidth={1.8}
                            />
                          </a>
                        ) : null}
                      </div>
                    ),
                  )}
                </div>
              )}

              <a
                href={`mailto:${giving.email}`}
                className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
              >
                <Mail
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.7}
                />

                {giving.email}
              </a>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          ACCOUNTABILITY
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.6fr] lg:py-20">
              <div>
                <p className="eyebrow text-white/55">
                  {assurance.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {assurance.title}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
                  {assurance.description}
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}
