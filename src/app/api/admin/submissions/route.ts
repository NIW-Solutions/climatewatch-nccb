import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/forms/auth";
import {
  deleteSubmission,
  getForm,
  listSubmissions,
} from "@/lib/forms/store";

/**
 * Responses — src/app/api/admin/submissions/route.ts
 *
 *   GET     ?slug=            every response, newest first
 *           ?slug=&format=csv the same as a download
 *   DELETE  ?slug=&id=        remove one response
 *
 * Behind requireAdmin(). This is the personal data — names, email
 * addresses, whatever else a form asks for — so it is the part of the
 * builder worth being careful about.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Escapes one CSV cell.
 *
 * The leading apostrophe on =, +, - and @ is not decoration: without it,
 * Excel and Sheets treat a cell starting with those as a formula, and a
 * submission reading "=HYPERLINK(...)" becomes executable the moment
 * somebody opens the export. It is the standard CSV injection defence.
 */
function csvCell(value: unknown): string {
  const raw = Array.isArray(value)
    ? value.join("; ")
    : value === null || value === undefined
      ? ""
      : String(value);

  const guarded = /^[=+\-@\t\r]/.test(raw)
    ? `'${raw}`
    : raw;

  return `"${guarded.replace(/"/g, '""')}"`;
}

export async function GET(
  request: Request,
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const params = new URL(request.url)
    .searchParams;
  const slug = params.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Which form?" },
      { status: 400 },
    );
  }

  const [form, submissions] = await Promise.all(
    [getForm(slug), listSubmissions(slug)],
  );

  if (!form) {
    return NextResponse.json(
      { error: "No such form." },
      { status: 404 },
    );
  }

  const rows = submissions ?? [];

  if (params.get("format") !== "csv") {
    return NextResponse.json({
      form,
      submissions: rows,
    });
  }

  /* Columns follow the form's field order, so the export reads like it. */
  const header = [
    "Submitted at",
    ...form.fields
      .filter((f) => f.type !== "file")
      .map((f) => f.label || f.id),
  ];

  const lines = [
    header.map(csvCell).join(","),
    ...rows.map((row) =>
      [
        csvCell(row.submittedAt),
        ...form.fields
          .filter((f) => f.type !== "file")
          .map((f) =>
            csvCell(row.answers[f.id]),
          ),
      ].join(","),
    ),
  ];

  /* BOM so Excel opens UTF-8 names correctly rather than as mojibake. */
  const body = "﻿" + lines.join("\r\n");

  return new NextResponse(body, {
    headers: {
      "content-type":
        "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${slug}-responses.csv"`,
      "cache-control": "no-store",
    },
  });
}

export async function DELETE(
  request: Request,
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const params = new URL(request.url)
    .searchParams;
  const slug = params.get("slug");
  const id = params.get("id");

  if (!slug || !id) {
    return NextResponse.json(
      { error: "Which response?" },
      { status: 400 },
    );
  }

  const ok = await deleteSubmission(slug, id);

  return NextResponse.json({ ok });
}
