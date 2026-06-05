import type { ReactNode } from "react";
import { SkipLink } from "@/components/skip-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
};

/** Cosmic layout for inner routes — homepage keeps its own shell in `app/page.tsx`. */
export function PageShell({ children }: PageShellProps) {
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
