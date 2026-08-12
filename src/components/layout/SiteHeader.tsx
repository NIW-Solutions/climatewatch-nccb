"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  Mail,
  Menu,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const isHome = pathname === "/";

  const transparent =
    isHome &&
    !scrolled &&
    !menuOpen;

  function closeMenu() {
    setMenuOpen(false);
  }

  /* ==========================================
     SCROLL STATE
     ========================================== */

  useEffect(() => {
    function handleScroll() {
      setScrolled(
        window.scrollY > 32,
      );
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /* ==========================================
     CLOSE ON BROWSER BACK / FORWARD
     ========================================== */

  useEffect(() => {
    function handlePopState() {
      setMenuOpen(false);
    }

    window.addEventListener(
      "popstate",
      handlePopState,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState,
      );
    };
  }, []);

  /* ==========================================
     BODY LOCK
     ========================================== */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow =
        "";

      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  /* ==========================================
     ESCAPE
     ========================================== */

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  return (
    <>
      {/* =====================================
          HEADER
          ===================================== */}

      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",

          transparent
            ? "border-transparent bg-transparent"
            : "border-b border-border bg-background/95 shadow-[0_1px_0_rgba(8,29,25,0.03)] backdrop-blur-xl",
        ].join(" ")}
      >
        {/* =====================================
            INSTITUTIONAL TOP BAR
            ===================================== */}

        <div
          className={[
            "hidden border-b lg:block",

            transparent
              ? "border-white/15"
              : "border-border",
          ].join(" ")}
        >
          <div className="site-container flex min-h-9 items-center justify-between gap-8">
            <p
              className={[
                "text-[0.55rem] font-bold uppercase tracking-[0.11em]",

                transparent
                  ? "text-white/60"
                  : "text-muted",
              ].join(" ")}
            >
              International Climate Policy
              & Research and Development
              Division
            </p>

            <div className="flex items-center gap-7">
              <p
                className={[
                  "text-[0.55rem] font-bold uppercase tracking-[0.11em]",

                  transparent
                    ? "text-white/55"
                    : "text-muted-light",
                ].join(" ")}
              >
                ECOSOC-accredited
              </p>

              <Link
                href="/contact"
                onClick={closeMenu}
                className={[
                  "text-[0.58rem] font-bold uppercase tracking-[0.11em] transition-colors",

                  transparent
                    ? "!text-white hover:!text-secondary"
                    : "!text-primary hover:!text-secondary",
                ].join(" ")}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================
            MAIN NAVIGATION
            ===================================== */}

        <div className="site-container">
          <div className="flex min-h-[4.75rem] items-center justify-between gap-8">
            {/* =====================================
                LOGO
                ===================================== */}

            <Link
              href="/"
              onClick={closeMenu}
              aria-label="ClimateWatch home"
              className="relative z-10 flex shrink-0 items-center"
            >
              <Image
                src="/images/brand/climatewatch-logo.webp"
                alt="ClimateWatch"
                width={220}
                height={72}
                priority
                className={[
                  "h-auto w-[150px] object-contain transition-[filter,opacity] duration-300 sm:w-[165px] lg:w-[175px]",

                  transparent
                    ? "brightness-0 invert"
                    : "",
                ].join(" ")}
              />
            </Link>

            {/* =====================================
                DESKTOP NAV
                ===================================== */}

            <nav
              aria-label="Primary navigation"
              className="hidden xl:flex xl:items-center xl:gap-4 2xl:gap-6"
            >
              {siteConfig.navigation.map(
                (item) => {
                  const active =
                    pathname ===
                      item.href ||
                    pathname.startsWith(
                      `${item.href}/`,
                    );

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={[
                        "relative whitespace-nowrap py-7 text-[0.62rem] font-bold uppercase tracking-[0.07em] transition-colors 2xl:text-[0.68rem] 2xl:tracking-[0.08em]",

                        transparent
                          ? active
                            ? "!text-white"
                            : "!text-white/70 hover:!text-white"
                          : active
                            ? "!text-primary"
                            : "!text-muted hover:!text-primary",
                      ].join(" ")}
                    >
                      {item.label}

                      <span
                        aria-hidden="true"
                        className={[
                          "absolute inset-x-0 bottom-4 h-[2px] bg-secondary transition-transform duration-300",

                          active
                            ? "scale-x-100"
                            : "scale-x-0",
                        ].join(" ")}
                      />
                    </Link>
                  );
                },
              )}
            </nav>

            {/* =====================================
                DESKTOP ACTION
                ===================================== */}

            <div className="hidden shrink-0 xl:block">
              <Link
                href="/contact"
                onClick={closeMenu}
                className={[
                  "group inline-flex min-h-11 items-center gap-3 px-5 text-xs font-bold transition-[background-color,color,border-color]",

                  transparent
                    ? "border border-white/35 !text-white hover:!border-white hover:!bg-white hover:!text-primary"
                    : "bg-primary !text-white hover:!bg-primary-dark hover:!text-white",
                ].join(" ")}
              >
                Get in touch

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            {/* =====================================
                MOBILE MENU BUTTON
                ===================================== */}

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              onClick={() =>
                setMenuOpen(
                  (current) =>
                    !current,
                )
              }
              className={[
                "grid size-11 place-items-center xl:hidden",

                transparent
                  ? "!text-white"
                  : "!text-primary",
              ].join(" ")}
            >
              {menuOpen ? (
                <X
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.7}
                />
              ) : (
                <Menu
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.7}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================
          MOBILE OVERLAY
          ===================================== */}

      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={[
          "fixed inset-0 z-40 bg-foreground/35 transition-opacity duration-300 xl:hidden",

          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* =====================================
          MOBILE DRAWER
          ===================================== */}

      <aside
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={[
          "fixed bottom-0 right-0 top-0 z-40 w-full max-w-[28rem] bg-background transition-transform duration-500 ease-out xl:hidden",

          menuOpen
            ? "translate-x-0"
            : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-28 sm:px-8">
          {/* =====================================
              INSTITUTIONAL CONTEXT
              No logo in drawer
              ===================================== */}

          <div className="border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-secondary"
              />

              <p className="text-[0.54rem] font-bold uppercase tracking-[0.11em] text-primary">
                ClimateWatch
              </p>
            </div>

            <p className="mt-4 max-w-xs text-[0.56rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light">
              International Climate Policy
              & Research and Development
              Division
            </p>
          </div>

          {/* =====================================
              MOBILE NAV
              ===================================== */}

          <nav
            aria-label="Mobile navigation"
            className="mt-7 border-t border-border"
          >
            {siteConfig.navigation.map(
              (
                item,
                index,
              ) => {
                const active =
                  pathname ===
                    item.href ||
                  pathname.startsWith(
                    `${item.href}/`,
                  );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)_1rem] items-center gap-4 border-b border-border py-5"
                  >
                    <span className="text-[0.56rem] font-bold tracking-[0.1em] text-muted-light">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span
                      className={[
                        "font-editorial text-[1.65rem] font-medium leading-none tracking-[-0.03em] transition-colors",

                        active
                          ? "text-secondary"
                          : "text-primary group-hover:text-secondary",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      className={[
                        "size-3.5 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",

                        active
                          ? "text-secondary"
                          : "text-muted-light",
                      ].join(" ")}
                      strokeWidth={1.6}
                    />
                  </Link>
                );
              },
            )}
          </nav>

          {/* =====================================
              UTILITY LINKS
              ===================================== */}

          <div className="mt-8 grid grid-cols-2 gap-4">
            {siteConfig.utilityNavigation.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border border-border px-4 py-4 text-xs font-semibold !text-primary transition-colors hover:!border-primary hover:!text-secondary"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* =====================================
              CONTACT
              ===================================== */}

          <div className="mt-auto pt-10">
            <div className="border-t border-border pt-6">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                Direct contact
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
              >
                <Mail
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.7}
                />

                {siteConfig.email}
              </a>

              <p className="mt-6 max-w-sm text-xs leading-6 text-muted">
                ClimateWatch
                <br />
                ECOSOC-accredited
                organisation
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}