"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SkipLink } from "@/components/skip-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
  /** Server-decided lead persistence flag, forwarded to the footer subscribe slot. */
  leadsEnabled?: boolean;
  headerAccount?: { label: string; entitledReportId: string | null } | null;
};

function isUnifiedReportWebRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/full-report-v2") return true;
  return /^\/my-report\/[^/]+$/.test(pathname);
}

function isImmersiveReportRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (
    pathname === "/sample-report" ||
    pathname === "/sample-report-v2" ||
    pathname === "/full-report-v2" ||
    pathname === "/full-report-v2-phase1" ||
    pathname === "/mobile-report-v2"
  ) {
    return true;
  }
  return /^\/my-report\/[^/]+$/.test(pathname);
}

function isMobileReportRoute(pathname: string | null): boolean {
  return pathname === "/mobile-report-v2";
}

/** Cosmic layout for inner routes — homepage keeps its own shell in `app/page.tsx`. */
export function PageShell({ children, leadsEnabled, headerAccount }: PageShellProps) {
  const pathname = usePathname();
  const immersive = isImmersiveReportRoute(pathname);
  const mobileReport = isMobileReportRoute(pathname);
  const unifiedWebReport = isUnifiedReportWebRoute(pathname);

  if (immersive) {
    const shellClass = mobileReport
      ? "page-shell--mobile-report"
      : unifiedWebReport
        ? "page-shell--unified-report-web"
        : "page-shell--full-report";

    return (
      <main
        className={[
          "page-shell",
          "page-shell-inner",
          shellClass,
        ].join(" ")}
      >
        {!mobileReport ? <SkipLink /> : null}
        <div
          className={[
            "page-frame",
            mobileReport ? "page-frame--mobile-report" : "page-frame--full-report",
          ].join(" ")}
        >
          <div
            id="main-content"
            className={mobileReport ? "" : "inner-main inner-main--full-report"}
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell page-shell-inner">
      <SkipLink />
      <div className="page-stars" aria-hidden="true" />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />
      <div className="page-frame">
        <SiteHeader headerAccount={headerAccount} />
        <div id="main-content" className="inner-main" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter leadsEnabled={leadsEnabled} />
      </div>
    </main>
  );
}
