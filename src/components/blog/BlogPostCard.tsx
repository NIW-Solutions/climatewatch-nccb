import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPost } from "@/content/blog";

/**
 * Blog card — src/components/blog/BlogPostCard.tsx
 *
 * The card links to /blog/<slug> rather than unfolding the post in place.
 *
 * The unfolding version read well but cost the thing that matters more: with
 * every post living inside /blog, twenty posts were one indexable page with
 * one title. Nothing could be shared as itself or rank on its own subject.
 * Serving the full prose here as well would now split the same text across
 * two addresses, so the card carries the excerpt and the link only.
 *
 * A server component — there is no state left to hold.
 */

/**
 * Thumbnail.
 *
 * The frame is 16:9 to match the supplied artwork exactly. At the previous
 * 16:10 the wider art would have been cropped on the sides, and both cards
 * carry their title as part of the image — "Thirsty AI" sits hard left, so
 * a side crop would have cut into it.
 *
 * Posts without artwork fall back to a styled panel rather than a broken
 * image; set `image` once a file exists in public/images/blog/.
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
  return (
    <article className="group flex flex-col border-t border-border pt-5">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col"
        aria-label={post.title}
      >
        <Thumbnail post={post} />

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.1em] text-secondary">
            {post.topicLabel}
          </p>

          <p className="shrink-0 text-[0.65rem] font-semibold text-muted-light">
            {post.readingTime}
          </p>
        </div>

        <h3 className="mt-4 font-editorial text-2xl font-medium leading-[1.12] tracking-[-0.03em] !text-primary transition-colors group-hover:!text-secondary">
          {post.title}
        </h3>
      </Link>

      <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.11em] text-muted-light">
        By {post.author}
        {post.date ? (
          <>
            {" · "}
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date(post.date))}
            </time>
          </>
        ) : null}
      </p>

      <p className="mt-4 text-sm leading-7 text-muted">
        {post.excerpt}
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="group/link mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-secondary"
      >
        Read full post
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          strokeWidth={1.8}
        />
      </Link>
    </article>
  );
}
