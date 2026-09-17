import "server-only";

import { randomUUID } from "node:crypto";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * File uploads — src/lib/forms/uploads.ts
 *
 * CVs and motivation letters go straight from the applicant's browser to a
 * PRIVATE S3 bucket using a presigned URL. The file never passes through the
 * SSR function, which is what keeps a 5 MB PDF from hitting request size
 * limits, and keeps applicants' documents out of the application logs.
 *
 * CONFIGURE in the Amplify console:
 *
 *   UPLOADS_BUCKET_NAME    e.g. climatewatch-form-uploads
 *   FORMS_AWS_REGION       reused from the forms tables
 *
 * The bucket MUST block all public access. Nothing here makes an object
 * readable without a signed URL, and the download links the admin gets
 * expire in five minutes — long enough to open a CV, short enough that a
 * link pasted into a chat is useless by the time anyone finds it.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO: trust the browser. The content type
 * and size limit are baked into the signature, so a presigned URL issued for
 * a 5 MB PDF cannot be used to upload a 50 MB video or an executable. The
 * object key is generated here and never taken from the filename, so nobody
 * can traverse paths, overwrite someone else's file, or guess at another
 * applicant's document.
 */

const BUCKET = process.env.UPLOADS_BUCKET_NAME;
const REGION =
  process.env.FORMS_AWS_REGION ??
  process.env.AWS_REGION;

/** 8 MB. A CV that does not fit is a CV with uncompressed images in it. */
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** What a CV or a motivation letter is actually saved as. */
const ALLOWED: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".odt":
    "application/vnd.oasis.opendocument.text",
  ".rtf": "application/rtf",
  ".txt": "text/plain",
};

export const ALLOWED_EXTENSIONS =
  Object.keys(ALLOWED);

let client: S3Client | null = null;

function s3(): S3Client | null {
  if (!BUCKET || !REGION) return null;

  if (!client) {
    client = new S3Client({ region: REGION });
  }

  return client;
}

export function uploadsConfigured(): boolean {
  return Boolean(BUCKET && REGION);
}

/** Lowercased extension including the dot, or null when not allowed. */
export function extensionOf(
  filename: string,
): string | null {
  const match = /\.[a-z0-9]+$/i.exec(
    filename.trim(),
  );

  if (!match) return null;

  const ext = match[0].toLowerCase();

  return ext in ALLOWED ? ext : null;
}

export function contentTypeFor(
  extension: string,
): string {
  return (
    ALLOWED[extension] ??
    "application/octet-stream"
  );
}

/**
 * A presigned PUT for one file.
 *
 * The key is ours, not the applicant's: form slug, then a random id, then
 * the extension. The original filename is kept alongside the submission for
 * display rather than used on disk, so a file called
 * "../../etc/passwd.pdf" is just a label.
 */
export async function presignUpload(options: {
  formSlug: string;
  fieldId: string;
  extension: string;
  contentLength: number;
}): Promise<{
  url: string;
  key: string;
} | null> {
  const bucket = BUCKET;
  const s3Client = s3();

  if (!s3Client || !bucket) return null;

  const key = `submissions/${options.formSlug}/${options.fieldId}/${randomUUID()}${options.extension}`;

  try {
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentTypeFor(
          options.extension,
        ),
        ContentLength: options.contentLength,
        ServerSideEncryption: "AES256",
      }),
      { expiresIn: 300 },
    );

    return { url, key };
  } catch {
    return null;
  }
}

/** A short-lived download link, for the admin only. */
export async function presignDownload(
  key: string,
  filename?: string,
): Promise<string | null> {
  const bucket = BUCKET;
  const s3Client = s3();

  if (!s3Client || !bucket) return null;

  /* Only ever inside our own prefix. */
  if (!key.startsWith("submissions/")) {
    return null;
  }

  try {
    return await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        ...(filename
          ? {
              ResponseContentDisposition: `attachment; filename="${filename.replace(/["\\]/g, "")}"`,
            }
          : {}),
      }),
      { expiresIn: 300 },
    );
  } catch {
    return null;
  }
}
