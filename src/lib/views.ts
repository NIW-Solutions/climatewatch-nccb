import {
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

/**
 * Blog view counts — src/lib/views.ts
 *
 * One DynamoDB table, one row per post: { slug, views }. Increments are done
 * with an ADD update expression, which is atomic on DynamoDB's side, so two
 * readers landing on the same post in the same millisecond both count.
 *
 * COUNTS ARE REAL. Nothing here scales, seeds or floors the number. A view
 * count is a factual claim about how many people read something, and a page
 * that inflates it is lying to its readers about its own audience. What the
 * site does instead is choose WHEN to show the number — see VIEW_THRESHOLD
 * below — which is an editorial decision rather than a false one.
 *
 * CONFIGURE in the Amplify console:
 *
 *   VIEWS_TABLE_NAME    DynamoDB table name, e.g. climatewatch-blog-views
 *   VIEWS_AWS_REGION    the table's region, e.g. eu-west-1
 *
 * The SSR compute role needs dynamodb:GetItem, dynamodb:UpdateItem and
 * dynamodb:Scan on that table. Credentials are NOT read from environment
 * variables here — the SDK picks up the execution role, which is what AWS
 * recommends and what keeps long-lived keys out of the deployment artifact.
 *
 * When the table is not configured every function below returns null rather
 * than throwing. A missing counter should cost a reader nothing; the post
 * renders without it.
 */

/**
 * Below this, a post shows no count at all.
 *
 * Not a fudge: the number shown is always the true one. This only decides
 * whether it is worth showing yet, the way a shop does not put a queue
 * counter on the door in its first week.
 */
export const VIEW_THRESHOLD = 100;

const TABLE = process.env.VIEWS_TABLE_NAME;
const REGION =
  process.env.VIEWS_AWS_REGION ??
  process.env.AWS_REGION;

let client: DynamoDBDocumentClient | null = null;

function documents(): DynamoDBDocumentClient | null {
  if (!TABLE || !REGION) {
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

/** True when the counter is wired up. */
export function viewsConfigured(): boolean {
  return Boolean(TABLE && REGION);
}

/**
 * Add one to a post's count and return the new total.
 * Returns null when the table is not configured or the write fails.
 */
export async function recordView(
  slug: string,
): Promise<number | null> {
  const db = documents();

  if (!db || !TABLE) {
    return null;
  }

  try {
    const result = await db.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: { slug },
        UpdateExpression: "ADD #v :one",
        ExpressionAttributeNames: {
          "#v": "views",
        },
        ExpressionAttributeValues: { ":one": 1 },
        ReturnValues: "UPDATED_NEW",
      }),
    );

    const views = result.Attributes?.views;

    return typeof views === "number"
      ? views
      : null;
  } catch {
    return null;
  }
}

/** One post's count, without incrementing it. */
export async function readView(
  slug: string,
): Promise<number | null> {
  const db = documents();

  if (!db || !TABLE) {
    return null;
  }

  try {
    const result = await db.send(
      new GetCommand({
        TableName: TABLE,
        Key: { slug },
      }),
    );

    const views = result.Item?.views;

    return typeof views === "number"
      ? views
      : 0;
  } catch {
    return null;
  }
}

/**
 * Every post's count, for the index.
 *
 * A Scan rather than a series of GetItems: this table has one row per post,
 * so it is a few dozen rows at most and a scan is one request instead of
 * twenty. Revisit if the blog ever runs to thousands of posts.
 */
export async function readAllViews(): Promise<Record<
  string,
  number
> | null> {
  const db = documents();

  if (!db || !TABLE) {
    return null;
  }

  try {
    const result = await db.send(
      new ScanCommand({
        TableName: TABLE,
        ProjectionExpression: "slug, #v",
        ExpressionAttributeNames: {
          "#v": "views",
        },
      }),
    );

    const counts: Record<string, number> = {};

    for (const item of result.Items ?? []) {
      if (
        typeof item.slug === "string" &&
        typeof item.views === "number"
      ) {
        counts[item.slug] = item.views;
      }
    }

    return counts;
  } catch {
    return null;
  }
}

/** How the count reads on the page. */
export function formatViews(
  views: number,
): string {
  if (views >= 1000) {
    const thousands = views / 1000;

    return `${
      thousands >= 10
        ? Math.round(thousands)
        : thousands.toFixed(1).replace(/\.0$/, "")
    }k views`;
  }

  return `${views} views`;
}
