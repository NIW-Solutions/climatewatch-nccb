"use client";

import {
  ArrowRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { InView } from "@/components/motion-primitives/InView";
import {
  blogContent,
  type BlogTopic,
} from "@/content/blog";

type Topic = "all" | BlogTopic;

export function BlogPageContent() {
  const {
    hero,
    distinction,
    topics,
    posts,
    closing,
  } = blogContent;

  const [activeTopic, setActiveTopic] =
    useState<Topic>("all");

  /*
   * Newest first, by date. ClimateWatch publishes roughly twice a week, and
   * nobody should have to remember to paste a new entry at the top of the
   * array — getting that wrong shows the wrong post as the latest.
   *
   * Posts with no date sort last rather than first: an undated post is
   * almost certainly older than one written since the field existed.
   */
  const orderedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (activeTopic === "all") {
      return orderedPosts;
    }

    return orderedPosts.filter(
      (post) =>
        post.topic === activeTopic,
    );
  }, [activeTopic, orderedPosts]);

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="blog-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.7fr_1.6fr_0.7fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {hero.eyebrow}
                  </p>
                </div>
              </div>

              <div>
                <h1
                  id="blog-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.55rem,4vw,4.3rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              <div>
                <p className="body-copy max-w-sm">
                  {hero.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          POSTS

          Full text expands inside each card —
          see BlogPostCard.
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="flex flex-wrap items-center gap-3 border-t border-border-strong pt-6">
              {topics.map((topic) => {
                const active =
                  topic.value ===
                  activeTopic;

                return (
                  <button
                    key={topic.value}
                    type="button"
                    onClick={() =>
                      setActiveTopic(
                        topic.value as Topic,
                      )
                    }
                    aria-pressed={active}
                    className={[
                      "border px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.11em] transition-colors",

                      active
                        ? "border-primary bg-primary text-white"
                        : "border-border text-muted hover:border-primary hover:text-primary",
                    ].join(" ")}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </InView>

          {visiblePosts.length === 0 ? (
            <p className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-light">
              No posts in this topic yet.
            </p>
          ) : (
            <InView delay={0.05}>
              <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-2">
                {visiblePosts.map(
                  (post) => (
                    <BlogPostCard
                      key={post.slug}
                      post={post}
                    />
                  ),
                )}
              </div>
            </InView>
          )}
        </div>
      </section>

      {/* =====================================
          BLOG VS PUBLICATIONS
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr] lg:items-start">
              <div>
                <p className="eyebrow text-primary">
                  {distinction.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(1.75rem,2.5vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {distinction.title}
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted">
                  {
                    distinction.description
                  }
                </p>

                <Link
                  href={distinction.href}
                  className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                >
                  {distinction.linkLabel}

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          CLOSING
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-end lg:py-20">
              <div>
                <p className="eyebrow text-white/55">
                  {closing.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {closing.title}
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                  {closing.description}
                </p>
              </div>

              <div>
                <a
                  href={`mailto:${closing.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />

                  {closing.email}
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}
