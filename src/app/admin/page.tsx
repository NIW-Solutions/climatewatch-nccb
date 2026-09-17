import type { Metadata } from "next";

import { AdminApp } from "@/components/admin/AdminApp";

/**
 * Admin — src/app/admin/page.tsx
 *
 * The form builder. Everything inside is behind a session; this page itself
 * is a shell, so a signed-out visitor gets the sign-in screen rather than a
 * 404 they cannot act on.
 *
 * NOINDEX, and deliberately absent from the sitemap and the navigation. It
 * is a staff tool, not part of the site.
 */

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main>
      <section className="bg-background">
        <div className="site-container pt-32 pb-24 sm:pt-36">
          <AdminApp />
        </div>
      </section>
    </main>
  );
}
