import Link from "next/link";

type SiteLogoProps = Readonly<{
  light?: boolean;
  compact?: boolean;
}>;

export function SiteLogo({
  light = false,
  compact = false,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label="ClimateWatch homepage"
      className="group inline-flex items-center gap-3 focus-visible:outline-none"
    >
      <span
        aria-hidden="true"
        className={[
          "relative grid size-10 shrink-0 place-items-center overflow-hidden",
          "border transition-colors duration-300",
          light
            ? "border-white/45 bg-white/10"
            : "border-primary/20 bg-primary",
        ].join(" ")}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-7"
        >
          <path
            d="M5 28.5L13.5 15.5L19 23L24 13L35 28.5H5Z"
            fill="currentColor"
            className="text-white"
          />

          <path
            d="M8 30.5C14 27.8 20 27.8 32 30.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={
              light
                ? "text-white/70"
                : "text-white/75"
            }
          />

          <circle
            cx="30.5"
            cy="9.5"
            r="2.5"
            fill="currentColor"
            className={
              light
                ? "text-white"
                : "text-secondary"
            }
          />
        </svg>

        <span
          aria-hidden="true"
          className={[
            "absolute inset-x-0 bottom-0 h-0.5",
            light
              ? "bg-white"
              : "bg-secondary",
          ].join(" ")}
        />
      </span>

      <span className="min-w-0">
        <span
          className={[
            "block text-[1.05rem] font-semibold leading-none tracking-[-0.045em]",
            light
              ? "text-white"
              : "text-primary",
          ].join(" ")}
        >
          ClimateWatch
        </span>

        {!compact ? (
          <span
            className={[
              "mt-1.5 hidden text-[0.56rem] font-semibold uppercase leading-[1.35] tracking-[0.11em] sm:block",
              light
                ? "text-white/60"
                : "text-muted",
            ].join(" ")}
          >
            International Climate Policy
            <br />
            Research &amp; Development
          </span>
        ) : null}
      </span>
    </Link>
  );
}