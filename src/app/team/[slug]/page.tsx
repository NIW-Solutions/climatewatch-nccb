import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CountryFlag } from "@/components/team/CountryFlag";
import { InView } from "@/components/motion-primitives/InView";
import { LoadedImage } from "@/components/ui/LoadedImage";
import {
  teamContent,
  type TeamProfile,
} from "@/content/team";

/**
 * Profile page — src/app/team/[slug]/page.tsx
 *
 * One page per advisor and board member.
 *
 * WHY: these biographies only existed inside a modal on /team. A modal has
 * no address, so an advisor's profile could not be linked to, shared, or
 * returned by a search for their name — which is how people look for a named
 * expert. Every one of them is now a page.
 *
 * The modal stays. It is the better experience for someone already reading
 * /team, and it now carries a permalink to the page for anyone who wants to
 * send it on.
 *
 * Covers all three groups, which share the TeamProfile shape: national
 * advisors, international advisors, and the board. Slugs are already unique
 * across the three — the board entries that double as advisors carry their
 * own, such as "atia-fehmi-board".
 */

const GROUPS = [
  {
    profiles: teamContent.advisors,
    label: "National Advisory",
    backTo: "#advisors",
  },
  {
    profiles: teamContent.internationalAdvisors,
    label: "International Advisory",
    backTo: "#international-advisors",
  },
  {
    profiles: teamContent.board,
    label: "Board of Directors",
    backTo: "#board",
  },
] as const;

type Found = {
  profile: TeamProfile;
  label: string;
  backTo: string;
};

function findProfile(
  slug: string,
): Found | undefined {
  for (const group of GROUPS) {
    const profile = (
      group.profiles as readonly TeamProfile[]
    ).find((p) => p.slug === slug);

    if (profile) {
      return {
        profile,
        label: group.label,
        backTo: group.backTo,
      };
    }
  }

  return undefined;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GROUPS.flatMap((group) =>
    (
      group.profiles as readonly TeamProfile[]
    ).map((profile) => ({
      slug: profile.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findProfile(slug);

  if (!found) {
    return { title: "Team" };
  }

  const { profile } = found;

  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    alternates: {
      canonical: `/team/${profile.slug}`,
    },
    openGraph: {
      type: "profile",
      title: `${profile.name} — ${profile.role}`,
      description: profile.summary,
      url: `/team/${profile.slug}`,
      ...(profile.image
        ? { images: [profile.image] }
        : {}),
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findProfile(slug);

  if (!found) {
    return null;
  }

  const { profile, label, backTo } = found;

  return (
    <main>
      {/*
        Person markup. The role and the affiliations are in the prose
        already; this states them in a form a search engine can read, which
        is the point of giving each advisor a page at all.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            description: profile.summary,
            url: `https://www.climatewatch-nccb.org/team/${profile.slug}`,
            ...(profile.image
              ? {
                  image: `https://www.climatewatch-nccb.org${profile.image}`,
                }
              : {}),
            ...(profile.linkedin
              ? { sameAs: [profile.linkedin] }
              : {}),
            affiliation: {
              "@type": "Organization",
              name: "ClimateWatch",
              url: "https://www.climatewatch-nccb.org",
            },
          }),
        }}
      />

      <section className="border-b border-border bg-surface">
        <div className="site-container pt-32 pb-14 sm:pt-36 sm:pb-16">
          <InView>
            <Link
              href={`/team${backTo}`}
              className="group inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-muted-light transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              {label}
            </Link>
          </InView>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
            {/* PORTRAIT */}

            {profile.image ? (
              <InView amount={0.1}>
                <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden bg-surface-muted">
                  <LoadedImage
                    src={profile.image}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 60vw, 288px"
                    className="object-cover"
                  />
                </div>
              </InView>
            ) : null}

            {/* IDENTITY */}

            <InView
              from="right"
              amount={0.1}
            >
              <h1 className="font-editorial text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.035em] text-primary">
                {profile.name}
                {profile.country ? (
                  <CountryFlag
                    code={profile.country}
                    className="ml-3 align-middle"
                  />
                ) : null}
              </h1>

              <p className="mt-4 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-secondary">
                {profile.role}
              </p>

              {profile.note ? (
                <p className="mt-2 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light">
                  {profile.note}
                </p>
              ) : null}

              <p className="mt-7 max-w-2xl border-t border-border pt-6 text-base leading-8 text-primary">
                {profile.summary}
              </p>
            </InView>
          </div>
        </div>
      </section>

      {/* =====================================
          PROFILE
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <div className="content-grid gap-y-12">
            <InView className="col-span-12 lg:col-span-8">
              <div className="space-y-7 border-t border-primary pt-6">
                {profile.profile.map(
                  (paragraph) => (
                    <p
                      key={paragraph}
                      className="body-copy"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </InView>

            {profile.expertise &&
            profile.expertise.length > 0 ? (
              <InView className="col-span-12 lg:col-span-3 lg:col-start-10">
                <p className="border-t border-primary pt-6 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-light">
                  Areas of expertise
                </p>

                <ul className="mt-5 space-y-3.5">
                  {profile.expertise.map(
                    (item) => (
                      <li
                        key={item}
                        className="border-l-2 border-secondary pl-4 text-sm leading-6 text-muted"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </InView>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
