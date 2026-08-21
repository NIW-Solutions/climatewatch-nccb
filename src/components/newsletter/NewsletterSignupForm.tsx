"use client";

import {
  useState,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  Check,
} from "lucide-react";

import { newsletterContent } from "@/content/newsletter";

type Status =
  | "idle"
  | "sending"
  | "done"
  | "error";

/**
 * Newsletter signup.
 *
 * Unlike the contact form, this posts to a real endpoint and reports what
 * actually happened. If the provider is not configured the API answers 503
 * and the visitor is told plainly, rather than being shown a success state
 * for an address that went nowhere.
 */
export function NewsletterSignupForm() {
  const { signup } =
    newsletterContent;

  const [email, setEmail] =
    useState("");
  const [status, setStatus] =
    useState<Status>("idle");
  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        "/api/newsletter",
        {
          method: "POST",
          headers: {
            "content-type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const body = (await response
        .json()
        .catch(() => ({}))) as {
        message?: string;
      };

      if (response.ok) {
        setStatus("done");
        setMessage(
          body.message ??
            "Subscribed.",
        );
        return;
      }

      setStatus("error");
      setMessage(
        body.message ??
          "Something went wrong. Please try again.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "Could not reach the server. Please try again.",
      );
    }
  }

  if (status === "done") {
    return (
      <div className="border-t border-border pt-8">
        <div className="flex size-11 items-center justify-center bg-primary text-white">
          <Check
            aria-hidden="true"
            className="size-5"
            strokeWidth={1.7}
          />
        </div>

        <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border pt-8"
    >
      <label
        htmlFor="newsletter-email"
        className="block text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light"
      >
        {signup.label}
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value,
            )
          }
          placeholder={
            signup.placeholder
          }
          className="w-full border border-border bg-surface px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-muted-light focus:border-primary sm:max-w-md"
        />

        <button
          type="submit"
          disabled={
            status === "sending"
          }
          /* Secondary, matching the Donate button: subscribing is the one
             action this page exists for, so it carries the louder colour
             rather than the navy used for ordinary links. */
          className="group inline-flex items-center justify-center gap-2 bg-secondary px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] !text-white transition-colors hover:!bg-secondary-dark hover:!text-white disabled:opacity-60"
        >
          {status === "sending"
            ? "Sending…"
            : signup.action}

          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.7}
          />
        </button>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-4 max-w-xl text-sm leading-7 text-secondary"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
