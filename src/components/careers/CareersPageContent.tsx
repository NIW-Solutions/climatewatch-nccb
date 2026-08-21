import { ArrowUpRight, Mail } from "lucide-react";

import { careersContent } from "@/content/careers";

/**
 * Careers page — src/components/careers/CareersPageContent.tsx
 *
 * Two states, and the empty one is the normal one: ClimateWatch is small and
 * will not always be advertising. When `openings` in src/content/careers.ts
 * is empty this shows the general invitation rather than a bare "nothing
 * here", because divisions do take interns and volunteers through the year.
 *
 * Roles render from data alone — adding one to that array is the whole job.
 */

export function CareersPageContent() {
  const {
    hero,
    terms,
    openingsSection,
    process,
    contact,
    openings,
  } = careersContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section className="border-b border-border bg-primary-dark text-white">
        <div className="site-container py-24 sm:py-28 lg:py-32">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-white/60">
              {hero.eyebrow}
            </p>
          </div>

          <h1 className="mt-8 max-w-4xl font-editorial text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            {hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">
            {hero.description}
          </p>
        </div>
      </section>

      {/* =====================================
          TERMS
          Deliberately above the roles. Unpaid, remote and the length of the
          commitment are the facts most likely to change whether someone
          applies at all, so they are not left to the bottom of the page.
          ===================================== */}

      <section className="border-b border-border bg-surface">
        <div className="site-container section-shell-small">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-primary">
              {terms.eyebrow}
            </p>
          </div>

          <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
            {terms.title}
          </h2>

          <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {terms.items.map((item) => (
              <div
                key={item.title}
                className="bg-surface p-7"
              >
                <dt className="text-sm font-semibold text-primary">
                  {item.title}
                </dt>

                <dd className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* =====================================
          OPEN ROLES
          ===================================== */}

      <section
        id="open-roles"
        className="border-b border-border bg-background"
      >
        <div className="site-container section-shell-small">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-primary">
              {openingsSection.eyebrow}
            </p>
          </div>

          {openings.length > 0 ? (
            <>
              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {openingsSection.title}
              </h2>

              <div className="mt-12 space-y-6">
                {openings.map((opening) => (
                  <OpeningCard
                    key={opening.slug}
                    opening={opening}
                    fallbackEmail={contact.email}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {openingsSection.emptyTitle}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
                {openingsSection.emptyDescription}
              </p>
            </>
          )}
        </div>
      </section>

      {/* =====================================
          HOW TO APPLY
          ===================================== */}

      <section className="border-b border-border bg-surface">
        <div className="site-container section-shell-small">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-primary">
              {process.eyebrow}
            </p>
          </div>

          <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
            {process.title}
          </h2>

          <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
            {process.steps.map((step) => (
              <li
                key={step.title}
                className="bg-surface p-7"
              >
                <h3 className="text-sm font-semibold text-primary">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================
          APPLICATIONS
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-primary">
              {contact.eyebrow}
            </p>
          </div>

          <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
            {contact.title}
          </h2>

          <a
            href={`mailto:${contact.email}`}
            className="group mt-8 inline-flex min-h-11 items-center gap-3 bg-secondary px-6 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark hover:!text-white"
          >
            <Mail
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.7}
            />

            {contact.email}
          </a>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
            {contact.note}
          </p>
        </div>
      </section>
    </main>
  );
}

/* ==========================================
   OPENING
   ========================================== */

function OpeningCard({
  opening,
  fallbackEmail,
}: Readonly<{
  opening: (typeof careersContent.openings)[number];
  fallbackEmail: string;
}>) {
  const applyTo =
    opening.applyEmail ?? fallbackEmail;

  return (
    <article className="border border-border bg-surface p-7 sm:p-9">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-secondary">
          {opening.commitment}
        </p>

        <span
          aria-hidden="true"
          className="size-1 bg-border"
        />

        <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted-light">
          {opening.division}
        </p>

        <span
          aria-hidden="true"
          className="size-1 bg-border"
        />

        <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted-light">
          {opening.location}
        </p>
      </div>

      {/* Term and time commitment, stated with the role rather than only in
          the page-wide terms above, since they differ between them. */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
        <span>{opening.term}</span>
        <span>{opening.hours}</span>
      </div>

      <h3 className="mt-5 font-editorial text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-primary">
        {opening.title}
      </h3>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        {opening.summary}
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <DetailList
          title="What you would do"
          items={opening.responsibilities}
        />

        <DetailList
          title="What we are looking for"
          items={opening.requirements}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
        <a
          href={`mailto:${applyTo}?subject=${encodeURIComponent(opening.title)}`}
          className="group inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-secondary"
        >
          Apply for this role
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </a>

        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-light">
          Posted {opening.posted}
          {opening.closes
            ? ` · Closes ${opening.closes}`
            : " · Rolling"}
        </p>
      </div>
    </article>
  );
}

function DetailList({
  title,
  items,
}: Readonly<{
  title: string;
  items: readonly string[];
}>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted-light">
        {title}
      </p>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-muted"
          >
            <span
              aria-hidden="true"
              className="mt-3 size-1 shrink-0 bg-secondary"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
