"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useState } from "react";

type LoadedImageProps = ImageProps & {
  loaderClassName?: string;
  darkLoader?: boolean;
};

export function LoadedImage({
  className = "",
  loaderClassName = "",
  darkLoader = false,
  onLoad,
  ...props
}: Readonly<LoadedImageProps>) {
  const [isLoaded, setIsLoaded] =
    useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Loader */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-700",
          darkLoader
            ? "bg-primary-dark"
            : "bg-surface-muted",
          isLoaded
            ? "opacity-0"
            : "opacity-100",
          loaderClassName,
        ].join(" ")}
      >
        <div className="absolute inset-0 overflow-hidden">
          <span
            className={[
              "image-loader-shimmer absolute inset-y-0 left-[-45%] w-[45%]",
              darkLoader
                ? "bg-gradient-to-r from-transparent via-white/15 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/65 to-transparent",
            ].join(" ")}
          />
        </div>

        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <span
            className={[
              "relative size-2 shrink-0",
              darkLoader
                ? "bg-secondary"
                : "bg-primary",
            ].join(" ")}
          >
            <span
              className={[
                "absolute inset-0 animate-ping opacity-40",
                darkLoader
                  ? "bg-secondary"
                  : "bg-primary",
              ].join(" ")}
            />
          </span>

          <span
            className={[
              "text-[0.6rem] font-bold uppercase tracking-[0.12em]",
              darkLoader
                ? "text-white/60"
                : "text-primary/55",
            ].join(" ")}
          >
            Loading image
          </span>
        </div>
      </div>

      <Image
        {...props}
        className={[
          "transition-[opacity,transform,filter] duration-1000 ease-out",
          isLoaded
            ? "opacity-100 blur-0"
            : "opacity-0 blur-[2px]",
          className,
        ].join(" ")}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}