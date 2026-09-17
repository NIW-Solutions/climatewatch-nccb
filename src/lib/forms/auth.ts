import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin session — src/lib/forms/auth.ts
 *
 * A signed cookie, issued against a shared password held in
 * FORMS_ADMIN_PASSWORD and signed with FORMS_SESSION_SECRET.
 *
 * READ THIS BEFORE REAL APPLICATIONS FLOW THROUGH THE BUILDER.
 *
 * This is deliberately the simplest thing that is honestly secure enough to
 * start with, and it has a ceiling:
 *
 *   - one shared password, so there is no record of WHICH person opened an
 *     applicant's CV, and no way to revoke one person's access without
 *     changing everyone's;
 *   - no second factor;
 *   - a leaked password is full access to every submission until someone
 *     notices and changes it.
 *
 * That is acceptable while the forms collect event registrations. It is not
 * the right answer for a table of job applications with CVs attached, which
 * is personal data ClimateWatch would be holding on other people's behalf.
 * Before that goes live, move this to Cognito: per-person accounts, MFA,
 * and a log of who signed in. The rest of the builder does not care which
 * of the two is underneath — everything goes through requireAdmin() below.
 *
 * The cookie is httpOnly, secure and sameSite=lax, so it is not readable
 * from JavaScript and does not ride along on cross-site requests.
 */

const COOKIE = "cw_admin";

/** Eight hours. Long enough for a working day, short enough to matter. */
const MAX_AGE_SECONDS = 60 * 60 * 8;

function secret(): string | null {
  return (
    process.env.FORMS_SESSION_SECRET ?? null
  );
}

function expectedPassword(): string | null {
  return (
    process.env.FORMS_ADMIN_PASSWORD ?? null
  );
}

export function adminConfigured(): boolean {
  return Boolean(secret() && expectedPassword());
}

function sign(value: string): string {
  const key = secret();

  if (!key) {
    throw new Error(
      "FORMS_SESSION_SECRET is not set.",
    );
  }

  return createHmac("sha256", key)
    .update(value)
    .digest("hex");
}

/** Constant-time compare, so a wrong guess leaks nothing through timing. */
function safeEqual(
  a: string,
  b: string,
): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

/** True when the supplied password is the configured one. */
export function passwordMatches(
  candidate: string,
): boolean {
  const expected = expectedPassword();

  if (!expected) {
    return false;
  }

  return safeEqual(candidate, expected);
}

/** Issues the session cookie. Call only after passwordMatches(). */
export async function startSession(): Promise<void> {
  const issuedAt = Date.now().toString();
  const value = `${issuedAt}.${sign(issuedAt)}`;

  const jar = await cookies();

  jar.set(COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** True when the request carries a valid, unexpired session. */
export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) {
    return false;
  }

  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;

  if (!raw) {
    return false;
  }

  const [issuedAt, signature] = raw.split(".");

  if (!issuedAt || !signature) {
    return false;
  }

  let expected: string;

  try {
    expected = sign(issuedAt);
  } catch {
    return false;
  }

  if (!safeEqual(signature, expected)) {
    return false;
  }

  const age = Date.now() - Number(issuedAt);

  if (
    !Number.isFinite(age) ||
    age < 0 ||
    age > MAX_AGE_SECONDS * 1000
  ) {
    return false;
  }

  return true;
}

/**
 * Guard for admin API routes. Returns null when the caller is an admin, and
 * a Response to return otherwise.
 */
export async function requireAdmin(): Promise<Response | null> {
  if (await isAdmin()) {
    return null;
  }

  return new Response(
    JSON.stringify({ error: "Not signed in." }),
    {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
