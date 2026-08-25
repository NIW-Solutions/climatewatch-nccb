import {
  ArrowUpRight,
  Download,
  FileText,
  Mail,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { PublicationsArchive } from "@/components/publications/PublicationsArchive";
import { PublicationCover } from "@/components/publications/PublicationCover";
import {
  publicationsContent,
  type PublicationItem,
} from "@/content/publications";

export function PublicationsPageContent() {
  const {
    hero,
    featured,
    items,
    closing,
  } = publicationsContent;

  const featuredItem: PublicationItem =
    items.find(
      (item) =>
        item.slug === featured.slug,
    ) ?? items[0];

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

              <div className="col-span-12 lg:col-span-6">
                <h1
                  id="publications-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.5rem,4vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

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
            <article className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16">
              {/* =====================================
                  COVER
                  ===================================== */}

              <div className="mx-auto w-full max-w-[19rem] lg:mx-0 lg:max-w-none">
                <a
                  href={featuredItem.pdf}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Download ${featuredItem.title} as PDF`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-primary-dark shadow-[0_26px_60px_rgba(8,29,25,0.16)] transition-transform duration-500 ease-out hover:-translate-y-1"
                >
                  <PublicationCover
                    title={
                      featuredItem.title
                    }
                    categoryLabel={
                      featuredItem.categoryLabel
                    }
                    year={
                      featuredItem.year
                    }
                    cover={
                      featuredItem.cover
                    }
                    coverAlt={
                      featuredItem.coverAlt
                    }
                    priority
                    sizes="(max-width: 1024px) 70vw, 30vw"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center overflow-hidden"
                  >
                    {/* Wipes up from the bottom, matching the archive cards. */}
                    <span className="absolute inset-0 translate-y-full bg-primary-dark/75 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transition-none" />
                  
                    <span className="relative translate-y-3 opacity-0 transition-[transform,opacity] delay-100 duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none inline-flex items-center gap-2.5 border border-white/40 bg-white/10 px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      <Download
                        className="size-3.5"
                        strokeWidth={1.8}
                      />
                      Download PDF
                    </span>
                  </span>
                </a>
              </div>

              {/* =====================================
                  DETAIL
                  ===================================== */}

              <div className="flex flex-col justify-center">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
                  {featured.eyebrow}
                </p>

                <h2 className="mt-5 max-w-3xl font-editorial text-[clamp(2rem,3.1vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary">
                  {featuredItem.title}
                </h2>

                {featuredItem.subtitle ? (
                  <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-primary/70">
                    {
                      featuredItem.subtitle
                    }
                  </p>
                ) : null}

                <p className="body-copy mt-6 max-w-2xl">
                  {
                    featuredItem.description
                  }
                </p>

                {/* Metadata */}

                <dl className="mt-9 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
                  <FeaturedMeta
                    label="Published"
                    value={
                      featuredItem.date
                    }
                  />

                  <FeaturedMeta
                    label="Type"
                    value={
                      featuredItem.categoryLabel
                    }
                  />

                  <FeaturedMeta
                    label="Extent"
                    value={
                      featuredItem.pages ??
                      "—"
                    }
                  />
                </dl>

                {/* Actions */}

                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={featuredItem.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary"
                  >
                    <FileText
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.7}
                    />
                    Download PDF
                    {featuredItem.pdfSize ? (
                      <span className="font-normal opacity-70">
                        {
                          featuredItem.pdfSize
                        }
                      </span>
                    ) : null}
                  </a>

                  {featuredItem.href ? (
                    <a
                      href={
                        featuredItem.href
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                    >
                      View source

                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </InView>
        </div>
      </section>

      {/* =====================================
          ARCHIVE
          ===================================== */}

      <PublicationsArchive />

      {/* =====================================
          CLOSING
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-end lg:py-20">
              <div>
                <p className="eyebrow text-white/55">
                  {closing.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {closing.title}
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                  {closing.description}
                </p>
              </div>

              <div className="lg:text-right">
                <a
                  href={`mailto:${closing.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />
                  Request a publication
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}

function FeaturedMeta({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-muted-light">
        {label}
      </dt>

      <dd className="mt-1.5 text-sm font-semibold leading-6 text-primary">
        {value}
      </dd>
    </div>
  );
}
