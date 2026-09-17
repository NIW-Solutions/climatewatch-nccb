import { NextResponse } from "next/server";

import {
  adminConfigured,
  endSession,
  isAdmin,
  passwordMatches,
  startSession,
} from "@/lib/forms/auth";

/**
 * Admin session — src/app/api/admin/session/route.ts
 *
 *   GET     is anyone signed in?
 *   POST    sign in with the shared password
 *   DELETE  sign out
 *
 * The delay on a wrong password is deliberate. This endpoint guards every
 * submission the site holds, and without it an attacker could try passwords
 * as fast as the network allows.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Slows a guessing attack to a crawl without annoying a real typo. */
const WRONG_PASSWORD_DELAY_MS = 1200;

export async function GET() {
  return NextResponse.json({
    configured: adminConfigured(),
    signedIn: await isAdmin(),
  });
}

export async function POST(
  request: Request,
) {
  if (!adminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin access is not configured on this deployment.",
      },
      { status: 503 },
    );
  }

  let password = "";

  try {
    const body = await request.json();
    password =
      typeof body?.password === "string"
        ? body.password
        : "";
  } catch {
    return NextResponse.json(
      { error: "Expected JSON." },
      { status: 400 },
    );
  }

  if (!passwordMatches(password)) {
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        WRONG_PASSWORD_DELAY_MS,
      ),
    );

    return NextResponse.json(
      { error: "That password is not right." },
      { status: 401 },
    );
  }

  await startSession();

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();

  return NextResponse.json({ ok: true });
}
