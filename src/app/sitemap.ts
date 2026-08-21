import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/programmes",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/research",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/projects",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/publications",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    // Rebuilt hourly from live feeds, so it changes far more often than
    // the hand-authored pages around it.
    path: "/news",
    changeFrequency: "hourly",
    priority: 0.9,
  },
  {
    path: "/newsletter",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/donate",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    // Out of the main menu, but still indexed — linked directly during
    // COPs and press conferences.
    path: "/tv-live",
    changeFrequency: "daily",
    priority: 0.6,
  },
  {
    path: "/resources",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/team",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/careers",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/contact",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}