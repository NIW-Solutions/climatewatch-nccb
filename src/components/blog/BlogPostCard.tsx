"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import type {
  BlogPost,
  BlogSegment,
} from "@/content/blog";

/**
 * Blog card — src/components/blog/BlogPostCard.tsx
 *
 * The full post expands in place rather than routing to a detail page:
 * there are only a handful of posts and the whole text is short enough to
 * read inline.
 *
 * Body text is stored as segments in src/content/blog.ts so the author's
 * wording is never rebuilt in JSX. Links come from the author's own source
 * document — none are added here.
 */

function Segments({
  segments,
}: Readonly<{
  segments: readonly BlogSegment[];
}>) {
  return (
    <>
      {segments.map(
        (segment, index) =>
          typeof segment === "string" ? (
            <span key={index}>
              {segment}
            </span>
          ) : (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium !text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:!text-secondary"
            >
              {segment.text}
            </a>
          ),
      )}
    </>
  );
}

/**
 * Thumbnail.
 *
 * The frame is 16:9 to match the supplied artwork exactly. At the previous
 * 16:10 the wider art would have been cropped on the sides, and both cards
 * carry their title as part of the image — "Thirsty AI" sits hard left, so
 * a side crop would have cut into it.
 *
 * Posts without artwork still fall back to a styled panel rather than a
 * broken image; set `image` once a file exists in public/images/blog/.
 */
function Thumbnail({
  post,
}: Readonly<{ post: BlogPost }>) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- optional author-supplied art, see note above
        <img
          src={post.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-full items-center justify-center bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-dark)_100%)] p-6"
        >
          <p className="text-center text-[0.56rem] font-bold uppercase leading-5 tracking-[0.12em] text-white/55">
            {post.topicLabel}
          </p>
        </div>
      )}
    </div>
  );
}

export function BlogPostCard({
  post,
}: Readonly<{ post: BlogPost }>) {
  const [open, setOpen] =
    useState(false);
  const bodyId = useId();

  return (
    <article className="group flex flex-col border-t border-border pt-5">
      <Thumbnail post={post} />

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-[0.56rem] font-bold uppercase tracking-[0.1em] text-secondary">
          {post.topicLabel}
        </p>

        <p className="shrink-0 text-[0.65rem] font-semibold text-muted-light">
          {post.readingTime}
        </p>
      </div>

      <h3 className="mt-4 font-editorial text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-primary">
        {post.title}
      </h3>

      <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.11em] text-muted-light">
        By {post.author}
      </p>

      {!open ? (
        <p className="mt-4 text-sm leading-7 text-muted">
          {post.excerpt}
        </p>
      ) : null}

      {open ? (
        <div
          id={bodyId}
          className="mt-6 space-y-5 border-t border-border pt-6"
        >
          {post.body.map(
            (paragraph, index) => (
              <p
                key={index}
                className="text-sm leading-7 text-muted"
              >
                <Segments
                  segments={paragraph}
                />
              </p>
            ),
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-expanded={open}
        aria-controls={
          open ? bodyId : undefined
        }
        className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-secondary"
      >
        {open
          ? "Show less"
          : "Read full post"}

        <ChevronDown
          aria-hidden="true"
          className={[
            "size-3.5 transition-transform duration-300",
            open ? "rotate-180" : "",
          ].join(" ")}
          strokeWidth={1.8}
        />
      </button>
    </article>
  );
}
