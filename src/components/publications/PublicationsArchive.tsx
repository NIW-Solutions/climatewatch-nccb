"use client";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import { InView } from "@/components/motion-primitives/InView";
import {
  publicationsContent,
  type PublicationCategory,
} from "@/content/publications";

type Filter =
  | "all"
  | PublicationCategory;

type FilterOption = {
  value: Filter;
  label: string;
};

const filters: FilterOption[] = [
  {
    value: "all",
    label: "All publications",
  },
  {
    value: "publication",
    label: "Publications",
  },
  {
    value: "policy-report",
    label: "Policy reports",
  },
  {
    value: "blog",
    label: "Blogs",
  },
];

export function PublicationsArchive() {
  const {
    archive,
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
          <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p
                id="publication-archive-heading"
                className="eyebrow text-primary"
              >
                {archive.eyebrow}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                {archive.description}
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                Archive
              </p>

              <p className="mt-2 text-sm font-semibold text-primary">
                {String(items.length).padStart(
                  2,
                  "0",
                )}{" "}
                entries
              </p>
            </div>
          </div>
        </InView>

        {/* =====================================
            EDITORIAL FILTER
            ===================================== */}

        <InView className="mt-10 sm:mt-12">
          <div className="grid gap-5 border-y border-border py-5 sm:grid-cols-[auto_minmax(15rem,22rem)] sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                Filter archive
              </p>

              <p className="mt-2 text-sm font-semibold text-primary">
                {activeLabel}
              </p>
            </div>

            <div className="relative">
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
          </div>
        </InView>

        {/* =====================================
            RESULT INFORMATION
            ===================================== */}

        <div className="flex items-center justify-between gap-6 border-b border-border py-5">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            Showing
          </p>

          <p className="text-xs font-semibold text-primary">
            {activeLabel}

            <span className="ml-2 text-muted-light">
              ·{" "}
              {String(
                visibleItems.length,
              ).padStart(
                2,
                "0",
              )}
            </span>
          </p>
        </div>

        {/* =====================================
            PUBLICATION LIST
            ===================================== */}

        <div aria-live="polite">
          {visibleItems.map(
            (item, index) => (
              <InView
                key={item.slug}
                delay={index * 0.02}
                amount={0.08}
              >
                <article className="group border-b border-border">
                  <div className="grid gap-y-6 py-8 sm:py-9 lg:grid-cols-[4rem_9rem_minmax(0,1fr)_3rem] lg:items-start lg:gap-x-8">
                    {/* NUMBER */}

                    <div>
                      <span className="editorial-index">
                        {item.number}
                      </span>
                    </div>

                    {/* META */}

                    <div>
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-secondary">
                        {item.categoryLabel}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-muted">
                        {item.year}
                      </p>
                    </div>

                    {/* CONTENT */}

                    <div>
                      <h2 className="max-w-4xl font-editorial text-[clamp(1.55rem,2.2vw,2.2rem)] font-medium leading-[1.14] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
                        {item.title}
                      </h2>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                        {item.description}
                      </p>

                      {/* Mobile action */}

                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link mt-5 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary lg:hidden"
                      >
                        Open publication

                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </a>
                    </div>

                    {/* Desktop action */}

                    <div className="hidden justify-end lg:flex">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.title}`}
                        className="group/link grid size-10 place-items-center border border-border-strong !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-secondary hover:!bg-secondary hover:!text-white"
                      >
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </a>
                    </div>
                  </div>
                </article>
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
              No publications are available
              in this category.
            </p>
          </div>
        ) : null}

        {/* =====================================
            FOOTER
            ===================================== */}

        <InView className="mt-10 flex justify-end">
          <a
            href="https://linktr.ee/Climatewatch"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
          >
            View ClimateWatch resources

            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.7}
            />
          </a>
        </InView>
      </div>
    </section>
  );
}