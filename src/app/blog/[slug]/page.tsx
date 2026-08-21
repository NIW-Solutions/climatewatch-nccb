import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { blogContent } from "@/content/blog";
import { siteConfig } from "@/config/site";
import type {
  BlogPost,
  BlogSegment,
} from "@/content/blog";

/**
 * A blog post at its own URL — src/app/blog/[slug]/page.tsx
 *
 * Posts used to expand in place on /blog, which meant twenty posts were one
 * indexable page with one title and one description. A post could not be
 * shared as itself, could not carry its own preview image, and could not
 * rank on its own subject.
 *
 * Each post is now prerendered at /blog/<slug> with its own metadata and
 * Article structured data. The index links here rather than unfolding, so
 * the same prose is not served at two addresses.
 */

const { posts } = blogContent;

function findPost(
  slug: string,
): BlogPost | undefined {
  return posts.find(
    (post) => post.slug === slug,
  );
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return { title: "Blog" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      authors: [post.author],
      ...(post.date
        ? { publishedTime: post.date }
        : {}),
      ...(post.image
        ? { images: [post.image] }
        : {}),
    },
  };
}

/** Renders a paragraph, keeping the author's inline links exactly as given. */
function Segments({
  segments,
}: Readonly<{
  segments: readonly BlogSegment[];
}>) {
  return (
    <>
      {segments.map((segment, index) =>
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    notFound();
  }

  /*
   * Article markup. datePublished is omitted rather than guessed when a post
   * has no recorded date — a wrong date in structured data is worse than an
   * absent one.
   */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ClimateWatch",
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.date
      ? { datePublished: post.date }
      : {}),
    ...(post.image
      ? {
          image: `${siteConfig.url}${post.image}`,
        }
      : {}),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(articleSchema),
        }}
      />

      <article className="border-b border-border bg-background">
        <div className="site-container py-20 sm:py-24 lg:py-28">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.8}
            />
            All posts
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-secondary">
              {post.topicLabel}
            </p>

            <span
              aria-hidden="true"
              className="size-1 bg-border"
            />

            <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted-light">
              {post.readingTime}
            </p>

            {post.date ? (
              <>
                <span
                  aria-hidden="true"
                  className="size-1 bg-border"
                />

                <time
                  dateTime={post.date}
                  className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-muted-light"
                >
                  {new Intl.DateTimeFormat(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  ).format(
                    new Date(post.date),
                  )}
                </time>
              </>
            ) : null}
          </div>

          <h1 className="mt-6 max-w-3xl font-editorial text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
            {post.title}
          </h1>

          <p className="mt-6 text-[0.62rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            By {post.author}
          </p>

          {post.image ? (
            <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-surface-muted">
              {/* eslint-disable-next-line @next/next/no-img-element -- author-supplied art, unknown dimensions */}
              <img
                src={post.image}
                alt=""
                className="size-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-12 max-w-2xl space-y-6">
            {post.body.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="text-[0.95rem] leading-8 text-muted"
                >
                  <Segments
                    segments={paragraph}
                  />
                </p>
              ),
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
