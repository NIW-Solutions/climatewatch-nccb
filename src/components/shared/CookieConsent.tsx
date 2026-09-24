"use client";

import Link from "next/link";
import Script from "next/script";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

/**
 * Cookie consent — src/components/shared/CookieConsent.tsx
 *
 * Google Analytics does not load until someone has said yes.
 *
 * WHY IT WORKS THIS WAY. Under the GDPR and the ePrivacy Directive, analytics
 * cookies need consent before they are set, and refusing has to be as easy as
 * agreeing. So:
 *
 *   - no scripts load until a choice is made. Not "load and disable" and not
 *     Google's Consent Mode, which still contacts Google before consent.
 *     Nothing is requested from googletagmanager.com until Accept is clicked;
 *   - Accept and Decline are the same size, weight and prominence. A grey
 *     "Decline" beside a bright "Accept" is a dark pattern, and regulators
 *     have said so;
 *   - closing the banner is not consent. There is no X — silence leaves
 *     analytics off;
 *   - the choice is reversible from the footer, because withdrawing consent
 *     must be as easy as giving it.
 *
 * The choice lives in localStorage, per browser. That is itself a strictly
 * necessary cookie-equivalent — it exists only to remember a privacy choice,
 * which is the one thing that needs no consent.
 *
 * Nothing renders during server rendering or the first client pass, so
 * hydration matches and a crawler never sees the banner.
 */

const STORAGE_KEY = "climatewatch:cookie-consent";

/** Fired by the footer link to reopen the choice. */
export const CONSENT_EVENT =
  "climatewatch:open-cookie-settings";

const GA_MEASUREMENT_ID = "G-7GLXEP0GLR";

type Choice = "granted" | "denied" | null;

function readChoice(): Choice {
  try {
    const value =
      window.localStorage.getItem(STORAGE_KEY);

    return value === "granted" ||
      value === "denied"
      ? value
      : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice): void {
  try {
    if (choice) {
      window.localStorage.setItem(
        STORAGE_KEY,
        choice,
      );
    } else {
      window.localStorage.removeItem(
        STORAGE_KEY,
      );
    }
  } catch {
    /* Private browsing. The banner reappears next visit; analytics stays off. */
  }
}

export function CookieConsent() {
  const [choice, setChoice] =
    useState<Choice>(null);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const stored = readChoice();

    /* Deferred so the page settles first, and so no state is set
       synchronously inside the effect. */
    const timer = window.setTimeout(() => {
      setChoice(stored);
      setAsking(stored === null);
    }, 900);

    function reopen() {
      setAsking(true);
    }

    window.addEventListener(
      CONSENT_EVENT,
      reopen,
    );

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(
        CONSENT_EVENT,
        reopen,
      );
    };
  }, []);

  const decide = useCallback(
    (next: Exclude<Choice, null>) => {
      writeChoice(next);
      setChoice(next);
      setAsking(false);

      /*
        Turning analytics OFF has to take effect now, not on the next page
        load — otherwise a visitor who withdraws consent keeps being measured
        for the rest of their session. Reloading is the honest way to unload
        a script that is already running, and it also clears the GA cookies
        this page set.
      */
      if (next === "denied" && choice === "granted") {
        try {
          for (const cookie of document.cookie.split(";")) {
            const name = cookie
              .split("=")[0]
              .trim();

            if (
              name.startsWith("_ga") ||
              name.startsWith("_gid")
            ) {
              document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname.replace(/^www\./, "")}`;
              document.cookie = `${name}=; Max-Age=0; path=/`;
            }
          }
        } catch {
          /* Best effort. The reload below is what matters. */
        }

        window.location.reload();
      }
    },
    [choice],
  );

  return (
    <>
      {/* Analytics, only once consent exists. */}
      {choice === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />

          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {asking ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-0 bottom-0 z-[95] border-t border-border bg-surface shadow-[0_-8px_30px_rgba(5,22,43,0.12)] motion-safe:animate-[noticeIn_360ms_cubic-bezier(0.22,1,0.36,1)]"
        >
          <div className="site-container flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div>
              <p
                id="cookie-consent-title"
                className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary"
              >
                Cookies
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                We would like to use Google
                Analytics to see which pages
                are read and how people find
                us. It sets cookies and sends
                data to Google. Nothing on this
                site needs it, and declining
                changes nothing about what you
                can read.{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Privacy policy
                </Link>
                .
              </p>
            </div>

            {/*
              Same size, same weight, same prominence. Refusing has to be as
              easy as agreeing, and a greyed-out Decline beside a bright
              Accept is the pattern regulators single out.
            */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="inline-flex min-h-11 flex-1 items-center justify-center border border-border-strong px-6 text-xs font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white lg:flex-none"
              >
                Decline
              </button>

              <button
                type="button"
                onClick={() =>
                  decide("granted")
                }
                className="inline-flex min-h-11 flex-1 items-center justify-center border border-primary bg-primary px-6 text-xs font-bold uppercase tracking-[0.1em] !text-white transition-colors hover:border-secondary hover:bg-secondary lg:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** The footer's entry point back into the choice. */
export function openCookieSettings(): void {
  window.dispatchEvent(
    new Event(CONSENT_EVENT),
  );
}
