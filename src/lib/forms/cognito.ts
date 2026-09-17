import "server-only";

import { CognitoJwtVerifier } from "aws-jwt-verify";

/**
 * Cognito admin sign-in — src/lib/forms/cognito.ts
 *
 * Replaces the shared password with per-person accounts: a real identity on
 * every session, revocable one user at a time, with MFA available and a
 * record in Cognito of who signed in and when.
 *
 * That was the ceiling documented in auth.ts, and it is the thing that had
 * to change before the forms started collecting CVs. One shared password
 * means no answer to "who opened that applicant's file", which is exactly
 * the question that matters if a document ever leaks.
 *
 * CONFIGURE in the Amplify console. When all four are set, Cognito is the
 * ONLY way in and the password route stops working — a weaker door left
 * open beside a stronger one is just the weaker door.
 *
 *   COGNITO_ISSUER      https://cognito-idp.<region>.amazonaws.com/<pool-id>
 *   COGNITO_CLIENT_ID   the app client id
 *   COGNITO_DOMAIN      https://<prefix>.auth.<region>.amazoncognito.com
 *   SITE_URL            https://www.climatewatch-nccb.org
 *
 *   COGNITO_CLIENT_SECRET   only if the app client was made with one
 *
 * The authorization code flow is used rather than the implicit flow: tokens
 * are exchanged server-side and never touch the browser's address bar or
 * its history.
 */

const ISSUER = process.env.COGNITO_ISSUER;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const CLIENT_SECRET =
  process.env.COGNITO_CLIENT_SECRET;
const DOMAIN = process.env.COGNITO_DOMAIN?.replace(
  /\/$/,
  "",
);
const SITE = process.env.SITE_URL?.replace(
  /\/$/,
  "",
);

export function cognitoConfigured(): boolean {
  return Boolean(
    ISSUER && CLIENT_ID && DOMAIN && SITE,
  );
}

export function redirectUri(): string {
  return `${SITE}/api/admin/callback`;
}

/** Where the browser is sent to sign in. */
export function authorizeUrl(
  state: string,
): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? "",
    response_type: "code",
    scope: "openid email",
    redirect_uri: redirectUri(),
    state,
  });

  return `${DOMAIN}/oauth2/authorize?${params.toString()}`;
}

/** Where the browser is sent to sign out of Cognito itself. */
export function logoutUrl(): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? "",
    logout_uri: `${SITE}/admin`,
  });

  return `${DOMAIN}/logout?${params.toString()}`;
}

/* The pool's public keys are fetched once and cached by the verifier. */
let verifier: ReturnType<
  typeof CognitoJwtVerifier.create
> | null = null;

function poolId(): string {
  /* The issuer ends in the pool id. */
  return (ISSUER ?? "").split("/").pop() ?? "";
}

/**
 * Swaps the one-time code for tokens, then verifies the ID token's
 * signature, issuer, audience and expiry against the pool's published keys.
 *
 * Verification is not optional politeness: without it this endpoint would
 * accept any JWT anyone posted at it.
 */
export async function exchangeCode(
  code: string,
): Promise<{
  sub: string;
  email: string;
} | null> {
  if (!cognitoConfigured()) return null;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID ?? "",
    code,
    redirect_uri: redirectUri(),
  });

  const headers: Record<string, string> = {
    "content-type":
      "application/x-www-form-urlencoded",
  };

  /* A client with a secret authenticates with HTTP Basic. */
  if (CLIENT_SECRET) {
    headers.authorization = `Basic ${Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`,
    ).toString("base64")}`;
  }

  try {
    const response = await fetch(
      `${DOMAIN}/oauth2/token`,
      {
        method: "POST",
        headers,
        body: body.toString(),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const tokens = (await response.json()) as {
      id_token?: string;
    };

    if (!tokens.id_token) return null;

    if (!verifier) {
      verifier = CognitoJwtVerifier.create({
        userPoolId: poolId(),
        tokenUse: "id",
        clientId: CLIENT_ID ?? "",
      });
    }

    const claims = await verifier.verify(
      tokens.id_token,
    );

    const email =
      typeof claims.email === "string"
        ? claims.email
        : "";

    return {
      sub: String(claims.sub),
      email,
    };
  } catch {
    return null;
  }
}
