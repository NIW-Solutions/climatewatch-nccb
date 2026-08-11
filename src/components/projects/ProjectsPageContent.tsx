import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { projectsContent } from "@/content/projects";

export function ProjectsPageContent() {
  const {
    hero,
    introduction,
    projects,
    closing,
  } = projectsContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="projects-heading"
        className="overflow-hidden bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <div className="grid gap-10 border-t border-primary pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
            <InView className="flex flex-col justify-between">
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

                <h1
                  id="projects-heading"
                  className="mt-7 max-w-3xl font-editorial text-[clamp(2.7rem,4.5vw,4.8rem)] font-medium leading-[1.01] tracking-[-0.045em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              <p className="body-copy-large mt-10 max-w-xl lg:mt-14">
                {hero.description}
              </p>
            </InView>

            <InView
              delay={0.05}
              amount={0.1}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-primary-dark">
                <LoadedImage
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  darkLoader
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.02)_45%,rgba(5,22,43,0.68)_100%)]"
                />

                {hero.imageCaption ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                    <p className="max-w-xl border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                      {hero.imageCaption}
                    </p>
                  </div>
                ) : null}
              </div>
            </InView>
          </div>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          INTRODUCTION
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="content-grid gap-y-8">
            <InView className="col-span-12 lg:col-span-3">
              <p className="eyebrow text-primary">
                {introduction.eyebrow}
              </p>
            </InView>

            <InView className="col-span-12 lg:col-span-8 lg:col-start-5">
              <h2 className="max-w-3xl font-editorial text-[clamp(2rem,3vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                {introduction.title}
              </h2>

              <div className="mt-7 grid gap-6 border-t border-border pt-7 sm:grid-cols-2 sm:gap-10">
                {introduction.paragraphs.map(
                  (paragraph) => (
                    <p
                      key={paragraph}
                      className="body-copy"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* =====================================
          PROJECT INDEX
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="flex items-end justify-between gap-8 border-t border-primary pt-5">
              <div>
                <p className="eyebrow text-primary">
                  Current projects
                </p>

                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  Selected work across education,
                  community evidence, applied
                  research and climate policy.
                </p>
              </div>

              <p className="hidden text-[0.6rem] font-bold uppercase tracking-[0.11em] text-muted-light sm:block">
                {String(projects.length).padStart(2, "0")} projects
              </p>
            </div>
          </InView>

          {/* =====================================
              PROJECTS
              ===================================== */}

          <div className="mt-10 border-t border-border">
            {projects.map(
              (project, index) => (
                <InView
                  key={project.id}
                  delay={index * 0.025}
                  amount={0.08}
                >
                  <article
                    id={project.id}
                    className="scroll-mt-32 border-b border-border"
                  >
                    {/* TOP RAIL */}

                    <div className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6">
                      <span className="editorial-index">
                        {project.number}
                      </span>

                      <p className="text-sm font-semibold text-primary">
                        {project.name}
                      </p>

                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-secondary">
                        {project.status}
                      </p>
                    </div>

                    {/* MAIN PROJECT */}

                    <div className="grid gap-8 border-t border-border py-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:py-10 xl:gap-16">
                      {/* IMAGE */}

                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-primary-dark">
                          <LoadedImage
                            src={project.image}
                            alt={project.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 44vw"
                            className="object-cover"
                            darkLoader
                          />

                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(5,22,43,0.68)_100%)]"
                          />

                          {project.imageCaption ? (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
                              <p className="max-w-lg border-t border-white/25 pt-3 text-[0.7rem] leading-5 text-white/68">
                                {project.imageCaption}
                              </p>
                            </div>
                          ) : null}
                        </div>

                        {/* DESKTOP META */}

                        <div className="mt-5 hidden grid-cols-2 gap-x-6 gap-y-4 lg:grid">
                          <ProjectMeta
                            label="Division"
                            value={project.division}
                          />

                          {"region" in project ? (
                            <ProjectMeta
                              label="Region"
                              value={project.region}
                            />
                          ) : null}

                          {"format" in project ? (
                            <ProjectMeta
                              label="Format"
                              value={project.format}
                            />
                          ) : null}

                          {"focusLabel" in project ? (
                            <ProjectMeta
                              label="Focus"
                              value={project.focusLabel}
                            />
                          ) : null}

                          {"scope" in project ? (
                            <ProjectMeta
                              label="Scope"
                              value={project.scope}
                            />
                          ) : null}
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div className="flex flex-col">
                        <p className="text-[0.61rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                          {project.division}
                        </p>

                        <h2 className="mt-4 max-w-3xl font-editorial text-[clamp(2rem,3vw,3.15rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
                          {project.title}
                        </h2>

                        {/* SHORT VISIBLE DESCRIPTION */}

                        <p className="mt-6 max-w-3xl text-base leading-8 text-muted">
                          {project.description}
                        </p>

                        {/* MOBILE META */}

                        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-5 lg:hidden">
                          <ProjectMeta
                            label="Status"
                            value={project.status}
                          />

                          <ProjectMeta
                            label="Division"
                            value={project.division}
                          />

                          {"region" in project ? (
                            <ProjectMeta
                              label="Region"
                              value={project.region}
                            />
                          ) : null}

                          {"format" in project ? (
                            <ProjectMeta
                              label="Format"
                              value={project.format}
                            />
                          ) : null}

                          {"focusLabel" in project ? (
                            <ProjectMeta
                              label="Focus"
                              value={project.focusLabel}
                            />
                          ) : null}

                          {"scope" in project ? (
                            <ProjectMeta
                              label="Scope"
                              value={project.scope}
                            />
                          ) : null}
                        </div>

                        {/* =====================================
                            READ MORE
                            ===================================== */}

                        <details className="group mt-7 border-t border-border">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm font-semibold text-primary transition-colors hover:text-secondary [&::-webkit-details-marker]:hidden">
                            <span>
                              Read more
                            </span>

                            <span className="grid size-8 shrink-0 place-items-center border border-border-strong transition-[background-color,border-color,color] duration-300 group-open:border-primary group-open:bg-primary group-open:text-white">
                              <ChevronDown
                                aria-hidden="true"
                                className="size-4 transition-transform duration-300 group-open:rotate-180"
                                strokeWidth={1.7}
                              />
                            </span>
                          </summary>

                          <div className="border-t border-border pb-2 pt-6">
                            <div className="space-y-5">
                              {project.paragraphs.map(
                                (paragraph) => (
                                  <p
                                    key={paragraph}
                                    className="max-w-3xl text-sm leading-7 text-muted sm:text-base sm:leading-8"
                                  >
                                    {paragraph}
                                  </p>
                                ),
                              )}
                            </div>

                            {/* FOCUS */}

                            <div className="mt-8 border-t border-border pt-6">
                              <p className="text-[0.57rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                                Areas of focus
                              </p>

                              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                                {project.focus.map(
                                  (item) => (
                                    <span
                                      key={item}
                                      className="border-b border-border pb-1 text-sm font-medium text-primary"
                                    >
                                      {item}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </details>

                        {/* ACTION */}

                        <div className="mt-auto pt-7">
                          <Link
                            href={project.action.href}
                            className="group/link inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                          >
                            {project.action.label}

                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                              strokeWidth={1.7}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          CLOSING
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.75fr_1.65fr_0.6fr] lg:items-end lg:py-18">
              <div>
                <p className="eyebrow text-white/50">
                  {closing.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-3xl font-editorial text-[clamp(2rem,3vw,3.25rem)] font-medium leading-[1.07] tracking-[-0.035em] text-white">
                  {closing.title}
                </h2>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href={closing.primaryAction.href}
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-secondary"
                >
                  {closing.primaryAction.label}

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>

                <Link
                  href={closing.secondaryAction.href}
                  className="group inline-flex items-center gap-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {closing.secondaryAction.label}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}

function ProjectMeta({
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

      <p className="mt-1.5 text-xs font-semibold leading-5 text-primary sm:text-sm">
        {value}
      </p>
    </div>
  );
}