import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import type { LegalSection } from "@/content/legal";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: readonly LegalSection[];
  contact: {
    label: string;
    email: string;
  };
};

export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
  contact,
}: Readonly<LegalPageProps>) {
  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="legal-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.7fr_1.5fr_0.8fr] lg:gap-12">
              {/* Label */}

              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {eyebrow}
                  </p>
                </div>
              </div>

              {/* Heading */}

              <div>
                <h1
                  id="legal-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary"
                >
                  {title}
                </h1>
              </div>

              {/* Intro */}

              <div>
                <p className="body-copy max-w-sm">
                  {description}
                </p>

                <p className="mt-6 text-[0.57rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  Last updated
                </p>

                <p className="mt-2 text-sm font-semibold text-primary">
                  {updated}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          LEGAL CONTENT
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell">
          <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,48rem)] lg:justify-between xl:grid-cols-[16rem_minmax(0,52rem)]">
            {/* =====================================
                SIDE INDEX
                ===================================== */}

            <InView>
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-primary">
                  Contents
                </p>

                <nav
                  aria-label={`${title} sections`}
                  className="mt-6 border-t border-border"
                >
                  {sections.map((section) => (
                    <a
                      key={section.number}
                      href={`#legal-${section.number}`}
                      className="group flex gap-4 border-b border-border py-3 text-xs leading-5 !text-muted transition-colors hover:!text-primary"
                    >
                      <span className="font-semibold text-muted-light">
                        {section.number}
                      </span>

                      <span>
                        {section.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </aside>
            </InView>

            {/* =====================================
                SECTIONS
                ===================================== */}

            <div className="border-t border-border">
              {sections.map(
                (section, index) => (
                  <InView
                    key={section.number}
                    delay={Math.min(index, 5) * 0.07}
                    amount={0.04}
                  >
                    <section
                      id={`legal-${section.number}`}
                      className="scroll-mt-32 border-b border-border py-9 sm:py-11"
                    >
                      <div className="grid gap-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-8">
                        {/* Number */}

                        <p
                          aria-hidden="true"
                          className="text-[0.6rem] font-bold tracking-[0.12em] text-secondary"
                        >
                          {section.number}
                        </p>

                        {/* Copy */}

                        <div>
                          <h2 className="font-editorial text-[clamp(1.6rem,2.2vw,2.15rem)] font-medium leading-[1.12] tracking-[-0.03em] text-primary">
                            {section.title}
                          </h2>

                          {section.paragraphs ? (
                            <div className="mt-5 space-y-4">
                              {section.paragraphs.map(
                                (paragraph) => (
                                  <p
                                    key={paragraph}
                                    className="text-sm leading-7 text-muted sm:text-[0.94rem] sm:leading-8"
                                  >
                                    {paragraph}
                                  </p>
                                ),
                              )}
                            </div>
                          ) : null}

                          {section.items ? (
                            <ul className="mt-6 space-y-3">
                              {section.items.map(
                                (item) => (
                                  <li
                                    key={item}
                                    className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-3 text-sm leading-7 text-muted sm:text-[0.94rem]"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-[0.72rem] size-1 bg-secondary"
                                    />

                                    <span>
                                      {item}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </section>
                  </InView>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          CONTACT
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-y border-border py-8 sm:py-10 lg:grid-cols-[0.7fr_1.4fr_0.9fr] lg:items-center lg:gap-12">
              <div>
                <p className="eyebrow text-primary">
                  Contact
                </p>
              </div>

              <div>
                <h2 className="font-editorial text-[clamp(1.6rem,2.4vw,2.35rem)] font-medium leading-[1.12] tracking-[-0.03em] text-primary">
                  {contact.label}
                </h2>
              </div>

              <div className="lg:text-right">
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />

                  {contact.email}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}