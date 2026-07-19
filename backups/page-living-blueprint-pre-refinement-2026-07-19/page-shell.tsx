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
  /** Phone/tablet entitled report — use flip shell + mobile renderer. */
  preferMobileReportShell?: boolean;
};

function isEntitledReportRoute(pathname: string | null): boolean {
  return /^\/my-report\/[^/]+$/.test(pathname ?? "");
}

function isPrintReportRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/sample-report/print") return true;
  if (pathname === "/report-system-preview/print") return true;
  return /^\/report\/[^/]+\/print$/.test(pathname);
}

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

function isAuthRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/auth/")
  );
}

function isFacilitatorConsoleRoute(pathname: string | null): boolean {
  return pathname === "/integration/facilitator";
}

/** Post-purchase / transactional bridges — compact footer, quiet header. */
function isTransactionalRoute(pathname: string | null): boolean {
  return pathname === "/checkout/success" || pathname === "/booking/success";
}

/** Quiet compact footer — auth gateways, reflection entry, internal console, checkout success. */
function isCompactFooterRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    isAuthRoute(pathname) ||
    pathname === "/reflect" ||
    isFacilitatorConsoleRoute(pathname) ||
    isTransactionalRoute(pathname)
  );
}

/** Cosmic layout for inner routes — homepage keeps its own shell in `app/page.tsx`. */
export function PageShell({ children, leadsEnabled, headerAccount, preferMobileReportShell = false }: PageShellProps) {
  const pathname = usePathname();
  const immersive = isImmersiveReportRoute(pathname);
  const mobileReport =
    isMobileReportRoute(pathname) ||
    (isEntitledReportRoute(pathname) && preferMobileReportShell);
  const unifiedWebReport = isUnifiedReportWebRoute(pathname) && !mobileReport;
  const printReport = isPrintReportRoute(pathname);
  const authRoute = isAuthRoute(pathname);
  const facilitatorConsole = isFacilitatorConsoleRoute(pathname);
  const transactional = isTransactionalRoute(pathname);
  const compactFooter = isCompactFooterRoute(pathname);

  if (printReport) {
    return (
      <main className="report-print-document-shell">
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </main>
    );
  }

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
    <main
      className={[
        "page-shell",
        "page-shell-inner",
        facilitatorConsole ? "page-shell--facilitator" : "",
        transactional ? "page-shell--transactional" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SkipLink />
      <div className="page-stars" aria-hidden="true" />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />
      <div className="page-frame">
        <SiteHeader
          headerAccount={headerAccount}
          variant={
            facilitatorConsole ? "internal" : transactional ? "transactional" : "default"
          }
        />
        <div id="main-content" className="inner-main" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter
          leadsEnabled={compactFooter ? false : leadsEnabled}
          variant={facilitatorConsole ? "internal" : compactFooter ? "compact" : "full"}
          internalLabel={facilitatorConsole ? "Internal Facilitator Console" : undefined}
        />
      </div>
    </main>
  );
}
