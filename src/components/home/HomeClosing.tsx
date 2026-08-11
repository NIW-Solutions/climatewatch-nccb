"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { LoadedImage } from "@/components/ui/LoadedImage";
import { homeContent } from "@/content/home";

export function HomeClosing() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const reducedMotion =
    useReducedMotion();

  const { closing } =
    homeContent;

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start end",
        "end start",
      ],
    });

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        reducedMotion
          ? 1
          : 1.04,
        reducedMotion
          ? 1
          : 1.1,
      ],
    );

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        reducedMotion
          ? "0%"
          : "-2%",
        reducedMotion
          ? "0%"
          : "4%",
      ],
    );

  return (
    <section
      ref={sectionRef}
      id="closing"
      aria-labelledby="closing-heading"
      className="relative overflow-hidden bg-primary-dark text-white"
    >
      {/* =====================================
          BACKGROUND IMAGE

          IMAGE REQUIRED:
          public/images/home/home-closing.webp
          ===================================== */}

      <motion.div
        className="absolute inset-0"
        style={{
          scale: imageScale,
          y: imageY,
        }}
      >
        <LoadedImage
          src={closing.image}
          alt={closing.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          darkLoader
        />
      </motion.div>

      {/* Overlays */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-primary-dark/72"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,39,0.94)_0%,rgba(4,20,39,0.76)_46%,rgba(4,20,39,0.35)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,39,0.12)_0%,rgba(4,20,39,0.05)_45%,rgba(4,20,39,0.55)_100%)]"
      />

      {/* =====================================
          CONTENT
          ===================================== */}

      <div className="site-container relative z-10">
        <div className="flex min-h-[38rem] flex-col justify-between py-14 sm:min-h-[42rem] sm:py-16 lg:min-h-[46rem] lg:py-20">
          {/* Top rail */}

          <div className="flex items-center justify-between gap-6 border-t border-white/25 pt-5">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-secondary"
              />

              <p className="eyebrow text-white/65">
                {closing.eyebrow}
              </p>
            </div>

            <p className="hidden text-[0.6rem] font-bold uppercase tracking-[0.11em] text-white/35 sm:block">
              ClimateWatch · Pakistan
            </p>
          </div>

          {/* Main CTA */}

          <div className="max-w-4xl py-14 sm:py-16">
            <h2
              id="closing-heading"
              className="max-w-3xl font-editorial text-[clamp(2.7rem,4.8vw,5rem)] font-medium leading-[1] tracking-[-0.045em] text-white"
            >
              {closing.title}
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9">
              {closing.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={closing.primaryAction.href}
                className="button-primary group"
              >
                {closing.primaryAction.label}

                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.7}
                />
              </Link>

              <a
                href={closing.secondaryAction.href}
                className="button-light group"
              >
                <Mail
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.7}
                />

                {closing.secondaryAction.label}
              </a>
            </div>
          </div>

          {/* Bottom institutional rail */}

          <div className="grid border-t border-white/25 pt-6 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <p className="max-w-2xl text-sm leading-7 text-white/55">
              {closing.note}
            </p>

            <div className="mt-6 sm:mt-0 sm:text-right">
              <a
                href="mailto:info@climatewatch-nccb.org"
                className="text-sm font-semibold text-white transition-colors hover:text-secondary"
              >
                info@climatewatch-nccb.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}