import "server-only";

import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import type {
  FormDefinition,
  FormSubmission,
} from "./types";

/**
 * Form storage — src/lib/forms/store.ts
 *
 * Two DynamoDB tables:
 *
 *   FORMS_TABLE_NAME        partition key: slug
 *   SUBMISSIONS_TABLE_NAME  partition key: formSlug, sort key: submissionId
 *
 * The sort key on submissions is what makes "every response to this form, in
 * order" one query rather than a scan of everything anyone has ever sent.
 *
 * CONFIGURE in the Amplify console:
 *
 *   FORMS_TABLE_NAME
 *   SUBMISSIONS_TABLE_NAME
 *   FORMS_AWS_REGION
 *   FORMS_ADMIN_PASSWORD    see src/lib/forms/auth.ts
 *
 * Credentials come from the SSR compute role, not from environment
 * variables. This data includes names, email addresses and, once uploads are
 * on, CVs — it is not something to protect with a key sitting in a build
 * artifact.
 *
 * Every function returns null rather than throwing when the tables are not
 * configured, so a half-set-up deployment degrades to "no forms" instead of
 * a 500 on the contact page.
 */

const FORMS_TABLE =
  process.env.FORMS_TABLE_NAME;
const SUBMISSIONS_TABLE =
  process.env.SUBMISSIONS_TABLE_NAME;
const REGION =
  process.env.FORMS_AWS_REGION ??
  process.env.AWS_REGION;

let client: DynamoDBDocumentClient | null = null;

function documents(): DynamoDBDocumentClient | null {
  if (!FORMS_TABLE || !REGION) {
    return null;
  }

  if (!client) {
    client = DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: REGION }),
      {
        marshallOptions: {
          removeUndefinedValues: true,
        },
      },
    );
  }

  return client;
}

export function formsConfigured(): boolean {
  return Boolean(
    FORMS_TABLE && SUBMISSIONS_TABLE && REGION,
  );
}

/* ==========================================
   FORMS
   ========================================== */

export async function getForm(
  slug: string,
): Promise<FormDefinition | null> {
  const db = documents();

  if (!db || !FORMS_TABLE) return null;

  try {
    const result = await db.send(
      new GetCommand({
        TableName: FORMS_TABLE,
        Key: { slug },
      }),
    );

    return (
      (result.Item as
        | FormDefinition
        | undefined) ?? null
    );
  } catch {
    return null;
  }
}

export async function listForms(): Promise<
  FormDefinition[] | null
> {
  const db = documents();

  if (!db || !FORMS_TABLE) return null;

  try {
    const result = await db.send(
      new ScanCommand({
        TableName: FORMS_TABLE,
      }),
    );

    const forms =
      (result.Items as FormDefinition[]) ?? [];

    return forms.sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
  } catch {
    return null;
  }
}

export async function saveForm(
  form: FormDefinition,
): Promise<boolean> {
  const db = documents();

  if (!db || !FORMS_TABLE) return false;

  try {
    await db.send(
      new PutCommand({
        TableName: FORMS_TABLE,
        Item: form,
      }),
    );

    return true;
  } catch {
    return false;
  }
}

/**
 * Deletes the definition only. Submissions are left in place on purpose:
 * someone tidying up a form should not silently destroy the applications
 * people sent to it. Responses are removed deliberately, from their own
 * screen.
 */
export async function deleteForm(
  slug: string,
): Promise<boolean> {
  const db = documents();

  if (!db || !FORMS_TABLE) return false;

  try {
    await db.send(
      new DeleteCommand({
        TableName: FORMS_TABLE,
        Key: { slug },
      }),
    );

    return true;
  } catch {
    return false;
  }
}

/* ==========================================
   SUBMISSIONS
   ========================================== */

export async function saveSubmission(
  submission: FormSubmission,
): Promise<boolean> {
  const db = documents();

  if (!db || !SUBMISSIONS_TABLE) return false;

  try {
    await db.send(
      new PutCommand({
        TableName: SUBMISSIONS_TABLE,
        Item: submission,
      }),
    );

    return true;
  } catch {
    return false;
  }
}

export async function listSubmissions(
  formSlug: string,
): Promise<FormSubmission[] | null> {
  const db = documents();

  if (!db || !SUBMISSIONS_TABLE) return null;

  try {
    const result = await db.send(
      new QueryCommand({
        TableName: SUBMISSIONS_TABLE,
        KeyConditionExpression:
          "formSlug = :slug",
        ExpressionAttributeValues: {
          ":slug": formSlug,
        },
        /* Newest first. */
        ScanIndexForward: false,
      }),
    );

    return (
      (result.Items as FormSubmission[]) ?? []
    );
  } catch {
    return null;
  }
}

export async function countSubmissions(
  formSlug: string,
): Promise<number | null> {
  const db = documents();

  if (!db || !SUBMISSIONS_TABLE) return null;

  try {
    const result = await db.send(
      new QueryCommand({
        TableName: SUBMISSIONS_TABLE,
        KeyConditionExpression:
          "formSlug = :slug",
        ExpressionAttributeValues: {
          ":slug": formSlug,
        },
        Select: "COUNT",
      }),
    );

    return result.Count ?? 0;
  } catch {
    return null;
  }
}

export async function deleteSubmission(
  formSlug: string,
  submissionId: string,
): Promise<boolean> {
  const db = documents();

  if (!db || !SUBMISSIONS_TABLE) return false;

  try {
    await db.send(
      new DeleteCommand({
        TableName: SUBMISSIONS_TABLE,
        Key: { formSlug, submissionId },
      }),
    );

    return true;
  } catch {
    return false;
  }
}
