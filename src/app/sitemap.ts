import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { blogContent } from "@/content/blog";
import { programmesContent } from "@/content/programmes";
import { projectsContent } from "@/content/projects";
import { teamContent } from "@/content/team";
import { publicationsContent } from "@/content/publications";

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

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  /*
   * Every publication has its own page at /publications/[slug], and those are
   * the most substantial writing on the site. They were absent from the
   * sitemap entirely — built, reachable, and never pointed at.
   *
   * Derived from the content rather than listed by hand, so a new
   * publication appears here without anyone remembering to add it.
   */
  const publicationRoutes =
    publicationsContent.items.map((item) => ({
      url: `${baseUrl}/publications/${item.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  /*
   * One entry per blog post. ClimateWatch publishes roughly twice a week, so
   * this is the part of the sitemap that actually changes — and the reason
   * posts have their own URLs at all.
   */
  const blogRoutes = blogContent.posts.map(
    (post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(post.date
        ? { lastModified: new Date(post.date) }
        : {}),
    }),
  );

  /*
   * One entry per scheduled event. High priority while an event is upcoming:
   * it is time-limited, and the weeks before it are the only ones in which
   * anyone searching for it matters.
   */
  const eventRoutes =
    programmesContent.events.scheduled.map(
      (event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }),
    );

  /*
   * One entry per project, and one per advisor and board member. Both used
   * to exist only inside another page — projects as anchors, profiles inside
   * a modal with no address at all — so neither could be indexed on its own
   * subject or the person's own name.
   */
  const projectRoutes =
    projectsContent.projects.map(
      (project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }),
    );

  const programmeRoutes =
    programmesContent.divisions.map(
      (division) => ({
        url: `${baseUrl}/programmes/${division.id}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }),
    );

  const profileRoutes = [
    ...teamContent.advisors,
    ...teamContent.internationalAdvisors,
    ...teamContent.board,
  ].map((profile) => ({
    url: `${baseUrl}/team/${profile.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...publicationRoutes,
    ...blogRoutes,
    ...eventRoutes,
    ...projectRoutes,
    ...programmeRoutes,
    ...profileRoutes,
  ];
}