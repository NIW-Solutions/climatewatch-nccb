import { ArrowUpRight } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { PublicationsArchive } from "@/components/publications/PublicationsArchive";
import { publicationsContent } from "@/content/publications";

export function PublicationsPageContent() {
  const {
    hero,
    featured,
  } = publicationsContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="publications-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="content-grid gap-y-8 border-t border-primary pt-6">
              {/* Eyebrow */}

              <div className="col-span-12 lg:col-span-3">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {hero.eyebrow}
                  </p>
                </div>
              </div>

              {/* Heading */}

              <div className="col-span-12 lg:col-span-6">
                <h1
                  id="publications-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.5rem,4vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              {/* Description */}

              <div className="col-span-12 lg:col-span-3">
                <p className="body-copy">
                  {hero.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          FEATURED PUBLICATION
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView amount={0.1}>
            <article className="grid border-y border-border lg:grid-cols-[14rem_minmax(0,1fr)]">
              {/* =====================================
                  META
                  ===================================== */}

              <aside className="border-b border-border py-7 lg:border-b-0 lg:border-r lg:py-10 lg:pr-8">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-secondary">
                  {featured.eyebrow}
                </p>

                <div className="mt-8 space-y-6">
                  <PublicationMeta
                    label="Published"
                    value={featured.year}
                  />

                  <PublicationMeta
                    label="Type"
                    value={featured.type}
                  />

                  {featured.meta.map((item) => (
                    <PublicationMeta
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </aside>

              {/* =====================================
                  CONTENT
                  ===================================== */}

              <div className="py-8 lg:py-10 lg:pl-10 xl:pl-12">
                <p className="text-[0.61rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  Featured research
                </p>

                <h2 className="mt-5 max-w-4xl font-editorial text-[clamp(2.15rem,3.3vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary">
                  {featured.title}
                </h2>

                {featured.subtitle ? (
                  <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-primary/70 sm:text-lg">
                    {featured.subtitle}
                  </p>
                ) : null}

                <p className="body-copy mt-7 max-w-3xl">
                  {featured.description}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <a
                    href={featured.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                  >
                    Open publication

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </a>
                </div>
              </div>
            </article>
          </InView>
        </div>
      </section>

      {/* =====================================
          PUBLICATION ARCHIVE

          Filtering and archive list are handled
          inside PublicationsArchive.tsx
          ===================================== */}

      <PublicationsArchive />
    </main>
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
      <p className="text-[0.54rem] font-bold uppercase tracking-[0.1em] text-muted-light">
        {label}
      </p>

      <p className="mt-1.5 max-w-[13rem] text-sm font-semibold leading-6 text-primary">
        {value}
      </p>
    </div>
  );
}