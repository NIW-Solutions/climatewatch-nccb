import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  authorizeUrl,
  cognitoConfigured,
} from "@/lib/forms/cognito";

/**
 * Start a Cognito sign-in — src/app/api/admin/login/route.ts
 *
 * Sends the browser to the hosted login, carrying a one-time `state` that is
 * also written to a short-lived cookie. The callback compares the two.
 *
 * That comparison is the CSRF defence for the sign-in itself: without it,
 * someone could feed a victim a callback URL carrying their own
 * authorization code and silently sign the victim's browser into the
 * attacker's account — after which anything the victim did in the admin
 * would happen in the wrong place.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const STATE_COOKIE = "cw_admin_state";

export async function GET() {
  if (!cognitoConfigured()) {
    return NextResponse.json(
      {
        error:
          "Cognito sign-in is not configured.",
      },
      { status: 503 },
    );
  }

  const state = randomBytes(24).toString(
    "base64url",
  );

  const jar = await cookies();

  jar.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    /* Ten minutes is plenty to type a password and an MFA code. */
    maxAge: 600,
  });

  return NextResponse.redirect(
    authorizeUrl(state),
    { status: 302 },
  );
}
