import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { projectsContent } from "@/content/projects";

/**
 * Project page — src/app/projects/[slug]/page.tsx
 *
 * One page per project, so a project can be linked to, shared and found on
 * its own subject rather than only as an anchor partway down /projects.
 *
 * The slug is the project's existing `id`, which is also its anchor on the
 * index, so /projects#glacier-school and /projects/glacier-school both land
 * on the same project and neither link already in the wild breaks.
 *
 * Laid out for arriving cold: photograph, what it is, then the detail. The
 * index stays as it is — this is an addition, not a replacement.
 */

const { projects } = projectsContent;

type Project = (typeof projects)[number];

function findProject(
  slug: string,
): Project | undefined {
  return projects.find(
    (project) => project.id === slug,
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Projects" };
  }

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.description,
      url: `/projects/${project.id}`,
      images: [project.image],
    },
  };
}

/** Label/value pair, matching the index's meta rows. */
function Meta({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
        {label}
      </dt>

      <dd className="mt-2 text-sm font-medium leading-6 text-primary">
        {value}
      </dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return null;
  }

  return (
    <main>
      {/* =====================================
          HEADER
          ===================================== */}

      <section className="border-b border-border bg-surface">
        <div className="site-container pt-32 pb-12 sm:pt-36 sm:pb-16">
          <InView>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              All projects
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
                {project.status}
              </p>

              <span
                aria-hidden="true"
                className="size-1 bg-border"
              />

              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                {project.division}
              </p>
            </div>

            <h1 className="mt-6 max-w-4xl font-editorial text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
              {project.name}
            </h1>

            <p className="mt-6 max-w-3xl font-editorial text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium leading-[1.25] tracking-[-0.02em] text-primary/80">
              {project.title}
            </p>
          </InView>
        </div>
      </section>

      {/* =====================================
          IMAGE
          ===================================== */}

      <section className="border-b border-border bg-background">
        <div className="site-container py-10 sm:py-14">
          <InView amount={0.1}>
            <figure>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
                <LoadedImage
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>

              {project.imageCaption ? (
                <figcaption className="mt-4 max-w-2xl text-xs leading-6 text-muted">
                  {project.imageCaption}
                </figcaption>
              ) : null}
            </figure>
          </InView>
        </div>
      </section>

      {/* =====================================
          DETAIL
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="content-grid gap-y-12">
            {/* META */}

            <InView className="col-span-12 lg:col-span-3">
              <dl className="grid gap-7 border-t border-primary pt-6 sm:grid-cols-2 lg:grid-cols-1">
                <Meta
                  label="Division"
                  value={project.division}
                />

                <Meta
                  label="Status"
                  value={project.status}
                />

                {"region" in project ? (
                  <Meta
                    label="Region"
                    value={project.region}
                  />
                ) : null}

                {"format" in project ? (
                  <Meta
                    label="Format"
                    value={project.format}
                  />
                ) : null}

                {"focusLabel" in project ? (
                  <Meta
                    label="Focus"
                    value={project.focusLabel}
                  />
                ) : null}

                {"scope" in project ? (
                  <Meta
                    label="Scope"
                    value={project.scope}
                  />
                ) : null}
              </dl>
            </InView>

            {/* PROSE */}

            <InView className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="border-t border-primary pt-6 text-base leading-8 text-primary">
                {project.description}
              </p>

              <div className="mt-8 space-y-7">
                {project.paragraphs.map(
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

              {/* FOCUS */}

              <div className="mt-12 border-t border-border pt-7">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                  Areas of focus
                </p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {project.focus.map((item) => (
                    <li
                      key={item}
                      className="border border-border bg-surface px-3.5 py-2 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={project.action.href}
                className="group mt-10 inline-flex min-h-11 items-center gap-3 bg-secondary px-6 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark hover:!text-white"
              >
                {project.action.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </InView>
          </div>
        </div>
      </section>
    </main>
  );
}
