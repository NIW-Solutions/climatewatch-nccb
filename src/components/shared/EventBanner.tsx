"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  X,
} from "lucide-react";

import {
  upcomingEvent,
  type ScheduledEvent,
} from "@/content/programmes";

/**
 * Event banner — src/components/shared/EventBanner.tsx
 *
 * A standing reminder of the next scheduled event, on every page. Mounted in
 * the root layout, unlike FirstVisitAnnouncements, which is the homepage
 * only.
 *
 * Three states, not two:
 *
 *   - expanded, the default, a small card in the corner;
 *   - collapsed, a pill showing only the short label, which the visitor can
 *     expand again;
 *   - closed, which lasts until a different event is announced.
 *
 * Collapsing is the middle option on purpose. Someone who does not want the
 * card in the corner of every page usually does not want to lose the date
 * either, and a banner whose only choices are "in your way" or "gone" gets
 * closed by everyone.
 *
 * WHERE IT DOES NOT APPEAR:
 *
 *   - /programmes, which is where the event itself lives. Following a
 *     banner to the page you are already on is a dead end;
 *   - after the event's own day has passed. `upcomingEvent()` handles that,
 *     so nobody has to remember to take this down;
 *   - during server rendering and the first client pass, so hydration
 *     matches and a crawler sees the page without it.
 *
 * It sits bottom-LEFT. The first-visit publication notice is bottom-right,
 * and at z-[90] against this one's z-[50], so on the one page where both can
 * appear the notice is on top and this is behind it.
 */

const COLLAPSED_KEY = "climatewatch:event-banner-collapsed";
const CLOSED_KEY = "climatewatch:event-banner-closed";

/** Let the page settle before anything slides in. */
const APPEAR_DELAY_MS = 2200;

function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(
  key: string,
  value: string,
): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Private browsing. The banner still works, it just forgets. */
  }
}

export function EventBanner() {
  const pathname = usePathname();

  const [event, setEvent] =
    useState<ScheduledEvent | null>(null);
  const [visible, setVisible] =
    useState(false);
  const [collapsed, setCollapsed] =
    useState(false);

  const onEventPage =
    pathname?.startsWith("/programmes") ??
    false;

  /*
    Every setState here happens inside the timeout rather than in the body of
    the effect. Setting state synchronously in an effect renders twice before
    the browser paints, and this component has nothing urgent to say — it is
    on a delay anyway.
  */
  useEffect(() => {
    if (onEventPage) {
      return;
    }

    const next = upcomingEvent();

    if (!next) {
      return;
    }

    /* Both flags are keyed on the slug, so a new event comes back. */
    if (
      readStored(CLOSED_KEY) === next.slug
    ) {
      return;
    }

    const startCollapsed =
      readStored(COLLAPSED_KEY) ===
      next.slug;

    const timer = window.setTimeout(
      () => {
        setEvent(next);
        setCollapsed(startCollapsed);
        setVisible(true);
      },
      APPEAR_DELAY_MS,
    );

    return () =>
      window.clearTimeout(timer);
  }, [onEventPage]);

  const collapse = useCallback(() => {
    setCollapsed(true);

    if (event) {
      writeStored(
        COLLAPSED_KEY,
        event.slug,
      );
    }
  }, [event]);

  const expand = useCallback(() => {
    setCollapsed(false);

    try {
      window.localStorage.removeItem(
        COLLAPSED_KEY,
      );
    } catch {
      /* See writeStored. */
    }
  }, []);

  const close = useCallback(() => {
    setVisible(false);

    if (event) {
      writeStored(
        CLOSED_KEY,
        event.slug,
      );
    }
  }, [event]);

  if (onEventPage || !visible || !event) {
    return null;
  }

  /* ---------- COLLAPSED ---------- */

  if (collapsed) {
    return (
      <div className="fixed bottom-4 left-4 z-[50] sm:bottom-6 sm:left-6">
        <button
          type="button"
          onClick={expand}
          aria-expanded="false"
          className="group inline-flex max-w-[calc(100vw-2rem)] items-center gap-2.5 border border-border bg-surface py-2.5 pl-3.5 pr-4 shadow-lg transition-colors hover:border-secondary motion-safe:animate-[noticeIn_360ms_cubic-bezier(0.22,1,0.36,1)]"
        >
          <CalendarDays
            aria-hidden="true"
            className="size-3.5 shrink-0 text-secondary"
            strokeWidth={1.8}
          />

          <span className="truncate text-[0.6875rem] font-bold uppercase tracking-[0.09em] text-primary">
            {event.bannerLabel}
          </span>
        </button>
      </div>
    );
  }

  /* ---------- EXPANDED ---------- */

  return (
    <div
      role="complementary"
      aria-label="Upcoming event"
      className="fixed bottom-4 left-4 z-[50] w-[min(20rem,calc(100vw-2rem))] sm:bottom-6 sm:left-6 motion-safe:animate-[noticeIn_420ms_cubic-bezier(0.22,1,0.36,1)]"
    >
      <div className="relative border border-border bg-surface p-5 shadow-xl">
        {/*
          Two controls, and the difference matters: collapse keeps the date
          within reach, close puts it away until the next event.
        */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-0.5">
          <button
            type="button"
            onClick={collapse}
            aria-expanded="true"
            aria-label="Collapse"
            title="Collapse"
            className="inline-flex size-7 items-center justify-center text-muted-light transition-colors hover:text-primary"
          >
            <ChevronDown
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
          </button>

          <button
            type="button"
            onClick={close}
            aria-label="Dismiss"
            title="Dismiss"
            className="inline-flex size-7 items-center justify-center text-muted-light transition-colors hover:text-primary"
          >
            <X
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
          </button>
        </div>

        <p className="pr-14 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
          Upcoming event
        </p>

        <p className="mt-3 font-editorial text-base font-medium leading-[1.2] tracking-[-0.02em] text-primary">
          {event.title}
        </p>

        <p className="mt-2.5 text-xs leading-5 text-muted">
          <time dateTime={event.dateISO}>
            {event.date}
          </time>
          {" · "}
          {event.city}
        </p>

        <p className="mt-3 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-secondary">
          {event.registration.headline}
        </p>

        <Link
          href="/programmes#events"
          className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-secondary"
        >
          See the event
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
