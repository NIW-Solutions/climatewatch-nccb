"use client";

import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Download,
  Loader2,
  Lock,
  Plus,
  Trash2,
} from "lucide-react";

import {
  FIELD_TYPE_LABELS,
  hasOptions,
  validateForm,
  type FieldType,
  type FormDefinition,
  type FormField,
  type FormStatus,
  type FormSubmission,
} from "@/lib/forms/types";

/**
 * Form builder — src/components/admin/AdminApp.tsx
 *
 * The whole admin, as one client component with four views: locked, the list
 * of forms, the builder, and a form's responses.
 *
 * One route rather than four, because every view needs the same session and
 * the same data, and a page reload between them would mean re-checking the
 * session and re-fetching the list each time for no benefit.
 *
 * NOTHING HERE IS A SECURITY BOUNDARY. Hiding the interface behind a
 * password check in the browser would stop nobody; every endpoint it calls
 * checks the session again on the server. This code decides what is worth
 * showing, not what is allowed.
 */

type View =
  | { name: "list" }
  | { name: "edit"; slug: string }
  | { name: "responses"; slug: string };

const BUTTON =
  "inline-flex min-h-10 items-center gap-2 border border-border-strong px-4 text-xs font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50";

const PRIMARY_BUTTON =
  "inline-flex min-h-10 items-center gap-2 bg-secondary px-5 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark disabled:cursor-not-allowed disabled:opacity-50";

const INPUT =
  "mt-2 w-full border border-border bg-surface px-3.5 py-2.5 text-sm text-primary transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none";

const LABEL =
  "block text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function emptyForm(): FormDefinition {
  const now = new Date().toISOString();

  return {
    slug: "",
    title: "",
    description: "",
    fields: [],
    status: "draft",
    confirmation:
      "Thank you — we have your response.",
    notify: [],
    createdAt: now,
    updatedAt: now,
    privacyNote: "",
  };
}

function newField(
  type: FieldType,
  index: number,
): FormField {
  return {
    /* Random, not positional: a field's id must survive reordering. */
    id: `f${Date.now().toString(36)}${index}`,
    type,
    label: "",
    required: false,
    ...(hasOptions(type)
      ? { options: ["Option 1"] }
      : {}),
  };
}

export function AdminApp() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] =
    useState(false);
  const [configured, setConfigured] =
    useState(true);
  const [mode, setMode] = useState<
    "cognito" | "password" | "unconfigured"
  >("password");
  const [email, setEmail] = useState<
    string | null
  >(null);

  const [forms, setForms] = useState<
    FormDefinition[]
  >([]);
  const [view, setView] = useState<View>({
    name: "list",
  });

  const refresh = useCallback(async () => {
    const res = await fetch(
      "/api/admin/forms",
      { cache: "no-store" },
    );

    if (res.ok) {
      const data = await res.json();
      setForms(data.forms ?? []);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch(
          "/api/admin/session",
          { cache: "no-store" },
        );
        const data = await res.json();

        if (cancelled) return;

        setConfigured(
          data.configured !== false,
        );
        setMode(data.mode ?? "password");
        setEmail(data.email ?? null);
        setSignedIn(data.signedIn === true);

        if (data.signedIn) {
          await refresh();
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    check();

    return () => {
      cancelled = true;
    };
  }, [refresh]);

  if (!ready) {
    return (
      <div className="flex items-center gap-3 py-20 text-sm text-muted">
        <Loader2
          aria-hidden="true"
          className="size-4 animate-spin"
        />
        Checking…
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="max-w-xl border border-border bg-surface p-8">
        <h2 className="font-editorial text-xl font-medium text-primary">
          Admin access is not set up.
        </h2>

        <p className="mt-4 text-sm leading-7 text-muted">
          Set{" "}
          <code className="text-primary">
            FORMS_ADMIN_PASSWORD
          </code>{" "}
          and{" "}
          <code className="text-primary">
            FORMS_SESSION_SECRET
          </code>{" "}
          in the Amplify console, then redeploy.
        </p>
      </div>
    );
  }

  if (!signedIn) {
    return mode === "cognito" ? (
      <CognitoSignIn />
    ) : (
      <SignIn
        onSignedIn={async () => {
          setSignedIn(true);
          await refresh();
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
          Forms
        </p>

        <div className="flex items-center gap-4">
          {email ? (
            <p className="text-xs text-muted-light">
              {email}
            </p>
          ) : null}

          <button
            type="button"
            className="text-xs font-semibold text-muted transition-colors hover:text-primary"
            onClick={async () => {
              const res = await fetch(
                "/api/admin/session",
                { method: "DELETE" },
              );

              const data = await res
                .json()
                .catch(() => ({}));

              setSignedIn(false);
              setForms([]);
              setView({ name: "list" });

              /*
                Cognito keeps its own session. Without this the next sign-in
                would go straight through without asking for anything.
              */
              if (data.logoutUrl) {
                window.location.href =
                  data.logoutUrl;
              }
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {view.name === "list" ? (
        <FormList
          forms={forms}
          onOpen={(slug) =>
            setView({ name: "edit", slug })
          }
          onResponses={(slug) =>
            setView({
              name: "responses",
              slug,
            })
          }
          onNew={() =>
            setView({ name: "edit", slug: "" })
          }
          onDeleted={refresh}
        />
      ) : view.name === "edit" ? (
        <FormEditor
          initial={
            forms.find(
              (f) => f.slug === view.slug,
            ) ?? emptyForm()
          }
          onDone={async () => {
            await refresh();
            setView({ name: "list" });
          }}
          onCancel={() =>
            setView({ name: "list" })
          }
        />
      ) : (
        <Responses
          slug={view.slug}
          onBack={() =>
            setView({ name: "list" })
          }
        />
      )}
    </div>
  );
}

/* ==========================================
   SIGN IN
   ========================================== */

function SignIn({
  onSignedIn,
}: Readonly<{ onSignedIn: () => void }>) {
  const [password, setPassword] =
    useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<
    string | null
  >(null);

  return (
    <form
      className="max-w-sm border border-border bg-surface p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setError(null);

        try {
          const res = await fetch(
            "/api/admin/session",
            {
              method: "POST",
              headers: {
                "content-type":
                  "application/json",
              },
              body: JSON.stringify({
                password,
              }),
            },
          );

          if (res.ok) {
            onSignedIn();
            return;
          }

          const data = await res
            .json()
            .catch(() => ({}));

          setError(
            data.error ??
              "Could not sign in.",
          );
        } catch {
          setError(
            "Could not reach the server.",
          );
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="flex size-10 items-center justify-center bg-primary text-white">
        <Lock
          aria-hidden="true"
          className="size-4"
          strokeWidth={1.8}
        />
      </div>

      <h2 className="mt-6 font-editorial text-xl font-medium text-primary">
        Sign in
      </h2>

      <label
        htmlFor="admin-password"
        className={`${LABEL} mt-7`}
      >
        Password
      </label>

      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className={INPUT}
      />

      {error ? (
        <p
          role="alert"
          className="mt-3 text-xs font-semibold text-secondary"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy || !password}
        className={`${PRIMARY_BUTTON} mt-6`}
      >
        {busy ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}

/* ==========================================
   LIST
   ========================================== */

const STATUS_STYLE: Record<
  FormStatus,
  string
> = {
  open: "text-secondary",
  draft: "text-muted-light",
  closed: "text-muted",
};

function FormList({
  forms,
  onOpen,
  onResponses,
  onNew,
  onDeleted,
}: Readonly<{
  forms: FormDefinition[];
  onOpen: (slug: string) => void;
  onResponses: (slug: string) => void;
  onNew: () => void;
  onDeleted: () => void;
}>) {
  return (
    <div className="pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-editorial text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
          Your forms
        </h1>

        <button
          type="button"
          onClick={onNew}
          className={PRIMARY_BUTTON}
        >
          <Plus
            aria-hidden="true"
            className="size-3.5"
            strokeWidth={2}
          />
          New form
        </button>
      </div>

      {forms.length === 0 ? (
        <p className="mt-10 border-t border-border pt-8 text-sm leading-7 text-muted">
          No forms yet. Make one, add some
          fields, then set it to Open when you
          are ready for people to fill it in.
        </p>
      ) : (
        <ul className="mt-10 space-y-px border border-border bg-border">
          {forms.map((form) => (
            <li
              key={form.slug}
              className="bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className={`text-[0.6875rem] font-bold uppercase tracking-[0.12em] ${STATUS_STYLE[form.status]}`}
                  >
                    {form.status}
                  </p>

                  <h2 className="mt-2 font-editorial text-lg font-medium text-primary">
                    {form.title ||
                      "Untitled form"}
                  </h2>

                  <p className="mt-1.5 truncate text-xs text-muted-light">
                    /forms/{form.slug} ·{" "}
                    {form.fields.length}{" "}
                    {form.fields.length === 1
                      ? "field"
                      : "fields"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {form.status === "open" ? (
                    <button
                      type="button"
                      title="Copy the public link"
                      className={BUTTON}
                      onClick={() => {
                        navigator.clipboard?.writeText(
                          `${window.location.origin}/forms/${form.slug}`,
                        );
                      }}
                    >
                      <Copy
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.8}
                      />
                      Link
                    </button>
                  ) : null}

                  <button
                    type="button"
                    className={BUTTON}
                    onClick={() =>
                      onResponses(form.slug)
                    }
                  >
                    Responses
                  </button>

                  <button
                    type="button"
                    className={BUTTON}
                    onClick={() =>
                      onOpen(form.slug)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    aria-label={`Delete ${form.title || form.slug}`}
                    className={BUTTON}
                    onClick={async () => {
                      if (
                        !window.confirm(
                          `Delete "${form.title || form.slug}"?\n\nResponses already collected are kept — this removes the form itself.`,
                        )
                      ) {
                        return;
                      }

                      await fetch(
                        `/api/admin/forms?slug=${encodeURIComponent(form.slug)}`,
                        { method: "DELETE" },
                      );

                      onDeleted();
                    }}
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ==========================================
   EDITOR
   ========================================== */

function FormEditor({
  initial,
  onDone,
  onCancel,
}: Readonly<{
  initial: FormDefinition;
  onDone: () => void;
  onCancel: () => void;
}>) {
  const [form, setForm] =
    useState<FormDefinition>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<
    string | null
  >(null);

  const isNew = initial.slug === "";
  const problems = validateForm(form);

  function patch(
    changes: Partial<FormDefinition>,
  ) {
    setForm((current) => ({
      ...current,
      ...changes,
    }));
  }

  function patchField(
    index: number,
    changes: Partial<FormField>,
  ) {
    setForm((current) => ({
      ...current,
      fields: current.fields.map((f, i) =>
        i === index
          ? { ...f, ...changes }
          : f,
      ),
    }));
  }

  function moveField(
    index: number,
    by: number,
  ) {
    const target = index + by;

    if (
      target < 0 ||
      target >= form.fields.length
    ) {
      return;
    }

    const next = [...form.fields];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);

    patch({ fields: next });
  }

  async function save(status: FormStatus) {
    setBusy(true);
    setError(null);

    try {
      const res = await fetch(
        "/api/admin/forms",
        {
          method: "PUT",
          headers: {
            "content-type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            status,
            slug:
              form.slug ||
              slugify(form.title),
          }),
        },
      );

      if (res.ok) {
        onDone();
        return;
      }

      const data = await res
        .json()
        .catch(() => ({}));

      setError(
        data.error ?? "Could not save.",
      );
    } catch {
      setError(
        "Could not reach the server.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pt-10">
      <button
        type="button"
        onClick={onCancel}
        className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light transition-colors hover:text-primary"
      >
        ← All forms
      </button>

      <h1 className="mt-6 font-editorial text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
        {isNew ? "New form" : "Edit form"}
      </h1>

      {/* SETTINGS */}

      <div className="mt-10 grid gap-6 border border-border bg-surface p-6 sm:grid-cols-2 sm:p-8">
        <div className="sm:col-span-2">
          <label
            htmlFor="form-title"
            className={LABEL}
          >
            Title
          </label>

          <input
            id="form-title"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;

              patch({
                title,
                /* The address follows the title until it is saved once. */
                slug: isNew
                  ? slugify(title)
                  : form.slug,
              });
            }}
            className={INPUT}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="form-slug"
            className={LABEL}
          >
            Web address
          </label>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-muted-light">
              /forms/
            </span>

            <input
              id="form-slug"
              value={form.slug}
              onChange={(e) =>
                patch({
                  slug: slugify(
                    e.target.value,
                  ),
                })
              }
              className="w-full border border-border bg-surface px-3.5 py-2.5 text-sm text-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="form-description"
            className={LABEL}
          >
            Description
          </label>

          <textarea
            id="form-description"
            rows={3}
            value={form.description ?? ""}
            onChange={(e) =>
              patch({
                description: e.target.value,
              })
            }
            className={`${INPUT} resize-y`}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="form-privacy"
            className={LABEL}
          >
            What you will do with the data
          </label>

          <textarea
            id="form-privacy"
            rows={3}
            value={form.privacyNote}
            placeholder="e.g. Your details are used only to process this application and are kept for twelve months."
            onChange={(e) =>
              patch({
                privacyNote: e.target.value,
              })
            }
            className={`${INPUT} resize-y`}
          />

          <p className="mt-2 text-xs leading-6 text-muted-light">
            Shown above the submit button.
            Required before a form can be
            opened — you are asking people for
            their details, so they get to know
            why.
          </p>
        </div>

        <div>
          <label
            htmlFor="form-confirmation"
            className={LABEL}
          >
            Message after submitting
          </label>

          <input
            id="form-confirmation"
            value={form.confirmation}
            onChange={(e) =>
              patch({
                confirmation: e.target.value,
              })
            }
            className={INPUT}
          />
        </div>

        <div>
          <label
            htmlFor="form-notify"
            className={LABEL}
          >
            Email these addresses on each response
          </label>

          <input
            id="form-notify"
            value={form.notify.join(", ")}
            placeholder="hr@climatewatch-nccb.org, info@climatewatch-nccb.org"
            onChange={(e) =>
              patch({
                notify: e.target.value
                  .split(",")
                  .map((a) => a.trim())
                  .filter(Boolean),
              })
            }
            className={INPUT}
          />

          <p className="mt-2 text-xs leading-6 text-muted-light">
            Separate with commas. The email says
            a response arrived and links here —
            it never contains the answers
            themselves, because applications hold
            personal details and email is the
            least private place to keep them.
          </p>
        </div>

        <div>
          <label
            htmlFor="form-closes"
            className={LABEL}
          >
            Closes on (optional)
          </label>

          <input
            id="form-closes"
            type="date"
            value={form.closesOn ?? ""}
            onChange={(e) =>
              patch({
                closesOn:
                  e.target.value || undefined,
              })
            }
            className={INPUT}
          />
        </div>
      </div>

      {/* FIELDS */}

      <div className="mt-10">
        <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary">
          Questions
        </h2>

        <ul className="mt-5 space-y-4">
          {form.fields.map((field, index) => (
            <li
              key={field.id}
              className="border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <select
                  aria-label="Question type"
                  value={field.type}
                  onChange={(e) => {
                    const type = e.target
                      .value as FieldType;

                    patchField(index, {
                      type,
                      options: hasOptions(type)
                        ? (field.options ?? [
                            "Option 1",
                          ])
                        : undefined,
                    });
                  }}
                  className="border border-border bg-background px-3 py-2 text-xs font-semibold text-primary focus:border-primary focus:outline-none"
                >
                  {Object.entries(
                    FIELD_TYPE_LABELS,
                  ).map(([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-muted">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        patchField(index, {
                          required:
                            e.target.checked,
                        })
                      }
                      className="size-3.5 accent-[var(--color-secondary,#c0392b)]"
                    />
                    Required
                  </label>

                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() =>
                      moveField(index, -1)
                    }
                    className="inline-flex size-8 items-center justify-center border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
                  >
                    <ArrowUp
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </button>

                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={
                      index ===
                      form.fields.length - 1
                    }
                    onClick={() =>
                      moveField(index, 1)
                    }
                    className="inline-flex size-8 items-center justify-center border border-border text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
                  >
                    <ArrowDown
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </button>

                  <button
                    type="button"
                    aria-label="Delete question"
                    onClick={() =>
                      patch({
                        fields:
                          form.fields.filter(
                            (_, i) =>
                              i !== index,
                          ),
                      })
                    }
                    className="inline-flex size-8 items-center justify-center border border-border text-muted transition-colors hover:border-secondary hover:text-secondary"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
              </div>

              <input
                aria-label="Question"
                value={field.label}
                placeholder="Question"
                onChange={(e) =>
                  patchField(index, {
                    label: e.target.value,
                  })
                }
                className={INPUT}
              />

              <input
                aria-label="Help text"
                value={field.help ?? ""}
                placeholder="Help text (optional)"
                onChange={(e) =>
                  patchField(index, {
                    help:
                      e.target.value ||
                      undefined,
                  })
                }
                className={`${INPUT} text-xs`}
              />

              {hasOptions(field.type) ? (
                <Options
                  options={
                    field.options ?? []
                  }
                  onChange={(options) =>
                    patchField(index, {
                      options,
                    })
                  }
                />
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {(
            [
              "short-text",
              "long-text",
              "email",
              "radio",
              "checkbox",
              "select",
              "date",
              "consent",
            ] as FieldType[]
          ).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                patch({
                  fields: [
                    ...form.fields,
                    newField(
                      type,
                      form.fields.length,
                    ),
                  ],
                })
              }
              className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-2 text-xs font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <Plus
                aria-hidden="true"
                className="size-3"
                strokeWidth={2}
              />
              {FIELD_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* SAVE */}

      <div className="mt-10 border-t border-border pt-7">
        {problems.length > 0 ? (
          <div className="mb-6 border-l-2 border-secondary pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.11em] text-secondary">
              Before this can be opened
            </p>

            <ul className="mt-2 space-y-1">
              {problems.map((problem) => (
                <li
                  key={problem}
                  className="text-sm leading-6 text-muted"
                >
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mb-5 text-sm font-semibold text-secondary"
          >
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => save("draft")}
            className={BUTTON}
          >
            Save as draft
          </button>

          <button
            type="button"
            disabled={
              busy || problems.length > 0
            }
            onClick={() => save("open")}
            className={PRIMARY_BUTTON}
          >
            {busy
              ? "Saving…"
              : "Open for responses"}
          </button>

          {form.status !== "draft" ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => save("closed")}
              className={BUTTON}
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Options({
  options,
  onChange,
}: Readonly<{
  options: readonly string[];
  onChange: (options: string[]) => void;
}>) {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className={LABEL}>Options</p>

      <ul className="mt-3 space-y-2">
        {options.map((option, index) => (
          <li
            key={index}
            className="flex items-center gap-2"
          >
            <input
              aria-label={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                onChange(
                  options.map((o, i) =>
                    i === index
                      ? e.target.value
                      : o,
                  ),
                )
              }
              className="w-full border border-border bg-background px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none"
            />

            <button
              type="button"
              aria-label={`Remove option ${index + 1}`}
              onClick={() =>
                onChange(
                  options.filter(
                    (_, i) => i !== index,
                  ),
                )
              }
              className="inline-flex size-8 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-secondary hover:text-secondary"
            >
              <Trash2
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.8}
              />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          onChange([
            ...options,
            `Option ${options.length + 1}`,
          ])
        }
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-secondary"
      >
        <Plus
          aria-hidden="true"
          className="size-3"
          strokeWidth={2}
        />
        Add option
      </button>
    </div>
  );
}

/* ==========================================
   RESPONSES
   ========================================== */

function Responses({
  slug,
  onBack,
}: Readonly<{
  slug: string;
  onBack: () => void;
}>) {
  const [form, setForm] =
    useState<FormDefinition | null>(null);
  const [rows, setRows] = useState<
    FormSubmission[]
  >([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `/api/admin/submissions?slug=${encodeURIComponent(slug)}`,
          { cache: "no-store" },
        );

        if (!res.ok) return;

        const data = await res.json();

        if (cancelled) return;

        setForm(data.form ?? null);
        setRows(data.submissions ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* File fields are shown as download links rather than dropped. */
  const columns = form?.fields ?? [];

  return (
    <div className="pt-10">
      <button
        type="button"
        onClick={onBack}
        className="text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light transition-colors hover:text-primary"
      >
        ← All forms
      </button>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-editorial text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
            {form?.title ?? slug}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {loading
              ? "Loading…"
              : `${rows.length} ${rows.length === 1 ? "response" : "responses"}`}
          </p>
        </div>

        {rows.length > 0 ? (
          <a
            href={`/api/admin/submissions?slug=${encodeURIComponent(slug)}&format=csv`}
            className={PRIMARY_BUTTON}
          >
            <Download
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
            Download CSV
          </a>
        ) : null}
      </div>

      {!loading && rows.length === 0 ? (
        <p className="mt-10 border-t border-border pt-8 text-sm leading-7 text-muted">
          Nothing yet.
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div className="mt-10 overflow-x-auto border border-border">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="bg-surface">
                <th className="whitespace-nowrap border-b border-border px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  Submitted
                </th>

                {columns.map((field) => (
                  <th
                    key={field.id}
                    className="whitespace-nowrap border-b border-border px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light"
                  >
                    {field.label || field.id}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.submissionId}
                  className="align-top"
                >
                  <td className="whitespace-nowrap border-b border-border px-4 py-3 text-xs text-muted-light">
                    {new Date(
                      row.submittedAt,
                    ).toLocaleString("en-GB")}
                  </td>

                  {columns.map((field) => {
                    const value =
                      row.answers[field.id];

                    if (
                      field.type === "file"
                    ) {
                      const hasFile =
                        row.files?.[field.id];

                      return (
                        <td
                          key={field.id}
                          className="border-b border-border px-4 py-3 text-sm leading-6 text-primary"
                        >
                          {hasFile ? (
                            <a
                              href={`/api/admin/files?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(row.submissionId)}&field=${encodeURIComponent(field.id)}`}
                              className="group inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-secondary"
                            >
                              <Download
                                aria-hidden="true"
                                className="size-3.5 shrink-0"
                                strokeWidth={1.8}
                              />
                              {typeof value ===
                              "string"
                                ? value
                                : "Download"}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={field.id}
                        className="border-b border-border px-4 py-3 text-sm leading-6 text-primary"
                      >
                        {Array.isArray(value)
                          ? value.join(", ")
                          : (value ?? "—")}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

/* ==========================================
   COGNITO SIGN IN
   ========================================== */

/**
 * No password field: the password is typed on Cognito's own hosted page,
 * never on ours. That is the point of the hosted flow — this site never sees
 * anyone's credentials, so it cannot leak them.
 */
function CognitoSignIn() {
  /*
    useSearchParams rather than reading window.location in an effect: the
    effect version sets state synchronously, which renders twice before
    paint, and reading the URL during render would disagree between the
    server pass and the browser.
  */
  const error =
    useSearchParams().get("error");

  const problem = !error
    ? null
    : error === "denied"
      ? "Sign-in was cancelled."
      : error === "bad-state"
        ? "That sign-in link had expired. Please try again."
        : "Sign-in did not complete. Please try again.";

  return (
    <div className="max-w-sm border border-border bg-surface p-8">
      <div className="flex size-10 items-center justify-center bg-primary text-white">
        <Lock
          aria-hidden="true"
          className="size-4"
          strokeWidth={1.8}
        />
      </div>

      <h2 className="mt-6 font-editorial text-xl font-medium text-primary">
        Sign in
      </h2>

      <p className="mt-4 text-sm leading-7 text-muted">
        Use your ClimateWatch account.
      </p>

      {problem ? (
        <p
          role="alert"
          className="mt-4 text-xs font-semibold text-secondary"
        >
          {problem}
        </p>
      ) : null}

      <a
        href="/api/admin/login"
        className={`${PRIMARY_BUTTON} mt-6`}
      >
        Continue
      </a>
    </div>
  );
}
