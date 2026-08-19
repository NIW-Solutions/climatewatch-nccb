import fs from "node:fs";
import path from "node:path";

import { PartnerLogo } from "@/components/shared/PartnerLogo";
import {
  partnersContent,
  type Partner,
} from "@/content/partners";

/**
 * Partner ticker — src/components/shared/PartnerTicker.tsx
 *
 * A continuously scrolling row of partner organisations.
 *
 * The list is rendered twice and the track is translated by exactly -50%,
 * which is what makes the loop seamless: at the end of the animation the
 * second copy sits precisely where the first started, so there is no jump.
 * Both copies must stay identical for that to hold.
 *
 * Marquees are a genuine accessibility problem — moving text is hard to
 * read and can trigger vestibular symptoms — so the animation pauses on
 * hover and on keyboard focus, and stops entirely under
 * prefers-reduced-motion. The duplicate copy is hidden from assistive
 * technology so names are not announced twice.
 *
 * Logo paths are checked against the filesystem here, on the server, so a
 * partner whose artwork has not been uploaded yet is rendered as a wordmark
 * from the very first byte of HTML. Relying on the client-side onError
 * fallback alone meant a broken-image icon flashed before JavaScript ran,
 * and showed permanently to anyone without it.
 *
 * The strip itself is white rather than the site's cream. Most partner logos
 * arrive as opaque files on a white ground, and on cream every one of them
 * showed as a pale rectangle. A white strip means those backgrounds simply
 * disappear, so no logo has to be cut out to look right.
 */

/** True when the referenced file actually exists in public/. */
function logoExists(
  logo: string | undefined,
): boolean {
  if (!logo) {
    return false;
  }

  return fs.existsSync(
    path.join(
      process.cwd(),
      "public",
      logo,
    ),
  );
}

export function PartnerTicker() {
  const {
    eyebrow,
    title,
    description,
    emptyNote,
    partners,
  } = partnersContent;

  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-border bg-background"
    >
      <div className="site-container section-shell-small">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-secondary"
          />

          <p className="eyebrow text-primary">
            {eyebrow}
          </p>
        </div>

        <h2
          id="partners-heading"
          className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary"
        >
          {title}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          {description}
        </p>
      </div>

      {partners.length === 0 ? (
        <div className="site-container pb-14">
          <p className="border-t border-border pt-6 text-sm leading-7 text-muted-light">
            {emptyNote}
          </p>
        </div>
      ) : (
        <div className="group relative overflow-hidden border-t border-border bg-surface py-12">
          {/* Edge fades, so names enter and leave rather than being cut. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--color-surface),transparent)] sm:w-28"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--color-surface),transparent)] sm:w-28"
          />

          <div className="partner-ticker-track flex w-max items-center">
            <PartnerRun partners={partners} />

            <PartnerRun
              partners={partners}
              aria-hidden
            />
          </div>
        </div>
      )}
    </section>
  );
}

function PartnerRun({
  partners,
  "aria-hidden": ariaHidden,
}: Readonly<{
  partners: readonly Partner[];
  "aria-hidden"?: boolean;
}>) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {partners.map((partner) => {
        /*
         * Fixed-height slot whether or not a logo file exists yet, so
         * uploading artwork later cannot shift the row or change the loop
         * width — that width is what keeps the -50% seam invisible.
         */
        const body = (
          <span className="flex h-16 flex-col items-center justify-center">
            <PartnerLogo
              name={partner.name}
              logo={
                logoExists(partner.logo)
                  ? partner.logo
                  : undefined
              }
            />

            {partner.detail ? (
              <span className="mt-1 block max-w-xs whitespace-normal text-center text-xs leading-5 text-muted-light">
                {partner.detail}
              </span>
            ) : null}
          </span>
        );

        return (
          <li
            key={partner.name}
            className="flex items-center"
          >
            {partner.href ? (
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${partner.name} website`}
                className="block px-8 transition-opacity hover:opacity-70 sm:px-12"
              >
                {body}
              </a>
            ) : (
              <span className="block px-8 sm:px-12">
                {body}
              </span>
            )}

            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 bg-secondary"
            />
          </li>
        );
      })}
    </ul>
  );
}
