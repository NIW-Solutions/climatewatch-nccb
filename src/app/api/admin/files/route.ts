import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/forms/auth";
import { listSubmissions } from "@/lib/forms/store";
import { presignDownload } from "@/lib/forms/uploads";

/**
 * File download — src/app/api/admin/files/route.ts
 *
 *   GET ?slug=&id=&field=   a five-minute link to one uploaded document
 *
 * Behind requireAdmin(), and the key is never taken from the query string.
 * It is looked up from the submission itself, so an admin session cannot be
 * used to read an arbitrary object out of the bucket by guessing at keys —
 * only the files actually attached to a submission on that form.
 *
 * Redirects rather than returning the URL, so the signed link is used
 * immediately and does not sit in the browser history or a copied address.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const params = new URL(request.url)
    .searchParams;
  const slug = params.get("slug");
  const id = params.get("id");
  const field = params.get("field");

  if (!slug || !id || !field) {
    return NextResponse.json(
      { error: "Which file?" },
      { status: 400 },
    );
  }

  const submissions =
    await listSubmissions(slug);

  const submission = submissions?.find(
    (s) => s.submissionId === id,
  );

  const key = submission?.files?.[field];

  if (!key) {
    return NextResponse.json(
      { error: "No such file." },
      { status: 404 },
    );
  }

  /* The name the applicant's file had, for the download. */
  const answer = submission?.answers?.[field];
  const filename =
    typeof answer === "string" && answer
      ? answer
      : undefined;

  const url = await presignDownload(
    key,
    filename,
  );

  if (!url) {
    return NextResponse.json(
      { error: "Could not prepare the download." },
      { status: 502 },
    );
  }

  return NextResponse.redirect(url, {
    status: 302,
    headers: { "cache-control": "no-store" },
  });
}
