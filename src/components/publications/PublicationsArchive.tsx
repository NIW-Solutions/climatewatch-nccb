"use client";

import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FileText,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";

import { InView } from "@/components/motion-primitives/InView";
import { PublicationCover } from "@/components/publications/PublicationCover";
import {
  publicationsContent,
  type PublicationCategory,
  type PublicationItem,
} from "@/content/publications";

type Filter =
  | "all"
  | PublicationCategory;

export function PublicationsArchive() {
  const {
    archive,
    filters,
    items,
  } = publicationsContent;

  const [activeFilter, setActiveFilter] =
    useState<Filter>("all");

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") {
      return items;
    }

    return items.filter(
      (item) =>
        item.category === activeFilter,
    );
  }, [activeFilter, items]);

  const activeLabel =
    filters.find(
      (filter) =>
        filter.value === activeFilter,
    )?.label ?? "All publications";

  return (
    <section
      aria-labelledby="publication-archive-heading"
      className="bg-surface"
    >
      <div className="site-container section-shell">
        {/* =====================================
            ARCHIVE HEADER
            ===================================== */}

        <InView>
          <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
            <div>
              <p
                id="publication-archive-heading"
                className="eyebrow text-primary"
              >
                {archive.eyebrow}
              </p>
            </div>

            <div>
              <h2 className="max-w-xl font-editorial text-[clamp(1.9rem,2.8vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                {archive.title}
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-muted">
                {archive.description}
              </p>
            </div>
          </div>
        </InView>

        {/* =====================================
            FILTER
            ===================================== */}

        <InView className="mt-10 sm:mt-12">
          <div className="grid gap-5 border-y border-border py-5 sm:grid-cols-[auto_minmax(15rem,22rem)] sm:items-center sm:justify-between">
            {/* Desktop filter tabs */}

            <div className="hidden flex-wrap items-center gap-x-7 gap-y-3 lg:flex">
              {filters.map((filter) => {
                const active =
                  filter.value ===
                  activeFilter;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setActiveFilter(
                        filter.value as Filter,
                      )
                    }
                    className={[
                      "relative py-1 text-[0.68rem] font-bold uppercase tracking-[0.09em] transition-colors",

                      active
                        ? "text-primary"
                        : "text-muted hover:text-primary",
                    ].join(" ")}
                  >
                    {filter.label}

                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-x-0 -bottom-0.5 h-[2px] bg-secondary transition-transform duration-300",

                        active
                          ? "scale-x-100"
                          : "scale-x-0",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile / tablet select */}

            <div className="lg:hidden">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                Filter archive
              </p>

              <p className="mt-2 text-sm font-semibold text-primary">
                {activeLabel}
              </p>
            </div>

            <div className="relative lg:hidden">
              <label
                htmlFor="publication-filter"
                className="sr-only"
              >
                Filter publications
              </label>

              <select
                id="publication-filter"
                value={activeFilter}
                onChange={(event) =>
                  setActiveFilter(
                    event.target
                      .value as Filter,
                  )
                }
                className="h-12 w-full appearance-none border border-border-strong bg-background px-4 pr-12 text-sm font-semibold !text-primary outline-none transition-[border-color,background-color] duration-200 hover:border-primary focus:border-primary"
              >
                {filters.map(
                  (filter) => (
                    <option
                      key={filter.value}
                      value={filter.value}
                    >
                      {filter.label}
                    </option>
                  ),
                )}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 grid w-12 place-items-center border-l border-border">
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 text-primary"
                  strokeWidth={1.7}
                />
              </div>
            </div>

            {/* Result count */}

            <div className="hidden lg:block lg:text-right">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                Showing
              </p>

              <p className="mt-2 text-sm font-semibold text-primary">
                {String(
                  visibleItems.length,
                ).padStart(2, "0")}{" "}
                of{" "}
                {String(
                  items.length,
                ).padStart(2, "0")}
              </p>
            </div>
          </div>
        </InView>

        {/* =====================================
            COVER GRID
            ===================================== */}

        <div
          aria-live="polite"
          className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visibleItems.map(
            (item, index) => (
              <InView
                key={item.slug}
                delay={Math.min(index, 5) * 0.07}
                amount={0.08}
              >
                <PublicationCard
                  item={item}
                />
              </InView>
            ),
          )}
        </div>

        {/* =====================================
            EMPTY STATE
            ===================================== */}

        {visibleItems.length === 0 ? (
          <div className="border-b border-border py-12">
            <p className="text-sm text-muted">
              No publications are
              available in this
              category.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ==========================================
   PUBLICATION CARD

   The cover and the title both open the
   publication's reader page, where the
   document can be read, shared or
   downloaded.
   ========================================== */

function PublicationCard({
  item,
}: Readonly<{
  item: PublicationItem;
}>) {
  const href = `/publications/${item.slug}`;

  return (
    <article className="group flex h-full flex-col">
      {/* =====================================
          COVER PAGE
          ===================================== */}

      <Link
        href={href}
        aria-label={`Read ${item.title}`}
        className="relative block aspect-[3/4] overflow-hidden bg-primary-dark shadow-[0_18px_40px_rgba(8,29,25,0.10)] transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <PublicationCover
          title={item.title}
          categoryLabel={
            item.categoryLabel
          }
          year={item.year}
          cover={item.cover}
          coverAlt={item.coverAlt}
        />

        {/* Read affordance */}

        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-primary-dark/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2.5 border border-white/40 bg-white/10 px-4 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            <BookOpen
              className="size-3.5"
              strokeWidth={1.8}
            />
            {item.forthcoming
              ? "Forthcoming"
              : "Read publication"}
          </span>
        </span>
      </Link>

      {/* =====================================
          DETAILS
          ===================================== */}

      <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
            {item.categoryLabel}
          </p>

          <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            {item.date}
          </p>
        </div>

        <h3 className="mt-3 font-editorial text-[1.25rem] font-medium leading-[1.16] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
          <Link
            href={href}
            className="!text-inherit"
          >
            {item.title}
          </Link>
        </h3>

        {item.subtitle ? (
          <p className="mt-2.5 text-xs font-semibold leading-6 text-primary/65">
            {item.subtitle}
          </p>
        ) : null}

        {item.authors ? (
          <p className="mt-2 text-[0.7rem] leading-5 text-muted-light">
            {item.authors.join(", ")}
          </p>
        ) : null}

        <p className="mt-3 text-xs leading-6 text-muted">
          {item.description}
        </p>

        {/* Topics */}

        <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
          {item.topics.map((topic) => (
            <span
              key={topic}
              className="border border-border px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.1em] text-muted"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* File actions */}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-4">
          {item.pdf ? (
            <a
              href={item.pdf}
              download
              className="group/pdf inline-flex items-center gap-2 text-xs font-semibold !text-primary transition-colors hover:!text-secondary"
            >
              <FileText
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.7}
              />
              PDF
              {item.pdfSize ? (
                <span className="font-normal text-muted-light">
                  {item.pdfSize}
                </span>
              ) : null}
            </a>
          ) : (
            <span className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
              Forthcoming
            </span>
          )}

          {item.pages ? (
            <span className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
              {item.pages}
            </span>
          ) : null}

          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group/src ml-auto inline-flex items-center gap-1.5 text-[0.56rem] font-bold uppercase tracking-[0.11em] !text-muted transition-colors hover:!text-secondary"
            >
              Source

              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover/src:-translate-y-0.5 group-hover/src:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
