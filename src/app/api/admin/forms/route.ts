import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/forms/auth";
import {
  deleteForm,
  formsConfigured,
  getForm,
  listForms,
  saveForm,
} from "@/lib/forms/store";
import {
  validateForm,
  type FormDefinition,
  type FormField,
} from "@/lib/forms/types";

/**
 * Form management — src/app/api/admin/forms/route.ts
 *
 *   GET     every form
 *   PUT     create or replace one
 *   DELETE  remove a definition (?slug=)
 *
 * Every method is behind requireAdmin(). A form definition decides what a
 * public page collects, so write access here is write access to what the
 * organisation asks the public for.
 *
 * A form can be SAVED incomplete — that is what "draft" is for. It can only
 * be OPENED once validateForm() is happy, which is where the requirement for
 * a privacy note is enforced.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Trusts nothing from the client; rebuilds each field from scratch. */
function cleanField(
  raw: unknown,
  index: number,
): FormField | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const f = raw as Record<string, unknown>;

  const type =
    typeof f.type === "string" ? f.type : "";

  const allowed = [
    "short-text",
    "long-text",
    "email",
    "phone",
    "url",
    "number",
    "date",
    "select",
    "radio",
    "checkbox",
    "consent",
    "file",
  ];

  if (!allowed.includes(type)) {
    return null;
  }

  const options = Array.isArray(f.options)
    ? f.options
        .filter(
          (o): o is string =>
            typeof o === "string",
        )
        .map((o) => o.trim())
        .filter(Boolean)
        .slice(0, 100)
    : undefined;

  return {
    id:
      typeof f.id === "string" && f.id.trim()
        ? f.id.trim().slice(0, 64)
        : `field-${index + 1}`,
    type: type as FormField["type"],
    label:
      typeof f.label === "string"
        ? f.label.slice(0, 300)
        : "",
    help:
      typeof f.help === "string" && f.help
        ? f.help.slice(0, 500)
        : undefined,
    placeholder:
      typeof f.placeholder === "string" &&
      f.placeholder
        ? f.placeholder.slice(0, 200)
        : undefined,
    required: f.required === true,
    ...(options && options.length
      ? { options }
      : {}),
    ...(typeof f.maxLength === "number"
      ? {
          maxLength: Math.min(
            Math.max(1, f.maxLength),
            10_000,
          ),
        }
      : {}),
    ...(typeof f.min === "number"
      ? { min: f.min }
      : {}),
    ...(typeof f.max === "number"
      ? { max: f.max }
      : {}),
  };
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!formsConfigured()) {
    return NextResponse.json(
      { configured: false, forms: [] },
      { status: 503 },
    );
  }

  const forms = await listForms();

  return NextResponse.json({
    configured: true,
    forms: forms ?? [],
  });
}

export async function PUT(
  request: Request,
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!formsConfigured()) {
    return NextResponse.json(
      { error: "Forms are not connected." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;

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
      ? body.slug.trim().toLowerCase()
      : "";

  if (!SLUG.test(slug) || slug.length > 60) {
    return NextResponse.json(
      {
        error:
          "The web address can use lowercase letters, numbers and hyphens only.",
      },
      { status: 400 },
    );
  }

  const fields = Array.isArray(body.fields)
    ? body.fields
        .map(cleanField)
        .filter(
          (f): f is FormField => f !== null,
        )
        .slice(0, 100)
    : [];

  const existing = await getForm(slug);
  const now = new Date().toISOString();

  const status =
    body.status === "open" ||
    body.status === "closed"
      ? body.status
      : "draft";

  const form: FormDefinition = {
    slug,
    title:
      typeof body.title === "string"
        ? body.title.slice(0, 200)
        : "",
    description:
      typeof body.description === "string" &&
      body.description
        ? body.description.slice(0, 2000)
        : undefined,
    fields,
    status,
    confirmation:
      typeof body.confirmation === "string" &&
      body.confirmation.trim()
        ? body.confirmation.slice(0, 1000)
        : "Thank you — we have your response.",
    notify: Array.isArray(body.notify)
      ? body.notify
          .filter(
            (n): n is string =>
              typeof n === "string",
          )
          .slice(0, 10)
      : [],
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    ...(typeof body.closesOn === "string" &&
    body.closesOn
      ? { closesOn: body.closesOn }
      : {}),
    privacyNote:
      typeof body.privacyNote === "string"
        ? body.privacyNote.slice(0, 2000)
        : "",
  };

  /* Drafts may be incomplete. An open form may not. */
  if (form.status === "open") {
    const problems = validateForm(form);

    if (problems.length > 0) {
      return NextResponse.json(
        { error: problems.join(" "), problems },
        { status: 422 },
      );
    }
  }

  const ok = await saveForm(form);

  if (!ok) {
    return NextResponse.json(
      { error: "Could not save the form." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, form });
}

export async function DELETE(
  request: Request,
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const slug = new URL(
    request.url,
  ).searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Which form?" },
      { status: 400 },
    );
  }

  const ok = await deleteForm(slug);

  return NextResponse.json({ ok });
}
