"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopbarShell } from "@/components/topbar-shell";
import { GENERATE_CODE_CTA, isNavActive, PRIMARY_NAV } from "@/lib/site-nav";

type SiteHeaderProps = {
  headerAccount?: { label: string; entitledReportId: string | null } | null;
  variant?: "default" | "internal" | "transactional";
};

export function SiteHeader({ headerAccount, variant = "default" }: SiteHeaderProps) {
  const pathname = usePathname();
  const quiet = variant === "internal" || variant === "transactional";
  /** SEO educational pages: keep one dominant gold CTA in the article hero viewport. */
  const quietHeaderCta =
    pathname === "/what-is-a-soul-blueprint" ||
    pathname === "/life-path-number-vs-soul-blueprint" ||
    pathname.startsWith("/guides");

  const nav =
    variant === "internal"
      ? [
          { href: "/integration/facilitator", label: "FACILITATOR CONSOLE" },
          headerAccount
            ? { href: "/account", label: "RETURN TO ACCOUNT" }
            : { href: "/login?next=/integration/facilitator", label: "SIGN IN" },
        ]
      : variant === "transactional"
        ? [
            headerAccount
              ? { href: "/account", label: "MY ACCOUNT", matchPrefix: true as const }
              : {
                  href: `/login?next=${encodeURIComponent(pathname || "/account")}`,
                  label: "SIGN IN",
                },
          ]
        : [
            ...PRIMARY_NAV,
            headerAccount
              ? { href: "/account", label: "MY ACCOUNT", matchPrefix: true as const }
              : { href: "/login", label: "SIGN IN", matchPrefix: true as const },
          ];

  return (
    <TopbarShell
      className="inner-topbar"
      brand={
        <div className="brand-lockup">
          <Link
            href={variant === "internal" ? "/integration/facilitator" : "/"}
            className="brand-lockup-link"
          >
            <div className="brand-image-shell brand-image-shell-small">
              <Image
                src="/1320-logo.jpeg"
                alt="1320 Soul Origin Code System"
                width={72}
                height={72}
                className="brand-image brand-image-small"
              />
              <span className="brand-image-cover" aria-hidden="true" />
            </div>
            <div className="entry-copy">
              <p className="brand-number">1320</p>
              <p className="brand-name">
                <span>SOUL ORIGIN</span>
                <span>CODE SYSTEM</span>
              </p>
            </div>
          </Link>
        </div>
      }
      nav={nav}
      linkClassName={(item) => (isNavActive(pathname, item) ? "active" : undefined)}
      ctaHref={
        quiet
          ? undefined
          : headerAccount?.entitledReportId
            ? `/my-report/${headerAccount.entitledReportId}`
            : GENERATE_CODE_CTA.href
      }
      ctaLabel={
        quiet
          ? undefined
          : headerAccount?.entitledReportId
            ? "MY FULL REPORT"
            : GENERATE_CODE_CTA.label
      }
      ctaClassName={
        quietHeaderCta && !headerAccount?.entitledReportId
          ? "blueprint-secondary-link topbar-cta topbar-cta--quiet"
          : undefined
      }
    />
  );
}
