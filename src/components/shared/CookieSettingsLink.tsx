"use client";

import { openCookieSettings } from "@/components/shared/CookieConsent";

/**
 * Cookie settings link — src/components/shared/CookieSettingsLink.tsx
 *
 * Reopens the consent banner from the footer.
 *
 * This exists because withdrawing consent has to be as easy as giving it.
 * A banner someone can only answer once, on their first visit, is not a
 * choice they can change their mind about — so the way back sits in the
 * footer of every page, styled and sized like the links beside it.
 *
 * A button rather than a link: it opens something on this page rather than
 * going anywhere, and a screen reader should say so.
 */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="flex min-h-11 w-fit items-center text-left text-sm text-white/65 transition-colors hover:text-white"
    >
      Cookie settings
    </button>
  );
}
