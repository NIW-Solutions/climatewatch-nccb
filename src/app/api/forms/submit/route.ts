import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import {
  formsConfigured,
  getForm,
  saveSubmission,
} from "@/lib/forms/store";
import { validateSubmission } from "@/lib/forms/validate";

/**
 * Form submission — src/app/api/forms/submit/route.ts
 *
 * The only public write endpoint in the builder.
 *
 * WHAT IT REFUSES:
 *
 *   - a form that is not "open", so a draft cannot be submitted to by
 *     guessing its URL, and a closed one stops accepting immediately;
 *   - a filled honeypot field, which no person can see;
 *   - a submission that arrives faster than a human could have typed it;
 *   - anything that fails validation against the STORED definition, not the
 *     one the browser claims to have rendered.
 *
 * Answers to fields that are not on the form are dropped, so a public
 * endpoint cannot be used as free storage.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A form nobody could have read and filled in under this many milliseconds
 * was filled in by a script. Three seconds is well under a genuine
 * submission and well over an automated one.
 */
const MIN_FILL_MS = 3000;

export async function POST(
  request: Request,
) {
  if (!formsConfigured()) {
    return NextResponse.json(
      {
        error:
          "Forms are not connected yet.",
      },
      { status: 503 },
    );
  }

  let body: {
    slug?: unknown;
    answers?: unknown;
    /* Honeypot. Named to look worth filling in to a bot. */
    website?: unknown;
    startedAt?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Expected JSON." },
      { status: 400 },
    );
  }

  const slug =
    typeof body.slug === "string"
      ? body.slug
      : "";

  if (!slug) {
    return NextResponse.json(
      { error: "Which form?" },
      { status: 400 },
    );
  }

  /*
   * Both traps answer 200 with the ordinary success shape. Telling a bot it
   * was caught only teaches whoever wrote it what to change.
   */
  if (
    typeof body.website === "string" &&
    body.website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(body.startedAt);

  if (
    Number.isFinite(startedAt) &&
    Date.now() - startedAt < MIN_FILL_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  const form = await getForm(slug);

  if (!form) {
    return NextResponse.json(
      { error: "No such form." },
      { status: 404 },
    );
  }

  if (form.status !== "open") {
    return NextResponse.json(
      {
        error:
          form.status === "closed"
            ? "This form is closed."
            : "This form is not open yet.",
      },
      { status: 409 },
    );
  }

  /* A closing date closes the form without anyone remembering to. */
  if (
    form.closesOn &&
    new Date(
      `${form.closesOn}T23:59:59`,
    ).getTime() < Date.now()
  ) {
    return NextResponse.json(
      { error: "This form is closed." },
      { status: 409 },
    );
  }

  const result = validateSubmission(
    form,
    body.answers,
  );

  if (!result.ok) {
    return NextResponse.json(
      { errors: result.errors },
      { status: 422 },
    );
  }

  const now = new Date().toISOString();

  const saved = await saveSubmission({
    formSlug: slug,
    /* Timestamp first, so the sort key orders by time. */
    submissionId: `${now}#${randomUUID().slice(0, 8)}`,
    submittedAt: now,
    answers: result.answers,
    meta: {
      userAgent: (
        request.headers.get("user-agent") ?? ""
      ).slice(0, 200),
      country:
        request.headers.get(
          "cloudfront-viewer-country",
        ) ?? undefined,
    },
  });

  if (!saved) {
    return NextResponse.json(
      {
        error:
          "Could not save that. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    confirmation: form.confirmation,
  });
}
