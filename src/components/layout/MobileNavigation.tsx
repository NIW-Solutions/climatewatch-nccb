"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";
import {
  ArrowUpRight,
  Mail,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  primaryNavigation,
  utilityNavigation,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";

import { SiteLogo } from "./SiteLogo";

type MobileNavigationProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

function isCurrentPath(
  pathname: string,
  href: string,
) {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export function MobileNavigation({
  open,
  onClose,
}: MobileNavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[100] 2xl:hidden"
        >
          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="absolute inset-0 size-full bg-primary-dark/70 backdrop-blur-sm"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Website navigation"
            className="absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col overflow-hidden bg-background shadow-[-24px_0_70px_rgba(5,22,43,0.2)]"
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 310,
              damping: 34,
              mass: 0.9,
            }}
          >
            <div className="relative h-52 shrink-0 overflow-hidden bg-primary-dark sm:h-60">
              <Image
                src="/images/home/hero-mountains.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 480px) 100vw, 30rem"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,22,43,0.28)_0%,rgba(5,22,43,0.72)_100%)]" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
                <SiteLogo light compact />

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="grid size-11 place-items-center border border-white/40 bg-primary-dark/20 text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-primary"
                >
                  <X
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
               <p className="mt-4 max-w-xs text-[0.56rem] font-bold uppercase leading-5 tracking-[0.11em] text-muted-light">
              Pakistan&apos;s First Youth-led
              Climate Policy Think-tank
            p>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 bg-secondary"
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <nav
                aria-label="Mobile navigation"
                className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6"
              >
                <motion.ul
                  className="border-t border-border"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        delayChildren: 0.12,
                        staggerChildren: 0.045,
                      },
                    },
                  }}
                >
                  {primaryNavigation.map(
                    (item, index) => {
                      const active =
                        isCurrentPath(
                          pathname,
                          item.href,
                        );

                      return (
                        <motion.li
                          key={item.href}
                          className="border-b border-border"
                          variants={{
                            hidden: {
                              opacity: 0,
                              x: 18,
                            },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: {
                                duration: 0.45,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              },
                            },
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={
                              active
                                ? "page"
                                : undefined
                            }
                            className="group relative grid min-h-[4.25rem] grid-cols-[2.25rem_1fr_auto] items-center gap-3"
                          >
                            {active ? (
                              <span
                                aria-hidden="true"
                                className="absolute inset-y-4 -left-5 w-0.5 bg-secondary sm:-left-6"
                              />
                            ) : null}

                            <span
                              className={[
                                "text-[0.64rem] font-bold tracking-[0.13em]",
                                active
                                  ? "text-secondary"
                                  : "text-muted-light",
                              ].join(" ")}
                            >
                              {String(
                                index + 1,
                              ).padStart(2, "0")}
                            </span>

                            <span
                              className={[
                                "text-[1.1rem] font-semibold tracking-[-0.03em] transition-colors",
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
                                "size-4 transition-all duration-300",
                                active
                                  ? "text-secondary"
                                  : "text-muted-light group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary",
                              ].join(" ")}
                              strokeWidth={1.7}
                            />
                          </Link>
                        </motion.li>
                      );
                    },
                  )}
                </motion.ul>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {utilityNavigation.map(
                    (item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="text-sm font-semibold text-primary transition-colors hover:text-secondary"
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </nav>

              <div className="shrink-0 border-t border-border bg-surface px-5 py-5 sm:px-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex min-h-12 items-center justify-between gap-4 bg-secondary px-5 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark"
                >
                  <span className="inline-flex min-w-0 items-center gap-3">
                    <Mail
                      aria-hidden="true"
                      className="size-4 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span className="truncate">
                      Contact ClimateWatch
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </a>

                <p className="mt-3 truncate text-center text-[0.68rem] text-muted">
                  {siteConfig.email}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
