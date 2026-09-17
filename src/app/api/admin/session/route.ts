import { NextResponse } from "next/server";

import {
  adminMode,
  currentAdmin,
  endSession,
  passwordMatches,
  startSession,
} from "@/lib/forms/auth";
import { logoutUrl } from "@/lib/forms/cognito";

/**
 * Admin session — src/app/api/admin/session/route.ts
 *
 *   GET     who is signed in, and which sign-in method is active
 *   POST    sign in with the shared password — REFUSED under Cognito
 *   DELETE  sign out
 *
 * The POST refusal is the point of the migration. Once Cognito is
 * configured, the shared password stops being a way in, whether or not
 * FORMS_ADMIN_PASSWORD is still set in the console.
 *
 * The delay on a wrong password slows a guessing attack without troubling a
 * real typo.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WRONG_PASSWORD_DELAY_MS = 1200;

export async function GET() {
  const mode = adminMode();
  const admin = await currentAdmin();

  return NextResponse.json({
    configured: mode !== "unconfigured",
    mode,
    signedIn: admin !== null,
    email: admin?.email ?? null,
  });
}

export async function POST(
  request: Request,
) {
  const mode = adminMode();

  if (mode === "unconfigured") {
    return NextResponse.json(
      {
        error:
          "Admin access is not configured on this deployment.",
      },
      { status: 503 },
    );
  }

  if (mode === "cognito") {
    return NextResponse.json(
      {
        error:
          "This site signs in with a ClimateWatch account.",
      },
      { status: 409 },
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

  await startSession({
    sub: "shared",
    email: "",
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const mode = adminMode();

  await endSession();

  /*
   * Under Cognito, clearing our cookie is half the job — the hosted UI keeps
   * its own session, so the next sign-in would go straight through without
   * asking. The caller sends the browser here to finish it.
   */
  return NextResponse.json({
    ok: true,
    ...(mode === "cognito"
      ? { logoutUrl: logoutUrl() }
      : {}),
  });
}
