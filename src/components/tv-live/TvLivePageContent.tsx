import { ArrowUpRight } from "lucide-react";

import { InView } from "@/components/motion-primitives/InView";
import { NewsThumbnail } from "@/components/news/NewsThumbnail";
import { tvLiveContent } from "@/content/tv-live";
import type { FeedItem } from "@/lib/news";

/**
 * TV Live — src/components/tv-live/TvLivePageContent.tsx
 *
 * Every video shown here comes from the ClimateWatch channel feed. Nothing
 * is hard-coded, so the page cannot advertise a broadcast that does not
 * exist. See the note in src/content/tv-live.ts for why that matters.
 */

/** `https://www.youtube.com/watch?v=ID` -> `ID`. */
function videoIdOf(
  href: string,
): string | null {
  try {
    const url = new URL(href);

    return (
      url.searchParams.get("v") ??
      url.pathname
        .split("/")
        .filter(Boolean)
        .pop() ??
      null
    );
  } catch {
    return null;
  }
}

function formatDate(
  iso: string,
): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);

  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
}

export function TvLivePageContent({
  videos,
}: Readonly<{
  videos: readonly FeedItem[];
}>) {
  const {
    hero,
    channel,
    featured,
    schedule,
    archive,
    closing,
  } = tvLiveContent;

  const [latest, ...rest] = videos;
  const latestId = latest
    ? videoIdOf(latest.href)
    : null;

  return (
    <main>
      {/* =====================================
          HERO
          ===================================== */}

      <section
        aria-labelledby="tv-live-heading"
        className="bg-background pt-32 sm:pt-36 lg:pt-40"
      >
        <div className="site-container">
          <InView>
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {hero.eyebrow}
                </p>
              </div>

              <h1
                id="tv-live-heading"
                className="mt-8 max-w-4xl font-editorial text-[clamp(2.2rem,3.6vw,3.85rem)] font-medium leading-[1.04] tracking-[-0.04em] text-primary"
              >
                {hero.title}
              </h1>

              <p className="body-copy-large mt-7 max-w-3xl">
                {hero.description}
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          LATEST BROADCAST
          ===================================== */}

      {latest && latestId ? (
        <section className="bg-background">
          <div className="site-container section-shell-small">
            <InView>
              <div className="border-t border-border-strong pt-6">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {featured.eyebrow}
                  </p>
                </div>

                <div className="mt-8 aspect-video w-full overflow-hidden bg-primary-dark">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${latestId}?rel=0`}
                    title={latest.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="size-full"
                  />
                </div>

                <h2 className="mt-8 max-w-3xl font-editorial text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {latest.title}
                </h2>

                <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-light">
                  {formatDate(
                    latest.publishedAt,
                  )}
                </p>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
                  {featured.scheduleNote}
                </p>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                >
                  Visit the channel
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </a>
              </div>
            </InView>
          </div>
        </section>
      ) : null}

      {/* =====================================
          PROGRAMMING
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell">
          <InView>
            <div className="border-t border-border-strong pt-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {schedule.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                {schedule.title}
              </h2>
            </div>
          </InView>

          <InView delay={0.05}>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {schedule.items.map(
                (item) => (
                  <div
                    key={item.slot}
                    className="border-t border-border pt-6"
                  >
                    <h3 className="font-editorial text-xl font-medium leading-[1.15] tracking-[-0.025em] text-primary">
                      {item.slot}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {item.detail}
                    </p>
                  </div>
                ),
              )}
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          BROADCAST ARCHIVE
          ===================================== */}

      <section
        aria-labelledby="broadcast-archive-heading"
        className="bg-background"
      >
        <div className="site-container section-shell">
          <InView>
            <div className="border-t border-border-strong pt-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-secondary"
                />

                <p className="eyebrow text-primary">
                  {archive.eyebrow}
                </p>
              </div>

              <h2
                id="broadcast-archive-heading"
                className="mt-6 max-w-3xl font-editorial text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary"
              >
                {archive.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {archive.description}
              </p>
            </div>
          </InView>

          {rest.length === 0 ? (
            <p className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-light">
              {videos.length === 0
                ? archive.emptyNote
                : "More broadcasts will appear here as they are published."}
            </p>
          ) : (
            <InView delay={0.05}>
              <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {rest.map((video) => {
                  const date = formatDate(
                    video.publishedAt,
                  );

                  return (
                    <a
                      key={video.href}
                      href={video.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col border-t border-border pt-5"
                    >
                      <NewsThumbnail
                        src={video.image}
                        alt=""
                      />

                      {date ? (
                        <p className="mt-4 text-[0.6875rem] font-semibold text-muted-light">
                          {date}
                        </p>
                      ) : null}

                      <h3 className="mt-3 flex-1 text-sm font-semibold leading-6 tracking-[-0.01em] text-primary transition-colors duration-300 group-hover:text-secondary">
                        {video.title}
                      </h3>

                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors group-hover:text-secondary">
                        Watch
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </span>
                    </a>
                  );
                })}
              </div>
            </InView>
          )}
        </div>
      </section>

      {/* =====================================
          SUBSCRIBE
          ===================================== */}

      <section className="bg-primary text-white">
        <div className="site-container">
          <InView>
            <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.6fr_0.7fr] lg:items-end lg:py-20">
              <div>
                <p className="eyebrow text-white/55">
                  {closing.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-2xl font-editorial text-[clamp(1.9rem,2.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {closing.title}
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                  {closing.description}
                </p>
              </div>

              <div>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
                >
                  YouTube channel
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}
