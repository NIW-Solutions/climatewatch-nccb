import type {
  Metadata,
  Viewport,
} from "next";
import {
  Geist,
  Newsreader,
} from "next/font/google";

import "./globals.css";
import "leaflet/dist/leaflet.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
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
        <SiteStructuredData />

        <SiteHeader />

        {children}

        <SiteFooter />

        {/*
          Client-only, and deliberately last: it renders nothing on the
          server or the first client pass, so it cannot affect hydration or
          what a crawler sees.
        */}
      </body>
    </html>
  );
}