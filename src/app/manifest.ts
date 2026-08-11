import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.fullName,

    short_name: siteConfig.name,

    description: siteConfig.description,

    start_url: "/",

    scope: "/",

    display: "standalone",

    background_color: "#f6f5f1",

    theme_color: "#103a6d",

    orientation: "portrait-primary",

    categories: [
      "education",
      "news",
      "reference",
    ],
  };
}