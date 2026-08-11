import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { homeContent } from "@/content/home";

export function HomeProjects() {
  const { projects } = homeContent;

  const featured = projects.featured;
  const projectItems = projects.items;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="overflow-hidden bg-background"
    >
      {/* =====================================
          SECTION INTRO
          ===================================== */}

      <div className="site-container section-shell">
        <InView>
          <header className="content-grid gap-y-9 border-b border-border pb-12 sm:pb-14 lg:items-end">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {projects.eyebrow}
                </p>
              </div>

              <h2
                id="projects-heading"
                className="section-heading mt-7 max-w-5xl text-primary"
              >
                {projects.title}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="body-copy-large max-w-xl">
                {projects.description}
              </p>

              <Link
                href={projects.action.href}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
              >
                <span className="border-b border-primary pb-1 transition-colors group-hover:border-secondary">
                  {projects.action.label}
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </header>
        </InView>

        {/* =====================================
            FEATURED PROJECT
            ===================================== */}

        <InView
          amount={0.1}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <article className="grid overflow-hidden bg-primary lg:grid-cols-[1.4fr_0.6fr]">
            {/* IMAGE */}

            <Link
              href={featured.href}
              aria-label={`Explore ${featured.title}`}
              className="group relative block"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-primary-dark sm:aspect-[16/9] lg:h-full lg:min-h-[42rem] lg:aspect-auto">
                <LoadedImage
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
                  darkLoader
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.02)_25%,rgba(5,22,43,0.78)_100%)]"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 lg:p-10">
                  <div className="flex max-w-xl items-end justify-between gap-6 border-t border-white/30 pt-5">
                    <p className="text-xs leading-6 text-white/68">
                      {featured.imageCaption}
                    </p>

                    <span className="grid size-11 shrink-0 place-items-center border border-white/40 bg-primary-dark/25 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* CONTENT */}

            <div className="relative flex flex-col justify-between p-7 text-white sm:p-10 lg:p-12 xl:p-14">
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-7 select-none font-editorial text-[10rem] font-medium leading-none tracking-[-0.07em] text-white/[0.035]"
              >
                01
              </span>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-secondary px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.11em] text-white">
                    Featured project
                  </span>

                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.11em] text-white/48">
                    {featured.status}
                  </span>
                </div>

                <h3 className="mt-8 max-w-lg font-editorial text-[clamp(2.6rem,4vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
                  {featured.title}
                </h3>

                <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
                  {featured.description}
                </p>
              </div>

              <div className="relative z-10 mt-12">
                <ProjectMeta
                  items={featured.meta}
                  light
                />

                <Link
                  href={featured.href}
                  className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-secondary"
                >
                  Explore project

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>
          </article>
        </InView>

        {/* =====================================
            OTHER PROJECTS
            ===================================== */}

        <div className="mt-20 sm:mt-24 lg:mt-28">
          <InView>
            <div className="flex items-end justify-between gap-8 border-b border-primary pb-5">
              <p className="eyebrow text-primary">
                More current work
              </p>

              <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.11em] text-muted-light sm:block">
                ClimateWatch projects
              </p>
            </div>
          </InView>

          <div>
            {projectItems.map((project, index) => (
              <InView
                key={project.slug}
                delay={index * 0.04}
                amount={0.08}
              >
                <article className="group grid gap-y-7 border-b border-border py-9 sm:py-11 lg:grid-cols-[0.75fr_1.35fr_2.1fr_0.5fr] lg:items-center lg:gap-x-8">
                  {/* NUMBER / STATUS */}

                  <div className="flex items-center justify-between gap-5 lg:block">
                    <span className="editorial-index">
                      {project.number}
                    </span>

                    <p className="text-[0.59rem] font-bold uppercase tracking-[0.11em] text-muted-light lg:mt-4">
                      {project.status}
                    </p>
                  </div>

                  {/* IMAGE */}

                  <Link
                    href={project.href}
                    aria-label={`Explore ${project.title}`}
                    className="block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                      <LoadedImage
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10"
                      />
                    </div>
                  </Link>

                  {/* CONTENT */}

                  <div>
                    <Link href={project.href}>
                      <h3 className="max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-primary transition-colors duration-300 group-hover:text-secondary sm:text-3xl">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                      {project.description}
                    </p>

                    <div className="mt-6">
                      <ProjectMeta
                        items={project.meta}
                      />
                    </div>
                  </div>

                  {/* ARROW */}

                  <div className="hidden justify-end lg:flex">
                    <Link
                      href={project.href}
                      aria-label={`View ${project.title}`}
                      className="grid size-12 place-items-center border border-border-strong text-primary transition-[background-color,border-color,color] duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white"
                    >
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                      />
                    </Link>
                  </div>
                </article>
              </InView>
            ))}
          </div>
        </div>

        {/* =====================================
            BOTTOM LINK
            ===================================== */}

        <InView className="mt-10 flex justify-end sm:mt-12">
          <Link
            href="/projects"
            className="button-secondary group"
          >
            View all projects

            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.7}
            />
          </Link>
        </InView>
      </div>
    </section>
  );
}

function ProjectMeta({
  items,
  light = false,
}: Readonly<{
  items: readonly {
    label: string;
    value: string;
  }[];
  light?: boolean;
}>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={[
            "border-t pt-3",
            light
              ? "border-white/20"
              : "border-border",
          ].join(" ")}
        >
          <p
            className={[
              "text-[0.56rem] font-bold uppercase tracking-[0.11em]",
              light
                ? "text-white/40"
                : "text-muted-light",
            ].join(" ")}
          >
            {item.label}
          </p>

          <p
            className={[
              "mt-1.5 text-xs font-semibold leading-5",
              light
                ? "text-white/78"
                : "text-primary",
            ].join(" ")}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}