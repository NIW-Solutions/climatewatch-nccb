"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ArrowRight, Check } from "lucide-react";

import type {
  FormDefinition,
  FormField,
} from "@/lib/forms/types";

/**
 * Form renderer — src/components/forms/FormRenderer.tsx
 *
 * Renders any form the builder can produce, and posts it to
 * /api/forms/submit.
 *
 * The browser checks required fields and formats so that someone gets told
 * about a missing answer without a round trip. None of that is the real
 * check — the server validates every answer again against the stored
 * definition, because anything sent from here can be forged.
 *
 * Two anti-spam pieces live here and neither is visible to a person: a
 * honeypot input kept out of the layout and away from screen readers and the
 * tab order, and the time the form was opened, which lets the server ignore
 * anything filled in faster than a human could.
 */

type Answers = Record<
  string,
  string | string[]
>;

function initialAnswers(
  fields: readonly FormField[],
): Answers {
  const out: Answers = {};

  for (const field of fields) {
    out[field.id] =
      field.type === "checkbox" ? [] : "";
  }

  return out;
}

export function FormRenderer({
  form,
}: Readonly<{ form: FormDefinition }>) {
  const [answers, setAnswers] =
    useState<Answers>(() =>
      initialAnswers(form.fields),
    );
  const [errors, setErrors] = useState<
    Record<string, string>
  >({});
  const [submitting, setSubmitting] =
    useState(false);
  const [done, setDone] = useState<
    string | null
  >(null);
  const [failure, setFailure] = useState<
    string | null
  >(null);

  const honeypot = useRef("");

  /*
    When the form appeared. Recorded in an effect rather than during render:
    Date.now() is impure, and a render that reads the clock gives a different
    answer on the server than in the browser.
  */
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  function setAnswer(
    id: string,
    value: string | string[],
  ) {
    setAnswers((current) => ({
      ...current,
      [id]: value,
    }));

    setErrors((current) => {
      if (!current[id]) return current;

      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function toggleCheckbox(
    id: string,
    option: string,
  ) {
    const current = answers[id];
    const list = Array.isArray(current)
      ? current
      : [];

    setAnswer(
      id,
      list.includes(option)
        ? list.filter((o) => o !== option)
        : [...list, option],
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) return;

    setFailure(null);
    setSubmitting(true);

    try {
      const response = await fetch(
        "/api/forms/submit",
        {
          method: "POST",
          headers: {
            "content-type":
              "application/json",
          },
          body: JSON.stringify({
            slug: form.slug,
            answers,
            website: honeypot.current,
            startedAt: openedAt.current,
          }),
        },
      );

      if (response.status === 422) {
        const data = await response.json();
        setErrors(data.errors ?? {});

        /* Put the first problem in view. */
        const firstId = Object.keys(
          data.errors ?? {},
        )[0];

        if (firstId) {
          document
            .getElementById(firstId)
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
        }

        return;
      }

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => ({}));

        setFailure(
          data.error ??
            "Something went wrong. Please try again.",
        );

        return;
      }

      const data = await response.json();

      setDone(
        data.confirmation ??
          form.confirmation,
      );
    } catch {
      setFailure(
        "Could not reach the server. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="border-t border-border py-10 sm:py-12"
      >
        <div className="flex size-11 items-center justify-center bg-primary text-white">
          <Check
            aria-hidden="true"
            className="size-5"
            strokeWidth={1.7}
          />
        </div>

        <p className="mt-6 max-w-xl text-base leading-8 text-primary">
          {done}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-t border-border pt-10"
    >
      {/*
        Honeypot. Hidden from sight, from screen readers and from the tab
        order, so only something filling the page in programmatically will
        put anything here.
      */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">
          Leave this field empty
        </label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => {
            honeypot.current = e.target.value;
          }}
        />
      </div>

      <div className="space-y-9">
        {form.fields.map((field) => (
          <Field
            key={field.id}
            field={field}
            value={answers[field.id] ?? ""}
            error={errors[field.id]}
            onChange={setAnswer}
            onToggle={toggleCheckbox}
          />
        ))}
      </div>

      {form.privacyNote ? (
        <p className="mt-10 max-w-2xl border-t border-border pt-6 text-xs leading-6 text-muted">
          {form.privacyNote}
        </p>
      ) : null}

      {failure ? (
        <p
          role="alert"
          className="mt-6 border-l-2 border-secondary pl-4 text-sm leading-6 text-primary"
        >
          {failure}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-8 inline-flex min-h-11 items-center gap-3 bg-secondary px-7 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Submit"}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.7}
        />
      </button>
    </form>
  );
}

/* ==========================================
   ONE FIELD
   ========================================== */

const INPUT_CLASS =
  "mt-3 w-full border border-border bg-surface px-4 py-3 text-sm text-primary transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none";

function Field({
  field,
  value,
  error,
  onChange,
  onToggle,
}: Readonly<{
  field: FormField;
  value: string | string[];
  error?: string;
  onChange: (
    id: string,
    value: string | string[],
  ) => void;
  onToggle: (
    id: string,
    option: string,
  ) => void;
}>) {
  const describedBy =
    [
      field.help ? `${field.id}-help` : null,
      error ? `${field.id}-error` : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const text =
    typeof value === "string" ? value : "";
  const list = Array.isArray(value)
    ? value
    : [];

  /* A consent box is one checkbox whose label is the question. */
  if (field.type === "consent") {
    return (
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id={field.id}
            type="checkbox"
            checked={text === "yes"}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            onChange={(e) =>
              onChange(
                field.id,
                e.target.checked ? "yes" : "",
              )
            }
            className="mt-1 size-4 shrink-0 accent-[var(--color-secondary,#c0392b)]"
          />

          <span className="text-sm leading-6 text-primary">
            {field.label}
            {field.required ? (
              <span
                aria-hidden="true"
                className="text-secondary"
              >
                {" "}
                *
              </span>
            ) : null}
          </span>
        </label>

        <FieldNotes
          field={field}
          error={error}
        />
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor={field.id}
        className="block text-sm font-semibold text-primary"
      >
        {field.label}
        {field.required ? (
          <span
            aria-hidden="true"
            className="text-secondary"
          >
            {" "}
            *
          </span>
        ) : null}
      </label>

      {field.type === "long-text" ? (
        <textarea
          id={field.id}
          rows={6}
          value={text}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(e) =>
            onChange(field.id, e.target.value)
          }
          className={`${INPUT_CLASS} resize-y`}
        />
      ) : field.type === "select" ? (
        <select
          id={field.id}
          value={text}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(e) =>
            onChange(field.id, e.target.value)
          }
          className={INPUT_CLASS}
        >
          <option value="">
            Choose one…
          </option>

          {(field.options ?? []).map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ),
          )}
        </select>
      ) : field.type === "radio" ? (
        <div
          role="radiogroup"
          aria-labelledby={field.id}
          className="mt-3 space-y-2.5"
        >
          {(field.options ?? []).map(
            (option) => (
              <label
                key={option}
                className="flex cursor-pointer items-start gap-3"
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={text === option}
                  onChange={() =>
                    onChange(field.id, option)
                  }
                  className="mt-1 size-4 shrink-0 accent-[var(--color-secondary,#c0392b)]"
                />

                <span className="text-sm leading-6 text-muted">
                  {option}
                </span>
              </label>
            ),
          )}
        </div>
      ) : field.type === "checkbox" ? (
        <div className="mt-3 space-y-2.5">
          {(field.options ?? []).map(
            (option) => (
              <label
                key={option}
                className="flex cursor-pointer items-start gap-3"
              >
                <input
                  type="checkbox"
                  checked={list.includes(
                    option,
                  )}
                  onChange={() =>
                    onToggle(field.id, option)
                  }
                  className="mt-1 size-4 shrink-0 accent-[var(--color-secondary,#c0392b)]"
                />

                <span className="text-sm leading-6 text-muted">
                  {option}
                </span>
              </label>
            ),
          )}
        </div>
      ) : field.type === "file" ? (
        <p className="mt-3 border border-dashed border-border px-4 py-3 text-xs leading-6 text-muted">
          File uploads are not switched on yet.
          Send the file to the address on the
          page instead.
        </p>
      ) : (
        <input
          id={field.id}
          type={
            field.type === "email"
              ? "email"
              : field.type === "phone"
                ? "tel"
                : field.type === "url"
                  ? "url"
                  : field.type === "number"
                    ? "number"
                    : field.type === "date"
                      ? "date"
                      : "text"
          }
          value={text}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          min={field.min}
          max={field.max}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(e) =>
            onChange(field.id, e.target.value)
          }
          className={INPUT_CLASS}
        />
      )}

      <FieldNotes field={field} error={error} />
    </div>
  );
}

function FieldNotes({
  field,
  error,
}: Readonly<{
  field: FormField;
  error?: string;
}>) {
  return (
    <>
      {field.help ? (
        <p
          id={`${field.id}-help`}
          className="mt-2 text-xs leading-6 text-muted-light"
        >
          {field.help}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${field.id}-error`}
          role="alert"
          className="mt-2 text-xs font-semibold leading-6 text-secondary"
        >
          {error}
        </p>
      ) : null}
    </>
  );
}
