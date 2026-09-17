import "server-only";

import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

import { cognitoConfigured } from "./cognito";

/**
 * Admin session — src/lib/forms/auth.ts
 *
 * A signed, httpOnly cookie. Two ways to earn one, and only one of them is
 * available at a time:
 *
 *   COGNITO       per-person accounts, MFA available, and a record in
 *                 Cognito of who signed in. Used whenever it is configured.
 *
 *   SHARED PASSWORD   the fallback, from before Cognito existed. One
 *                 password for everyone, so no answer to "who opened that
 *                 applicant's CV". Fine for event registrations, not for
 *                 documents about named people.
 *
 * WHEN COGNITO IS CONFIGURED THE PASSWORD ROUTE IS REFUSED. A weaker door
 * left open beside a stronger one is just the weaker door — migrating means
 * the old way stops working, not that it stays as a convenience.
 *
 * The cookie now carries an identity, so the admin can show who is signed in
 * and future work can record who did what. It is signed with
 * FORMS_SESSION_SECRET; changing that secret invalidates every session
 * immediately, which is the lever to pull if a laptop goes missing.
 */

const COOKIE = "cw_admin";

/** Eight hours. Long enough for a working day, short enough to matter. */
const MAX_AGE_SECONDS = 60 * 60 * 8;

export type AdminIdentity = {
  /** Cognito subject, or "shared" on the password path. */
  sub: string;
  /** Email address, or "" when signing in with the shared password. */
  email: string;
};

export type AdminMode =
  | "cognito"
  | "password"
  | "unconfigured";

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

/** Which door is open. Cognito wins whenever it is set up. */
export function adminMode(): AdminMode {
  if (!secret()) {
    return "unconfigured";
  }

  if (cognitoConfigured()) {
    return "cognito";
  }

  return expectedPassword()
    ? "password"
    : "unconfigured";
}

export function adminConfigured(): boolean {
  return adminMode() !== "unconfigured";
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

/**
 * Issues the session cookie.
 *
 * The payload is base64url rather than raw so a comma in an email cannot
 * split the fields, and it is signed as a whole, so neither the identity nor
 * the timestamp can be edited without invalidating it.
 */
export async function startSession(
  identity: AdminIdentity,
): Promise<void> {
  const payload = Buffer.from(
    JSON.stringify({
      sub: identity.sub,
      email: identity.email,
      at: Date.now(),
    }),
  ).toString("base64url");

  const value = `${payload}.${sign(payload)}`;

  const jar = await cookies();

  jar.set(COOKIE, value, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** The signed-in identity, or null. */
export async function currentAdmin(): Promise<AdminIdentity | null> {
  if (!secret()) {
    return null;
  }

  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;

  if (!raw) {
    return null;
  }

  const [payload, signature] = raw.split(".");

  if (!payload || !signature) {
    return null;
  }

  let expected: string;

  try {
    expected = sign(payload);
  } catch {
    return null;
  }

  if (!safeEqual(signature, expected)) {
    return null;
  }

  let parsed: {
    sub?: unknown;
    email?: unknown;
    at?: unknown;
  };

  try {
    parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString(
        "utf8",
      ),
    );
  } catch {
    return null;
  }

  const at = Number(parsed.at);
  const age = Date.now() - at;

  if (
    !Number.isFinite(age) ||
    age < 0 ||
    age > MAX_AGE_SECONDS * 1000
  ) {
    return null;
  }

  return {
    sub:
      typeof parsed.sub === "string"
        ? parsed.sub
        : "",
    email:
      typeof parsed.email === "string"
        ? parsed.email
        : "",
  };
}

export async function isAdmin(): Promise<boolean> {
  return (await currentAdmin()) !== null;
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
