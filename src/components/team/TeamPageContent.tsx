import { Mail } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import {
  teamContent,
  type TeamMember,
} from "@/content/team";

export function TeamPageContent() {
  const {
    hero,
    stats,
    directory,
    departments,
    members,
    join,
    closing,
  } = teamContent;

  /* Group members by department, preserving roster order. */

  const grouped = departments
    .map((department) => ({
      department,

      people: members.filter(
        (member) =>
          member.department ===
          department.id,
      ),
    }))
    .filter(
      (group) =>
        group.people.length > 0,
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
          DIRECTORY INTRO + DEPARTMENT INDEX
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

          {/* Department jump index */}

          <InView delay={0.06}>
            <nav
              aria-label="Departments"
              className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4"
            >
              {grouped.map(
                (
                  group,
                  index,
                ) => (
                  <a
                    key={group.department.id}
                    href={`#${group.department.id}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-border px-1 py-5 !text-primary transition-colors hover:!text-secondary sm:border-r sm:last:border-r-0 lg:[&:nth-child(4n)]:border-r-0"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="editorial-index">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span className="text-sm font-semibold">
                        {
                          group
                            .department
                            .shortName
                        }
                      </span>
                    </span>

                    <span className="text-[0.58rem] font-bold tracking-[0.11em] text-muted-light">
                      {String(
                        group.people
                          .length,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  </a>
                ),
              )}
            </nav>
          </InView>
        </div>
      </section>

      {/* =====================================
          DEPARTMENT GRIDS
          ===================================== */}

      {grouped.map(
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
            <div className="site-container section-shell-small">
              {/* Department header */}

              <InView>
                <div className="grid gap-6 border-t border-border-strong pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr] lg:items-start">
                  <div>
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="h-px w-8 bg-secondary"
                      />

                      <p className="editorial-index">
                        {String(
                          groupIndex +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2
                      id={`${group.department.id}-heading`}
                      className="max-w-xl font-editorial text-[clamp(1.75rem,2.5vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary"
                    >
                      {
                        group.department
                          .name
                      }
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm leading-7 text-muted">
                      {
                        group.department
                          .description
                      }
                    </p>

                    <p className="mt-4 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                      {String(
                        group.people
                          .length,
                      ).padStart(
                        2,
                        "0",
                      )}{" "}
                      {group.people
                        .length === 1
                        ? "member"
                        : "members"}
                    </p>
                  </div>
                </div>
              </InView>

              {/* Member grid */}

              <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.people.map(
                  (
                    member,
                    memberIndex,
                  ) => (
                    <InView
                      key={member.name}
                      delay={
                        memberIndex *
                        0.03
                      }
                      amount={0.08}
                    >
                      <TeamCard
                        member={member}
                      />
                    </InView>
                  ),
                )}
              </div>
            </div>
          </section>
        ),
      )}

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
   MEMBER CARD
   ========================================== */

function TeamCard({
  member,
}: Readonly<{
  member: TeamMember;
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
        <h3 className="font-editorial text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
          {member.name}
        </h3>

        <p className="mt-2.5 text-[0.58rem] font-bold uppercase leading-5 tracking-[0.11em] text-secondary">
          {member.designation}
        </p>

        <p className="mt-3 text-xs leading-6 text-muted">
          {member.focus}
        </p>

        {/* Social */}

        {member.linkedin ||
        member.instagram ? (
          <div className="mt-5 flex items-center gap-2.5 pt-1">
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="grid size-9 place-items-center border border-border-strong !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-primary hover:!bg-primary hover:!text-white"
              >
                <LinkedInIcon className="size-3.5" />
              </a>
            ) : null}

            {member.instagram ? (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on Instagram`}
                className="grid size-9 place-items-center border border-border-strong !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-secondary hover:!bg-secondary hover:!text-white"
              >
                <InstagramIcon className="size-3.5" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/* ==========================================
   MONOGRAM

   Portrait placeholder used until a member
   photograph is supplied.
   ========================================== */

function TeamMonogram({
  name,
}: Readonly<{
  name: string;
}>) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,var(--primary)_0%,var(--primary-dark)_58%,#04162b_100%)]"
    >
      {/* Contour texture */}

      <svg
        viewBox="0 0 120 150"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.16]"
        fill="none"
      >
        <path
          d="M-10 118 C 20 96, 44 132, 70 108 S 118 92, 134 112"
          stroke="#ffffff"
          strokeWidth="1"
        />

        <path
          d="M-10 132 C 22 110, 48 146, 74 122 S 120 106, 134 126"
          stroke="#ffffff"
          strokeWidth="1"
        />

        <path
          d="M-10 104 C 18 82, 40 118, 66 94 S 116 78, 134 98"
          stroke="#ffffff"
          strokeWidth="1"
        />
      </svg>

      <span className="relative font-editorial text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-white/85">
        {initials}
      </span>

      <span className="absolute bottom-4 left-4 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-white/35">
        ClimateWatch
      </span>
    </div>
  );
}

/* ==========================================
   ICONS
   ========================================== */

function LinkedInIcon({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M5.2 7.8H1.6V19h3.6V7.8ZM3.4 2.2A2.1 2.1 0 1 0 3.4 6.4a2.1 2.1 0 0 0 0-4.2ZM19 7.5c-1.9 0-3.2 1-3.8 2V7.8h-3.5V19h3.6v-5.5c0-1.5.3-3 2.2-3 1.9 0 1.9 1.8 1.9 3.1V19H23v-6.1c0-3-0.6-5.4-4-5.4Z" />
    </svg>
  );
}

function InstagramIcon({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.4"
        cy="6.6"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
