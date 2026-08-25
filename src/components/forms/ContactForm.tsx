"use client";

import {
  type FormEvent,
  useState,
} from "react";

import {
  ArrowRight,
  Check,
} from "lucide-react";

import { contactContent } from "@/content/contact";

type FormState = {
  name: string;
  email: string;
  organisation: string;
  enquiryType: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  organisation: "",
  enquiryType: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] =
    useState<FormState>(
      initialFormState,
    );

  const [submitted, setSubmitted] =
    useState(false);

  function updateField(
    field: keyof FormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    /*
     * Backend will be connected later.
     * For now we only show a successful
     * front-end submission state.
     */

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border-t border-border py-10 sm:py-12">
        <div className="flex size-11 items-center justify-center bg-primary text-white">
          <Check
            aria-hidden="true"
            className="size-5"
            strokeWidth={1.7}
          />
        </div>

        <h3 className="mt-7 max-w-xl font-editorial text-[clamp(1.8rem,2.8vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
          Your enquiry is ready.
        </h3>

        <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
          The contact form interface is
          complete. Submission delivery
          will be connected when the
          website backend is configured.
        </p>

        <button
          type="button"
          onClick={() => {
            setForm(
              initialFormState,
            );
            setSubmitted(false);
          }}
          className="mt-7 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
        >
          Send another enquiry

          <ArrowRight
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.7}
          />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border"
    >
      {/* NAME + EMAIL */}

      <div className="grid border-b border-border lg:grid-cols-2">
        <ContactField
          label="Your name"
          required
          className="border-b border-border lg:border-b-0 lg:border-r"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            required
            autoComplete="name"
            onChange={(event) =>
              updateField(
                "name",
                event.target.value,
              )
            }
            className="contact-input"
            placeholder="Full name"
          />
        </ContactField>

        <ContactField
          label="Email address"
          required
        >
          <input
            type="email"
            name="email"
            value={form.email}
            required
            autoComplete="email"
            onChange={(event) =>
              updateField(
                "email",
                event.target.value,
              )
            }
            className="contact-input"
            placeholder="name@example.com"
          />
        </ContactField>
      </div>

      {/* ORGANISATION + TYPE */}

      <div className="grid border-b border-border lg:grid-cols-2">
        <ContactField
          label="Organisation"
          className="border-b border-border lg:border-b-0 lg:border-r"
        >
          <input
            type="text"
            name="organisation"
            value={form.organisation}
            autoComplete="organization"
            onChange={(event) =>
              updateField(
                "organisation",
                event.target.value,
              )
            }
            className="contact-input"
            placeholder="Organisation or institution"
          />
        </ContactField>

        <ContactField
          label="Enquiry type"
          required
        >
          <select
            name="enquiryType"
            value={form.enquiryType}
            required
            onChange={(event) =>
              updateField(
                "enquiryType",
                event.target.value,
              )
            }
            className="contact-input cursor-pointer"
          >
            <option value="">
              Select an enquiry type
            </option>

            {contactContent.form.enquiryTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ),
            )}
          </select>
        </ContactField>
      </div>

      {/* MESSAGE */}

      <ContactField
        label="Message"
        required
        className="border-b border-border"
      >
        <textarea
          name="message"
          value={form.message}
          required
          rows={7}
          onChange={(event) =>
            updateField(
              "message",
              event.target.value,
            )
          }
          className="contact-input min-h-[12rem] resize-y"
          placeholder="Tell us how ClimateWatch can help."
        />
      </ContactField>

      {/* SUBMIT */}

      <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-xs leading-6 text-muted">
          Required fields are marked
          with an asterisk.
        </p>

        <button
          type="submit"
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 text-sm font-semibold !text-white transition-colors hover:!bg-primary-dark hover:!text-white"
        >
          Send enquiry

          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.7}
          />
        </button>
      </div>
    </form>
  );
}

function ContactField({
  label,
  required = false,
  className = "",
  children,
}: Readonly<{
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <label
      className={[
        "block px-0 py-6 lg:px-7",
        className,
      ].join(" ")}
    >
      <span className="mb-3 block text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-primary">
        {label}

        {required ? (
          <span className="ml-1 text-secondary">
            *
          </span>
        ) : null}
      </span>

      {children}
    </label>
  );
}