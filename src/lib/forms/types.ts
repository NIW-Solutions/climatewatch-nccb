/**
 * Form builder types — src/lib/forms/types.ts
 *
 * The shape of a form, its fields, and a submission to it.
 *
 * A form is stored as data, not code. That is the whole point of the
 * builder: someone in the Human Resources division should be able to put up
 * an application form without waiting for a developer, the way they can with
 * Google Forms today.
 *
 * FIELD TYPES are deliberately a closed union. Every one of them has to be
 * rendered, validated on the server, and exported to CSV, so "add any field
 * you like" is not free — each new type is three pieces of work. The set
 * below covers what ClimateWatch actually collects: applications, event
 * registrations, consultation feedback.
 */

export type FieldType =
  | "short-text"
  | "long-text"
  | "email"
  | "phone"
  | "url"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "consent"
  | "file";

/** A single field on a form. */
export type FormField = {
  /** Stable id. Submissions are keyed on this, so never reuse one. */
  id: string;
  type: FieldType;
  label: string;
  /** Shown under the label. */
  help?: string;
  placeholder?: string;
  required: boolean;
  /** For select, radio and checkbox. Ignored otherwise. */
  options?: readonly string[];
  /** Character limit for text fields; digit bounds for numbers. */
  maxLength?: number;
  min?: number;
  max?: number;
  /**
   * Accepted file extensions, e.g. [".pdf", ".docx"]. Only meaningful on a
   * "file" field, and enforced on the server as well as in the browser.
   */
  accept?: readonly string[];
};

export type FormStatus = "draft" | "open" | "closed";

export type FormDefinition = {
  /** URL segment: the form lives at /forms/<slug>. */
  slug: string;
  title: string;
  description?: string;
  fields: readonly FormField[];
  status: FormStatus;
  /** Shown after a successful submission. */
  confirmation: string;
  /**
   * Addresses notified on each submission. Empty means nobody is emailed
   * and responses are only visible in the admin.
   */
  notify: readonly string[];
  /** ISO timestamps. */
  createdAt: string;
  updatedAt: string;
  /** Closes itself on this date, if set. YYYY-MM-DD. */
  closesOn?: string;
  /**
   * What the form says it will do with the data. Required before a form can
   * be opened — see `validateForm`. Collecting names, emails and CVs without
   * telling people why is not something this builder will let you ship.
   */
  privacyNote: string;
};

/** One person's answers. */
export type FormSubmission = {
  formSlug: string;
  /** Sort key: ISO timestamp plus a random suffix, so it is unique. */
  submissionId: string;
  submittedAt: string;
  /** Keyed by field id. Checkbox answers are arrays. */
  answers: Record<
    string,
    string | string[] | null
  >;
  /** Uploaded files, keyed by field id, holding S3 object keys. */
  files?: Record<string, string>;
  /** Truncated, for abuse investigation only. */
  meta?: {
    userAgent?: string;
    country?: string;
  };
};

/** Field types that carry a list of options. */
export const OPTION_TYPES: readonly FieldType[] =
  ["select", "radio", "checkbox"];

export function hasOptions(
  type: FieldType,
): boolean {
  return OPTION_TYPES.includes(type);
}

/** Human labels for the builder's field picker. */
export const FIELD_TYPE_LABELS: Record<
  FieldType,
  string
> = {
  "short-text": "Short answer",
  "long-text": "Paragraph",
  email: "Email address",
  phone: "Phone number",
  url: "Link",
  number: "Number",
  date: "Date",
  select: "Dropdown",
  radio: "Multiple choice (one)",
  checkbox: "Checkboxes (many)",
  consent: "Consent checkbox",
  file: "File upload",
};

/**
 * Problems that stop a form being opened.
 *
 * Returns an empty array when the form is fit to publish. A draft is allowed
 * to be incomplete; an open form is not, because an open form is one real
 * people are filling in.
 */
export function validateForm(
  form: FormDefinition,
): string[] {
  const problems: string[] = [];

  if (!form.title.trim()) {
    problems.push("The form needs a title.");
  }

  if (form.fields.length === 0) {
    problems.push(
      "The form needs at least one field.",
    );
  }

  if (!form.privacyNote.trim()) {
    problems.push(
      "The form needs a note saying what you will do with the data. It is shown above the submit button.",
    );
  }

  const ids = new Set<string>();

  for (const field of form.fields) {
    if (!field.label.trim()) {
      problems.push(
        "Every field needs a label.",
      );
    }

    if (ids.has(field.id)) {
      problems.push(
        `Two fields share the id "${field.id}".`,
      );
    }

    ids.add(field.id);

    if (
      hasOptions(field.type) &&
      (!field.options ||
        field.options.length === 0)
    ) {
      problems.push(
        `"${field.label || field.type}" needs at least one option.`,
      );
    }
  }

  return [...new Set(problems)];
}
