import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import { homeContent } from "@/content/home";

export function HomeIntroduction() {
  const { introduction } = homeContent;

  return (
    <section
      id="introduction"
      aria-labelledby="introduction-heading"
      className="overflow-hidden bg-surface"
    >
      <div className="site-container section-shell">
        {/* =====================================
            WHO WE ARE
            ===================================== */}

        <div className="content-grid gap-y-10 lg:gap-y-14">
          <InView className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-36">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {introduction.eyebrow}
                </p>
              </div>

              <p className="mt-7 max-w-xs text-sm leading-7 text-muted">
                {introduction.lead}
              </p>

              <Link
                href={introduction.action.href}
                className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-secondary"
              >
                <span className="border-b border-primary pb-1 transition-colors group-hover:border-secondary">
                  {introduction.action.label}
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </InView>

          <InView
            delay={0.05}
            className="col-span-12 lg:col-span-8 lg:col-start-5"
          >
            <h2
              id="introduction-heading"
              className="max-w-5xl font-editorial text-[clamp(2.8rem,5.2vw,5.5rem)] font-medium leading-[0.99] tracking-[-0.045em] text-primary"
            >
              {introduction.title}
            </h2>

            <div className="mt-9 grid gap-7 border-t border-border pt-8 sm:grid-cols-2 sm:gap-10 lg:mt-12 lg:pt-10">
              {introduction.paragraphs.map(
                (paragraph) => (
                  <p
                    key={paragraph}
                    className="body-copy"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </InView>
        </div>

        {/* =====================================
            IMAGE + MISSION
            IMAGE REQUIRED:
            public/images/home/home-introduction-2026-08.webp
            ===================================== */}

        <InView
          delay={0.08}
          amount={0.1}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="grid overflow-hidden bg-primary lg:grid-cols-[1.18fr_0.82fr]">
            {/* Image */}

            <div className="group relative min-h-[27rem] overflow-hidden sm:min-h-[36rem] lg:min-h-[44rem]">
              <LoadedImage
                src={introduction.image}
                alt={introduction.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.025]"
                loaderClassName="bg-primary-dark"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.04)_25%,rgba(5,22,43,0.72)_100%)]"
              />

              {introduction.imageCaption ? (
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                  <p className="max-w-xl border-t border-white/30 pt-4 text-xs leading-6 text-white/70">
                    {introduction.imageCaption}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Mission */}

            <div className="relative flex min-h-[32rem] flex-col justify-between overflow-hidden p-7 text-white sm:p-10 lg:min-h-0 lg:p-12 xl:p-14">
              {/* Editorial number */}

              <span
                aria-hidden="true"
                className="absolute -right-3 -top-7 select-none font-editorial text-[10rem] font-medium leading-none tracking-[-0.08em] text-white/[0.04] sm:text-[13rem]"
              >
                01
              </span>

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-white/55">
                    Our mission
                  </p>
                </div>

                <p className="mt-8 max-w-xl font-editorial text-[clamp(2rem,3vw,3.35rem)] font-medium leading-[1.1] tracking-[-0.035em] text-white">
                  {introduction.mission}
                </p>
              </div>

              <div className="relative z-10 mt-14 border-t border-white/20 pt-7">
                <p className="max-w-md text-sm leading-7 text-white/62">
                  From community evidence to the policy decisions
                  that shape climate resilience.
                </p>

                <Link
                  href="/about"
                  className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-secondary"
                >
                  Explore who we are

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}