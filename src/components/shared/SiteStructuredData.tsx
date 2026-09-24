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

    /*
      A logo lets Google show a mark beside the site in results and in the
      knowledge panel, and is one of the signals that separates this
      organisation from the other Climate Watch.
    */
    logo: `${siteConfig.url}/images/brand/climatewatch-logo.webp`,

    email: siteConfig.email,

    sameAs,

    areaServed: {
      "@type": "Country",
      name: siteConfig.location.country,
    },

    /*
      The names people actually search for, so Google can resolve this
      organisation as its own entity rather than folding it into the World
      Resources Institute's Climate Watch. "CLIMATEWATCH" in caps helped
      nobody — it is the same string Google already has from `name`.
    */
    alternateName: [
      "ClimateWatch NCCB",
      "ClimateWatch Pakistan",
      "Climate Watch Pakistan",
    ],

    knowsAbout: [
      "Climate policy",
      "Climate research",
      "Education for sustainable development",
    ],
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