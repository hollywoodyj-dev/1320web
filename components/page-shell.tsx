import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
};

/** Cosmic layout for inner routes — homepage keeps its own shell in `app/page.tsx`. */
export function PageShell({ children }: PageShellProps) {
  return (
    <main className="page-shell page-shell-inner">
      <div className="page-stars" aria-hidden="true" />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />
      <div className="page-frame">
        <SiteHeader />
        <div className="inner-main">{children}</div>
        <SiteFooter />
      </div>
    </main>
  );
}
