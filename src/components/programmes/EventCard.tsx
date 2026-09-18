import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { programmesContent } from "@/content/programmes";

/* ==========================================
   EVENT
   ========================================== */

type ScheduledEvent =
  (typeof programmesContent.events.scheduled)[number];

export function EventCard({
  event,
  linked = true,
}: Readonly<{
  event: ScheduledEvent;
  /*
    False on the event's own page, where the poster and the title would
    otherwise link to the page you are already reading.
  */
  linked?: boolean;
}>) {
  const registrationOpen =
    event.registration.state === "open" &&
    event.registration.href.length > 0;

  return (
    <article
      id={event.slug}
      className="scroll-mt-32 border border-border bg-background"
    >
      {/*
        Event structured data. The poster carries the same facts, but a
        search engine cannot read a poster.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `${event.title} — ${event.subtitle}`,
            startDate: event.dateISO,
            eventAttendanceMode:
              "https://schema.org/MixedEventAttendanceMode",
            eventStatus:
              "https://schema.org/EventScheduled",
            description: event.description,
            location: {
              "@type": "Place",
              name: event.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: event.city,
                addressCountry: "PK",
              },
            },
            organizer: {
              "@type": "Organization",
              name: "ClimateWatch",
              url: "https://www.climatewatch-nccb.org",
            },
          }),
        }}
      />

      <div>
        {/* POSTER
            Above the text, not beside it. The frame takes the poster's own
            proportions from the content, so the same markup holds a portrait
            or a landscape one without cropping either. */}

        <InView
          amount={0.1}
          className="border-b border-border"
        >
          <div className="mx-auto w-full max-w-4xl p-5 sm:p-8">
            {(() => {
              const frame = (
                <LoadedImage
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                />
              );

              const style = {
                aspectRatio: `${event.imageWidth} / ${event.imageHeight}`,
              };

              return linked ? (
                <Link
                  href={`/events/${event.slug}`}
                  aria-label={event.title}
                  className="relative block w-full overflow-hidden bg-surface-muted"
                  style={style}
                >
                  {frame}
                </Link>
              ) : (
                <div
                  className="relative w-full overflow-hidden bg-surface-muted"
                  style={style}
                >
                  {frame}
                </div>
              );
            })()}
          </div>
        </InView>

        {/* DETAIL */}

        <div className="mx-auto max-w-4xl p-7 sm:p-10">
          <InView from="right">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
                {event.status}
              </p>

              {/*
                Says the roundtable can be attended online, at the top where
                someone deciding whether it is relevant to them will see it
                before anything else. It links to the same registration,
                because registering is how you get in.
              */}
              <a
                href={event.registration.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 border border-secondary/50 bg-secondary/[0.07] px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] !text-secondary transition-colors hover:border-secondary hover:bg-secondary hover:!text-white"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-secondary motion-safe:animate-[livePulse_1800ms_ease-in-out_infinite] group-hover:bg-white"
                />
                {event.online.label}
              </a>
            </div>

            <h3 className="mt-5 max-w-2xl font-editorial text-[clamp(1.75rem,2.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
              {linked ? (
                <Link
                  href={`/events/${event.slug}`}
                  className="!text-primary transition-colors hover:!text-secondary"
                >
                  {event.title}
                </Link>
              ) : (
                event.title
              )}
            </h3>

            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-primary/75">
              {event.subtitle}
            </p>

            {/* WHEN AND WHERE */}

            <dl className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-secondary"
                  strokeWidth={1.7}
                />

                <div>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                    Date
                  </dt>

                  <dd className="mt-1.5 text-sm font-semibold text-primary">
                    <time dateTime={event.dateISO}>
                      {event.date}
                    </time>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-secondary"
                  strokeWidth={1.7}
                />

                <div>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                    Venue
                  </dt>

                  <dd className="mt-1.5 text-sm font-semibold text-primary">
                    {event.venue}
                  </dd>
                </div>
              </div>
            </dl>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-muted">
              {event.description}
            </p>
          </InView>

          {/* REGISTRATION
              Set large and first among the blocks below the summary: it is
              the only thing on this card a reader has to come back for. */}

          <InView
            delay={0.06}
            className="mt-9"
          >
            {registrationOpen ? (
              <div className="border border-secondary bg-secondary/[0.06] p-6 sm:p-7">
                <p className="font-editorial text-[clamp(1.5rem,2.2vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.03em] text-primary">
                  {event.registration.headline}
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                  {event.registration.description}
                </p>

                {/*
                  The heartbeat is on a wrapper rather than the button, so
                  the scale animation and the button's own hover transition
                  do not fight over transform. motion-safe: means it holds
                  still for anyone who has asked for reduced motion — a
                  pulsing call to action is exactly what that setting is for.
                */}
                <span className="mt-6 inline-block motion-safe:animate-[heartbeat_2200ms_ease-in-out_infinite]">
                  <a
                    href={event.registration.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-12 items-center gap-3 bg-secondary px-7 text-xs font-bold uppercase tracking-[0.1em] !text-white shadow-lg shadow-secondary/25 transition-colors hover:!bg-secondary-dark hover:!text-white"
                  >
                    {event.registration.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </a>
                </span>

                <p className="mt-4 text-xs leading-6 text-muted-light">
                  {event.online.note}
                </p>
              </div>
            ) : (
              <div className="border-2 border-secondary bg-secondary/[0.07] p-6 sm:p-8">
                <p className="font-editorial text-[clamp(1.9rem,3.2vw,3rem)] font-semibold uppercase leading-[1.02] tracking-[-0.03em] text-secondary">
                  {event.registration.headline}
                </p>

                <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
                  {event.registration.description}
                </p>
              </div>
            )}
          </InView>

          {/* THEMATIC AREAS */}

          <InView
            delay={0.06}
            className="mt-10"
          >
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
              Thematic areas
            </p>

            <ol className="mt-5 space-y-5">
              {event.themes.map(
                (theme, index) => (
                  <li
                    key={theme.title}
                    className="flex gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 shrink-0 place-items-center border border-border-strong text-[0.6875rem] font-bold text-secondary"
                    >
                      {index + 1}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {theme.title}
                      </p>

                      <p className="mt-1.5 text-sm leading-7 text-muted">
                        {theme.description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ol>

            <div className="mt-7 border-t border-border pt-6">
              <p className="text-sm font-semibold text-primary">
                {event.format.title}
              </p>

              <p className="mt-1.5 max-w-2xl text-sm leading-7 text-muted">
                {event.format.description}
              </p>
            </div>
          </InView>

          {/* WHO IS IN THE ROOM, AND WITH WHOM */}

          <InView
            delay={0.06}
            className="mt-10 grid gap-9 border-t border-border pt-8 sm:grid-cols-2"
          >
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                Convening
              </p>

              <ul className="mt-4 space-y-2.5">
                {event.convening.map((body) => (
                  <li
                    key={body}
                    className="flex gap-3 text-sm leading-7 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1 shrink-0 bg-secondary"
                    />
                    {body}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                In partnership with
              </p>

              <ul className="mt-4 space-y-4">
                {event.partners.map(
                  (partner) => (
                    <li key={partner.shortName}>
                      <p className="text-sm font-semibold text-primary">
                        {partner.shortName}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-muted">
                        {partner.name}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </InView>
        </div>
      </div>
    </article>
  );
}
