import {
  ArrowUpRight,
  Play,
} from "lucide-react";
import Image from "next/image";

import { InView } from "@/components/motion-primitives/InView";
import {
  tvLiveContent,
  type Broadcast,
} from "@/content/tv-live";

/** Privacy-enhanced YouTube host — no cookies until playback starts. */
const embedHost =
  "https://www.youtube-nocookie.com";

export function TvLivePageContent() {
  const {
    hero,
    live,
    schedule,
    archive,
    broadcasts,
    closing,
  } = tvLiveContent;

  const liveSrc = live.useChannelLiveStream
    ? `${embedHost}/embed/live_stream?channel=${live.channelId}&rel=0`
    : `${embedHost}/embed/${live.videoId}?rel=0`;

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
            <div className="content-grid gap-y-8 border-t border-primary pt-6">
              <div className="col-span-12 lg:col-span-3">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-secondary"
                  />

                  <p className="eyebrow text-primary">
                    {hero.eyebrow}
                  </p>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <h1
                  id="tv-live-heading"
                  className="max-w-3xl font-editorial text-[clamp(2.5rem,4vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-primary"
                >
                  {hero.title}
                </h1>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <p className="body-copy">
                  {hero.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 border-b border-border sm:mt-14" />
        </div>
      </section>

      {/* =====================================
          LIVE PLAYER
          ===================================== */}

      <section className="bg-background">
        <div className="site-container section-shell-small">
          <InView amount={0.1}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.7fr)] lg:gap-12">
              {/* Player */}

              <div>
                <div className="relative aspect-video overflow-hidden bg-primary-dark shadow-[0_24px_60px_rgba(8,29,25,0.16)]">
                  <iframe
                    src={liveSrc}
                    title={live.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>

              {/* Live detail */}

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <LiveDot />

                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-secondary">
                    {live.status}
                  </p>
                </div>

                <p className="mt-6 text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
                  {live.eyebrow}
                </p>

                <h2 className="mt-4 font-editorial text-[clamp(1.6rem,2.3vw,2.3rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {live.title}
                </h2>

                <p className="mt-5 text-sm leading-7 text-muted">
                  {live.description}
                </p>

                <div className="mt-7 border-t border-border pt-5">
                  <p className="text-xs leading-6 text-muted">
                    {live.scheduleNote}
                  </p>

                  <a
                    href={live.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-5 inline-flex items-center gap-3 text-sm font-semibold !text-primary transition-colors hover:!text-secondary"
                  >
                    Open YouTube channel

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </a>
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* =====================================
          PROGRAMMING
          ===================================== */}

      <section className="bg-surface">
        <div className="site-container section-shell-small">
          <InView>
            <div className="grid gap-8 border-t border-border-strong pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <p className="eyebrow text-primary">
                  {schedule.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(1.75rem,2.5vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {schedule.title}
                </h2>
              </div>
            </div>
          </InView>

          <div className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {schedule.items.map(
              (item, index) => (
                <InView
                  key={item.slot}
                  delay={index * 0.04}
                  amount={0.08}
                >
                  <div className="h-full border-b border-border px-1 py-7 sm:border-r sm:px-5 sm:first:pl-1 lg:[&:nth-child(4n)]:border-r-0">
                    <span className="editorial-index">
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <h3 className="mt-4 text-sm font-semibold text-primary">
                      {item.slot}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-muted">
                      {item.detail}
                    </p>
                  </div>
                </InView>
              ),
            )}
          </div>
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
            <div className="grid gap-8 border-t border-primary pt-6 lg:grid-cols-[0.75fr_1.35fr_0.9fr]">
              <div>
                <p
                  id="broadcast-archive-heading"
                  className="eyebrow text-primary"
                >
                  {archive.eyebrow}
                </p>
              </div>

              <div>
                <h2 className="max-w-xl font-editorial text-[clamp(1.75rem,2.5vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-primary">
                  {archive.title}
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted">
                  {archive.description}
                </p>
              </div>
            </div>
          </InView>

          <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {broadcasts.map(
              (broadcast, index) => (
                <InView
                  key={
                    broadcast.videoId
                  }
                  delay={index * 0.03}
                  amount={0.08}
                >
                  <BroadcastCard
                    broadcast={
                      broadcast
                    }
                  />
                </InView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================
          CLOSING
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

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                  {closing.description}
                </p>
              </div>

              <div className="lg:text-right">
                <a
                  href={live.channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm font-semibold !text-white transition-colors hover:!text-secondary"
                >
                  <YouTubeIcon className="size-4" />
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </main>
  );
}

/* ==========================================
   BROADCAST CARD
   ========================================== */

function BroadcastCard({
  broadcast,
}: Readonly<{
  broadcast: Broadcast;
}>) {
  return (
    <article className="group flex h-full flex-col">
      <a
        href={`https://www.youtube.com/watch?v=${broadcast.videoId}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Watch ${broadcast.title} on YouTube`}
        className="relative block aspect-video overflow-hidden bg-primary-dark"
      >
        <Image
          src={`https://i.ytimg.com/vi/${broadcast.videoId}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,22,43,0.75)_100%)]"
        />

        {/* Play affordance */}

        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid size-14 place-items-center border border-white/45 bg-primary-dark/55 backdrop-blur-sm transition-[background-color,border-color] duration-300 group-hover:border-secondary group-hover:bg-secondary">
            <Play
              className="size-5 translate-x-[1px] text-white"
              strokeWidth={1.8}
              fill="currentColor"
            />
          </span>
        </span>

        {/* Duration */}

        <span className="absolute bottom-3 right-3 bg-primary-dark/85 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-white">
          {broadcast.duration}
        </span>
      </a>

      <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-secondary">
            {broadcast.category}
          </p>

          <p className="text-[0.56rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            {broadcast.date}
          </p>
        </div>

        <h3 className="mt-3 font-editorial text-[1.3rem] font-medium leading-[1.16] tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-secondary">
          {broadcast.title}
        </h3>

        <p className="mt-3 text-xs leading-6 text-muted">
          {broadcast.description}
        </p>
      </div>
    </article>
  );
}

/* ==========================================
   LIVE INDICATOR
   ========================================== */

function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="relative grid size-2.5 shrink-0 place-items-center"
    >
      <span className="absolute inset-0 animate-ping bg-secondary opacity-60" />

      <span className="absolute inset-0 bg-secondary" />
    </span>
  );
}

function YouTubeIcon({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M23.5 6.9a3 3 0 0 0-2.1-2.1C19.5 4.3 12 4.3 12 4.3s-7.5 0-9.4.5A3 3 0 0 0 .5 6.9C0 8.8 0 12 0 12s0 3.2.5 5.1a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.1.5-5.1s0-3.2-.5-5.1ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}
