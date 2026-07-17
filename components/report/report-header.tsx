import Image from "next/image";
import Link from "next/link";
import { REPORT_SEAL_LOGO } from "@/lib/brand-assets";
import { FREE_RESULT_HERO } from "@/lib/result-content";
import { REPORT_HEADER_ACTIONS } from "@/lib/report/report-static-content";

type ReportHeaderProps = {
  title: string;
  subtitle: string;
  codeString: string;
  fictionBanner?: string;
  /** Free-result ceremonial hero */
  refined?: boolean;
  mirrorLine?: string;
  checkoutHref?: string;
};

export function ReportHeader({
  title,
  subtitle,
  codeString,
  fictionBanner,
  refined = false,
  mirrorLine,
  checkoutHref = "/checkout",
}: ReportHeaderProps) {
  const codes = codeString.split(" / ");

  if (refined) {
    return (
      <header className="report-header report-header--refined" id="overview">
        {fictionBanner ? <p className="report-fiction-banner">{fictionBanner}</p> : null}

        <div className="report-header-hero report-header-hero--refined !border-0 !bg-transparent shadow-none backdrop-blur-none">
          <div className="report-header-copy">
            <p className="report-header-eyebrow">{FREE_RESULT_HERO.eyebrow}</p>
            <h1 className="report-header-title text-gold-gradient">{title || FREE_RESULT_HERO.title}</h1>
            <p className="report-code-strip report-code-strip--hero">
              {codes.map((part, index) => (
                <span key={part} className={`report-code-part report-code-part-${index}`}>
                  {part}
                  {index < codes.length - 1 ? " / " : ""}
                </span>
              ))}
            </p>
            <p className="report-header-mirror">{mirrorLine || FREE_RESULT_HERO.mirrorLine}</p>
            <div className="report-header-cta-row">
              <Link href={checkoutHref} className="gold-button">
                {FREE_RESULT_HERO.primaryCta}
              </Link>
              <a href={FREE_RESULT_HERO.secondaryHref} className="blueprint-secondary-link">
                {FREE_RESULT_HERO.secondaryCta}
              </a>
            </div>
          </div>
          <div className="report-header-ring" aria-hidden>
            <div className="report-header-ring-glow" />
            <div className="report-header-ring-art">
              <Image
                src={REPORT_SEAL_LOGO}
                alt=""
                width={1254}
                height={1254}
                sizes="(max-width: 720px) 300px, 390px"
                className="report-header-ring-image"
                priority
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="report-header" id="overview">
      <div className="report-header-actions report-header-actions--utility">
        <button type="button" className="report-action-btn report-action-btn--quiet">
          {REPORT_HEADER_ACTIONS.email}
        </button>
        <button type="button" className="report-action-btn report-action-btn--quiet" disabled title="Coming soon">
          {REPORT_HEADER_ACTIONS.download}
        </button>
        <button type="button" className="report-action-btn report-action-btn--quiet">
          {REPORT_HEADER_ACTIONS.save}
        </button>
      </div>

      {fictionBanner ? <p className="report-fiction-banner">{fictionBanner}</p> : null}

      <div className="report-header-hero !border-0 !bg-transparent shadow-none backdrop-blur-none">
        <div className="report-header-copy">
          <h1 className="report-header-title text-gold-gradient">{title}</h1>
          <p className="report-header-subtitle">{subtitle}</p>
          <p className="report-code-strip">
            {codes.map((part, index) => (
              <span key={part} className={`report-code-part report-code-part-${index}`}>
                {part}
                {index < codes.length - 1 ? " / " : ""}
              </span>
            ))}
          </p>
        </div>
        <div className="report-header-ring" aria-hidden>
          <div className="report-header-ring-glow" />
          <div className="report-header-ring-art">
            <Image
              src={REPORT_SEAL_LOGO}
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 720px) 300px, 390px"
              className="report-header-ring-image"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
