import "server-only";

import {
  SendEmailCommand,
  SESv2Client,
} from "@aws-sdk/client-sesv2";

import type {
  FormDefinition,
  FormSubmission,
} from "./types";

/**
 * Submission notifications — src/lib/forms/notify.ts
 *
 * Emails the addresses on a form when someone submits to it, so nobody has
 * to remember to open /admin to find out an application arrived.
 *
 * CONFIGURE in the Amplify console:
 *
 *   SES_FROM_ADDRESS   e.g. forms@climatewatch-nccb.org
 *   SES_AWS_REGION     defaults to FORMS_AWS_REGION
 *   SITE_URL           used for the link back to the admin
 *
 * WHAT THE EMAIL DELIBERATELY DOES NOT CONTAIN: the answers. It says a
 * submission arrived, to which form, and links to the admin. Applications
 * hold names, addresses and CVs, and email is the least private place that
 * data could sit — forwarded, synced to phones, kept in mailboxes for years,
 * read by whoever else has access to a shared inbox. The notification is a
 * doorbell, not a delivery.
 *
 * SENDING NEVER BLOCKS A SUBMISSION. If SES is unconfigured, throttled or
 * down, the applicant's response is already saved and they still see the
 * confirmation. A failed notification is a missed doorbell, not lost work.
 *
 * ON THE SES SANDBOX: a new SES account can only send to VERIFIED addresses.
 * For notifications that is usually fine, because the recipients are
 * ClimateWatch's own staff — verify those addresses and no production access
 * request is needed. It only becomes a problem if you ever email applicants.
 */

const FROM = process.env.SES_FROM_ADDRESS;
const REGION =
  process.env.SES_AWS_REGION ??
  process.env.FORMS_AWS_REGION ??
  process.env.AWS_REGION;
const SITE =
  process.env.SITE_URL?.replace(/\/$/, "") ??
  "https://www.climatewatch-nccb.org";

let client: SESv2Client | null = null;

function ses(): SESv2Client | null {
  if (!FROM || !REGION) return null;

  if (!client) {
    client = new SESv2Client({
      region: REGION,
    });
  }

  return client;
}

export function notificationsConfigured(): boolean {
  return Boolean(FROM && REGION);
}

const EMAIL =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Tells the form's recipients that something arrived.
 *
 * Returns quietly whether or not it worked — the caller has already saved
 * the submission and must not fail because of this.
 */
export async function notifySubmission(
  form: FormDefinition,
  submission: FormSubmission,
): Promise<void> {
  const sesClient = ses();

  if (
    !sesClient ||
    !FROM ||
    form.notify.length === 0
  ) {
    return;
  }

  const recipients = form.notify
    .map((address) => address.trim())
    .filter((address) => EMAIL.test(address))
    .slice(0, 10);

  if (recipients.length === 0) {
    return;
  }

  const title = form.title || form.slug;
  const when = new Date(
    submission.submittedAt,
  ).toUTCString();

  const link = `${SITE}/admin`;

  const text = [
    `A new response has arrived for "${title}".`,
    "",
    `Received: ${when}`,
    "",
    "The response itself is not included in this email. Open the",
    "form builder to read it:",
    "",
    link,
    "",
    "— ClimateWatch website",
  ].join("\n");

  try {
    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: FROM,
        Destination: {
          ToAddresses: recipients,
        },
        Content: {
          Simple: {
            Subject: {
              Data: `New response: ${title}`,
              Charset: "UTF-8",
            },
            Body: {
              Text: {
                Data: text,
                Charset: "UTF-8",
              },
            },
          },
        },
      }),
    );
  } catch {
    /*
     * Swallowed on purpose. The submission is saved; the applicant has been
     * told so. A notification that could not be sent is not a reason to
     * tell them their application failed.
     */
  }
}
