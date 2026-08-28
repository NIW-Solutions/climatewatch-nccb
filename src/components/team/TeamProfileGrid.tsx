"use client";

/**
 * Advisor and board profile grid — src/components/team/TeamProfileGrid.tsx
 *
 * Cards carry a short summary; the full profile opens in a modal. This is the
 * only client component on the team page — TeamPageContent stays a server
 * component and passes serialisable data down.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { CountryFlag } from "@/components/team/CountryFlag";
import { InView } from "@/components/motion-primitives/InView";
import type { TeamProfile } from "@/content/team";

import {
  PORTRAIT_BORDER,
  TeamPhoto,
  TeamSocialLinks,
} from "./team-primitives";

export function TeamProfileGrid({
  profiles,
}: Readonly<{
  profiles: readonly TeamProfile[];
}>) {
  const [active, setActive] =
    useState<TeamProfile | null>(null);

  const close = useCallback(
    () => setActive(null),
    [],
  );

  return (
    <>
      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map(
          (profile, index) => (
            <InView
              key={profile.slug}
              delay={Math.min(index, 5) * 0.07}
              amount={0.08}
            >
              <ProfileCard
                profile={profile}
                onOpen={setActive}
              />
            </InView>
          ),
        )}
      </div>

      {active ? (
        <ProfileModal
          profile={active}
          onClose={close}
        />
      ) : null}
    </>
  );
}

/* ==========================================
   PROFILE CARD
   ========================================== */
function ProfileCard({
  profile,
  onOpen,
}: Readonly<{
  profile: TeamProfile;
  onOpen: (profile: TeamProfile) => void;
}>) {
  const hasProfile =
    profile.profile.length > 0;

  return (
    <article className="group flex h-full flex-col">
      {/* Portrait */}
      <div
        className="rounded-sm p-[2px]"
        style={{ background: PORTRAIT_BORDER }}
      >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-surface-muted">
        <TeamPhoto
          src={profile.image}
          name={profile.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      </div>
      </div>

      {/* Identity */}
      <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
        <h3 className="font-editorial text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
          {profile.name}
        {profile.country ? (
          <CountryFlag
            code={profile.country}
            className="ml-2"
          />
        ) : null}
        </h3>
        <p className="mt-2.5 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-secondary">
          {profile.role}
        </p>
        {profile.note ? (
          <p className="mt-1.5 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light">
            {profile.note}
          </p>
        ) : null}
        <p className="mt-3 flex-1 text-xs leading-6 text-muted">
          {profile.summary}
        </p>

        {hasProfile ? (
          <button
            type="button"
            onClick={() =>
              onOpen(profile)
            }
            className="mt-5 inline-flex w-fit items-center gap-2 border border-border-strong px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.11em] text-primary transition-[background-color,border-color,color] duration-300 hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            Read full profile
            <span aria-hidden="true">
              &rarr;
            </span>
          </button>
        ) : null}

        <TeamSocialLinks
          name={profile.name}
          linkedin={profile.linkedin}
          instagram={profile.instagram}
        />
      </div>
    </article>
  );
}

/* ==========================================
   PROFILE MODAL
   ========================================== */
function ProfileModal({
  profile,
  onClose,
}: Readonly<{
  profile: TeamProfile;
  onClose: () => void;
}>) {
  const panelRef =
    useRef<HTMLDivElement>(null);
  const closeRef =
    useRef<HTMLButtonElement>(null);

  /* Focus the close control on open. */
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  /* Lock background scroll while open. */
  useEffect(() => {
    const previous =
      document.body.style.overflow;
    document.body.style.overflow =
      "hidden";
    return () => {
      document.body.style.overflow =
        previous;
    };
  }, []);

  /* Escape closes; Tab cycles inside the dialog. */
  useEffect(() => {
    function onKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        event.key !== "Tab" ||
        !panelRef.current
      ) {
        return;
      }

      const focusable =
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last =
        focusable[
          focusable.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener(
      "keydown",
      onKeyDown,
    );
    return () =>
      document.removeEventListener(
        "keydown",
        onKeyDown,
      );
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[rgba(5,22,43,0.78)] p-4 sm:items-center sm:p-8"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`profile-${profile.slug}`}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="my-8 w-full max-w-3xl bg-background shadow-2xl sm:my-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-6 sm:px-10">
          <div className="flex items-start gap-5">
            <div className="relative hidden size-20 shrink-0 overflow-hidden bg-surface-muted sm:block">
              <TeamPhoto
                src={profile.image}
                name={profile.name}
                sizes="80px"
              />
            </div>
            <div className="min-w-0">
              <h2
                id={`profile-${profile.slug}`}
                className="font-editorial text-[clamp(1.6rem,2.2vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary"
              >
                {profile.name}
        {profile.country ? (
          <CountryFlag
            code={profile.country}
            className="ml-2"
          />
        ) : null}
              </h2>
              <p className="mt-2.5 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-secondary">
                {profile.role}
              </p>
              {profile.note ? (
                <p className="mt-1.5 text-[0.6875rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light">
                  {profile.note}
                </p>
              ) : null}
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="grid size-9 shrink-0 place-items-center border border-border-strong text-primary transition-[background-color,border-color,color] duration-300 hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {profile.profile.map(
            (paragraph) => (
              <p
                key={paragraph.slice(
                  0,
                  48,
                )}
                className="mb-5 text-sm leading-7 text-muted last:mb-0"
              >
                {paragraph}
              </p>
            ),
          )}

          {profile.expertise &&
          profile.expertise.length >
            0 ? (
            <div className="mt-10 border-t border-border pt-6">
              <p className="eyebrow text-primary">
                Areas of expertise
              </p>
              <ul className="mt-5 grid gap-3">
                {profile.expertise.map(
                  (item) => (
                    <li
                      key={item}
                      className="border-l-2 border-secondary pl-4 text-sm leading-7 text-muted"
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}

          <TeamSocialLinks
            name={profile.name}
            linkedin={profile.linkedin}
            instagram={profile.instagram}
          />
        </div>
      </div>
    </div>
  );
}
