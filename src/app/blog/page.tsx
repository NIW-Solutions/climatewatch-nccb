import type { Metadata } from "next";

import { BlogPageContent } from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog",

  description:
    "Climate commentary, explainers and field notes from the ClimateWatch team on climate science, policy, energy, community resilience and technology.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
