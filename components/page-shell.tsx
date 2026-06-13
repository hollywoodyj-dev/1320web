"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SkipLink } from "@/components/skip-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
};

function isFullReportRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/sample-report" || pathname === "/sample-report-v2") return true;
  return /^\/my-report\/[^/]+$/.test(pathname);
}

/** Cosmic layout for inner routes — homepage keeps its own shell in `app/page.tsx`. */
export function PageShell({ children }: PageShellProps) {
  const pathname = usePathname();
  const fullReport = isFullReportRoute(pathname);

  if (fullReport) {
    return (
      <main className="page-shell page-shell-inner page-shell--full-report">
        <SkipLink />
        <div className="page-frame page-frame--full-report">
          <div id="main-content" className="inner-main inner-main--full-report" tabIndex={-1}>
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
        <SiteHeader />
        <div id="main-content" className="inner-main" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </div>
    </main>
  );
}
