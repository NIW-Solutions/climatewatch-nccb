"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/**
 * Arc motion for the official partner row —
 * src/components/shared/PartnerArc.tsx
 *
 * Each logo rises and grows as it approaches the centre of the strip,
 * peaks there, and settles back as it moves away.
 *
 * This is measured per frame rather than expressed as a CSS keyframe. The
 * effect has to key off each logo's distance from the centre of the
 * container, and CSS cannot read layout position — a keyframe version would
 * have to guess the phase from the item's index, and the peak would then
 * drift away from the centre at every viewport width except the one it was
 * tuned for.
 *
 * The cost is a requestAnimationFrame loop, kept cheap deliberately:
 *
 *   - it only runs while the strip is actually on screen, via
 *     IntersectionObserver;
 *   - it does nothing at all under prefers-reduced-motion, which matters
 *     because this is exactly the kind of drifting, scaling movement that
 *     triggers vestibular symptoms;
 *   - it writes only `transform`, so no layout or paint is invalidated, and
 *     the run widths that keep the marquee seam invisible are untouched —
 *     transforms do not affect layout.
 */

/** Peak scale at dead centre. */
const MAX_SCALE = 1.32;

/** Peak lift in pixels at dead centre. */
const MAX_LIFT = 20;

/**
 * How far from centre the effect reaches, as a fraction of half the
 * container width. Above 1 the falloff is gentler than the container edge,
 * so logos are already easing rather than snapping as they appear.
 */
const REACH = 1.15;

export function PartnerArc({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const rootRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    let frame = 0;
    let running = false;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-arc-item]",
      ),
    );

    function clear() {
      for (const item of items) {
        item.style.transform = "";
      }
    }

    function tick() {
      const box =
        root!.getBoundingClientRect();
      const centre =
        box.left + box.width / 2;
      const reach =
        (box.width / 2) * REACH;

      for (const item of items) {
        const rect =
          item.getBoundingClientRect();
        const itemCentre =
          rect.left + rect.width / 2;

        /*
         * 1 at the centre, 0 at the reach limit. Raised cosine rather than
         * a linear ramp so the rise and fall ease instead of forming a
         * visible peak.
         */
        const distance = Math.min(
          Math.abs(
            itemCentre - centre,
          ) / reach,
          1,
        );

        const weight =
          (1 +
            Math.cos(
              distance * Math.PI,
            )) /
          2;

        const scale =
          1 +
          (MAX_SCALE - 1) * weight;
        const lift =
          -MAX_LIFT * weight;

        item.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      }

      frame =
        window.requestAnimationFrame(
          tick,
        );
    }

    function start() {
      if (
        running ||
        reduceMotion.matches
      ) {
        return;
      }

      running = true;
      frame =
        window.requestAnimationFrame(
          tick,
        );
    }

    function stop() {
      if (!running) {
        return;
      }

      running = false;
      window.cancelAnimationFrame(
        frame,
      );
    }

    /* Only animate while the strip is in view. */
    const observer =
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              start();
            } else {
              stop();
              clear();
            }
          }
        },
        { threshold: 0 },
      );

    observer.observe(root);

    function handlePreferenceChange() {
      if (reduceMotion.matches) {
        stop();
        clear();
      } else {
        start();
      }
    }

    reduceMotion.addEventListener(
      "change",
      handlePreferenceChange,
    );

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener(
        "change",
        handlePreferenceChange,
      );
      stop();
      clear();
    };
  }, []);

  return (
    <div ref={rootRef}>{children}</div>
  );
}
