import {
  ArrowRight,
  ArrowUpRight,
  Mail,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { newsContent } from "@/content/news";

export function NewsPageContent() {
  const {
    hero,
    featured,
    highlights,
    archive,
    items,
    source,
    press,
  } = newsContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="news-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.7fr_1.6fr_0.7fr]">
              {/* Eyebrow */}

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
              </div>

              {/* Heading */}

              <div>
                <h1
                  id="news-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.55rem,4vw,4.3rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              {/* Description */}

              <div>
                <p className="body-copy max-w-sm">
                  {hero.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          LEAD STORY + IN BRIEF
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="grid gap-10 lg:grid-cols-[1.45fr_0.55fr] lg:gap-14 xl:gap-20">
            {/* =====================================
                LEAD STORY
                ===================================== */}

            <InView>
              <article className="border-t border-border-strong pt-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-secondary">
                    {featured.eyebrow}
                  </p>

                  <p className="text-xs font-semibold text-muted">
                    {featured.date}
                  </p>
                </div>

                <p className="mt-8 text-[0.6rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {featured.category}
                </p>

                <h2 className="mt-4 max-w-4xl font-editorial text-[clamp(2.2rem,3.6vw,3.85rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary">
                  {featured.title}
                </h2>

                <p className="body-copy-large mt-7 max-w-3xl">
                  {featured.description}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <a
                    href={featured.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                  >
                    Read latest update

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </a>
                </div>
              </article>
            </InView>

            {/* =====================================
                IN BRIEF
                ===================================== */}

            <InView
              delay={0.05}
              className="border-t border-border-strong"
            >
              <div className="flex items-center justify-between py-5">
                <p className="eyebrow text-primary">
                  In brief
                </p>

                <span className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {String(highlights.length).padStart(
                    2,
                    "0",
                  )}{" "}
                  updates
                </span>
              </div>

              {highlights.map((item) => (
                <article
                  key={item.slug}
                  className="group border-t border-border py-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.56rem] font-bold uppercase tracking-[0.1em] text-secondary">
                      {item.categoryLabel}
                    </p>

                    <p className="text-[0.65rem] font-semibold text-muted-light">
                      {item.date}
                    </p>
                  </div>

                  <h3 className="mt-4 font-editorial text-xl font-medium leading-[1.15] tracking-[-0.025em] text-primary transition-colors duration-300 group-hover:text-secondary sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.description}
                  </p>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link mt-5 inline-flex items-center gap-2 text-xs font-semibold !text-primary transition-colors hover:!text-secondary"
                  >
                    Read update

                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                      strokeWidth={1.7}
                    />
                  </a>
                </article>
              ))}
            </InView>
          </div>
        </div>
      </section>

      {/* =====================================
          NEWSROOM
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="content-grid gap-y-8 border-t border-border-strong pt-6">
              {/* Eyebrow */}

              <div className="col-span-12 lg:col-span-3">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {archive.eyebrow}
                  </p>
                </div>
              </div>

              {/* Heading */}

              <div className="col-span-12 lg:col-span-6">
                <h2 className="max-w-xl font-editorial text-[clamp(2rem,3vw,3.15rem)] font-medium leading-[1.07] tracking-[-0.035em] text-primary">
                  {archive.title}
                </h2>
              </div>

              {/* Description */}

              <div className="col-span-12 lg:col-span-3">
                <p className="text-sm leading-7 text-muted">
                  {archive.description}
                </p>

                <p className="mt-5 text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {String(items.length).padStart(
                    2,
                    "0",
                  )}{" "}
                  newsroom entries
                </p>
              </div>
            </div>
          </InView>

          {/* =====================================
              NEWS INDEX
              ===================================== */}

          <div className="mt-12 border-t border-border">
            {items.map((item, index) => (
              <InView
                key={item.slug}
                delay={index * 0.025}
                amount={0.08}
              >
                <article className="group border-b border-border">
                  <div className="grid gap-y-6 py-7 sm:py-8 lg:grid-cols-[4rem_9rem_minmax(0,1fr)_8rem_3rem] lg:items-start lg:gap-x-7">
                    {/* Number */}

                    <span className="editorial-index">
                      {item.number}
                    </span>

                    {/* Date */}

                    <div>
                      <p className="text-xs font-semibold leading-6 text-primary">
                        {item.date}
                      </p>
                    </div>

                    {/* Main content */}

                    <div>
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
                        {item.categoryLabel}
                      </p>

                      <h3 className="mt-3 max-w-3xl font-editorial text-[clamp(1.45rem,2vw,2rem)] font-medium leading-[1.14] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                        {item.description}
                      </p>

                      {/* Mobile action */}

                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link mt-4 inline-flex items-center gap-2 text-xs font-semibold !text-primary transition-colors hover:!text-secondary lg:hidden"
                      >
                        Read update

                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </a>
                    </div>

                    {/* Category */}

                    <div className="hidden lg:block">
                      <p className="text-right text-[0.57rem] font-bold uppercase tracking-[0.1em] text-muted-light">
                        {item.category}
                      </p>
                    </div>

                    {/* Desktop action */}

                    <div className="hidden justify-end lg:flex">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Read ${item.title}`}
                        className="group/link grid size-10 place-items-center border border-border-strong !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-secondary hover:!bg-secondary hover:!text-white"
                      >
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          LIVE CHANNEL
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border-strong pt-6 lg:grid-cols-[0.75fr_1.55fr_0.7fr] lg:items-start">
              {/* Label */}

              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {source.eyebrow}
                  </p>
                </div>
              </div>

              {/* Content */}

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {source.title}
                </h2>

                <p className="body-copy mt-5 max-w-2xl">
                  {source.description}
                </p>
              </div>

              {/* Action */}

              <div className="lg:text-right">
                <a
                  href={source.action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                >
                  {source.action.label}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          PRESS & MEDIA
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.7fr_0.6fr] lg:items-end lg:py-20">
              {/* Label */}

              <div>
                <p className="eyebrow text-white/50">
                  {press.eyebrow}
                </p>
              </div>

              {/* Heading */}

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {press.title}
                </h2>
              </div>

              {/* Email */}

              <div className="lg:text-right">
                <a
                  href={`mailto:${press.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />

                  Contact press desk
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}