import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import {
  formsConfigured,
  getForm,
  saveSubmission,
} from "@/lib/forms/store";
import { notifySubmission } from "@/lib/forms/notify";
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
    /* S3 object keys, keyed by field id, from /api/forms/upload. */
    files?: unknown;
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

  /*
   * Uploaded files.
   *
   * The keys are checked against the shape this server issues rather than
   * taken as given: a field that exists on the form, a file field, and a key
   * under that form and field's own prefix. Without that check a submission
   * could name any object in the bucket and have it appear in the admin as
   * though it were the applicant's own.
   */
  const files: Record<string, string> = {};

  if (
    body.files &&
    typeof body.files === "object"
  ) {
    for (const [fieldId, value] of Object.entries(
      body.files as Record<string, unknown>,
    )) {
      if (typeof value !== "string") continue;

      const field = form.fields.find(
        (f) => f.id === fieldId,
      );

      if (!field || field.type !== "file") {
        continue;
      }

      const expected = `submissions/${slug}/${fieldId}/`;

      if (
        value.startsWith(expected) &&
        !value.includes("..")
      ) {
        files[fieldId] = value;
      }
    }
  }

  /* A required file field has to have produced one. */
  const missingFile = form.fields.find(
    (f) =>
      f.type === "file" &&
      f.required &&
      !files[f.id],
  );

  if (missingFile) {
    return NextResponse.json(
      {
        errors: {
          [missingFile.id]:
            "Please attach a file.",
        },
      },
      { status: 422 },
    );
  }

  const now = new Date().toISOString();

  const submission = {
    formSlug: slug,
    /* Timestamp first, so the sort key orders by time. */
    submissionId: `${now}#${randomUUID().slice(0, 8)}`,
    submittedAt: now,
    answers: result.answers,
    ...(Object.keys(files).length
      ? { files }
      : {}),
    meta: {
      userAgent: (
        request.headers.get("user-agent") ?? ""
      ).slice(0, 200),
      country:
        request.headers.get(
          "cloudfront-viewer-country",
        ) ?? undefined,
    },
  };

  const saved =
    await saveSubmission(submission);

  if (!saved) {
    return NextResponse.json(
      {
        error:
          "Could not save that. Please try again.",
      },
      { status: 502 },
    );
  }

  /*
   * Awaited rather than fired and forgotten: on a serverless runtime the
   * function can be frozen the moment the response is returned, and a
   * dangling promise is simply never finished. notifySubmission swallows its
   * own failures, so this cannot turn a saved submission into an error.
   */
  await notifySubmission(form, submission);

  return NextResponse.json({
    ok: true,
    confirmation: form.confirmation,
  });
}
