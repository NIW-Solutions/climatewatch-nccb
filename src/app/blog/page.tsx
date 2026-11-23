import type { Metadata } from "next";

import { BlogPageContent } from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
  },

  title: "Blog",

  description:
    "Climate commentary, explainers and field notes from ClimateWatch Pakistan on climate science, climate policy, energy, community resilience and technology.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
