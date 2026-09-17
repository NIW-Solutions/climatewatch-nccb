import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FormRenderer } from "@/components/forms/FormRenderer";
import { getForm } from "@/lib/forms/store";

/**
 * Public form — src/app/forms/[slug]/page.tsx
 *
 * Renders whatever the builder has published at this address.
 *
 * Server-rendered on demand rather than prerendered: a form's definition
 * lives in DynamoDB and can change between one visitor and the next, and a
 * cached copy of a closed form still taking answers would be worse than a
 * slightly slower page.
 *
 * A form that is not "open" is a 404 to the public, not a page saying "this
 * is a draft" — a draft's existence is not public information.
 */

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const form = await getForm(slug);

  if (!form || form.status !== "open") {
    return {
      title: "Form",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: form.title,
    description: form.description,
    alternates: {
      canonical: `/forms/${form.slug}`,
    },
  };
}

function isPastClosingDate(
  closesOn?: string,
): boolean {
  if (!closesOn) return false;

  return (
    new Date(
      `${closesOn}T23:59:59`,
    ).getTime() < Date.now()
  );
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await getForm(slug);

  if (!form) {
    notFound();
  }

  const closed =
    form.status === "closed" ||
    isPastClosingDate(form.closesOn);

  if (form.status === "draft") {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-border bg-surface">
        <div className="site-container pt-32 pb-12 sm:pt-36 sm:pb-16">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-secondary"
            />

            <p className="eyebrow text-primary">
              {closed
                ? "Closed"
                : "Form"}
            </p>
          </div>

          <h1 className="mt-8 max-w-3xl font-editorial text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
            {form.title}
          </h1>

          {form.description ? (
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted">
              {form.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="max-w-2xl">
            {closed ? (
              <p className="border-t border-border pt-10 text-base leading-8 text-muted">
                This form is no longer accepting
                responses.
              </p>
            ) : (
              <FormRenderer form={form} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
