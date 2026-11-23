import { siteConfig } from "@/config/site";

export function SiteStructuredData() {
  const sameAs: string[] = Object.values(
    siteConfig.socialLinks,
  ).map((href) => String(href));

  /*
    "ClimateWatch" alone belongs to the World Resources Institute's Climate
    Watch (climatewatchdata.org), a far older and more linked site. Google
    and AI search engines decide which organisation a page is about from
    this data, so it leads with the name that is ours alone — ClimateWatch
    Pakistan — lists every name people search for us by, and says outright
    that we are a different organisation.
  */
  const organisation = {
    "@type": ["Organization", "NGO"],
    "@id": `${siteConfig.url}/#organization`,

    name: "ClimateWatch Pakistan",

    alternateName: [
      "ClimateWatch",
      "Climate Watch Pakistan",
      "ClimateWatch Think Tank",
      "ClimateWatch Youth",
      "ClimateWatch Research and Development",
      "ClimateWatch International Climate Policy",
    ],

    url: siteConfig.url,

    description: siteConfig.description,

    disambiguatingDescription:
      "A youth-led climate policy think tank based in Pakistan. Not affiliated with Climate Watch (climatewatchdata.org), the World Resources Institute's global emissions data platform.",

    /*
      A logo lets Google show a mark beside the site in results and in the
      knowledge panel.
    */
    logo: `${siteConfig.url}/images/brand/climatewatch-logo.webp`,

    email: siteConfig.email,

    sameAs,

    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },

    areaServed: {
      "@type": "Country",
      name: siteConfig.location.country,
    },

    knowsAbout: [
      "Climate policy",
      "International climate policy",
      "Climate policy in Pakistan",
      "UNFCCC negotiations",
      "Climate finance",
      "Loss and damage",
      "Climate adaptation",
      "Climate research and development",
      "Youth climate action",
      "Action for Climate Empowerment",
      "Education for sustainable development",
      "Gilgit-Baltistan",
    ],

    department: [
      {
        "@type": "Organization",
        name: "ClimateWatch International Climate Policy Division",
      },
      {
        "@type": "Organization",
        name: "ClimateWatch Research and Development Division",
      },
      {
        "@type": "Organization",
        name: "ClimateWatch Education for Sustainable Development Division",
      },
    ],
  };

  /*
    The WebSite entry is what Google reads for the site name it prints above
    each result, so it carries the distinct name too.
  */
  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: "ClimateWatch Pakistan",
    alternateName: ["ClimateWatch", "climatewatch.org.pk"],
    inLanguage: "en",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organisation, website],
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