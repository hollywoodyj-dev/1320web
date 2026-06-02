/** Primary navigation — 11/15 canonical routes (English labels). */

export type NavLink = {
  href: string;
  label: string;
  /** Match child paths (e.g. /your-code). */
  matchPrefix?: boolean;
};

export const PRIMARY_NAV: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/about-1320", label: "ABOUT 1320", matchPrefix: true },
  { href: "/blueprint", label: "BLUEPRINT", matchPrefix: true },
  { href: "/your-code", label: "YOUR CODE", matchPrefix: true },
  { href: "/faq", label: "RESOURCES", matchPrefix: true },
];

export const GENERATE_CODE_CTA = {
  href: "/your-code",
  label: "GENERATE MY CODE",
} as const;

export type FooterColumn = {
  title: string;
  links: { href: string; label: string }[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "SYSTEM",
    links: [
      { href: "/about-1320", label: "About 1320" },
      { href: "/blueprint", label: "The Blueprint" },
      { href: "/your-code", label: "Your Code" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/sample-report", label: "Sample Report" },
      { href: "/full-report", label: "Full Report Waitlist" },
      { href: "/booking", label: "Book a Reading" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { href: "/about-1320", label: "About Us" },
      { href: "/booking", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

/** Homepage footer columns — same destinations, frozen EXPLORE/RESOURCES/COMPANY labels (2/15 layout). */
export const HOMEPAGE_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "EXPLORE",
    links: [
      { href: "/about-1320", label: "About 1320" },
      { href: "/blueprint", label: "How It Works" },
      { href: "/blueprint", label: "The Blueprint" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { href: "/faq", label: "Guides" },
      { href: "/sample-report", label: "Sample Report" },
      { href: "/full-report", label: "Full Report" },
      { href: "/booking", label: "Book a Reading" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { href: "/about-1320", label: "About Us" },
      { href: "/about-1320", label: "Our Mission" },
      { href: "/booking", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export function isNavActive(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  if (link.matchPrefix) return pathname === link.href || pathname.startsWith(`${link.href}/`);
  return pathname === link.href;
}
