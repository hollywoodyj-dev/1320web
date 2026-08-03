/** Primary navigation — conversion-oriented journey (Wisewave Phase B). */

export type NavLink = {
  href: string;
  label: string;
  /** Match child paths (e.g. /your-code). */
  matchPrefix?: boolean;
};

/** Public sample — Full Report v2 (canonical preview birth date). */
export const SAMPLE_REPORT_HREF = "/full-report-v2";

/** Shared top nav for homepage + inner site. Blueprint lives in footer. */
export const CONVERSION_NAV: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/about-1320", label: "ABOUT", matchPrefix: true },
  { href: "/your-code", label: "YOUR CODE", matchPrefix: true },
  { href: "/blueprint", label: "BLUEPRINT", matchPrefix: true },
  { href: SAMPLE_REPORT_HREF, label: "SAMPLE", matchPrefix: true },
  { href: "/full-report", label: "FULL REPORT", matchPrefix: true },
  { href: "/booking", label: "READING", matchPrefix: true },
  { href: "/faq", label: "FAQ", matchPrefix: true },
];

/** Homepage desktop nav — simplified; primary CTA sits on the right. */
export const HOMEPAGE_PRIMARY_NAV: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/about-1320", label: "ABOUT", matchPrefix: true },
  { href: "/your-code", label: "YOUR CODE", matchPrefix: true },
  { href: "/blueprint", label: "BLUEPRINT", matchPrefix: true },
  { href: "/faq", label: "FAQ", matchPrefix: true },
];

export const PRIMARY_NAV: NavLink[] = CONVERSION_NAV;

export const HOMEPAGE_NAV = HOMEPAGE_PRIMARY_NAV;

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
      { href: "/about-1320#origin-story", label: "Origin Story" },
      { href: "/blueprint", label: "Soul Blueprint" },
      { href: "/your-code", label: "Your Code" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/guides", label: "Guides" },
      { href: SAMPLE_REPORT_HREF, label: "Sample Report" },
      { href: "/full-report", label: "Full Report" },
      { href: "/booking", label: "Personal Integration Session" },
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

/** Homepage footer columns — compact; Origin Story retained in brand legal row. */
export const HOMEPAGE_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "EXPLORE",
    links: [
      { href: "/about-1320", label: "About 1320" },
      { href: "/blueprint", label: "Soul Blueprint" },
      { href: "/your-code", label: "Your Code" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { href: "/guides", label: "Guides" },
      { href: SAMPLE_REPORT_HREF, label: "Sample Report" },
      { href: "/full-report", label: "Full Report" },
      { href: "/booking", label: "Personal Integration" },
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
