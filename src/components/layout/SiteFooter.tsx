import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

import { ClimateWatchLogo } from "@/src/components/layout/Climatewatchlogo.webp";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* =====================================
          BRAND ACCENT
          ===================================== */}

      <div className="h-1 bg-secondary" />

      {/* =====================================
          MAIN FOOTER
          ===================================== */}

      <div className="site-container">
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.65fr_0.65fr_0.8fr] lg:gap-10 lg:py-20">
          {/* =====================================
              IDENTITY
              ===================================== */}

          <div>
            <Link
              href="/"
              aria-label="ClimateWatch home"
              className="inline-flex"
            >
              <ClimateWatchLogo variant="light" />
            </Link>

            <p className="mt-8 max-w-md text-sm leading-7 text-white/65">
              ClimateWatch is a youth-led
              climate think tank working on
              international climate policy,
              research and development
              across Pakistan.
            </p>

            <p className="mt-4 max-w-md text-xs leading-6 text-white/45">
              International Climate policy, research,
              education for sustainable
              development and work ingrained in
              evidence that comes from community
              experience.
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
            >
              <Mail
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.7}
              />

              {siteConfig.email}
            </a>
          </div>

          {/* =====================================
              EXPLORE
              ===================================== */}

          <FooterColumn
            title="Explore"
            links={[
              ...siteConfig.navigation,
            ]}
          />

          {/* =====================================
              ORGANISATION
              ===================================== */}

          <FooterColumn
            title="Organisation"
            links={[
              {
                label: "Our Team",
                href: "/team",
              },
              {
                label: "Contact",
                href: "/contact",
              },
              {
                label: "Privacy Policy",
                href: "/privacy",
              },
              {
                label: "Terms of Use",
                href: "/terms",
              },
            ]}
          />

          {/* =====================================
              CONNECT
              ===================================== */}

          <div>
            <FooterHeading>
              Connect
            </FooterHeading>

            <div className="mt-6 space-y-4">
              <ExternalFooterLink
                href={
                  siteConfig.socialLinks
                    .linkedin
                }
              >
                LinkedIn
              </ExternalFooterLink>

              <ExternalFooterLink
                href={
                  siteConfig.socialLinks
                    .instagram
                }
              >
                Instagram
              </ExternalFooterLink>

              <ExternalFooterLink
                href={
                  siteConfig.socialLinks
                    .youtube
                }
              >
                YouTube
              </ExternalFooterLink>

              <ExternalFooterLink
                href={
                  siteConfig.socialLinks
                    .linktree
                }
              >
                Resources
              </ExternalFooterLink>
            </div>

            {/* Institutional status */}

            <div className="mt-9 border-t border-white/15 pt-6">
              <p className="text-[0.54rem] font-bold uppercase tracking-[0.11em] text-white/40">
                Institutional status
              </p>

              <p className="mt-3 text-xs leading-6 text-white/60">
                ClimateWatch
                <br />
                ECOSOC-accredited
                organisation
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            LOWER FOOTER
            ===================================== */}

        <div className="border-t border-white/15">
          <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.1em] text-white/40">
              © {year} ClimateWatch
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.1em] text-white/40">
                Pakistan
              </p>

              <span
                aria-hidden="true"
                className="hidden size-1 bg-secondary sm:block"
              />

              <p className="text-[0.56rem] font-semibold uppercase tracking-[0.1em] text-white/40">
                Climate policy · Research ·
                Development
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================
   FOOTER COLUMN
   ========================================== */

function FooterColumn({
  title,
  links,
}: Readonly<{
  title: string;
  links: readonly {
    label: string;
    href: string;
  }[];
}>) {
  return (
    <div>
      <FooterHeading>
        {title}
      </FooterHeading>

      <nav
        aria-label={`${title} footer navigation`}
        className="mt-6 space-y-4"
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block w-fit text-sm !text-white/65 transition-colors hover:!text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

/* ==========================================
   FOOTER HEADING
   ========================================== */

function FooterHeading({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <p className="text-[0.57rem] font-bold uppercase tracking-[0.12em] text-white/40">
      {children}
    </p>
  );
}

/* ==========================================
   EXTERNAL LINK
   ========================================== */

function ExternalFooterLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex w-fit items-center gap-2 text-sm !text-white/65 transition-colors hover:!text-white"
    >
      {children}

      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.6}
      />
    </a>
  );
}
