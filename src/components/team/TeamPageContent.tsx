import { Mail } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { TeamProfileGrid } from "@/components/team/TeamProfileGrid";
import {
  teamContent,
  type TeamMember,
} from "@/content/team";

import {
  TeamMonogram,
  TeamSocialLinks,
} from "./team-primitives";

export function TeamPageContent() {
  const {
    hero,
    stats,
    directory,
    departments,
    members,
    advisory,
    advisors,
    governance,
    board,
    join,
    closing,
  } = teamContent;

  /**
   * Each division now has a single head, so members render as one grid with
   * the division named on the card rather than as nine one-person sections.
   */
  const departmentNames = new Map(
    departments.map((department) => [
      department.id,
      department.name,
    ]),
  );

  return (
    <main>
      {/* =====================================
          HERO BANNER
          ===================================== */}
      <section
        aria-labelledby="team-heading"
        className="relative isolate flex min-h-[78vh] flex-col justify-end overflow-hidden bg-primary-dark pt-32 sm:min-h-[82vh] sm:pt-36 lg:min-h-[86vh]"
      >
        {/* Banner media */}
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

          {/* Banner statistics */}
          <InView
            delay={0.08}
            className="mt-12 border-t border-white/20 pt-7 lg:mt-16"
          >
            <dl className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-white/45">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 font-editorial text-[clamp(1.9rem,2.6vw,2.6rem)] font-medium leading-none tracking-[-0.035em] text-white">
                    {stat.value}
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
          01 — DIVISIONAL LEADERSHIP
          ===================================== */}
      <section
        id="leadership"
        aria-labelledby="leadership-heading"
        className="scroll-mt-28 bg-background"
      >
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />
                  <p className="eyebrow text-primary">
                    {directory.eyebrow}
                  </p>
                </div>
              </div>
              <div>
                <h2
                  id="leadership-heading"
                  className="max-w-xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary"
                >
                  {directory.title}
                </h2>
              </div>
              <div>
                <p className="text-sm leading-7 text-muted">
                  {directory.description}
                </p>
                <p className="mt-4 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {String(
                    members.length,
                  ).padStart(2, "0")}{" "}
                  {members.length === 1
                    ? "member"
                    : "members"}
                </p>
              </div>
            </div>
          </InView>

          {/* Member grid */}
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map(
              (member, memberIndex) => (
                <InView
                  key={member.name}
                  delay={
                    memberIndex * 0.03
                  }
                  amount={0.08}
                >
                  <TeamCard
                    member={member}
                    departmentName={
                      departmentNames.get(
                        member.department,
                      ) ??
                      member.department
                    }
                  />
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          02 — TECHNICAL ADVISORS
          ===================================== */}
      <section
        id="advisors"
        aria-labelledby="advisors-heading"
        className="scroll-mt-28 bg-surface"
      >
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border-strong pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />
                  <p className="eyebrow text-primary">
                    {advisory.eyebrow}
                  </p>
                </div>
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
                <p className="mt-4 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
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
          03 — BOARD OF DIRECTORS
          ===================================== */}
      <section
        id="board"
        aria-labelledby="board-heading"
        className="scroll-mt-28 bg-background"
      >
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border-strong pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />
                  <p className="eyebrow text-primary">
                    {governance.eyebrow}
                  </p>
                </div>
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
                <p className="mt-4 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
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
      <section className="bg-surface">
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
   MEMBER CARD
   ========================================== */
function TeamCard({
  member,
  departmentName,
}: Readonly<{
  member: TeamMember;
  departmentName: string;
}>) {
  return (
    <article className="group flex h-full flex-col">
      {/* Portrait */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
        {member.image ? (
          <LoadedImage
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <TeamMonogram
            name={member.name}
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      </div>

      {/* Identity */}
      <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
        <p className="text-[0.56rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light">
          {departmentName}
        </p>
        <h3 className="mt-2 font-editorial text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
          {member.name}
        </h3>
        <p className="mt-2.5 text-[0.58rem] font-bold uppercase leading-5 tracking-[0.11em] text-secondary">
          {member.designation}
        </p>
        <p className="mt-3 flex-1 text-xs leading-6 text-muted">
          {member.focus}
        </p>

        <TeamSocialLinks
          name={member.name}
          email={member.email}
          linkedin={member.linkedin}
          instagram={member.instagram}
        />
      </div>
    </article>
  );
}
