"use client";

import { useState } from "react";

/**
 * Partner logo — src/components/shared/PartnerLogo.tsx
 *
 * Shows the logo file, and falls back to the partner's name if that file
 * is missing or fails to load.
 *
 * That fallback is what lets src/content/partners.ts name a logo path for
 * every partner before the artwork exists: an entry with no uploaded file
 * renders as a wordmark rather than a broken image icon. Someone can drop
 * logos into public/images/partners/ one at a time, with no code change and
 * nothing broken in between.
 *
 * Logos sit on a white tile. The set is a mix — some arrive as transparent
 * PNGs, others as opaque JPEGs on a white ground — and on the cream ticker
 * background the opaque ones would otherwise show as a pale box. Knocking
 * white out globally was not an option: the ISSI mark has white landmasses
 * inside its globe, and a blanket threshold would have eaten them. A tile
 * treats every logo identically and damages none of them.
 *
 * A plain <img> rather than next/image: these are partner-supplied files of
 * unknown dimensions, and next/image wants width and height up front.
 */
export function PartnerLogo({
  name,
  logo,
}: Readonly<{
  name: string;
  logo?: string;
}>) {
  const [failed, setFailed] =
    useState(false);

  if (!logo || failed) {
    return (
      <span className="whitespace-nowrap font-editorial text-[clamp(1.15rem,1.9vw,1.6rem)] font-medium tracking-[-0.025em] text-primary">
        {name}
      </span>
    );
  }

  return (
    <span className="flex h-16 items-center justify-center rounded-md bg-white px-4 py-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- partner art, unknown dimensions */}
      <img
        src={logo}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="max-h-11 w-auto max-w-[11rem] object-contain"
      />
    </span>
  );
}
