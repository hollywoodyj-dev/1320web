import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_HEADER } from "@/lib/brand-assets";
import { GZH_TW_BRAND_UI_RC2 } from "@/lib/gzh/tw-brand-ui-rc2";
import { gzhHref, type GzhMarket } from "@/lib/gzh/locale";

export function GzhTwBrandHero({ market = "tw" }: { market?: GzhMarket }) {
  const ui = GZH_TW_BRAND_UI_RC2;

  return (
    <section className="gzh-hero" aria-labelledby="gzh-hero-title">
      <div className="gzh-hero-banner" aria-hidden="true">
        <Image
          src={ui.heroBannerDesktop}
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 0px, 1240px"
          className="gzh-hero-banner-img gzh-hero-banner-img--desktop"
        />
        <Image
          src={ui.heroBannerMobile}
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 0px"
          className="gzh-hero-banner-img gzh-hero-banner-img--mobile"
        />
      </div>

      <div className="gzh-hero-grid">
        <div className="gzh-hero-copy">
          <p className="gzh-eyebrow gzh-eyebrow--gold">{ui.eyebrow}</p>
          <h1 id="gzh-hero-title" className="gzh-hero-title">
            {ui.heroTitleLead}
            <br />
            <em>{ui.heroTitleEm}</em>
          </h1>
          <p className="gzh-hero-en">{ui.heroEn}</p>
          <p className="gzh-hero-lead">{ui.heroLead}</p>
          <p className="gzh-hero-line">{ui.heroLine}</p>
          <div className="gzh-hero-actions">
            <Link className="gzh-btn gzh-btn--gold" href={gzhHref(market, "free-soul-blueprint")}>
              {ui.ctaPrimary}
            </Link>
            <a className="gzh-btn gzh-btn--outline-light" href="#foundation">
              {ui.ctaSecondary}
            </a>
          </div>
          <p className="gzh-hero-caption">{ui.heroCaption}</p>
        </div>

        <div className="gzh-hero-art" aria-label="1320 官方金色幾何標誌">
          <div className="gzh-hero-art-fallback" aria-hidden="true">
            1 · 3 · 2 · 0
          </div>
          <Image
            src={BRAND_LOGO_HEADER}
            alt={ui.logoAlt}
            width={420}
            height={420}
            className="gzh-hero-logo"
            priority
          />
          <p className="gzh-hero-art-note" aria-hidden="true">
            {ui.artNote}
          </p>
        </div>
      </div>
    </section>
  );
}
