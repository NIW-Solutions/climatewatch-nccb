"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  formatViews,
  VIEW_THRESHOLD,
} from "@/lib/views";

/**
 * View count — src/components/blog/ViewCount.tsx
 *
 * Two jobs, and which one it does depends on `record`:
 *
 *   <ViewCount slug="x" record />   on a post page: counts this read, then
 *                                   shows the new total
 *   <ViewCount slug="x" />          on a card: shows the count it is handed
 *
 * NOTHING IS RENDERED BELOW VIEW_THRESHOLD. The number shown is always the
 * real one — this only decides whether it is worth showing yet. A new post
 * reading "4 views" advertises that nobody has read it; showing a made-up
 * number instead would be worse still, so the answer is to show neither.
 *
 * A read is counted once per browser session per post. sessionStorage, not
 * localStorage: someone coming back next week is a second read, someone
 * pressing reload four times in a row is not.
 *
 * Blank during server rendering and the first client pass, so hydration
 * matches and a crawler never sees a number that depends on a fetch.
 */

const SESSION_PREFIX = "climatewatch:viewed:";

function alreadyCountedThisSession(
  slug: string,
): boolean {
  try {
    const key = SESSION_PREFIX + slug;

    if (
      window.sessionStorage.getItem(key) === "1"
    ) {
      return true;
    }

    window.sessionStorage.setItem(key, "1");

    return false;
  } catch {
    /*
     * Storage blocked. Count it — over-counting a private-window reader by
     * one is a smaller error than dropping every such reader entirely.
     */
    return false;
  }
}

export function ViewCount({
  slug,
  record = false,
  initial = null,
  className,
}: Readonly<{
  slug: string;
  /** Post pages record a read. Cards only display one. */
  record?: boolean;
  /** Known count, for cards rendered from a batch fetch. */
  initial?: number | null;
  className?: string;
}>) {
  const [views, setViews] = useState<
    number | null
  >(initial);

  useEffect(() => {
    if (!record) {
      return;
    }

    /* Leave headless browsers and crawlers out of the count. */
    if (navigator.webdriver) {
      return;
    }

    let cancelled = false;

    const counted =
      alreadyCountedThisSession(slug);

    async function run() {
      try {
        if (counted) {
          const res = await fetch(
            "/api/views",
            { cache: "no-store" },
          );

          if (!res.ok) return;

          const data = await res.json();

          if (!cancelled) {
            setViews(
              data?.views?.[slug] ?? null,
            );
          }

          return;
        }

        const res = await fetch("/api/views", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) {
          setViews(
            typeof data?.views === "number"
              ? data.views
              : null,
          );
        }
      } catch {
        /* A counter is not worth an error message. */
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [record, slug]);

  if (
    views === null ||
    views < VIEW_THRESHOLD
  ) {
    return null;
  }

  return (
    <span className={className}>
      {formatViews(views)}
    </span>
  );
}
