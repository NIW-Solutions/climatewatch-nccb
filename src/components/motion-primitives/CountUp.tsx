"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Count-up — src/components/motion-primitives/CountUp.tsx
 *
 * Counts a number up once, when it first scrolls into view.
 *
 * Only numbers count. Stats on this site mix figures with words — "35" next
 * to "Pakistan" — so anything that is not a plain integer is rendered as-is
 * rather than mangled into a countable value.
 *
 * Three things keep it honest rather than decorative:
 *
 *   - the final value is in the server-rendered HTML, so a visitor without
 *     JavaScript, and any search engine, reads the real number;
 *   - it runs once and never resets, so scrolling back does not replay it;
 *   - it does nothing at all under prefers-reduced-motion, where a number
 *     spinning is exactly the kind of movement people turn that setting on
 *     to avoid.
 */
export function CountUp({
  value,
  durationMs = 1100,
}: Readonly<{
  /** The stat as written. Non-numeric values are passed straight through. */
  value: string;
  durationMs?: number;
}>) {
  const target = Number(value);
  const isCountable =
    value.trim() !== "" &&
    Number.isFinite(target) &&
    Number.isInteger(target);

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] =
    useState<string | null>(null);

  useEffect(() => {
    if (!isCountable) {
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    let frame = 0;
    let started = false;

    const observer =
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (
              !entry.isIntersecting ||
              started
            ) {
              continue;
            }

            started = true;
            observer.disconnect();

            const startedAt =
              performance.now();

            const step = (
              now: number,
            ) => {
              const elapsed =
                now - startedAt;
              const progress = Math.min(
                elapsed / durationMs,
                1,
              );

              /* Ease out, so it decelerates into the real figure. */
              const eased =
                1 -
                Math.pow(
                  1 - progress,
                  3,
                );

              setDisplay(
                String(
                  Math.round(
                    target * eased,
                  ),
                ),
              );

              if (progress < 1) {
                frame =
                  window.requestAnimationFrame(
                    step,
                  );
              } else {
                setDisplay(null);
              }
            };

            frame =
              window.requestAnimationFrame(
                step,
              );
          }
        },
        { threshold: 0.4 },
      );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(
        frame,
      );
    };
  }, [durationMs, isCountable, target]);

  return (
    <span
      ref={ref}
      /* The real value stays in the DOM for assistive technology; only the
         visible text is swapped while counting. */
      aria-label={value}
    >
      <span aria-hidden={display !== null}>
        {display ?? value}
      </span>
    </span>
  );
}
