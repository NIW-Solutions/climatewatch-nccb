export type NavigationItem = Readonly<{
  label: string;
  href: string;
  description?: string;
}>;

export const primaryNavigation: readonly NavigationItem[] = [
  {
    label: "About",
    href: "/about",
    description:
      "Who we are, how we work, what we believe and how ClimateWatch is governed.",
  },
  {
    label: "Programmes",
    href: "/programmes",
    description:
      "International climate policy, sustainable development education and research.",
  },
  {
    label: "Research",
    href: "/research",
    description:
      "Evidence standards, current workstreams and climate-policy analysis.",
  },
  {
    label: "Projects",
    href: "/projects",
    description:
      "Community education, climate monitoring and negotiation tracking.",
  },
  {
    label: "Publications",
    href: "/publications",
    description:
      "Research papers, policy briefs, reports and educational publications.",
  },
  {
    label: "News",
    href: "/news",
    description:
      "Institutional updates, field activity and climate-policy developments.",
  },
  {
    label: "Resources",
    href: "/resources",
    description:
      "Planning toolkits, reference material and journalist resources.",
  },
] as const;

export const utilityNavigation: readonly NavigationItem[] = [
  {
    label: "Our Team",
    href: "/team",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;

export const footerNavigation = {
  organisation: [
    {
      label: "About ClimateWatch",
      href: "/about",
    },
    {
      label: "Our Team",
      href: "/team",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],

  work: [
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
  ],

  information: [
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Resources",
      href: "/resources",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms of Use",
      href: "/terms",
    },
  ],
} as const;