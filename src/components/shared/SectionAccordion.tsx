"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Plus } from "lucide-react";

/**
 * Section accordion — src/components/shared/SectionAccordion.tsx
 *
 * Used by the homepage and the About page, both of which previously ran
 * every section end to end so that reaching anything meant scrolling the
 * whole organisation. Sections now stack as rows and open in place.
 *
 * Panels mount the first time they are opened and stay mounted afterwards,
 * so reopening is instant.
 *
 * They are NOT rendered up-front and hidden with the `hidden` attribute,
 * which would have been better for SEO. The coverage section embeds a
 * Leaflet map, and Leaflet measures its container on init: inside a hidden
 * element that container is 0x0, so it computed LatLng(NaN, NaN) and threw
 * the whole homepage into its error boundary. Deferring the mount is what
 * makes the map work.
 *
 * The SEO cost is real but contained — the hero and closing sections stay
 * in the markup, and every collapsed section has its own indexed page
 * (/about, /programmes, /projects, /research, /publications).
 *
 * Sections toggle independently: opening one does not close another, which
 * is what "click to open, click to close" implies.
 */

export type AccordionSection = {
  id: string;
  /** Row label. Short — the full heading lives inside the panel. */
  label: string;
  /** One line of orientation, so a closed row still says something. */
  summary: string;
  children: ReactNode;
};

export function SectionAccordion({
  items,
  label,
}: Readonly<{
  items: readonly AccordionSection[];
  /** Accessible name for the group, e.g. "Explore ClimateWatch". */
  label: string;
}>) {
  const [openIds, setOpenIds] =
    useState<readonly string[]>([]);

  /**
   * Every section that has been opened at least once. Panels are kept
   * mounted after their first open so reopening costs nothing and the
   * Leaflet map is not torn down and rebuilt each time.
   */
  const [mountedIds, setMountedIds] =
    useState<readonly string[]>([]);

  /**
   * Open whatever section the URL names.
   *
   * Two things depended on this and neither worked. The hero's scroll
   * indicator pointed at #introduction — an id that lives inside a panel, so
   * it did not exist in the document until that panel had been opened, and
   * clicking the arrow did nothing at all. And a link to a specific section
   * could not be shared, because arriving with a hash left everything shut.
   *
   * Each row carries its own id whether open or closed, so the browser
   * handles the scrolling; this only has to open the right panel once it
   * lands. Listening for hashchange as well as mount matters because
   * clicking the indicator while already on the page is not a navigation.
   */
  const openFromHash = useCallback(() => {
    const id = window.location.hash.replace("#", "");

    if (!id || !items.some((item) => item.id === id)) {
      return;
    }

    setMountedIds((current) =>
      current.includes(id) ? current : [...current, id],
    );

    setOpenIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }, [items]);

  useEffect(() => {
    /*
     * Deferred by a frame rather than called straight away. Setting state
     * synchronously inside an effect cascades an extra render, and waiting
     * also lets the browser finish its own jump to the anchor before the
     * panel expands underneath it.
     */
    const frame = window.requestAnimationFrame(openFromHash);

    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [openFromHash]);

  function toggle(id: string) {
    setMountedIds((current) =>
      current.includes(id)
        ? current
        : [...current, id],
    );

    setOpenIds((current) =>
      current.includes(id)
        ? current.filter(
            (value) => value !== id,
          )
        : [...current, id],
    );
  }

  return (
    <section
      aria-label={label}
      className="bg-background"
    >
      <div className="site-container section-shell-small">
        <div className="border-t border-border-strong">
          {items.map((item, index) => {
            const open =
              openIds.includes(item.id);

            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-trigger`;

            return (
              <div
                key={item.id}
                id={item.id}
                className="border-b border-border"
              >
                <h2>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() =>
                      toggle(item.id)
                    }
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left sm:py-9"
                  >
                    <span
                      className={[
                        "text-[0.6875rem] font-bold tracking-[0.13em] transition-colors",
                        open
                          ? "text-secondary"
                          : "text-muted-light",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className="min-w-0">
                      <span
                        className={[
                          "block font-editorial text-[clamp(1.5rem,2.6vw,2.35rem)] font-medium leading-[1.1] tracking-[-0.035em] transition-colors",
                          open
                            ? "text-secondary"
                            : "text-primary group-hover:text-secondary",
                        ].join(" ")}
                      >
                        {item.label}
                      </span>

                      <span className="mt-2 block max-w-2xl text-sm leading-7 text-muted">
                        {item.summary}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "flex size-10 shrink-0 items-center justify-center border transition-colors",
                        open
                          ? "border-secondary bg-secondary text-white"
                          : "border-border text-primary group-hover:border-secondary group-hover:text-secondary",
                      ].join(" ")}
                    >
                      <Plus
                        className={[
                          "size-4 transition-transform duration-300",
                          open
                            ? "rotate-45"
                            : "",
                        ].join(" ")}
                        strokeWidth={1.8}
                      />
                    </span>
                  </button>
                </h2>

                {/*
                  Negative margins pull the panel out to the full-bleed
                  width the section components were designed for — they
                  each bring their own site-container.
                */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="-mx-[calc(50vw-50%)] pb-4"
                >
                  {mountedIds.includes(
                    item.id,
                  )
                    ? item.children
                    : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
