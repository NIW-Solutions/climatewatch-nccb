"use client";

/**
 * Publication reader — src/components/publications/PublicationReader.tsx
 *
 * Actions and the embedded document for a single publication.
 *
 * The embed is shown on large screens only. Mobile browsers, iOS Safari in
 * particular, ignore an embedded PDF and render an empty frame, so small
 * screens get a prominent "Open PDF" button instead. That split is done in CSS
 * rather than by sniffing the user agent, so it survives server rendering.
 */

import {
  Check,
  Download,
  ExternalLink,
  Share2,
} from "lucide-react";
import { useCallback, useState } from "react";

import { publicationsContent } from "@/content/publications";

export function PublicationReader({
  title,
  pdf,
  pdfSize,
}: Readonly<{
  title: string;
  pdf: string;
  pdfSize?: string;
}>) {
  const { reader } = publicationsContent;
  const [copied, setCopied] = useState(false);

  const onShare = useCallback(async () => {
    const url = window.location.href;

    // Native share sheet where the browser offers one, clipboard otherwise.
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Cancelled, or the share failed — fall through to copying.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(
        () => setCopied(false),
        2400,
      );
    } catch {
      window.prompt("Copy this link", url);
    }
  }, [title]);

  return (
    <>
      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={pdf}
          download
          className="inline-flex items-center gap-2.5 border border-primary bg-primary px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.12em] !text-white transition-colors duration-300 hover:!bg-primary-dark"
        >
          <Download
            aria-hidden="true"
            className="size-3.5"
            strokeWidth={1.8}
          />
          {reader.downloadLabel}
          {pdfSize ? (
            <span className="font-normal normal-case tracking-normal text-white/70">
              {pdfSize}
            </span>
          ) : null}
        </a>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-2.5 border border-border-strong px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-primary transition-[background-color,border-color,color] duration-300 hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          {copied ? (
            <Check
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
          ) : (
            <Share2
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
          )}
          {copied
            ? reader.shareCopied
            : reader.shareLabel}
        </button>

        <a
          href={pdf}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 border border-border-strong px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.12em] !text-primary transition-[background-color,border-color,color] duration-300 hover:!border-primary hover:!bg-primary hover:!text-white lg:hidden"
        >
          <ExternalLink
            aria-hidden="true"
            className="size-3.5"
            strokeWidth={1.8}
          />
          {reader.openLabel}
        </a>
      </div>

      {/* Embedded document — large screens only */}
      <div className="mt-10 hidden lg:block">
        <div className="border border-border-strong bg-surface-muted">
          <object
            data={`${pdf}#view=FitH`}
            type="application/pdf"
            aria-label={`${title} (PDF)`}
            className="h-[80vh] w-full"
          >
            <div className="grid h-[40vh] place-items-center px-6 text-center">
              <div>
                <p className="text-sm leading-7 text-muted">
                  Your browser cannot display
                  PDFs inline.
                </p>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2.5 border border-border-strong px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.12em] !text-primary transition-colors hover:!border-primary"
                >
                  <ExternalLink
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.8}
                  />
                  {reader.openLabel}
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </>
  );
}
