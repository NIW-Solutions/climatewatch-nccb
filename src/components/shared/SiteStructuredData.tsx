import { siteConfig } from "@/config/site";

export function SiteStructuredData() {
  const sameAs: string[] = Object.values(
    siteConfig.socialLinks,
  ).map((href) => String(href));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: siteConfig.name,

    url: siteConfig.url,

    description:
      siteConfig.description,

    email: siteConfig.email,

    sameAs,

    areaServed: {
      "@type": "Country",
      name: siteConfig.location.country,
    },

    parentOrganization: {
      "@type": "Organization",

      name:
        siteConfig.parentOrganisation
          .name,

      alternateName:
        siteConfig.parentOrganisation
          .abbreviation,

      description:
        siteConfig.parentOrganisation
          .status,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          structuredData,
        ).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}