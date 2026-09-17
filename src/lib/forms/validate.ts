import {
  hasOptions,
  type FormDefinition,
  type FormField,
} from "./types";

/**
 * Submission validation — src/lib/forms/validate.ts
 *
 * Runs on the SERVER, against the stored form definition. The browser checks
 * the same things for the sake of a decent experience, but nothing it says
 * is trusted here: a submission arrives as arbitrary JSON from the open
 * internet, and required/maxLength/options are only real if they are
 * enforced on this side.
 *
 * Answers to fields that are not on the form are dropped rather than stored,
 * so nobody can use a public form as free storage.
 */

const EMAIL =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_LIKE = /^https?:\/\/\S+\.\S+/i;
const PHONE = /^[+0-9 ()\-.]{6,24}$/;

/** Hard ceiling on any single answer, whatever the field says. */
const ABSOLUTE_MAX = 10_000;

export type ValidationResult = {
  ok: boolean;
  /** Keyed by field id. */
  errors: Record<string, string>;
  /** Cleaned answers, safe to store. */
  answers: Record<
    string,
    string | string[] | null
  >;
};

function asString(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function validateField(
  field: FormField,
  raw: unknown,
): { error?: string; value: string | string[] | null } {
  /* Checkboxes carry a list; everything else a single value. */
  if (field.type === "checkbox") {
    const chosen = Array.isArray(raw)
      ? raw
          .filter(
            (v): v is string =>
              typeof v === "string",
          )
          .map((v) => v.trim())
      : [];

    const allowed = new Set(
      field.options ?? [],
    );
    const kept = chosen.filter((v) =>
      allowed.has(v),
    );

    if (field.required && kept.length === 0) {
      return {
        error: "Choose at least one option.",
        value: null,
      };
    }

    return { value: kept };
  }

  const value = asString(raw);

  if (!value) {
    if (field.required) {
      return {
        error:
          field.type === "consent"
            ? "This has to be ticked to continue."
            : "This one is required.",
        value: null,
      };
    }

    return { value: null };
  }

  if (value.length > ABSOLUTE_MAX) {
    return {
      error: "That answer is too long.",
      value: null,
    };
  }

  if (
    field.maxLength &&
    value.length > field.maxLength
  ) {
    return {
      error: `Keep this under ${field.maxLength} characters.`,
      value: null,
    };
  }

  switch (field.type) {
    case "email":
      if (!EMAIL.test(value)) {
        return {
          error: "That does not look like an email address.",
          value: null,
        };
      }
      break;

    case "url":
      if (!URL_LIKE.test(value)) {
        return {
          error: "Include the full link, starting with https://",
          value: null,
        };
      }
      break;

    case "phone":
      if (!PHONE.test(value)) {
        return {
          error: "That does not look like a phone number.",
          value: null,
        };
      }
      break;

    case "number": {
      const n = Number(value);

      if (!Number.isFinite(n)) {
        return {
          error: "Numbers only.",
          value: null,
        };
      }

      if (
        field.min !== undefined &&
        n < field.min
      ) {
        return {
          error: `Must be ${field.min} or more.`,
          value: null,
        };
      }

      if (
        field.max !== undefined &&
        n > field.max
      ) {
        return {
          error: `Must be ${field.max} or less.`,
          value: null,
        };
      }

      break;
    }

    case "date":
      if (
        Number.isNaN(
          new Date(value).getTime(),
        )
      ) {
        return {
          error: "That is not a valid date.",
          value: null,
        };
      }
      break;

    case "consent":
      if (value !== "yes") {
        return {
          error: "This has to be ticked to continue.",
          value: null,
        };
      }
      break;

    default:
      break;
  }

  /* A choice has to be one of the offered options. */
  if (
    hasOptions(field.type) &&
    field.options &&
    !field.options.includes(value)
  ) {
    return {
      error: "Choose one of the options.",
      value: null,
    };
  }

  return { value };
}

export function validateSubmission(
  form: FormDefinition,
  raw: unknown,
): ValidationResult {
  const input =
    raw && typeof raw === "object"
      ? (raw as Record<string, unknown>)
      : {};

  const errors: Record<string, string> = {};
  const answers: Record<
    string,
    string | string[] | null
  > = {};

  for (const field of form.fields) {
    /* Files are handled separately — the upload, not the answer. */
    if (field.type === "file") {
      continue;
    }

    const { error, value } = validateField(
      field,
      input[field.id],
    );

    if (error) {
      errors[field.id] = error;
    } else {
      answers[field.id] = value;
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    answers,
  };
}
