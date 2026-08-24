"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import Link from "next/link";
import { useRef } from "react";

import { LoadedImage } from "@/components/ui/LoadedImage";
import { homeContent } from "@/content/home";

export function HomeHero() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const reducedMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end start",
      ],
    });

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        1,
        reducedMotion
          ? 1
          : 1.035,
      ],
    );

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        "0%",
        reducedMotion
          ? "0%"
          : "3%",
      ],
    );

  const contentY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        "0%",
        reducedMotion
          ? "0%"
          : "6%",
      ],
    );

  const contentOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.72],
      [1, 0.18],
    );

  const { hero } =
    homeContent;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-heading"
      className="cinematic-section relative h-[100svh] min-h-[46rem] overflow-hidden sm:min-h-[50rem] lg:min-h-[52rem]"
    >
      {/* =====================================
          MOBILE HERO IMAGE
          ===================================== */}

      <motion.div
        className="cinematic-media sm:hidden"
        style={{
          scale: imageScale,
          y: imageY,
        }}
      >
        <LoadedImage
          src="/images/home/home-hero-mobile-2026-08.webp"
          alt={hero.imageAlt}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="hero-drift object-cover object-center"
          loaderClassName="bg-primary-dark"
        />
      </motion.div>

      {/* =====================================
          TABLET / DESKTOP HERO IMAGE
          ===================================== */}

      <motion.div
        className="cinematic-media hidden sm:block"
        style={{
          scale: imageScale,
          y: imageY,
        }}
      >
        <LoadedImage
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="hero-drift object-cover object-center"
          loaderClassName="bg-primary-dark"
        />
      </motion.div>

      {/* =====================================
          PHOTOGRAPHIC TREATMENT
          ===================================== */}

      <div className="cinematic-overlay" />

      <div className="cinematic-vignette" />

      {/* Readability */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,18,36,0.68)_0%,rgba(4,18,36,0.42)_60%,rgba(4,18,36,0.18)_100%)] sm:bg-[linear-gradient(90deg,rgba(4,18,36,0.80)_0%,rgba(4,18,36,0.55)_42%,rgba(4,18,36,0.18)_72%,rgba(4,18,36,0.08)_100%)]"
      />

      {/* Vertical depth */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,36,0.14)_0%,transparent_30%,rgba(4,18,36,0.18)_68%,rgba(4,18,36,0.74)_100%)] sm:bg-[linear-gradient(180deg,rgba(4,18,36,0.18)_0%,transparent_32%,rgba(4,18,36,0.22)_72%,rgba(4,18,36,0.72)_100%)]"
      />

      {/* Editorial lines */}

      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
      >
        <span className="absolute left-[58%] top-0 h-full w-px bg-white/[0.055]" />

        <span className="absolute left-[73%] top-0 h-full w-px bg-white/[0.055]" />

        <span className="absolute left-[88%] top-0 h-full w-px bg-white/[0.055]" />
      </div>

      {/* =====================================
          MAIN CONTENT
          ===================================== */}

      <div className="site-container relative z-10 flex h-full min-h-[46rem] flex-col justify-end pt-28 sm:min-h-[50rem] sm:pt-40 lg:min-h-[52rem]">
        <motion.div
          className="max-w-5xl pb-8 sm:pb-12 lg:pb-14"
          style={{
            y: contentY,
            opacity:
              contentOpacity,
          }}
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 26,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          {/* =====================================
              EYEBROW
              Hidden on mobile
              ===================================== */}

          <div className="hidden items-center gap-4 sm:flex">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-secondary"
            />

            <p className="eyebrow text-white/72">
              {hero.eyebrow}
            </p>
          </div>

          {/* Heading */}

          <h1
            id="home-heading"
            className="max-w-[12ch] text-[clamp(3rem,13vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:mt-7 sm:text-[clamp(3.8rem,8vw,6rem)] lg:text-[clamp(4.8rem,7vw,7.35rem)]"
          >
            Evidence from where
            the climate{" "}

            <span className="text-white/68">
              impacts land.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-3xl text-[0.95rem] leading-7 text-white/75 sm:mt-8 sm:text-lg sm:leading-9">
            {hero.description}
          </p>

          {/* Actions */}

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <Link
              href={
                hero
                  .primaryAction
                  .href
              }
              className="button-primary group"
            >
              {
                hero
                  .primaryAction
                  .label
              }

              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.8}
              />
            </Link>

            <Link
              href={
                hero
                  .secondaryAction
                  .href
              }
              className="button-light group"
            >
              {
                hero
                  .secondaryAction
                  .label
              }

              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </motion.div>

        {/* =====================================
            INSTITUTIONAL PROFILE
            ===================================== */}

        <div className="border-t border-white/25 bg-primary-dark/40 backdrop-blur-[6px]">
          <div className="grid lg:grid-cols-[1.15fr_2.85fr]">
            <div className="border-b border-white/18 px-4 py-4 sm:px-6 sm:py-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-7 xl:px-9">
              <p className="max-w-md text-[0.78rem] font-medium leading-6 text-white/72 sm:text-[0.95rem] sm:leading-7">
                {
                  hero
                    .institutionalStatement
                }
              </p>
            </div>

            <div className="grid grid-cols-3">
              {hero.facts.map(
                (
                  fact,
                  index,
                ) => (
                  <div
                    key={
                      fact.label
                    }
                    className={[
                      "min-w-0 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7 xl:px-9",

                      index > 0
                        ? "border-l border-white/18"
                        : "",
                    ].join(" ")}
                  >
                    <p className="text-[0.48rem] font-bold uppercase leading-4 tracking-[0.08em] text-white/42 sm:text-[0.61rem] sm:tracking-[0.12em]">
                      {
                        fact.label
                      }
                    </p>

                    <p className="mt-2 max-w-[14rem] text-[0.68rem] font-semibold leading-5 text-white sm:mt-2.5 sm:text-[0.95rem] sm:leading-6">
                      {
                        fact.value
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          SCROLL INDICATOR
          ===================================== */}

      <a
        href="#introduction"
        aria-label="Continue to introduction"
        className="group absolute right-[var(--page-gutter)] top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center border border-white/30 bg-white/[0.07] !text-white backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-white hover:bg-white hover:!text-primary xl:grid"
      >
        <ArrowDown
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-y-1"
          strokeWidth={1.7}
        />
      </a>

      {/* =====================================
          IMAGE CAPTION
          ===================================== */}

      {hero.imageCaption ? (
        <div className="absolute right-[var(--page-gutter)] top-[8.5rem] z-20 hidden max-w-[15rem] text-right xl:block">
          <p className="text-[0.65rem] leading-5 text-white/40">
            {
              hero.imageCaption
            }
          </p>
        </div>
      ) : null}
    </section>
  );
}