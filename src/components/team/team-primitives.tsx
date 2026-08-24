"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { LoadedImage } from "@/components/ui/LoadedImage";

/**
 * Navy-to-orange portrait border.
 *
 * A hard split rather than a blend: the two stops meet at 50% with nothing
 * between them, so it reads as two brand colours meeting rather than a muddy
 * transition. Applied as a 2px padded background behind the photo, which
 * gives a crisp edge at any aspect ratio without needing border-image.
 *
 * Lives here rather than in a page component because the division heads, the
 * divisional teams and the advisor and board grid all use it, and a second
 * copy of this string is a second thing to keep in step.
 */
export const PORTRAIT_BORDER =
  "linear-gradient(158deg, var(--color-primary) 0%, var(--color-primary) 50%, var(--color-secondary) 50%, var(--color-secondary) 100%)";

/**
 * Shared team primitives — src/components/team/team-primitives.tsx
 *
 * Used by the division heads, the divisional-team tiles, and the advisor and
 * board profile grid, so all three render identical portraits and icons.
 *
 * Marked "use client" because TeamPhoto needs an error handler. Importing it
 * from a server component is fine; only these small pieces ship as JS.
 */

export function initialsOf(name: string): string {
  return name
    .replace(/^(Dr|Prof|Professor|Mr|Ms|Mrs)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/* ==========================================
   TEAM PHOTO
   Renders the photograph, and falls back to
   the monogram if the file is missing or
   fails to load.

   Without this, a wrong filename leaves the
   card stuck on the loading shimmer forever,
   because LoadedImage waits for an onLoad
   event that never fires. The monogram is a
   far better failure.
   ========================================== */
export function TeamPhoto({
  src,
  name,
  sizes,
  className = "object-cover",
  compact = false,
}: Readonly<{
  src?: string;
  name: string;
  sizes: string;
  className?: string;
  compact?: boolean;
}>) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return compact ? (
      <TeamMonogramCompact name={name} />
    ) : (
      <TeamMonogram name={name} />
    );
  }

  return (
    <LoadedImage
      src={src}
      alt={name}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

/* ==========================================
   MONOGRAM
   Portrait placeholder used until a member
   photograph is supplied.
   ========================================== */
export function TeamMonogram({
  name,
}: Readonly<{
  name: string;
}>) {
  const initials = initialsOf(name);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,var(--primary)_0%,var(--primary-dark)_58%,#04162b_100%)]"
    >
      {/* Contour texture */}
      <svg
        viewBox="0 0 120 150"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.16]"
        fill="none"
      >
        <path
          d="M-10 118 C 20 96, 44 132, 70 108 S 118 92, 134 112"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <path
          d="M-10 132 C 22 110, 48 146, 74 122 S 120 106, 134 126"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <path
          d="M-10 104 C 18 82, 40 118, 66 94 S 116 78, 134 98"
          stroke="#ffffff"
          strokeWidth="1"
        />
      </svg>
      <span className="relative font-editorial text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-white/85">
        {initials}
      </span>
      <span className="absolute bottom-4 left-4 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-white/35">
        ClimateWatch
      </span>
    </div>
  );
}

/* ==========================================
   COMPACT MONOGRAM
   For the circular team tiles. Contour
   texture and wordmark are dropped — at this
   size they read as noise, not detail.
   ========================================== */
export function TeamMonogramCompact({
  name,
}: Readonly<{
  name: string;
}>) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,var(--primary)_0%,var(--primary-dark)_62%,#04162b_100%)]"
    >
      <span className="font-editorial text-[0.95rem] font-medium leading-none tracking-[-0.02em] text-white/85">
        {initialsOf(name)}
      </span>
    </div>
  );
}

/* ==========================================
   AVATAR RING
   Circular frame for the team tiles. The ring
   is split in half — navy from the logo on one
   side, orange on the other.

   The gradient is set inline rather than as a
   Tailwind arbitrary value so it does not
   depend on how the theme tokens compile. The
   fallback hexes apply only if the CSS
   variables are undefined.
   ========================================== */
export function TeamAvatarRing({
  className = "size-[4.5rem]",
  children,
}: Readonly<{
  className?: string;
  children: ReactNode;
}>) {
  return (
    <div
      className={`relative shrink-0 rounded-full p-[2px] ${className}`}
      style={{
        background:
          "conic-gradient(var(--primary, #103a6d) 0deg 180deg, var(--secondary, #e07a2f) 180deg 360deg)",
      }}
    >
      <div className="relative size-full overflow-hidden rounded-full bg-surface-muted">
        {children}
      </div>
    </div>
  );
}

/* ==========================================
   SOCIAL LINK ROW
   ========================================== */
export function TeamSocialLinks({
  name,
  email,
  linkedin,
  instagram,
  compact = false,
}: Readonly<{
  name: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  compact?: boolean;
}>) {
  if (!linkedin && !instagram && !email) {
    return null;
  }

  const box = compact
    ? "grid size-7 place-items-center border border-border-strong"
    : "grid size-9 place-items-center border border-border-strong";
  const icon = compact ? "size-3" : "size-3.5";
  const row = compact
    ? "mt-3 flex items-center gap-2"
    : "mt-5 flex items-center gap-2.5 pt-1";

  return (
    <div className={row}>
      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on LinkedIn`}
          className={`${box} !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-primary hover:!bg-primary hover:!text-white`}
        >
          <LinkedInIcon className={icon} />
        </a>
      ) : null}
      {instagram ? (
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on Instagram`}
          className={`${box} !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-secondary hover:!bg-secondary hover:!text-white`}
        >
          <InstagramIcon className={icon} />
        </a>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          aria-label={`Email ${name}`}
          className={`${box} !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-primary hover:!bg-primary hover:!text-white`}
        >
          <MailIcon className={icon} />
        </a>
      ) : null}
    </div>
  );
}

/* ==========================================
   ICONS
   ========================================== */
export function LinkedInIcon({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M5.2 7.8H1.6V19h3.6V7.8ZM3.4 2.2A2.1 2.1 0 1 0 3.4 6.4a2.1 2.1 0 0 0 0-4.2ZM19 7.5c-1.9 0-3.2 1-3.8 2V7.8h-3.5V19h3.6v-5.5c0-1.5.3-3 2.2-3 1.9 0 1.9 1.8 1.9 3.1V19H23v-6.1c0-3-0.6-5.4-4-5.4Z" />
    </svg>
  );
}

export function InstagramIcon({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.4"
        cy="6.6"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function MailIcon({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6.5 12 13l9-6.5" />
    </svg>
  );
}
