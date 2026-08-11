import {
  ArrowRight,
  Mail,
} from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { InView } from "@/components/motion-primitives/InView";
import { contactContent } from "@/content/contact";

export function ContactPageContent() {
  const {
    hero,
    routes,
    form,
    direct,
    organisation,
  } = contactContent;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="contact-heading"
        className="bg-primary pt-32 text-white sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="grid gap-8 border-t border-white/20 pt-6 lg:grid-cols-[0.65fr_1.55fr_0.8fr] lg:gap-12">
              {/* Label */}

              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-white/70">
                    {hero.eyebrow}
                  </p>
                </div>
              </div>

              {/* Heading */}

              <div>
                <h1
                  id="contact-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.6rem,4.3vw,4.5rem)] font-medium leading-[1.01] tracking-[-0.045em] text-white"
                >
                  {hero.title}
                </h1>
              </div>

              {/* Description */}

              <div>
                <p className="max-w-sm text-sm leading-7 text-white/70">
                  {hero.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-white/20 pb-6 sm:mt-14">
            <a
              href="mailto:info@climatewatch-nccb.org"
              className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
            >
              info@climatewatch-nccb.org

              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.7}
              />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================
          ENQUIRY ROUTING
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell">
          <InView>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.4fr_0.9fr] lg:gap-12">
              <div>
                <p className="eyebrow text-primary">
                  {routes.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(2rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                  {routes.title}
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted">
                  Choose the closest enquiry
                  area or use the general
                  contact form below.
                </p>
              </div>
            </div>
          </InView>

          {/* Routes */}

          <div className="mt-12 border-t border-border">
            {routes.items.map(
              (item, index) => (
                <InView
                  key={item.number}
                  delay={index * 0.025}
                  amount={0.08}
                >
                  <article className="group border-b border-border">
                    <div className="grid gap-y-5 py-7 sm:py-8 lg:grid-cols-[4rem_10rem_minmax(0,1fr)_3rem] lg:items-start lg:gap-x-9">
                      <span className="editorial-index">
                        {item.number}
                      </span>

                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.11em] text-secondary">
                        {item.label}
                      </p>

                      <div>
                        <h3 className="font-editorial text-[clamp(1.5rem,2vw,2rem)] font-medium leading-[1.12] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                          {item.description}
                        </p>
                      </div>

                      <div className="hidden justify-end lg:flex">
                        <a
                          href={`mailto:info@climatewatch-nccb.org?subject=${encodeURIComponent(
                            item.subject,
                          )}`}
                          aria-label={`Email ClimateWatch about ${item.title}`}
                          className="grid size-10 place-items-center !text-primary transition-colors hover:!text-secondary"
                        >
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4"
                            strokeWidth={1.7}
                          />
                        </a>
                      </div>
                    </div>
                  </article>
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          CONTACT FORM
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[0.7fr_1.4fr_0.9fr] lg:gap-12">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {form.eyebrow}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(2rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-primary">
                  {form.title}
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted">
                  {form.description}
                </p>
              </div>
            </div>
          </InView>

          <InView
            className="mt-12"
            amount={0.05}
          >
            <ContactForm />
          </InView>
        </div>
      </section>

      {/* =====================================
          DIRECT CONTACT
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-y border-border py-9 sm:py-11 lg:grid-cols-[0.65fr_1.45fr_0.9fr] lg:items-center lg:gap-12">
              <div>
                <p className="eyebrow text-primary">
                  {direct.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="font-editorial text-[clamp(1.8rem,2.6vw,2.65rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {direct.title}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                  {direct.description}
                </p>
              </div>

              <div className="lg:text-right">
                <a
                  href={`mailto:${direct.email}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.7}
                  />

                  {direct.email}
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          ORGANISATION
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.65fr_1.55fr_0.8fr] lg:gap-12 lg:py-20">
              <div>
                <p className="eyebrow text-white/50">
                  {organisation.eyebrow}
                </p>
              </div>

              <div>
                <p className="max-w-3xl font-editorial text-[clamp(1.7rem,2.6vw,2.6rem)] font-medium leading-[1.16] tracking-[-0.03em] text-white">
                  {organisation.title}
                </p>
              </div>

              <div>
                <p className="max-w-sm text-sm leading-7 text-white/65">
                  {organisation.description}
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}