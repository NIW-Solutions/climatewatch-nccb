"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({
  reset,
}: Readonly<{
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}>) {
  return (
    <main className="flex min-h-screen items-center bg-background">
      <div className="site-container w-full py-32">
        <div className="grid gap-10 border-t border-border pt-8 lg:grid-cols-[0.7fr_1.5fr_0.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-secondary"
              />

              <p className="eyebrow text-primary">
                Something went wrong
              </p>
            </div>
          </div>

          <div>
            <h1 className="max-w-2xl font-editorial text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary">
              We couldn&apos;t load this page.
            </h1>

            <p className="body-copy mt-6 max-w-xl">
              An unexpected error occurred.
              You can try loading the page
              again or return to the
              ClimateWatch homepage.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={reset}
                className="group inline-flex min-h-12 items-center gap-3 bg-primary px-6 text-sm font-semibold !text-white transition-colors hover:!bg-primary-dark hover:!text-white"
              >
                <RotateCcw
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-rotate-45"
                  strokeWidth={1.7}
                />

                Try again
              </button>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center border border-border-strong px-6 text-sm font-semibold !text-primary transition-colors hover:!border-primary hover:!bg-primary hover:!text-white"
              >
                Return home
              </Link>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
              ClimateWatch
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}