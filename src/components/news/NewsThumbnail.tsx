"use client";

import { useState } from "react";

/**
 * Thumbnail for an externally-hosted news image.
 *
 * Deliberately a plain <img> rather than next/image. These come from dozens
 * of publisher CDNs on the source allowlist, and next/image rejects any
 * hostname not enumerated in `remotePatterns` — a wrong or new CDN subdomain
 * would throw at request time. A plain tag degrades to the fallback instead,
 * which is the right failure mode for third-party assets we do not control.
 *
 * Publishers also hotlink-protect fairly often, so a missing image is an
 * expected outcome, not an error worth surfacing.
 */
export function NewsThumbnail({
  src,
  alt,
}: Readonly<{
  src?: string;
  alt: string;
}>) {
  const [failed, setFailed] =
    useState(false);

  const showImage = Boolean(
    src && !failed,
  );

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- third-party CDN, see note above
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() =>
            setFailed(true)
          }
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="size-full bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-dark)_100%)]"
        >
          <div className="flex size-full items-center justify-center">
            <span className="text-[0.54rem] font-bold uppercase tracking-[0.12em] text-white/50">
              ClimateWatch
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
