import fs from "node:fs";
import path from "node:path";

import { PartnerArc } from "@/components/shared/PartnerArc";
import { PartnerLogo } from "@/components/shared/PartnerLogo";
import {
  partnersContent,
  type Partner,
} from "@/content/partners";

/**
 * Partner tickers — src/components/shared/PartnerTicker.tsx
 *
 * Two scrolling rows: a shorter, centred "Official Partners" strip above a
 * full-width "Collaborating Partners" one. Both share this component; only
 * the width and speed differ.
 *
 * Each row renders its list twice and translates the track by exactly -50%,
 * which is what makes the loop seamless — at the end of the animation the
 * second copy sits precisely where the first began. Both copies must stay
 * identical for that to hold.
 *
 * The ends dissolve rather than being cut off. This uses mask-image, not an
 * overlaid gradient: a mask makes the logos themselves fade to transparent,
 * so the effect holds whatever sits behind the strip. An overlay would only
 * work while the backdrop stayed exactly the colour of the fade.
 *
 * Marquees are a real accessibility problem — moving content is hard to read
 * and can trigger vestibular symptoms — so both rows pause on hover and on
 * keyboard focus, and stop entirely under prefers-reduced-motion. The
 * duplicate run is hidden from assistive technology so names are not
 * announced twice.
 *
 * Logo paths are checked against the filesystem on the server, so a partner
 * whose artwork is missing renders as a wordmark from the first byte of
 * HTML rather than flashing a broken image before JavaScript runs.
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
  const { official, collaborating } =
    partnersContent;

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
            Partners
          </p>
        </div>

        <h2
          id="partners-heading"
          className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary"
        >
          {collaborating.title}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          {collaborating.description}
        </p>
      </div>

      <TickerRow
        group={official}
        /* Centred and narrower than the row below, as a distinct tier. */
        narrow
        arc
        durationClass="partner-ticker-track--slow"
      />

      <TickerRow
        group={collaborating}
        durationClass="partner-ticker-track--base"
      />
    </section>
  );
}

function TickerRow({
  group,
  narrow = false,
  arc = false,
  durationClass,
}: Readonly<{
  group: {
    eyebrow: string;
    emptyNote: string;
    partners: readonly Partner[];
  };
  narrow?: boolean;
  /** Rise and grow toward the centre of the strip. See PartnerArc. */
  arc?: boolean;
  durationClass: string;
}>) {
  if (group.partners.length === 0) {
    return (
      <div className="site-container pb-10">
        <p className="border-t border-border pt-6 text-sm leading-7 text-muted-light">
          {group.emptyNote}
        </p>
      </div>
    );
  }

  return (
    <div
      className={[
        "border-t border-border bg-surface",
        arc ? "pb-6 pt-8" : "pb-10 pt-8",
      ].join(" ")}
    >
      <p className="mb-6 text-center text-[0.56rem] font-bold uppercase tracking-[0.13em] text-muted-light">
        {group.eyebrow}
      </p>

      <ArcBoundary enabled={arc}>
      <div
        className={[
          "group relative overflow-hidden",
          narrow
            ? "mx-auto w-full max-w-3xl"
            : "w-full",
          /*
           * Headroom for the arc, and it has to be INSIDE this element:
           * overflow-hidden clips vertically as well as horizontally, so
           * padding on the wrapper outside does nothing. A logo at peak
           * needs lift (20px) plus half the growth from scaling
           * (0.32 x 64 / 2 = 10px) = 30px of clearance. py-9 gives 36px.
           */
          arc ? "py-9" : "",
        ].join(" ")}
        style={{
          /*
           * The dissolve. Fully transparent at each edge, solid across the
           * middle — the narrow row fades over a longer stretch so its
           * shorter width still reads as clouded rather than clipped.
           */
          maskImage: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) ${narrow ? "10%" : "5%"}, #000 ${narrow ? "26%" : "14%"}, #000 ${narrow ? "74%" : "86%"}, rgba(0,0,0,0.35) ${narrow ? "90%" : "95%"}, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) ${narrow ? "10%" : "5%"}, #000 ${narrow ? "26%" : "14%"}, #000 ${narrow ? "74%" : "86%"}, rgba(0,0,0,0.35) ${narrow ? "90%" : "95%"}, transparent 100%)`,
        }}
      >
        <div
          className={`partner-ticker-track ${durationClass} flex w-max items-center`}
        >
          <PartnerRun
            partners={group.partners}
            arc={arc}
          />

          <PartnerRun
            partners={group.partners}
            arc={arc}
            aria-hidden
          />
        </div>
      </div>
      </ArcBoundary>
    </div>
  );
}

/** Applies the arc only where asked, so the wide row stays static markup. */
function ArcBoundary({
  enabled,
  children,
}: Readonly<{
  enabled: boolean;
  children: React.ReactNode;
}>) {
  return enabled ? (
    <PartnerArc>{children}</PartnerArc>
  ) : (
    <>{children}</>
  );
}

function PartnerRun({
  partners,
  arc = false,
  "aria-hidden": ariaHidden,
}: Readonly<{
  partners: readonly Partner[];
  arc?: boolean;
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
          <span
            data-arc-item={
              arc ? "" : undefined
            }
            className={[
              "flex h-16 flex-col items-center justify-center",
              arc
                ? "will-change-transform"
                : "",
            ].join(" ")}
          >
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
