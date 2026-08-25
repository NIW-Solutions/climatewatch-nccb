"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowUpRight, X } from "lucide-react";

import {
  careersContent,
  openingsSignature,
} from "@/content/careers";
import { publicationsContent } from "@/content/publications";

/**
 * First-visit announcements —
 * src/components/shared/FirstVisitAnnouncements.tsx
 *
 * Two things a first-time visitor should see once and never again:
 *
 *   1. Open roles, as a dialog. Only when there are roles to announce.
 *   2. The newest publication, as a corner notice.
 *
 * They never appear together. Interrupting someone twice on arrival is the
 * behaviour that trains people to dismiss things unread, so the notice waits
 * until the dialog is gone; when there are no roles it appears on its own.
 *
 * "Seen" is stored per item, not as a visited flag:
 *
 *   - roles are keyed on a signature of the current slugs, so posting a new
 *     role re-announces it to someone who dismissed the last batch, while
 *     editing an existing role's wording does not;
 *   - the publication is keyed on its slug, so it re-announces when a newer
 *     one is published.
 *
 * Nothing renders during server rendering or the first client pass. Reading
 * localStorage happens in an effect, so the markup React hydrates matches the
 * markup the server sent, and search engines index a page with no overlay.
 *
 * If localStorage is unavailable — private browsing in some browsers, storage
 * disabled — everything here silently does nothing. That is deliberate: a
 * dialog no one can permanently dismiss is worse than no dialog.
 */

const SEEN_ROLES_KEY = "climatewatch:seen-openings";
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

function writeStored(
  key: string,
  value: string,
): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** True when storage works at all. Nothing is shown when it does not. */
function storageAvailable(): boolean {
  try {
    const probe = "climatewatch:probe";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function FirstVisitAnnouncements() {
  const [showRoles, setShowRoles] =
    useState(false);
  const [
    showPublication,
    setShowPublication,
  ] = useState(false);

  /* Pending publication announcement, held back while the dialog is up. */
  const publicationDue = useRef(false);

  const latest =
    publicationsContent.items[0];
  const openings = careersContent.openings;

  useEffect(() => {
    if (!storageAvailable()) {
      return;
    }

    const signature = openingsSignature();

    const rolesDue =
      openings.length > 0 &&
      readStored(SEEN_ROLES_KEY) !==
        signature;

    publicationDue.current =
      Boolean(latest) &&
      readStored(
        SEEN_PUBLICATION_KEY,
      ) !== latest.slug;

    const timer = window.setTimeout(
      () => {
        if (rolesDue) {
          setShowRoles(true);
        } else if (
          publicationDue.current
        ) {
          setShowPublication(true);
        }
      },
      APPEAR_DELAY_MS,
    );

    return () =>
      window.clearTimeout(timer);
  }, [latest, openings.length]);

  const dismissRoles =
    useCallback(() => {
      writeStored(
        SEEN_ROLES_KEY,
        openingsSignature(),
      );
      setShowRoles(false);

      /* The notice was waiting its turn. */
      if (publicationDue.current) {
        setShowPublication(true);
      }
    }, []);

  const dismissPublication =
    useCallback(() => {
      if (latest) {
        writeStored(
          SEEN_PUBLICATION_KEY,
          latest.slug,
        );
      }
      publicationDue.current = false;
      setShowPublication(false);
    }, [latest]);

  return (
    <>
      {showRoles ? (
        <RolesDialog
          onDismiss={dismissRoles}
        />
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
   OPEN ROLES DIALOG
   ========================================== */

function RolesDialog({
  onDismiss,
}: Readonly<{ onDismiss: () => void }>) {
  const panelRef =
    useRef<HTMLDivElement>(null);
  const closeRef =
    useRef<HTMLButtonElement>(null);

  const openings = careersContent.openings;
  const count = openings.length;

  useEffect(() => {
    const returnFocusTo =
      document.activeElement as HTMLElement | null;

    closeRef.current?.focus();

    /* Hold the page still underneath. */
    const { overflow } =
      document.body.style;
    document.body.style.overflow =
      "hidden";

    function onKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      /* Keep Tab inside the dialog. */
      const focusable =
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last =
        focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        onKeyDown,
      );
      document.body.style.overflow =
        overflow;
      returnFocusTo?.focus?.();
    };
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roles-dialog-title"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onDismiss}
        className="absolute inset-0 cursor-default bg-primary-dark/70 motion-safe:animate-[fadeIn_240ms_ease-out]"
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-lg border border-border bg-surface p-7 shadow-2xl sm:p-9 motion-safe:animate-[panelIn_320ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onDismiss}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center text-muted transition-colors hover:text-primary"
          aria-label="Close"
        >
          <X
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
        </button>

        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-secondary">
          We are hiring
        </p>

        <h2
          id="roles-dialog-title"
          className="mt-5 max-w-sm font-editorial text-[1.7rem] font-medium leading-[1.12] tracking-[-0.03em] text-primary"
        >
          {count === 1
            ? "There is an open role at ClimateWatch."
            : `There are ${count} open roles at ClimateWatch.`}
        </h2>

        <ul className="mt-6 space-y-3 border-t border-border pt-6">
          {openings.slice(0, 4).map((opening) => (
            <li
              key={opening.slug}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span className="text-sm font-medium text-primary">
                {opening.title}
              </span>

              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                {opening.commitment} · {opening.division}
              </span>
            </li>
          ))}

          {count > 4 ? (
            <li className="text-sm text-muted">
              and {count - 4} more
            </li>
          ) : null}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/careers"
            onClick={onDismiss}
            className="group inline-flex min-h-11 items-center gap-3 bg-secondary px-6 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark hover:!text-white"
          >
            See the roles
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>

          <button
            type="button"
            onClick={onDismiss}
            className="text-xs font-semibold text-muted transition-colors hover:text-primary"
          >
            Not now
          </button>
        </div>
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
          <X
            aria-hidden="true"
            className="size-3.5"
            strokeWidth={1.8}
          />
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
