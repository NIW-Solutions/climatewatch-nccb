import { NextResponse } from "next/server";

import { blogContent } from "@/content/blog";
import {
  readAllViews,
  recordView,
  viewsConfigured,
} from "@/lib/views";

/**
 * Blog view counts — src/app/api/views/route.ts
 *
 *   GET  /api/views              every post's count
 *   POST /api/views  {slug}      add one, returns the new count
 *
 * A POST is only accepted for a slug that exists in src/content/blog.ts.
 * Without that check anyone could inflate the table with arbitrary keys, and
 * the number on the page would stop meaning anything.
 *
 * Returns 503 when the table is not configured, in the same spirit as
 * /api/newsletter: better to say the feature is not connected than to answer
 * 200 with a number nobody is recording.
 */

export const runtime = "nodejs";

/** Never cache a counter. */
export const dynamic = "force-dynamic";

const SLUGS = new Set(
  blogContent.posts.map((post) => post.slug),
);

export async function GET() {
  if (!viewsConfigured()) {
    return NextResponse.json(
      { configured: false, views: {} },
      { status: 503 },
    );
  }

  const views = await readAllViews();

  if (!views) {
    return NextResponse.json(
      { configured: true, views: {} },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { configured: true, views },
    {
      headers: {
        "cache-control":
          "public, max-age=60, stale-while-revalidate=300",
      },
    },
  );
}

export async function POST(
  request: Request,
) {
  if (!viewsConfigured()) {
    return NextResponse.json(
      { configured: false },
      { status: 503 },
    );
  }

  let slug: unknown;

  try {
    const body = await request.json();
    slug = (body as { slug?: unknown })?.slug;
  } catch {
    return NextResponse.json(
      { error: "Expected JSON." },
      { status: 400 },
    );
  }

  if (
    typeof slug !== "string" ||
    !SLUGS.has(slug)
  ) {
    return NextResponse.json(
      { error: "Unknown post." },
      { status: 400 },
    );
  }

  const views = await recordView(slug);

  if (views === null) {
    return NextResponse.json(
      { error: "Could not record view." },
      { status: 502 },
    );
  }

  return NextResponse.json({ views });
}
