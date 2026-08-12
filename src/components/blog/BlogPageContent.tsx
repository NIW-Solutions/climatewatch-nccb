"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";

import { InView } from "@/components/motion-primitives/InView";
import {
  blogContent,
  type BlogPost,
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

  const featured =
    posts.find(
      (post) => post.featured,
    ) ?? posts[0];

  const listedPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.slug !== featured.slug,
      ),
    [posts, featured],
  );

  const visiblePosts = useMemo(() => {
    if (activeTopic === "all") {
      return listedPosts;
    }

    return listedPosts.filter(
      (post) =>
        post.topic === activeTopic,
    );
  }, [activeTopic, listedPosts]);

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
            <div className="content-grid gap-y-8 border-t border-primary pt-6">
              <div className="col-span-12 lg:col-span-3">
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

              <div className="col-span-12 lg:col-span-6">
                <h1
                  id="blog-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.5rem,4vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <p className="body-copy">
                  {hero.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          LEAD POST
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView amount={0.1}>
            <article className="group grid gap-8 border-b border-border pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-secondary">
                  Latest post
                </p>

                <div className="mt-8 space-y-6">
                  <LeadMeta
                    label="Topic"
                    value={
                      featured.topicLabel
                    }
                  />

                  <LeadMeta
                    label="Published"
                    value={featured.date}
                  />

                  <LeadMeta
                    label="Author"
                    value={`${featured.author} · ${featured.authorRole}`}
                  />

                  <LeadMeta
                    label="Length"
                    value={
                      featured.readingTime
                    }
                  />
                </div>
              </div>

              <div>
                <h2 className="max-w-3xl font-editorial text-[clamp(2rem,3.1vw,3.35rem)] font-medium leading-[1.05] tracking-[-0.04em] text-primary transition-colors duration-300 group-hover:text-secondary">
                  {featured.title}
                </h2>

                <p className="editorial-copy mt-7 max-w-2xl text-muted">
                  {featured.excerpt}
                </p>

                <div className="mt-9 border-t border-border pt-6">
                  <a
                    href={featured.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                  >
                    Read the post

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
        </div>
      </section>

      {/* =====================================
          POST LIST
          ===================================== */}

      <section
        aria-labelledby="blog-archive-heading"
        className="bg-surface"
      >
        <div className="site-container section-shell">
          <InView>
            <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p
                  id="blog-archive-heading"
                  className="eyebrow text-primary"
                >
                  All posts
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                  Commentary and field
                  writing from across the
                  ClimateWatch team.
                </p>
              </div>

              <div className="lg:text-right">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  Showing
                </p>

                <p className="mt-2 text-sm font-semibold text-primary">
                  {String(
                    visiblePosts.length,
                  ).padStart(2, "0")}{" "}
                  of{" "}
                  {String(
                    listedPosts.length,
                  ).padStart(2, "0")}
                </p>
              </div>
            </div>
          </InView>

          {/* Topic filter */}

          <InView className="mt-10">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-border py-5">
              {topics.map((topic) => {
                const active =
                  topic.value ===
                  activeTopic;

                return (
                  <button
                    key={topic.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setActiveTopic(
                        topic.value as Topic,
                      )
                    }
                    className={[
                      "relative py-1 text-[0.68rem] font-bold uppercase tracking-[0.09em] transition-colors",

                      active
                        ? "text-primary"
                        : "text-muted hover:text-primary",
                    ].join(" ")}
                  >
                    {topic.label}

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
          </InView>

          {/* Posts */}

          <div aria-live="polite">
            {visiblePosts.map(
              (post, index) => (
                <InView
                  key={post.slug}
                  delay={index * 0.02}
                  amount={0.08}
                >
                  <PostRow
                    post={post}
                    index={index}
                  />
                </InView>
              ),
            )}
          </div>

          {visiblePosts.length === 0 ? (
            <div className="border-b border-border py-12">
              <p className="text-sm text-muted">
                No posts are available in
                this topic yet.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* =====================================
          BLOG VS PUBLICATIONS
          ===================================== */}

      <section className="bg-background">
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

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                  {closing.description}
                </p>
              </div>

              <div className="lg:text-right">
                <a
                  href={`mailto:${closing.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />
                  Pitch a post
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}

/* ==========================================
   POST ROW
   ========================================== */

function PostRow({
  post,
  index,
}: Readonly<{
  post: BlogPost;
  index: number;
}>) {
  return (
    <article className="group border-b border-border">
      <div className="grid gap-y-5 py-8 sm:py-9 lg:grid-cols-[4rem_10rem_minmax(0,1fr)_3rem] lg:items-start lg:gap-x-8">
        {/* Index */}

        <div>
          <span className="editorial-index">
            {String(
              index + 1,
            ).padStart(2, "0")}
          </span>
        </div>

        {/* Meta */}

        <div>
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-secondary">
            {post.topicLabel}
          </p>

          <p className="mt-2 text-xs font-semibold text-muted">
            {post.date}
          </p>

          <p className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            {post.readingTime}
          </p>
        </div>

        {/* Content */}

        <div>
          <h3 className="max-w-3xl font-editorial text-[clamp(1.5rem,2.1vw,2.1rem)] font-medium leading-[1.14] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
            {post.title}
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {post.excerpt}
          </p>

          <p className="mt-5 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            {post.author}
            <span className="mx-2 text-secondary">
              ·
            </span>
            {post.authorRole}
          </p>

          <a
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="group/link mt-5 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary lg:hidden"
          >
            Read the post

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
            href={post.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Read ${post.title}`}
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
  );
}

/* ==========================================
   LEAD META
   ========================================== */

function LeadMeta({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div>
      <p className="text-[0.54rem] font-bold uppercase tracking-[0.1em] text-muted-light">
        {label}
      </p>

      <p className="mt-1.5 max-w-[15rem] text-sm font-semibold leading-6 text-primary">
        {value}
      </p>
    </div>
  );
}
