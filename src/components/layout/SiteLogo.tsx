import Link from "next/link";

import { ClimateWatchLogo } from "@/components/layout/ClimateWatchLogo";

type SiteLogoProps = Readonly<{
  light?: boolean;
  compact?: boolean;
}>;

/** Home-linked ClimateWatch lockup. */
export function SiteLogo({
  light = false,
  compact = false,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label="ClimateWatch homepage"
      className="group inline-flex items-center focus-visible:outline-none"
    >
      <ClimateWatchLogo
        variant={
          light ? "light" : "dark"
        }
        compact={compact}
      />
    </Link>
  );
}
