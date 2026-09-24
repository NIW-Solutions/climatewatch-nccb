import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2_592_000,

    /*
     * Next 16 only serves quality values declared here. HomeHero asks for
     * 92 and 95; undeclared, both were silently falling back to 75 and
     * logging a warning on every render.
     */
    /* 80 is what the hero uses. 92 and 95 are kept only so any
       remaining caller does not 400 while being migrated down. */
    qualities: [75, 80, 92, 95],

    remotePatterns: [
      // YouTube video thumbnails used by the TV Live broadcast archive.
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
        search: "",
      },
    ],
  },

  /*
   * Short links for print.
   *
   * A QR code's density comes from how many characters it encodes, so a
   * shorter URL means fewer modules, which scans faster and survives being
   * printed small or photographed at an angle. /cop31 is 34 characters with
   * the domain; the page's own path is nearly twice that.
   *
   * Permanent, so the short link is the one that accrues any inbound links
   * while the event page stays canonical.
   */
  async redirects() {
    return [
      {
        source: "/cop31",
        destination:
          "/events/pre-cop31-consultation-islamabad",
        permanent: true,
      },

      /*
       * Legacy URLs from an earlier version of this site. Google still has
       * them indexed and was still showing them — 39 and 15 impressions in
       * three months, every one of them landing on a 404.
       *
       * A 404 on an indexed URL wastes the impression and throws away
       * whatever ranking the page had earned. A permanent redirect hands
       * both to the page that replaced it.
       *
       * "programs" is the American spelling this site never used; the
       * section has always been /programmes.
       */
      {
        source: "/programs/:path*",
        destination: "/programmes",
        permanent: true,
      },
      {
        source: "/news/education",
        destination:
          "/programmes/education-for-sustainable-development",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;