import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EventCard } from "@/components/programmes/EventCard";
import { InView } from "@/components/motion-primitives/InView";
import { programmesContent } from "@/content/programmes";

/**
 * Event page — src/app/events/[slug]/page.tsx
 *
 * One page per scheduled event, so an event has an address of its own.
 *
 * WHY THIS EXISTS: the event also appears in the Events section of
 * /programmes, but that address drops a visitor at the top of a page about
 * three divisions and asks them to scroll. That is fine for someone browsing
 * the site and wrong for a QR code on a poster, where the first screen has
 * to be the event itself.
 *
 * The short link /cop31 redirects here — see next.config.ts. Put the short
 * one on print; it makes a sparser QR code, which scans faster and survives
 * being printed small.
 *
 * Kept generic rather than hard-coding one event: the next consultation gets
 * a page by being added to `scheduled` in src/content/programmes.ts, and a
 * short link by adding one redirect.
 */

const { events } = programmesContent;

function findEvent(slug: string) {
  return events.scheduled.find(
    (event) => event.slug === slug,
  );
}

/**
 * Only the slugs below exist. Anything else 404s at the routing layer rather
 * than rendering a page that then calls notFound() — the soft-404 problem
 * the blog routes had.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return events.scheduled.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = findEvent(slug);

  if (!event) {
    return { title: "Events" };
  }

  const title = `${event.title} — ${event.subtitle}`;

  return {
    title,
    description: event.description,
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description: event.description,
      url: `/events/${event.slug}`,
      images: [event.image],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = findEvent(slug);

  if (!event) {
    return null;
  }

  return (
    <main>
      {/* =====================================
          HEADER
          Deliberately short. Someone arriving from a QR code wants the
          poster and the date, not an introduction to the organisation.
          ===================================== */}

      <section className="border-b border-border bg-surface">
        <div className="site-container pt-32 pb-10 sm:pt-36 sm:pb-12">
          <InView>
            <Link
              href="/programmes#events"
              className="group inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              All events
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-secondary"
              />

              <p className="eyebrow text-primary">
                {event.status}
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          THE EVENT
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          {/* Already on this event's page — nothing here links to itself. */}
          <EventCard
            event={event}
            linked={false}
          />
        </div>
      </section>
    </main>
  );
}
