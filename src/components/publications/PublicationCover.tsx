import { LoadedImage } from "@/components/ui/LoadedImage";

type PublicationCoverProps = Readonly<{
  title: string;
  categoryLabel: string;
  year: string;
  cover?: string;
  coverAlt?: string;
  priority?: boolean;
  sizes?: string;
}>;

/**
 * Publication cover page.
 *
 * Renders supplied cover artwork when available, and
 * otherwise composes a typographic cover from the
 * publication's own metadata so the archive stays
 * complete before artwork is produced.
 */
export function PublicationCover({
  title,
  categoryLabel,
  year,
  cover,
  coverAlt,
  priority = false,
  sizes = "(max-width: 640px) 60vw, (max-width: 1280px) 30vw, 22vw",
}: PublicationCoverProps) {
  if (cover) {
    return (
      <LoadedImage
        src={cover}
        alt={coverAlt ?? title}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,var(--primary)_0%,var(--primary-dark)_55%,#04162b_100%)] p-5 sm:p-6"
    >
      {/* Contour texture */}

      <svg
        viewBox="0 0 160 210"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
        fill="none"
      >
        <path
          d="M-10 160 C 26 132, 58 178, 92 146 S 152 124, 174 152"
          stroke="#ffffff"
          strokeWidth="1.1"
        />

        <path
          d="M-10 178 C 28 150, 62 196, 96 164 S 156 142, 174 170"
          stroke="#ffffff"
          strokeWidth="1.1"
        />

        <path
          d="M-10 142 C 24 114, 54 160, 88 128 S 148 106, 174 134"
          stroke="#ffffff"
          strokeWidth="1.1"
        />

        <path
          d="M-10 196 C 30 168, 66 214, 100 182 S 160 160, 174 188"
          stroke="#ffffff"
          strokeWidth="1.1"
        />
      </svg>

      {/* Head */}

      <div className="relative">
        <span className="block h-[3px] w-9 bg-secondary" />

        <p className="mt-4 text-[0.5rem] font-bold uppercase leading-4 tracking-[0.13em] text-white/60">
          {categoryLabel}
        </p>
      </div>

      {/* Title */}

      <p className="relative line-clamp-5 font-editorial text-[clamp(0.95rem,1.5vw,1.25rem)] font-medium leading-[1.18] tracking-[-0.025em] text-white">
        {title}
      </p>

      {/* Foot */}

      <div className="relative flex items-end justify-between gap-3 border-t border-white/20 pt-3">
        <p className="text-[0.5rem] font-bold uppercase tracking-[0.13em] text-white/70">
          ClimateWatch
        </p>

        <p className="text-[0.5rem] font-bold uppercase tracking-[0.13em] text-white/45">
          {year}
        </p>
      </div>
    </div>
  );
}
