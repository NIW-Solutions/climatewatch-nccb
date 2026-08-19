import { ArrowUpRight } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { NewsletterSignupForm } from "@/components/newsletter/NewsletterSignupForm";
import { newsletterContent } from "@/content/newsletter";

export function NewsletterPageContent() {
  const {
    hero,
    signup,
    expectations,
    archive,
    issues,
  } = newsletterContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="newsletter-heading"
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
                id="newsletter-heading"
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
          SIGNUP
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
                  {signup.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {signup.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {signup.description}
              </p>

              <div className="mt-10 max-w-2xl">
                <NewsletterSignupForm />
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          WHAT YOU GET
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
                  {expectations.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {expectations.title}
              </h2>
            </div>
          </InView>

          <InView delay={0.05}>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {expectations.items.map(
                (item) => (
                  <div
                    key={item.number}
                    className="border-t border-border pt-6"
                  >
                    <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
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
          ARCHIVE
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
                  {archive.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {archive.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {archive.description}
              </p>
            </div>
          </InView>

          {issues.length === 0 ? (
            <p className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-light">
              {archive.emptyNote}
            </p>
          ) : (
            <InView delay={0.05}>
              <div className="mt-10">
                {issues.map((issue) => (
                  <a
                    key={issue.slug}
                    href={issue.href}
                    className="group block border-t border-border py-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.1em] text-secondary">
                        Issue {issue.number}
                      </p>

                      <p className="text-[0.65rem] font-semibold text-muted-light">
                        {issue.date}
                      </p>
                    </div>

                    <h3 className="mt-4 font-editorial text-xl font-medium leading-[1.15] tracking-[-0.025em] text-primary transition-colors duration-300 group-hover:text-secondary sm:text-2xl">
                      {issue.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                      {issue.summary}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors group-hover:text-secondary">
                      Read issue

                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                      />
                    </span>
                  </a>
                ))}
              </div>
            </InView>
          )}
        </div>
      </section>
    </main>
  );
}
