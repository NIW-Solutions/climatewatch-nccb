import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { homeContent } from "@/content/home";

export function HomePublication() {
  const { publication } = homeContent;

  return (
    <section
      id="featured-publication"
      aria-labelledby="featured-publication-heading"
      className="overflow-hidden bg-background"
    >
      <div className="site-container section-shell">
        {/* =====================================
            SECTION HEADER
            ===================================== */}

        <InView>
          <header className="grid gap-7 border-t border-primary pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  Publications
                </p>
              </div>

              <h2
                id="featured-publication-heading"
                className="mt-5 max-w-2xl font-editorial text-[clamp(2rem,3vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary"
              >
                Selected research and policy analysis.
              </h2>
            </div>

            <Link
              href="/publications"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              View all publications

              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.7}
              />
            </Link>
          </header>
        </InView>

        {/* =====================================
            FEATURED PUBLICATION
            ===================================== */}

        <InView
          amount={0.12}
          className="mt-12 sm:mt-14 lg:mt-16"
        >
          <article className="border-y border-border">
            <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)]">
              {/* META */}

              <aside className="border-b border-border py-7 lg:border-b-0 lg:border-r lg:py-10 lg:pr-8">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
                  Featured
                </p>

                <div className="mt-7 space-y-6">
                  <PublicationMeta
                    label="Published"
                    value={publication.date}
                  />

                  <PublicationMeta
                    label="Type"
                    value={publication.type}
                  />

                  {publication.meta.map((item) => (
                    <PublicationMeta
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </aside>

              {/* CONTENT */}

              <div className="py-8 lg:py-10 lg:pl-10 xl:pl-12">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                  {publication.type}
                </p>

                <h3 className="mt-5 max-w-4xl font-editorial text-[clamp(2.15rem,3.7vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary">
                  {publication.title}
                </h3>

                {publication.subtitle ? (
                  <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-primary/70 sm:text-lg sm:leading-8">
                    {publication.subtitle}
                  </p>
                ) : null}

                <p className="body-copy mt-7 max-w-3xl">
                  {publication.description}
                </p>

                {/* ACTIONS */}

                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-6">
                  <Link
                    href={publication.href}
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                  >
                    Read publication

                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.7}
                    />
                  </Link>

                  <span
                    aria-hidden="true"
                    className="hidden h-4 w-px bg-border-strong sm:block"
                  />

                  <Link
                    href="/publications"
                    className="group inline-flex items-center gap-3 text-sm font-medium text-muted transition-colors hover:text-primary"
                  >
                    Publication archive

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </InView>
      </div>
    </section>
  );
}

function PublicationMeta({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div>
      <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
        {label}
      </p>

      <p className="mt-1.5 max-w-[13rem] text-sm font-semibold leading-6 text-primary">
        {value}
      </p>
    </div>
  );
}