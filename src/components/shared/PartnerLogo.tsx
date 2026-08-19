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
    // eslint-disable-next-line @next/next/no-img-element -- partner art, unknown dimensions
    <img
      src={logo}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="max-h-14 w-auto max-w-[13rem] object-contain"
    />
  );
}
