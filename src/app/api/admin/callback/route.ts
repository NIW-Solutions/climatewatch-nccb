import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { startSession } from "@/lib/forms/auth";
import {
  cognitoConfigured,
  exchangeCode,
} from "@/lib/forms/cognito";
import { STATE_COOKIE } from "../login/route";

/**
 * Cognito callback — src/app/api/admin/callback/route.ts
 *
 * Where Cognito sends the browser back after a successful sign-in. Swaps the
 * one-time code for tokens, verifies the ID token against the pool's public
 * keys, and issues our own session cookie carrying who signed in.
 *
 * The `state` from the query string must match the cookie set when the
 * sign-in began, and the cookie is cleared either way so a state cannot be
 * replayed.
 *
 * Failures redirect back to /admin with a short reason rather than
 * rendering an error page: whatever went wrong, the useful next step is the
 * sign-in screen.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function back(reason?: string) {
  const url = reason
    ? `/admin?error=${encodeURIComponent(reason)}`
    : "/admin";

  return NextResponse.redirect(
    new URL(
      url,
      process.env.SITE_URL ??
        "https://www.climatewatch-nccb.org",
    ),
    { status: 302 },
  );
}

export async function GET(
  request: Request,
) {
  if (!cognitoConfigured()) {
    return back("not-configured");
  }

  const params = new URL(request.url)
    .searchParams;

  const jar = await cookies();
  const expectedState =
    jar.get(STATE_COOKIE)?.value;

  /* One use only, whatever happens below. */
  jar.delete(STATE_COOKIE);

  if (params.get("error")) {
    return back("denied");
  }

  const code = params.get("code");
  const state = params.get("state");

  if (!code || !state) {
    return back("missing-code");
  }

  if (!expectedState || state !== expectedState) {
    return back("bad-state");
  }

  const identity = await exchangeCode(code);

  if (!identity) {
    return back("verification-failed");
  }

  await startSession(identity);

  return back();
}
