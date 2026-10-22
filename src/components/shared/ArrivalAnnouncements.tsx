"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { currentHighlight, type ScheduledEvent } from "@/content/programmes";
import { publicationsContent } from "@/content/publications";

/**
 * Arrival announcements —
 * src/components/shared/ArrivalAnnouncements.tsx
 *
 * Two things a visitor sees on arrival:
 *
 *   1. The current highlight, as a dialog. Every arrival, not once.
 *   2. The newest publication, as a corner notice. Once per publication.
 *
 * WHY THE HIGHLIGHT REPEATS. It used to be stored as seen, keyed on the
 * event slug, and it was also gated behind `upcomingEvent()`, which returns
 * null the day after an event. Between the two, the dialog looked broken:
 * anyone who had dismissed it once never saw it again, and once the
 * consultation date passed nobody saw it at all. ClimateWatch asked for it
 * on every arrival — close the tab, come back two seconds later, it shows.
 * So nothing about the highlight is remembered, and it is driven by
 * `currentHighlight()`, which is a named slug rather than a date.
 *
 * The cost is real and worth stating: a dialog on every arrival is an
 * interruption every arrival. It is held to one — the publication notice
 * waits until the dialog is gone rather than stacking on top of it — and
 * it is suppressed on the highlight's own page, where it would be showing
 * someone what they are already looking at.
 *
 * The publication notice is still remembered, because "newest publication"
 * is news exactly once.
 *
 * Nothing renders during server rendering or the first client pass, so the
 * markup React hydrates matches the markup the server sent and a crawler
 * indexes a page with no overlay. The highlight no longer needs
 * localStorage at all, so it still appears where storage is blocked; the
 * publication notice silently does nothing there, since a notice no one can
 * dismiss for good is worse than no notice.
 */

const SEEN_PUBLICATION_KEY = "climatewatch:seen-publication";

/** Let the page paint and settle before interrupting. */
const APPEAR_DELAY_MS = 1400;

function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Private browsing. The notice returns next time; nothing breaks. */
  }
}

export function ArrivalAnnouncements() {
  const [showEvent, setShowEvent] = useState(false);

  /* Resolved in an effect so the server and the first client pass agree. */
  const [event, setEvent] = useState<ScheduledEvent | null>(null);
  const [showPublication, setShowPublication] = useState(false);

  /* Pending publication announcement, held back while the dialog is up. */
  const publicationDue = useRef(false);

  const pathname = usePathname();

  const latest = publicationsContent.items[0];

  useEffect(() => {
    const highlight = currentHighlight();

    /*
      Not on the page it is about. Someone who followed a link to the
      consultation does not need a dialog telling them about it.
    */
    const onItsOwnPage =
      highlight !== null && pathname === `/events/${highlight.slug}`;

    const highlightDue = highlight !== null && !onItsOwnPage;

    publicationDue.current =
      Boolean(latest) && readStored(SEEN_PUBLICATION_KEY) !== latest.slug;

    const timer = window.setTimeout(() => {
      /*
          Set inside the timeout, not in the body of the effect: setting
          state synchronously there renders twice before the browser paints,
          and nothing here is urgent enough to justify that.
        */
      if (highlightDue) {
        setEvent(highlight);
        setShowEvent(true);
      } else if (publicationDue.current) {
        setShowPublication(true);
      }
    }, APPEAR_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [latest, pathname]);

  const dismissEvent = useCallback(() => {
    /*
        Deliberately not recorded. The highlight is meant to return on the
        next arrival, so there is nothing to write down.
      */
    setShowEvent(false);

    /* The notice was waiting its turn. */
    if (publicationDue.current) {
      setShowPublication(true);
    }
  }, []);

  const dismissPublication = useCallback(() => {
    if (latest) {
      writeStored(SEEN_PUBLICATION_KEY, latest.slug);
    }
    publicationDue.current = false;
    setShowPublication(false);
  }, [latest]);

  return (
    <>
      {showEvent && event ? (
        <EventDialog event={event} onDismiss={dismissEvent} />
      ) : null}

      {showPublication && latest ? (
        <PublicationNotice
          slug={latest.slug}
          title={latest.title}
          date={latest.date}
          onDismiss={dismissPublication}
        />
      ) : null}
    </>
  );
}

/* ==========================================
   EVENT DIALOG
   ========================================== */

function EventDialog({
  event,
  onDismiss,
}: Readonly<{
  event: ScheduledEvent;
  onDismiss: () => void;
}>) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const returnFocusTo = document.activeElement as HTMLElement | null;

    closeRef.current?.focus();

    /* Hold the page still underneath. */
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      /* Keep Tab inside the dialog. */
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      returnFocusTo?.focus?.();
    };
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-dialog-title"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onDismiss}
        className="fixed inset-0 cursor-default bg-primary-dark/80 motion-safe:animate-[fadeIn_240ms_ease-out]"
      />

      {/*
        Centred with my-auto rather than items-center, for the reason the
        profile dialog was fixed: centring a flex child taller than its
        scrolling container puts the top of it out of reach. On a short
        laptop screen a tall image is exactly that child.
      */}
      {/*
        Sized from the image rather than the panel: w-fit lets the card take
        the image's own width, and the max-height below keeps a tall image
        inside a short laptop screen without letterboxing it. An earlier
        attempt put the arithmetic in the width — calc(100vh-7rem)*0.758 —
        which is invalid CSS, because the multiplication has to be inside
        the calc(). Browsers drop a rule like that silently.
      */}
      <div
        ref={panelRef}
        className="relative my-auto w-fit max-w-full motion-safe:animate-[panelIn_320ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <h2 id="event-dialog-title" className="sr-only">
          {event.title} — {event.subtitle}
        </h2>

        {/*
          The picture is the link. Someone who taps it expects to go to
          the thing it advertises, so the whole image goes to the event page
          rather than hiding the action behind a small button underneath.
        */}
        <Link
          href={`/events/${event.slug}`}
          onClick={onDismiss}
          className="group block bg-surface shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed known dimensions, and next/image's fill would need a sized parent inside a height-constrained dialog */}
          <img
            src={event.image}
            alt={event.imageAlt}
            width={event.imageWidth}
            height={event.imageHeight}
            className="block max-h-[calc(100vh-11rem)] w-auto max-w-[min(60rem,100%)]"
          />

          <span className="flex items-center justify-between gap-3 border-t border-border bg-surface px-5 py-4 text-xs font-bold uppercase tracking-[0.1em] text-primary transition-colors group-hover:text-secondary">
            See what came of it
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </span>
        </Link>

        {/*
          Sits on the overlay, outside the picture, so it never covers the
          artwork and is obvious against the dimmed page.
        */}
        <button
          ref={closeRef}
          type="button"
          onClick={onDismiss}
          aria-label="Close"
          className="absolute -right-2 -top-2 inline-flex size-10 items-center justify-center border border-border bg-surface text-primary shadow-lg transition-colors hover:bg-primary hover:text-white sm:-right-4 sm:-top-4"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.9} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   NEW PUBLICATION NOTICE
   ========================================== */

function PublicationNotice({
  slug,
  title,
  date,
  onDismiss,
}: Readonly<{
  slug: string;
  title: string;
  date: string;
  onDismiss: () => void;
}>) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm motion-safe:animate-[noticeIn_420ms_cubic-bezier(0.22,1,0.36,1)]"
    >
      <div className="relative border border-border bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center text-muted-light transition-colors hover:text-primary"
          aria-label="Dismiss"
        >
          <X aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        </button>

        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-secondary">
          New publication · {date}
        </p>

        <p className="mt-3 max-w-[26ch] pr-6 font-editorial text-lg font-medium leading-[1.2] tracking-[-0.02em] text-primary">
          {title}
        </p>

        <Link
          href={`/publications/${slug}`}
          onClick={onDismiss}
          className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-secondary"
        >
          Read it
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </div>
  );
}
