import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { programmesContent } from "@/content/programmes";

/**
 * Programme page — src/app/programmes/[slug]/page.tsx
 *
 * One page per division, so a division can be linked to and shared the way
 * a project or a publication can.
 *
 * The slug is the division's existing `id`, which is also its anchor on
 * /programmes, so /programmes#research-and-development and
 * /programmes/research-and-development both land on the same division and
 * nothing already linked breaks.
 */

const { divisions } = programmesContent;

type Division = (typeof divisions)[number];

function findDivision(
  slug: string,
): Division | undefined {
  return divisions.find(
    (division) => division.id === slug,
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((division) => ({
    slug: division.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = findDivision(slug);

  if (!division) {
    return { title: "Programmes" };
  }

  return {
    title: division.eyebrow,
    description: division.description,
    alternates: {
      canonical: `/programmes/${division.id}`,
    },
    openGraph: {
      type: "article",
      title: division.eyebrow,
      description: division.description,
      url: `/programmes/${division.id}`,
      images: [division.image],
    },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const division = findDivision(slug);

  if (!division) {
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
              href="/programmes"
              className="group inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              All programmes
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-secondary"
              />

              <p className="eyebrow text-primary">
                {division.eyebrow}
              </p>
            </div>

            <h1 className="mt-7 max-w-4xl font-editorial text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
              {division.title}
            </h1>
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
                  src={division.image}
                  alt={division.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>

              {division.imageCaption ? (
                <figcaption className="mt-4 max-w-2xl text-xs leading-6 text-muted">
                  {division.imageCaption}
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
            <InView className="col-span-12 lg:col-span-3">
              <p className="border-t border-primary pt-6 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                Division {division.number}
              </p>
            </InView>

            <InView className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="border-t border-primary pt-6 text-base leading-8 text-primary">
                {division.description}
              </p>

              <div className="mt-8 space-y-7">
                {division.paragraphs.map(
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

              <div className="mt-12 border-t border-border pt-7">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                  Areas of focus
                </p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {division.focus.map(
                    (item) => (
                      <li
                        key={item}
                        className="border border-border bg-surface px-3.5 py-2 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Link
                href={division.action.href}
                className="group mt-10 inline-flex min-h-11 items-center gap-3 bg-secondary px-6 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark hover:!text-white"
              >
                {division.action.label}
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
