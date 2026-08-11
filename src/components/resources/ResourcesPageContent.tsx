import {
  ArrowRight,
  Mail,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { resourcesContent } from "@/content/resources";

export function ResourcesPageContent() {
  const {
    hero,
    toolkits,
    references,
    media,
    availability,
  } = resourcesContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="resources-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.7fr_1.55fr_0.75fr]">
              {/* Label */}

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
                  id="resources-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.5rem,4vw,4.15rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
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
          WORKING DOCUMENTS
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <div className="border-t border-border">
            {toolkits.items.map(
              (item, index) => (
                <InView
                  key={item.number}
                  delay={index * 0.025}
                  amount={0.08}
                >
                  <article className="group border-b border-border">
                    <div className="grid gap-y-5 py-7 sm:py-8 lg:grid-cols-[4rem_0.8fr_1.4fr] lg:gap-x-10">
                      {/* Number */}

                      <span className="editorial-index">
                        {item.number}
                      </span>

                      {/* Title */}

                      <h2 className="max-w-md font-editorial text-[clamp(1.45rem,1.9vw,1.95rem)] font-medium leading-[1.14] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
                        {item.title}
                      </h2>

                      {/* Description */}

                      <p className="max-w-2xl text-sm leading-7 text-muted">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </InView>
              ),
            )}
          </div>

          <InView className="mt-9 flex justify-end">
            <a
              href={toolkits.action.href}
              className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
            >
              {toolkits.action.label}

              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.7}
              />
            </a>
          </InView>
        </div>
      </section>

      {/* =====================================
          REFERENCE LIBRARY
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell">
          <InView>
            <div className="content-grid gap-y-8 border-t border-border pt-6">
              {/* Label */}

              <div className="col-span-12 lg:col-span-3">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {references.eyebrow}
                  </p>
                </div>
              </div>

              {/* Heading */}

              <div className="col-span-12 lg:col-span-5">
                <h2 className="max-w-xl font-editorial text-[clamp(2rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                  {references.title}
                </h2>
              </div>

              {/* Description */}

              <div className="col-span-12 lg:col-span-4">
                <p className="text-sm leading-7 text-muted">
                  {references.description}
                </p>
              </div>
            </div>
          </InView>

          {/* Reference rows */}

          <div className="mt-12 border-t border-border">
            {references.items.map(
              (item, index) => (
                <InView
                  key={item.number}
                  delay={index * 0.02}
                  amount={0.08}
                >
                  <article className="border-b border-border">
                    <div className="grid gap-y-4 py-7 sm:py-8 lg:grid-cols-[4rem_0.85fr_1.3fr] lg:gap-x-10">
                      {/* Number */}

                      <span className="editorial-index">
                        {item.number}
                      </span>

                      {/* Name */}

                      <h3 className="max-w-sm font-editorial text-xl font-medium leading-[1.2] tracking-[-0.025em] text-primary sm:text-2xl">
                        {item.name}
                      </h3>

                      {/* Description */}

                      <p className="max-w-2xl text-sm leading-7 text-muted">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          JOURNALISTS & MEDIA
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container section-shell">
          <InView>
            <div className="grid gap-8 border-t border-white/20 pt-6 lg:grid-cols-[0.7fr_1.45fr_0.85fr]">
              {/* Label */}

              <div>
                <p className="eyebrow text-white/55">
                  {media.eyebrow}
                </p>
              </div>

              {/* Heading */}

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(2rem,3vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {media.title}
                </h2>
              </div>

              {/* Description */}

              <div>
                <p className="text-sm leading-7 text-white/70">
                  {media.description}
                </p>
              </div>
            </div>
          </InView>

          {/* =====================================
              MEDIA GUIDANCE
              ===================================== */}

          <InView className="mt-12">
            {/* First reference */}

            <div className="grid border-t border-white/20 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <div className="border-b border-white/20 py-7 lg:border-b-0 lg:border-r lg:py-9 lg:pr-8">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-white/50">
                  First reference
                </p>
              </div>

              <div className="border-b border-white/20 py-7 lg:py-9 lg:pl-10">
                <p className="max-w-4xl font-editorial text-[clamp(1.55rem,2vw,2.15rem)] font-medium leading-[1.28] tracking-[-0.025em] text-white">
                  {media.firstReference}
                </p>
              </div>
            </div>

            {/* Subsequent reference */}

            <div className="grid lg:grid-cols-[14rem_minmax(0,1fr)]">
              <div className="border-b border-white/20 py-7 lg:border-r lg:py-8 lg:pr-8">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-white/50">
                  Thereafter
                </p>
              </div>

              <div className="border-b border-white/20 py-7 lg:py-8 lg:pl-10">
                <p className="max-w-3xl text-sm leading-7 text-white/75">
                  {media.subsequentReference}
                </p>
              </div>
            </div>

            {/* Logo guidance */}

            <div className="grid lg:grid-cols-[14rem_minmax(0,1fr)]">
              <div className="border-b border-white/20 py-7 lg:border-r lg:py-8 lg:pr-8">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-white/50">
                  Logo files
                </p>
              </div>

              <div className="border-b border-white/20 py-7 lg:py-8 lg:pl-10">
                <p className="max-w-3xl text-sm leading-7 text-white/75">
                  {media.logoGuidance}
                </p>
              </div>
            </div>
          </InView>

          {/* Press email */}

          <InView className="mt-8 flex justify-end">
            <a
              href={`mailto:${media.email}`}
              className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
            >
              <Mail
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.7}
              />

              Press & media enquiry
            </a>
          </InView>
        </div>
      </section>

      {/* =====================================
          RESOURCE ACCESS
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.7fr_1.5fr_0.8fr] lg:items-end">
              {/* Label */}

              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {availability.eyebrow}
                  </p>
                </div>
              </div>

              {/* Content */}

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {availability.title}
                </h2>

                <p className="body-copy mt-5 max-w-xl">
                  {availability.description}
                </p>
              </div>

              {/* Action */}

              <div className="lg:text-right">
                <a
                  href={`mailto:${availability.email}?subject=ClimateWatch%20Resource%20Request`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                >
                  Request a resource

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
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