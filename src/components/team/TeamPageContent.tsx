import { ArrowDown, Mail } from "lucide-react";

import { CountUp } from "@/components/motion-primitives/CountUp";
import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { TeamProfileGrid } from "@/components/team/TeamProfileGrid";
import {
  teamContent,
  type TeamAssociate,
} from "@/content/team";

import {
  PORTRAIT_BORDER,
  TeamPhoto,
  TeamSocialLinks,
} from "./team-primitives";

export function TeamPageContent() {
  const {
    hero,
    stats,
    directory,
    departments,
    members,
    associates,
    advisory,
    advisors,
    governance,
    board,
    join,
    closing,
  } = teamContent;

  /**
   * One block per division: the head first, at full card size, then the people
   * who work under them as circular tiles. Divisions without a head are
   * dropped rather than rendered empty.
   */
  const divisions = departments
    .map((department) => ({
      department,
      head: members.find(
        (member) =>
          member.department === department.id,
      ),
      team: associates.filter(
        (person) =>
          person.department === department.id,
      ),
    }))
    .filter((group) => group.head);

  return (
    <main>
      {/* =====================================
          HERO BANNER
          ===================================== */}
      <section
        aria-labelledby="team-heading"
        className="relative isolate flex min-h-[78vh] flex-col justify-end overflow-hidden bg-primary-dark pt-32 sm:min-h-[82vh] sm:pt-36 lg:min-h-[86vh]"
      >
        <div className="absolute inset-0 -z-10">
          <LoadedImage
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            darkLoader
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.72)_0%,rgba(5,22,43,0.38)_38%,rgba(5,22,43,0.92)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,39,0.62)_0%,transparent_62%)]"
          />
        </div>

        <div className="site-container pb-14 sm:pb-16 lg:pb-20">
          <InView>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-secondary"
              />
              <p className="eyebrow text-white/70">
                {hero.eyebrow}
              </p>
            </div>
            <h1
              id="team-heading"
              className="mt-7 max-w-4xl font-editorial text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-[1.01] tracking-[-0.045em] text-white"
            >
              {hero.title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {hero.description}
            </p>
          </InView>

          <InView
            delay={0.08}
            className="mt-12 border-t border-white/20 pt-7 lg:mt-16"
          >
            <dl className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-white/45">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 font-editorial text-[clamp(1.9rem,2.6vw,2.6rem)] font-medium leading-none tracking-[-0.035em] text-white">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </InView>

          {hero.imageCaption ? (
            <p className="mt-10 max-w-xl border-t border-white/15 pt-4 text-xs leading-6 text-white/50">
              {hero.imageCaption}
            </p>
          ) : null}
        </div>
      </section>

      {/* =====================================
          DIRECTORY INTRO + DIVISION INDEX
          ===================================== */}
      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <p className="eyebrow text-primary">
                  {directory.eyebrow}
                </p>
              </div>
              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                  {directory.title}
                </h2>
              </div>
              <div>
                <p className="text-sm leading-7 text-muted">
                  {directory.description}
                </p>
              </div>
            </div>
          </InView>

          {/* Division jump index */}
          <InView delay={0.06}>
            <nav
              aria-label="Divisions"
              className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {divisions.map(
                (group, index) => (
                  <a
                    key={group.department.id}
                    href={`#${group.department.id}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-border px-1 py-4 !text-primary transition-colors hover:!text-secondary sm:border-r sm:last:border-r-0 lg:[&:nth-child(3n)]:border-r-0"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="editorial-index">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold">
                        {
                          group.department
                            .shortName
                        }
                      </span>
                    </span>
                    <span className="text-[0.6875rem] font-bold tracking-[0.11em] text-muted-light">
                      {String(
                        group.team.length +
                          1,
                      ).padStart(2, "0")}
                    </span>
                  </a>
                ),
              )}
            </nav>
          </InView>

          {/*
            The nine divisions above are the operational team. These two groups
            sit outside that structure and further down the page, so the index
            needs to point at them or they are only found by scrolling.
          
            Same-page anchors rather than routes — both sections live here. Each
            target carries scroll-mt-28 already, so the sticky header does not
            cover the heading on arrival.
          */}
          <InView delay={0.1}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#advisors"
                className="group inline-flex min-h-11 flex-1 items-center justify-between gap-4 bg-primary px-5 !text-white transition-colors hover:!bg-primary-dark hover:!text-white"
              >
                <span className="text-[0.6875rem] font-bold uppercase tracking-[0.11em]">
                  {advisory.eyebrow}
                </span>
                <ArrowDown
                  aria-hidden="true"
                  className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
          
              <a
                href="#board"
                className="group inline-flex min-h-11 flex-1 items-center justify-between gap-4 bg-secondary px-5 !text-white transition-colors hover:!bg-secondary-dark hover:!text-white"
              >
                <span className="text-[0.6875rem] font-bold uppercase tracking-[0.11em]">
                  Board of Directors
                </span>
                <ArrowDown
                  aria-hidden="true"
                  className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          DIVISION BLOCKS
          Head on top, then their team.
          ===================================== */}
      {divisions.map(
        (group, groupIndex) => (
          <section
            key={group.department.id}
            id={group.department.id}
            aria-labelledby={`${group.department.id}-heading`}
            className={
              groupIndex % 2 === 0
                ? "scroll-mt-28 bg-surface"
                : "scroll-mt-28 bg-background"
            }
          >
            <div className="site-container py-12 lg:py-14">
              <div className="border-t border-border-strong pt-6">
                {/* Division header */}
                <InView>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className="editorial-index">
                        {String(
                          groupIndex + 1,
                        ).padStart(2, "0")}
                      </span>
                      <h2
                        id={`${group.department.id}-heading`}
                        className="font-editorial text-[clamp(1.5rem,2.1vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-primary"
                      >
                        {
                          group.department
                            .name
                        }
                      </h2>
                    </div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                      {String(
                        group.team.length +
                          1,
                      ).padStart(2, "0")}{" "}
                      {group.team.length ===
                      0
                        ? "member"
                        : "members"}
                    </p>
                  </div>
                  <p className="mt-2.5 max-w-3xl text-xs leading-6 text-muted">
                    {
                      group.department
                        .description
                    }
                  </p>
                </InView>

                {/*
                  One grid, one card size. The head is simply the first
                  card. Associates used to render as small circular
                  avatars beside a full-size head, which made the people
                  doing the work look incidental.
                */}
                {/*
                  The head sits centred above the division rather than as the first
                  cell of the grid. Same card, same size — the max-width below is one
                  grid column at each breakpoint, gaps subtracted, so nothing about the
                  card itself changes.
                */}
                {group.head ? (
                  <div className="mt-8 flex justify-center">
                    <div className="w-full sm:max-w-[calc((100%-2rem)/2)] lg:max-w-[calc((100%-4rem)/3)] xl:max-w-[calc((100%-6rem)/4)]">
                      <InView
                        from="right"
                        amount={0.05}
                      >
                      <PersonCard
                        name={group.head.name}
                        role={
                          group.head.designation
                        }
                        focus={group.head.focus}
                        image={group.head.image}
                        email={group.head.email}
                        linkedin={
                          group.head.linkedin
                        }
                        instagram={
                          group.head.instagram
                        }
                      />
                      </InView>
                    </div>
                  </div>
                ) : null}
                
                {/* The division team, below its head. */}
                <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                  {group.team.map(
                    (
                      /*
                       * Annotated because `satisfies` in team.ts keeps the
                       * literal types, so entries without an image would
                       * otherwise have no `image` property at all.
                       */
                      person: TeamAssociate,
                      index,
                    ) => (
                      <InView
                        key={person.name}
                        delay={
                          0.06 + index * 0.02
                        }
                        amount={0.05}
                      >
                        {/*
                          Associates get an email link only — the content
                          model carries no social handles for them.
                        */}
                        <PersonCard
                          name={person.name}
                          role={person.position}
                          image={person.image}
                          email={person.email}
                        />
                      </InView>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        ),
      )}

      {/* =====================================
          TECHNICAL ADVISORS
          ===================================== */}
      <section
        id="advisors"
        aria-labelledby="advisors-heading"
        className="scroll-mt-28 bg-background"
      >
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <p className="eyebrow text-primary">
                  {advisory.eyebrow}
                </p>
              </div>
              <div>
                <h2
                  id="advisors-heading"
                  className="max-w-xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary"
                >
                  {advisory.title}
                </h2>
              </div>
              <div>
                <p className="text-sm leading-7 text-muted">
                  {advisory.description}
                </p>
                <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {String(
                    advisors.length,
                  ).padStart(2, "0")}{" "}
                  advisors
                </p>
              </div>
            </div>
          </InView>

          <TeamProfileGrid
            profiles={advisors}
          />
        </div>
      </section>

      {/* =====================================
          BOARD OF DIRECTORS
          ===================================== */}
      <section
        id="board"
        aria-labelledby="board-heading"
        className="scroll-mt-28 bg-surface"
      >
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <p className="eyebrow text-primary">
                  {governance.eyebrow}
                </p>
              </div>
              <div>
                <h2
                  id="board-heading"
                  className="max-w-xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary"
                >
                  {governance.title}
                </h2>
              </div>
              <div>
                <p className="text-sm leading-7 text-muted">
                  {
                    governance.description
                  }
                </p>
                <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {String(
                    board.length,
                  ).padStart(2, "0")}{" "}
                  members
                </p>
              </div>
            </div>
          </InView>

          <TeamProfileGrid
            profiles={board}
          />
        </div>
      </section>

      {/* =====================================
          JOIN
          ===================================== */}
      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.75fr_1.55fr_0.7fr] lg:items-end">
              <div>
                <p className="eyebrow text-primary">
                  {join.eyebrow}
                </p>
              </div>
              <div>
                <p className="max-w-3xl font-editorial text-[clamp(1.6rem,2.4vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-primary">
                  {join.title}
                </p>
              </div>
              <div>
                <p className="text-sm leading-7 text-muted">
                  {join.description}
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          CONTACT
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
                  Contact ClimateWatch
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}

/* ==========================================
   PERSON CARD

   One card for everyone in a division — the
   head and the associates alike. They used to
   be different shapes and sizes, which read as
   a hierarchy of importance rather than of
   role.

   The portrait carries a two-tone border in
   the brand navy and orange, the same pair the
   circular avatar ring used, drawn as a
   gradient behind 2px of padding.
   ========================================== */

function PersonCard({
  name,
  role,
  focus,
  image,
  email,
  linkedin,
  instagram,
}: Readonly<{
  name: string;
  role: string;
  /** Heads carry a focus line; associates do not. */
  focus?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
}>) {
  return (
    <article className="group flex h-full flex-col">
      <div
        className="rounded-sm p-[2px]"
        style={{
          background: PORTRAIT_BORDER,
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-surface-muted">
          <TeamPhoto
            src={image}
            name={name}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 260px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
        <h3 className="font-editorial text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
          {name}
        </h3>

        <p className="mt-2.5 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-secondary">
          {role}
        </p>

        {focus ? (
          <p className="mt-3 flex-1 text-xs leading-6 text-muted">
            {focus}
          </p>
        ) : (
          <span className="flex-1" />
        )}

        <TeamSocialLinks
          name={name}
          email={email}
          linkedin={linkedin}
          instagram={instagram}
        />
      </div>
    </article>
  );
}
