import Link from "next/link";
import type { GzhMarket } from "@/lib/gzh/locale";
import { GZH_PRIVACY_OVERLAY } from "@/lib/gzh/privacy-overlay";
import { GZH_TW_BRAND, GZH_TW_NAV } from "@/lib/gzh/tw-content";
import { gzhHref } from "@/lib/gzh/locale";

export function GzhShell({
  market,
  children,
}: {
  market: GzhMarket;
  children: React.ReactNode;
}) {
  const privacy = GZH_PRIVACY_OVERLAY[market];

  return (
    <div className="gzh-shell" data-gzh-market={market} data-product-track="gzh">
      <header className="gzh-header">
        <Link href={gzhHref(market)} className="gzh-brand">
          <span className="gzh-brand-name">{GZH_TW_BRAND.name}</span>
          <span className="gzh-brand-sub">{GZH_TW_BRAND.subtitle}</span>
        </Link>
        <nav className="gzh-nav" aria-label="GZH">
          <Link href={gzhHref(market, "free-soul-blueprint")}>{GZH_TW_NAV.free}</Link>
          <Link href={gzhHref(market, "about")}>{GZH_TW_NAV.about}</Link>
          <Link href="/">{GZH_TW_NAV.english}</Link>
        </nav>
      </header>
      <main className="gzh-main">{children}</main>
      <footer className="gzh-footer">
        <p className="gzh-principle">
          {GZH_TW_BRAND.principleSee}
          <br />
          {GZH_TW_BRAND.principleMirror}
        </p>
        <p className="gzh-emotional">{GZH_TW_BRAND.emotional}</p>
        <div
          className="gzh-privacy-slot"
          data-privacy-status={privacy.status}
          data-market={privacy.market}
        >
          <Link href={privacy.privacyHref}>Privacy</Link>
          {" · "}
          <Link href={privacy.termsHref}>Terms</Link>
          <span className="gzh-privacy-note">{privacy.supportNote}</span>
        </div>
      </footer>
    </div>
  );
}
