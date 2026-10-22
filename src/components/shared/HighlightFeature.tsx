import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { currentHighlight } from "@/content/programmes";

/**
 * Highlight feature — src/components/shared/HighlightFeature.tsx
 *
 * The one thing ClimateWatch wants seen first, placed at the top of
 * Programmes and of Projects. Same component, same content, one source:
 * `currentHighlight()` in src/content/programmes.ts names the slug, so
 * moving the spotlight is one edit and both pages follow.
 *
 * It is a summary, not the page. Three outcome lines and the line about the
 * position paper — the rest of the record lives on the event's own page,
 * which this links to. Anything longer here would push the pages' actual
 * subject below the fold on a phone.
 *
 * Renders nothing when there is no highlight, so turning it off does not
 * leave an empty band behind.
 */
export function HighlightFeature() {
  const highlight = currentHighlight();

  if (!highlight) {
    return null;
  }

  return (
    <section
      aria-labelledby="highlight-heading"
      className="border-b border-border bg-surface-soft"
    >
      <div className="site-container section-shell-small">
        <InView>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
            {/* PICTURE
                First on a phone, because it is the thing that says at a
                glance that this happened and who was in the room. */}

            <div
              className="relative w-full overflow-hidden bg-surface-muted"
              style={{
                aspectRatio: `${highlight.imageWidth} / ${highlight.imageHeight}`,
              }}
            >
              <LoadedImage
                src={highlight.image}
                alt={highlight.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="eyebrow text-secondary">
                Highlight · {highlight.status}
              </p>

              <h2
                id="highlight-heading"
                className="mt-5 max-w-xl font-editorial text-[clamp(1.7rem,2.5vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary"
              >
                {highlight.title}
              </h2>

              <p className="mt-4 text-sm font-semibold leading-7 text-primary/75">
                {highlight.subtitle}
              </p>

              <p className="mt-1.5 text-xs leading-6 text-muted-light">
                <time dateTime={highlight.dateISO}>{highlight.date}</time>
                {" · "}
                {highlight.city}
              </p>

              <ul className="mt-7 grid gap-3.5 border-t border-border pt-7">
                {highlight.outcome.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3.5 text-sm leading-7 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1 shrink-0 bg-secondary"
                    />

                    {point}
                  </li>
                ))}
              </ul>

              {/*
                The one forward-looking line on the page, so it is set apart
                from the record above it rather than reading as a fourth
                thing that already happened.
              */}
              <p className="mt-7 border-l-2 border-secondary pl-5 text-sm leading-7 text-primary/80">
                {highlight.outcome.paper}
              </p>

              <Link
                href={`/events/${highlight.slug}`}
                className="group mt-8 inline-flex min-h-11 items-center gap-2.5 text-xs font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-secondary"
              >
                See the consultation
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
