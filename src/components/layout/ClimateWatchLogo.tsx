type LogoVariant =
  | "dark"
  | "light"
  | "mono-light";

type ClimateWatchLogoProps = Readonly<{
  /**
   * `dark`       — for light backgrounds (default)
   * `light`      — gradient mark with white wordmark, for dark backgrounds
   * `mono-light` — flat white, for photography or single-colour printing
   */
  variant?: LogoVariant;

  /** Hides the descriptor line beneath the wordmark. */
  compact?: boolean;

  /**
   * Distinguishes gradient ids when the same variant is rendered
   * more than once in a single document.
   */
  instanceId?: string;

  className?: string;
}>;

/**
 * ClimateWatch lockup.
 *
 * Drawn as vector so it stays crisp at any size and can be
 * recoloured per surface, rather than filtering a raster logo.
 */
export function ClimateWatchLogo({
  variant = "dark",
  compact = false,
  instanceId,
  className = "",
}: ClimateWatchLogoProps) {
  /*
   * Gradient ids are derived from the variant so the markup stays
   * static across server and client renders. Callers rendering the
   * same variant twice should pass `instanceId` to keep ids unique.
   */
  const scope = instanceId
    ? `${variant}-${instanceId}`
    : variant;

  const markGradient = `cw-mark-${scope}`;
  const arcGradient = `cw-arc-${scope}`;

  const isLight = variant !== "dark";
  const isMono = variant === "mono-light";

  return (
    <span
      className={[
        "inline-flex items-center gap-3",
        className,
      ].join(" ")}
    >
      {/* =====================================
          MARK
          ===================================== */}

      <svg
        viewBox="0 0 48 48"
        role="img"
        aria-label="ClimateWatch"
        className="size-10 shrink-0"
      >
        <defs>
          <linearGradient
            id={markGradient}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            {isMono ? (
              <>
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                />
                <stop
                  offset="100%"
                  stopColor="#ffffff"
                />
              </>
            ) : (
              <>
                <stop
                  offset="0%"
                  stopColor="#3e6794"
                />
                <stop
                  offset="52%"
                  stopColor="#103a6d"
                />
                <stop
                  offset="100%"
                  stopColor="#04162b"
                />
              </>
            )}
          </linearGradient>

          <linearGradient
            id={arcGradient}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            {isMono ? (
              <>
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                />
                <stop
                  offset="100%"
                  stopColor="#ffffff"
                />
              </>
            ) : (
              <>
                <stop
                  offset="0%"
                  stopColor="#cb1f0e"
                />
                <stop
                  offset="100%"
                  stopColor="#f0764a"
                />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Tile */}

        <rect
          width="48"
          height="48"
          fill={`url(#${markGradient})`}
        />

        {/* Summit range */}

        <path
          d="M6 33.5 L17 17 L23.5 26.5 L29 15.5 L42 33.5 Z"
          fill="#ffffff"
          fillOpacity={
            isMono ? 0.001 : 0.95
          }
          stroke={
            isMono
              ? "#103a6d"
              : "none"
          }
          strokeWidth={isMono ? 2 : 0}
        />

        {/* Watch arc */}

        <path
          d="M9 38.5 C 17 34.5, 31 34.5, 39 38.5"
          fill="none"
          stroke={`url(#${arcGradient})`}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Observation point */}

        <circle
          cx="36.5"
          cy="11"
          r="3"
          fill={`url(#${arcGradient})`}
        />
      </svg>

      {/* =====================================
          WORDMARK
          ===================================== */}

      <span className="min-w-0">
        <span
          className={[
            "block text-[1.05rem] font-semibold leading-none tracking-[-0.045em]",

            isLight
              ? "text-white"
              : "text-primary",
          ].join(" ")}
        >
          ClimateWatch
        </span>

        {!compact ? (
          <span
            className={[
              "mt-1.5 block text-[0.56rem] font-semibold uppercase leading-[1.35] tracking-[0.11em]",

              isLight
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
    </span>
  );
}
