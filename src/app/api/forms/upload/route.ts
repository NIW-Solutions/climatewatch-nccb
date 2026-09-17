import { NextResponse } from "next/server";

import { getForm } from "@/lib/forms/store";
import {
  extensionOf,
  MAX_UPLOAD_BYTES,
  presignUpload,
  uploadsConfigured,
} from "@/lib/forms/uploads";

/**
 * Upload authorisation — src/app/api/forms/upload/route.ts
 *
 * Hands out one presigned S3 PUT, and only when every one of these holds:
 *
 *   - uploads are configured;
 *   - the form exists and is OPEN;
 *   - the field named is a "file" field ON THAT FORM;
 *   - the extension is one of the document types we accept;
 *   - the size is within the limit.
 *
 * Without the field check this would be an open file-hosting endpoint for
 * anyone on the internet, which is how a small charity's S3 bill becomes a
 * malware distribution story.
 *
 * The signature encodes the content type and the exact byte length, so the
 * URL that comes back cannot be reused to put something else in the bucket.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
) {
  if (!uploadsConfigured()) {
    return NextResponse.json(
      {
        error:
          "File uploads are not switched on.",
      },
      { status: 503 },
    );
  }

  let body: {
    slug?: unknown;
    fieldId?: unknown;
    filename?: unknown;
    size?: unknown;
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
  const fieldId =
    typeof body.fieldId === "string"
      ? body.fieldId
      : "";
  const filename =
    typeof body.filename === "string"
      ? body.filename
      : "";
  const size = Number(body.size);

  if (!slug || !fieldId || !filename) {
    return NextResponse.json(
      { error: "Missing details." },
      { status: 400 },
    );
  }

  if (
    !Number.isFinite(size) ||
    size <= 0 ||
    size > MAX_UPLOAD_BYTES
  ) {
    return NextResponse.json(
      {
        error: `Files must be under ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))} MB.`,
      },
      { status: 400 },
    );
  }

  const extension = extensionOf(filename);

  if (!extension) {
    return NextResponse.json(
      {
        error:
          "Please upload a PDF, Word, ODT, RTF or text document.",
      },
      { status: 400 },
    );
  }

  const form = await getForm(slug);

  if (!form || form.status !== "open") {
    return NextResponse.json(
      { error: "This form is not accepting responses." },
      { status: 409 },
    );
  }

  const field = form.fields.find(
    (f) => f.id === fieldId,
  );

  if (!field || field.type !== "file") {
    return NextResponse.json(
      { error: "Unknown field." },
      { status: 400 },
    );
  }

  const signed = await presignUpload({
    formSlug: slug,
    fieldId,
    extension,
    contentLength: size,
  });

  if (!signed) {
    return NextResponse.json(
      {
        error:
          "Could not prepare the upload. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    url: signed.url,
    key: signed.key,
    contentLength: size,
  });
}
