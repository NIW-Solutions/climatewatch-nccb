import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import {
  teamContent,
  type TeamMember,
} from "@/content/team";

export function TeamPageContent() {
  const {
    hero,
    leadership,
    leadershipMembers,
    divisions,
    divisionMembers,
    closing,
  } = teamContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="team-heading"
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
                  id="team-heading"
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

          <div className="mt-12 flex items-center justify-between gap-6 border-b border-border pb-5 sm:mt-14">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
              ClimateWatch
            </p>

            <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
              07 team members
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          LEADERSHIP
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <p className="eyebrow text-primary">
                  {leadership.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(1.9rem,2.8vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                  Institutional leadership
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted">
                  {leadership.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-10 border-t border-border">
            {leadershipMembers.map(
              (member, index) => (
                <InView
                  key={member.name}
                  delay={index * 0.04}
                  amount={0.08}
                >
                  <TeamRow
                    member={member}
                    prominent
                  />
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          DIVISION LEADERSHIP
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="grid gap-8 border-t border-border-strong pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {divisions.eyebrow}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(2rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                  {divisions.title}
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted">
                  Policy, research, education,
                  partnerships and technical
                  leadership across the
                  organisation.
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-t border-border">
            {divisionMembers.map(
              (member, index) => (
                <InView
                  key={member.name}
                  delay={index * 0.025}
                  amount={0.08}
                >
                  <TeamRow member={member} />
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          ORGANISATIONAL DIRECTORY
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.75fr_1.55fr_0.7fr] lg:items-end">
              <div>
                <p className="eyebrow text-primary">
                  Structure
                </p>
              </div>

              <div>
                <p className="max-w-3xl font-editorial text-[clamp(1.6rem,2.4vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-primary">
                  ClimateWatch’s work is organised
                  across institutional leadership
                  and specialist programme areas.
                </p>
              </div>

              <div className="lg:text-right">
                <p className="text-xs font-semibold leading-6 text-muted">
                  Climate policy · Research ·
                  Education · Projects ·
                  Partnerships · Engineering
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

function TeamRow({
  member,
  prominent = false,
}: Readonly<{
  member: TeamMember;
  prominent?: boolean;
}>) {
  return (
    <article className="group border-b border-border">
      <div
        className={[
          "grid gap-y-6",
          prominent
            ? "py-8 sm:py-10"
            : "py-7 sm:py-8",
          "lg:grid-cols-[4rem_minmax(14rem,0.8fr)_minmax(15rem,1fr)_10rem]",
          "lg:items-start lg:gap-x-9",
        ].join(" ")}
      >
        {/* Number */}

        <span className="editorial-index">
          {member.number}
        </span>

        {/* Person */}

        <div>
          <h3
            className={[
              "font-editorial font-medium leading-[1.08] tracking-[-0.035em] text-primary transition-colors duration-300 group-hover:text-secondary",
              prominent
                ? "text-[clamp(1.9rem,2.8vw,2.8rem)]"
                : "text-[clamp(1.55rem,2vw,2.1rem)]",
            ].join(" ")}
          >
            {member.name}
          </h3>

          <p className="mt-3 text-[0.58rem] font-bold uppercase tracking-[0.11em] text-secondary">
            {member.designation}
          </p>
        </div>

        {/* Team */}

        <div>
          <p className="text-[0.54rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            Area
          </p>

          <p className="mt-2 max-w-md text-sm font-semibold leading-7 text-primary">
            {member.team}
          </p>
        </div>

        {/* Social */}

        <div className="flex items-center gap-3 lg:justify-end">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="group/social grid size-10 place-items-center border border-border-strong !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-primary hover:!bg-primary hover:!text-white"
          >
            <LinkedInIcon className="size-4" />
          </a>

          {member.instagram ? (
            <a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="group/social grid size-10 place-items-center border border-border-strong !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-secondary hover:!bg-secondary hover:!text-white"
            >
              <InstagramIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

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