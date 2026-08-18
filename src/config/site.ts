export const siteConfig = {
  name: "ClimateWatch",

  fullName:
    "ClimateWatch — International Climate Policy & Research and Development",

  description:
    "A youth-led climate think tank advancing evidence-based climate policy, research, education and applied innovation across Pakistan.",

  url: "https://www.climatewatch-nccb.org",

  email: "info@climatewatch-nccb.org",

  status: "ECOSOC-accredited organisation",

  location: {
    country: "Pakistan",
  },

  navigation: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Programmes",
      href: "/programmes",
    },
    {
      label: "Research",
      href: "/research",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Publications",
      href: "/publications",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "News",
      href: "/news",
    },
    {
      label: "TV Live",
      href: "/tv-live",
    },
    {
      label: "Resources",
      href: "/resources",
    },
  ],
},
    {
      label: "Team",
      href: "/team",
    },
  ],
  utilityNavigation: [
    {
      label: "Our Team",
      href: "/team",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],

  socialLinks: {
    instagram:
      "https://www.instagram.com/climatewatch.pk/",

    linkedin:
      "https://www.linkedin.com/company/climatewatch-pk/",

    youtube:
      "https://www.youtube.com/channel/UC39uvi0nzWeDZpXbpwH4lbg",

    linktree:
      "https://linktr.ee/Climatewatch",
  },
} as const;

export type SiteConfig =
  typeof siteConfig;
