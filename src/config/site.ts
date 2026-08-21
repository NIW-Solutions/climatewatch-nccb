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
    // TV Live is intentionally absent from the main menu. The page stays
    // live at /tv-live and can be linked directly during COPs and press
    // conferences; re-add an entry here to surface it in the nav again.
    // Resources has been replaced by Newsletter in the menu. The page is
    // still live at /resources for anything already linking to it; delete
    // src/app/resources/ when you are ready to retire it for good.
    {
      label: "Newsletter",
      href: "/newsletter",
    },
    {
      label: "Meet The Team",
      href: "/team",
    },
    {
      label: "Careers",
      href: "/careers",
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
