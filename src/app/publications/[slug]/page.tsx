import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { PublicationReader } from "@/components/publications/PublicationReader";
import {
  publicationsContent,
  type PublicationItem,
} from "@/content/publications";

const { items, reader, closing } =
  publicationsContent;

function findPublication(
  slug: string,
): PublicationItem | undefined {
  return items.find(
    (item) => item.slug === slug,
  );
}

export function generateStaticParams() {
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findPublication(slug);

  if (!item) {
    return { title: "Publication" };
  }

  const description =
    item.subtitle
      ? `${item.subtitle} — ${item.description}`
      : item.description;

  return {
    title: item.title,
    description,
    openGraph: {
      title: item.title,
      description,
      type: "article",
    },
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findPublication(slug);

  if (!item) {
    notFound();
  }

  const byline = [
    item.authors?.join(", "),
    item.editor
      ? `Edited by ${item.editor}`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="bg-background">
      <div className="site-container pb-20 pt-32 sm:pt-36 lg:pb-24">
        {/* Back */}
        <InView>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-[0.56rem] font-bold uppercase tracking-[0.11em] !text-muted transition-colors hover:!text-secondary"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
            {reader.backLabel}
          </Link>
        </InView>

        {/* Header */}
        <InView delay={0.04}>
          <div className="mt-8 grid gap-10 border-t border-primary pt-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-14">
            {/* Cover */}
            <div className="relative aspect-[3/4] w-full max-w-[17rem] overflow-hidden bg-primary-dark shadow-[0_18px_40px_rgba(8,29,25,0.10)]">
              <PublicationCover
                title={item.title}
                categoryLabel={
                  item.categoryLabel
                }
                year={item.year}
                cover={item.cover}
                coverAlt={item.coverAlt}
              />
            </div>

            {/* Meta */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
                  {item.categoryLabel}
                </p>
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {item.date}
                </p>
                {item.series ? (
                  <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                    {item.series}
                  </p>
                ) : null}
              </div>

              <h1 className="mt-4 font-editorial text-[clamp(1.9rem,3.2vw,3rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
                {item.title}
              </h1>

              {item.subtitle ? (
                <p className="mt-4 max-w-2xl font-editorial text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.35] tracking-[-0.02em] text-primary/70">
                  {item.subtitle}
                </p>
              ) : null}

              {byline ? (
                <p className="mt-6 text-xs font-semibold leading-6 text-primary">
                  {byline}
                </p>
              ) : null}

              {item.contributors ? (
                <p className="mt-1 text-xs leading-6 text-muted">
                  {item.contributors}
                </p>
              ) : null}

              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
                {item.description}
              </p>

              {/* Topics */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.topics.map(
                  (topic) => (
                    <span
                      key={topic}
                      className="border border-border px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.1em] text-muted"
                    >
                      {topic}
                    </span>
                  ),
                )}
              </div>

              {/* Actions + document, or the forthcoming notice */}
              <div className="mt-9">
                {item.pdf ? (
                  <PublicationReader
                    title={item.title}
                    pdf={item.pdf}
                    pdfSize={item.pdfSize}
                  />
                ) : (
                  <div className="border-l-2 border-secondary bg-surface px-5 py-4">
                    <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
                      {reader.forthcomingLabel}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
                      {reader.forthcomingNote}
                    </p>
                    <a
                      href={`mailto:${closing.email}`}
                      className="mt-3 inline-block text-xs font-semibold !text-primary underline decoration-border underline-offset-4 transition-colors hover:!text-secondary"
                    >
                      {closing.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Page count */}
              {item.pages ? (
                <p className="mt-5 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {item.pages}
                </p>
              ) : null}
            </div>
          </div>
        </InView>

        {/* Citation */}
        {item.citation ? (
          <InView delay={0.08}>
            <div className="mt-16 border-t border-border pt-6">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                {reader.citationLabel}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                {item.citation}
              </p>
            </div>
          </InView>
        ) : null}
      </div>
    </main>
  );
}
