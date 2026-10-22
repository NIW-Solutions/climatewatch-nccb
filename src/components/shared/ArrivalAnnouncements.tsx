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
 *   1. The current highlight, as a dialog. On arrival, at most once every
 *      five minutes.
 *   2. The newest publication, as a corner notice. Once per publication.
 *
 * WHY IT IS TIMED RATHER THAN REMEMBERED. It used to be gated twice: on a
 * stored "seen" flag, so anyone who dismissed it never saw it again, and on
 * `upcomingEvent()`, which returns null the day after an event — so once the
 * consultation date passed, nobody saw it at all. Both gates went, and for a
 * while it showed on every single arrival. That was worse in the other
 * direction: a dialog that returns on every reload is the thing that teaches
 * people to close it without reading.
 *
 * So it is a cooldown, not a flag. First visit shows it. Reload, navigate,
 * come back two minutes later — nothing. Come back after five minutes and it
 * shows again. The stored value carries the highlight's slug as well as the
 * time, so changing the spotlight shows the new one immediately rather than
 * making it wait out the old one's window.
 *
 * Two further limits, both deliberate: it stays quiet on the highlight's own
 * page, where it would be advertising what someone is already reading, and
 * the publication notice waits until the dialog is gone rather than stacking
 * on top of it.
 *
 * Nothing renders during server rendering or the first client pass, so the
 * markup React hydrates matches the markup the server sent and a crawler
 * indexes a page with no overlay. The highlight touches localStorage only to
 * remember when it last appeared. Where storage is
 * blocked it reads as a first visit every time, which is the honest fallback:
 * the dialog still works, it simply cannot keep its own cooldown.
 */

const SEEN_PUBLICATION_KEY = "climatewatch:seen-publication";

/** Let the page paint and settle before interrupting. */
const APPEAR_DELAY_MS = 1400;

const SEEN_HIGHLIGHT_KEY = "climatewatch:seen-highlight";

/**
 * How long the highlight stays quiet after someone has seen it.
 *
 * Showing it on every arrival was too much — ClimateWatch said so, and they
 * were right: a dialog that returns the moment you reload is the thing that
 * teaches people to close it without reading. Five minutes is the number they
 * asked for. Inside that window you can reload as often as you like and the
 * site stays out of your way; come back later and it introduces itself again.
 */
const HIGHLIGHT_COOLDOWN_MS = 5 * 60 * 1000;

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

/**
 * Stored as `slug:timestamp`, not as a plain "seen" flag.
 *
 * The slug half matters: a NEW highlight is new regardless of when the last
 * one was seen, so changing the spotlight shows it straight away rather than
 * hiding it behind the previous one's window.
 */
function highlightDue(slug: string): boolean {
  const stored = readStored(SEEN_HIGHLIGHT_KEY);

  /* Never seen, or storage is blocked. Either way, treat it as a first visit. */
  if (!stored) {
    return true;
  }

  const split = stored.lastIndexOf(":");

  if (split === -1 || stored.slice(0, split) !== slug) {
    return true;
  }

  const seenAt = Number(stored.slice(split + 1));

  if (!Number.isFinite(seenAt)) {
    return true;
  }

  const elapsed = Date.now() - seenAt;

  /*
    A negative figure means the stored time is in the future, which happens
    when a device clock is wrong or gets changed. Waiting that out could
    silence the dialog for years, so treat it as due.
  */
  return elapsed < 0 || elapsed >= HIGHLIGHT_COOLDOWN_MS;
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

    const dialogDue =
      highlight !== null && !onItsOwnPage && highlightDue(highlight.slug);

    publicationDue.current =
      Boolean(latest) && readStored(SEEN_PUBLICATION_KEY) !== latest.slug;

    const timer = window.setTimeout(() => {
      /*
          Set inside the timeout, not in the body of the effect: setting
          state synchronously there renders twice before the browser paints,
          and nothing here is urgent enough to justify that.
        */
      if (dialogDue && highlight) {
        /*
          Stamped when it appears, not when it is closed, so the five minutes
          run from the moment someone saw it. Stamping on dismissal would
          restart the clock for anyone who left a tab open for an hour.
        */
        writeStored(SEEN_HIGHLIGHT_KEY, `${highlight.slug}:${Date.now()}`);

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
      Nothing is written here: the appearance was already stamped, and the
      cooldown counts from being seen rather than from being closed.
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
