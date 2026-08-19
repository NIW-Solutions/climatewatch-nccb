import { ArrowUpRight } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { NewsThumbnail } from "@/components/news/NewsThumbnail";
import type {
  FeedItem,
  FeedSection,
} from "@/lib/news";

/**
 * Live climate coverage — src/components/news/NewsFeedSections.tsx
 *
 * Renders the automatically-sourced sections. Every card links out to the
 * publisher; nothing here is hosted or rewritten by ClimateWatch, so each
 * one carries its source and date plainly.
 */

function formatDate(
  iso: string,
): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  );
}

function FeedCard({
  item,
}: Readonly<{ item: FeedItem }>) {
  const date = formatDate(
    item.publishedAt,
  );

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col border-t border-border pt-5"
    >
      <NewsThumbnail
        src={item.image}
        alt=""
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="truncate text-[0.56rem] font-bold uppercase tracking-[0.1em] text-secondary">
          {item.source}
        </p>

        {date ? (
          <p className="shrink-0 text-[0.65rem] font-semibold text-muted-light">
            {date}
          </p>
        ) : null}
      </div>

      <h3 className="mt-3 flex-1 text-sm font-semibold leading-6 tracking-[-0.01em] text-primary transition-colors duration-300 group-hover:text-secondary">
        {item.title}
      </h3>

      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors group-hover:text-secondary">
        Read

        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.7}
        />
      </span>
    </a>
  );
}

export function NewsFeedSections({
  sections,
}: Readonly<{
  sections: readonly FeedSection[];
}>) {
  return (
    <>
      {sections.map(
        (section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className={
              index % 2 === 0
                ? "bg-background"
                : "bg-surface"
            }
          >
            <div className="site-container section-shell">
              <InView>
                <div className="border-t border-border-strong pt-6">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-secondary"
                    />

                    <p className="eyebrow text-primary">
                      {section.eyebrow}
                    </p>
                  </div>

                  <h2
                    id={`${section.id}-heading`}
                    className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary"
                  >
                    {section.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                    {section.description}
                  </p>
                </div>
              </InView>

              {section.items.length ===
              0 ? (
                <p className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-light">
                  {section.emptyNote}
                </p>
              ) : (
                <InView>
                  <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {section.items.map(
                      (item) => (
                        <FeedCard
                          key={item.href}
                          item={item}
                        />
                      ),
                    )}
                  </div>
                </InView>
              )}
            </div>
          </section>
        ),
      )}
    </>
  );
}
