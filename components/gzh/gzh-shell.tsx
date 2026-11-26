import Image from "next/image";
import Link from "next/link";
import { GzhTwMobileNav } from "@/components/gzh/gzh-tw-mobile-nav";
import { BRAND_LOGO_HEADER } from "@/lib/brand-assets";
import type { GzhMarket } from "@/lib/gzh/locale";
import { gzhHref } from "@/lib/gzh/locale";
import { GZH_PRIVACY_OVERLAY } from "@/lib/gzh/privacy-overlay";
import { GZH_TW_BRAND } from "@/lib/gzh/tw-content";
import { GZH_TW_BRAND_UI_RC2 } from "@/lib/gzh/tw-brand-ui-rc2";

export function GzhShell({
  market,
  children,
}: {
  market: GzhMarket;
  children: React.ReactNode;
}) {
  const privacy = GZH_PRIVACY_OVERLAY[market];
  const ui = GZH_TW_BRAND_UI_RC2;

  return (
    <div
      className="gzh-shell"
      data-gzh-market={market}
      data-product-track="gzh"
      data-brand-ui={ui.packId}
      data-customer-release={ui.customerReleaseState}
    >
      <div className="gzh-prototype" role="status">
        {ui.prototypeBanner}
      </div>

      <header className="gzh-header" id="top">
        <div className="gzh-header-inner">
          <Link href={gzhHref(market)} className="gzh-brand" aria-label="1320 Soul Origin Code System 首頁">
            <span className="gzh-brand-icon">
              <Image
                src={BRAND_LOGO_HEADER}
                alt=""
                width={52}
                height={52}
                className="gzh-brand-logo"
                priority
              />
            </span>
            <span className="gzh-brand-word">
              <strong>{ui.brandNumber}</strong>
              <span>{ui.brandSystem}</span>
            </span>
          </Link>
          <GzhTwMobileNav market={market} />
        </div>
      </header>

      <main className="gzh-main">{children}</main>

      <footer className="gzh-footer">
        <div className="gzh-footer-grid">
          <div>
            <Link href={gzhHref(market)} className="gzh-brand gzh-brand--footer" aria-label="回到 1320 頁首">
              <span className="gzh-brand-icon">
                <Image
                  src={BRAND_LOGO_HEADER}
                  alt=""
                  width={44}
                  height={44}
                  className="gzh-brand-logo"
                />
              </span>
              <span className="gzh-brand-word">
                <strong>{ui.brandNumber}</strong>
                <span>{ui.brandSystem}</span>
              </span>
            </Link>
            <p className="gzh-principle">
              {GZH_TW_BRAND.principleSee}
              <br />
              {GZH_TW_BRAND.principleMirror}
            </p>
          </div>
          <div>
            <h4>EXPLORE</h4>
            <Link href={`${gzhHref(market)}#about`}>{ui.nav.about}</Link>
            <Link href={`${gzhHref(market)}#foundation`}>{ui.nav.foundation}</Link>
            <Link href={gzhHref(market, "free-soul-blueprint")}>{ui.nav.free}</Link>
          </div>
          <div>
            <h4>ORIGINAL SITE</h4>
            <a href="https://www.1320soulcode.com/" target="_blank" rel="noopener noreferrer">
              1320 英文官方網站
            </a>
            <Link href={privacy.privacyHref}>隱私權</Link>
            <Link href={privacy.termsHref}>使用條款</Link>
          </div>
        </div>
        <div className="gzh-footer-bottom">
          <span>© 2026 1320 Soul Origin Code System · Internal UI Prototype</span>
          <span className="gzh-footer-motto">YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.</span>
        </div>
        {privacy.supportNote ? <p className="gzh-privacy-note">{privacy.supportNote}</p> : null}
      </footer>
    </div>
  );
}
