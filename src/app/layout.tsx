import type {
  Metadata,
  Viewport,
} from "next";
import {
  Geist,
  Newsreader,
} from "next/font/google";
import Script from "next/script";

import "./globals.css";
import "leaflet/dist/leaflet.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { EventBanner } from "@/components/shared/EventBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteStructuredData } from "@/components/shared/SiteStructuredData";
import { siteConfig } from "@/config/site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle =
  "ClimateWatch | Climate Policy, Research & Development";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  applicationName: siteConfig.name,

  title: {
    default: defaultTitle,
    template: "%s | ClimateWatch",
  },

  description: siteConfig.description,

  creator: siteConfig.name,

  publisher: siteConfig.name,

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",

    locale: "en_PK",

    siteName: siteConfig.name,

    title: defaultTitle,

    description:
      siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",

    title: defaultTitle,

    description:
      siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview":
        "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: "#103a6d",

  colorScheme: "light",
};

/** Google Analytics 4 measurement ID. Public — it appears in the page source. */
const GA_MEASUREMENT_ID = "G-7GLXEP0GLR";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable}`}
    >
      <body>
        {/*
          Google Analytics, on every page.

          next/script with afterInteractive rather than a raw <script> tag:
          Next hoists it and loads it after the page is interactive, so
          analytics never delays first paint or Largest Contentful Paint.
          Two tags because that is how gtag.js works — the loader, then the
          config call that runs once it is in.

          The measurement ID is not a secret. It is visible in the page
          source of every site that uses GA, which is why it is here rather
          than in an environment variable nobody could set without a
          redeploy.

          WORTH KNOWING: this sets cookies and sends visitor data to Google,
          which is why the privacy policy now has a section saying so. If
          ClimateWatch ever needs consent-gated analytics for EU visitors,
          this is the single place to put that behind a banner.
        */}
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
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>

        <SiteStructuredData />

        <SiteHeader />

        {children}

        <SiteFooter />

        {/*
          Client-only, and deliberately last: it renders nothing on the
          server or the first client pass, so it cannot affect hydration or
          what a crawler sees.
        */}
        <EventBanner />
      </body>
    </html>
  );
}