/**
 * Navigation — src/config/navigation.ts
 *
 * Derived from `siteConfig`, which is the single source of truth for the
 * site's navigation. Previously this file kept its own hand-maintained copy
 * of the menu, so editing src/config/site.ts changed the desktop header and
 * footer but left the mobile menu untouched. Do not re-add literal menu
 * entries here — edit src/config/site.ts instead.
 */

import { siteConfig } from "@/config/site";

export type NavigationItem = Readonly<{
  label: string;
  href: string;
  description?: string;
}>;

/** Main menu. Rendered by SiteHeader (desktop) and MobileNavigation. */
export const primaryNavigation: readonly NavigationItem[] =
  siteConfig.navigation;

/** Secondary links shown alongside the main menu. */
export const utilityNavigation: readonly NavigationItem[] =
  siteConfig.utilityNavigation;
