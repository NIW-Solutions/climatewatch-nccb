import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-primary-dark text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0"
      >
        <div className="absolute left-[55%] top-0 h-full w-px bg-white/[0.05]" />
        <div className="absolute left-[70%] top-0 h-full w-px bg-white/[0.05]" />
        <div className="absolute left-[85%] top-0 h-full w-px bg-white/[0.05]" />

        <div className="absolute -right-10 bottom-[-4%] select-none font-editorial text-[clamp(13rem,35vw,36rem)] font-medium leading-none tracking-[-0.1em] text-white/[0.025]">
          404
        </div>
      </div>

      <div className="site-container relative z-10 flex min-h-screen items-end py-16 pt-40 sm:py-20 lg:py-24">
        <div className="content-grid w-full gap-y-12">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-secondary"
              />

              <p className="eyebrow text-white/50">
                Error 404
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
              Page not found
            </p>

            <h1 className="mt-6 max-w-5xl font-editorial text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.92] tracking-[-0.055em] text-white">
              This page is not part of the current ClimateWatch archive.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg sm:leading-9">
              The address may have changed,
              the resource may have moved,
              or the page may no longer be
              available.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="button-primary group"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                  strokeWidth={1.7}
                />

                Return home
              </Link>

              <Link
                href="/research"
                className="button-light group"
              >
                Explore research

                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.7}
                />
              </Link>
            </div>

            <div className="mt-16 grid border-t border-white/20 sm:grid-cols-3">
              <NotFoundLink
                number="01"
                label="Publications"
                href="/publications"
              />

              <NotFoundLink
                number="02"
                label="Projects"
                href="/projects"
              />

              <NotFoundLink
                number="03"
                label="Contact"
                href="/contact"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1.5 bg-secondary"
      />
    </main>
  );
}

function NotFoundLink({
  number,
  label,
  href,
}: Readonly<{
  number: string;
  label: string;
  href: string;
}>) {
  return (
    <Link
      href={href}
      className="group border-b border-white/15 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0"
    >
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-secondary">
        {number}
      </span>

      <span className="mt-2 flex items-center gap-3 text-sm font-semibold text-white">
        {label}

        <ArrowRight
          aria-hidden="true"
          className="size-3.5 text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
          strokeWidth={1.7}
        />
      </span>
    </Link>
  );
}