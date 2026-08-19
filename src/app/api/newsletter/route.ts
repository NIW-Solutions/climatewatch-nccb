/**
 * Newsletter signup — src/app/api/newsletter/route.ts
 *
 * Provider-agnostic subscribe endpoint. Configure in the Amplify console
 * under Environment variables:
 *
 *   NEWSLETTER_PROVIDER   buttondown | mailchimp | convertkit
 *   NEWSLETTER_API_KEY    the provider's API key
 *   NEWSLETTER_LIST_ID    Mailchimp audience id / ConvertKit form id
 *   NEWSLETTER_SERVER     Mailchimp datacentre prefix, e.g. "us21"
 *
 * When nothing is configured this returns 503 rather than a cheerful 200.
 * That is deliberate: the contact form on this site silently discards every
 * submission, and a signup form that pretends to work is worse than one
 * that admits it is not connected yet.
 */

export const runtime = "nodejs";

/** Always hit the provider; never serve a cached subscribe response. */
export const dynamic =
  "force-dynamic";

type SubscribeResult = {
  ok: boolean;
  status: number;
  message: string;
};

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function subscribeButtondown(
  email: string,
  apiKey: string,
): Promise<SubscribeResult> {
  const response = await fetch(
    "https://api.buttondown.email/v1/subscribers",
    {
      method: "POST",
      headers: {
        authorization: `Token ${apiKey}`,
        "content-type":
          "application/json",
      },
      body: JSON.stringify({
        email_address: email,
      }),
    },
  );

  if (response.ok) {
    return {
      ok: true,
      status: 200,
      message: "Subscribed.",
    };
  }

  // Buttondown returns 400 for an address that is already on the list.
  if (response.status === 400) {
    return {
      ok: true,
      status: 200,
      message:
        "That address is already subscribed.",
    };
  }

  return {
    ok: false,
    status: 502,
    message:
      "The newsletter provider rejected the request.",
  };
}

async function subscribeMailchimp(
  email: string,
  apiKey: string,
  listId: string,
  server: string,
): Promise<SubscribeResult> {
  const response = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
    {
      method: "POST",
      headers: {
        authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "content-type":
          "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending",
      }),
    },
  );

  if (response.ok) {
    return {
      ok: true,
      status: 200,
      message:
        "Check your inbox to confirm.",
    };
  }

  if (response.status === 400) {
    return {
      ok: true,
      status: 200,
      message:
        "That address is already subscribed.",
    };
  }

  return {
    ok: false,
    status: 502,
    message:
      "The newsletter provider rejected the request.",
  };
}

async function subscribeConvertKit(
  email: string,
  apiKey: string,
  formId: string,
): Promise<SubscribeResult> {
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: {
        "content-type":
          "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        email,
      }),
    },
  );

  return response.ok
    ? {
        ok: true,
        status: 200,
        message:
          "Check your inbox to confirm.",
      }
    : {
        ok: false,
        status: 502,
        message:
          "The newsletter provider rejected the request.",
      };
}

export async function POST(
  request: Request,
) {
  let email = "";

  try {
    const body = (await request.json()) as {
      email?: unknown;
    };

    email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
  } catch {
    return Response.json(
      {
        message:
          "Expected a JSON body.",
      },
      { status: 400 },
    );
  }

  if (
    !email ||
    email.length > 320 ||
    !EMAIL_PATTERN.test(email)
  ) {
    return Response.json(
      {
        message:
          "Enter a valid email address.",
      },
      { status: 400 },
    );
  }

  const provider =
    process.env.NEWSLETTER_PROVIDER;
  const apiKey =
    process.env.NEWSLETTER_API_KEY;

  if (!provider || !apiKey) {
    return Response.json(
      {
        message:
          "Newsletter signup is not connected yet. Please email us instead.",
      },
      { status: 503 },
    );
  }

  try {
    let result: SubscribeResult;

    switch (provider) {
      case "buttondown":
        result =
          await subscribeButtondown(
            email,
            apiKey,
          );
        break;

      case "mailchimp":
        result =
          await subscribeMailchimp(
            email,
            apiKey,
            process.env
              .NEWSLETTER_LIST_ID ?? "",
            process.env
              .NEWSLETTER_SERVER ?? "",
          );
        break;

      case "convertkit":
        result =
          await subscribeConvertKit(
            email,
            apiKey,
            process.env
              .NEWSLETTER_LIST_ID ?? "",
          );
        break;

      default:
        result = {
          ok: false,
          status: 500,
          message: `Unknown NEWSLETTER_PROVIDER "${provider}".`,
        };
    }

    return Response.json(
      { message: result.message },
      { status: result.status },
    );
  } catch {
    return Response.json(
      {
        message:
          "Could not reach the newsletter provider. Please try again.",
      },
      { status: 502 },
    );
  }
}
