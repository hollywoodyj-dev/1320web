import { BrandSeal } from "@/components/full-report-v2/brand-seal";
import { BRAND_LOGO_HEADER } from "@/lib/brand-assets";

type ReportBrandBlockVariant = "header" | "hero";

type ReportBrandBlockProps = {
  variant?: ReportBrandBlockVariant;
  showLabels?: boolean;
};

export function ReportBrandBlock({
  variant = "header",
  showLabels = true,
}: ReportBrandBlockProps) {
  const isHero = variant === "hero";

  return (
    <div className={`report-brand-block report-brand-block--${variant}`}>
      <div className="report-brand-logos" aria-hidden={isHero}>
        <img
          className="report-brand-logo-1320"
          src={BRAND_LOGO_HEADER}
          alt=""
          aria-hidden="true"
        />
        <BrandSeal
          size={isHero ? 72 : 44}
          className="report-brand-logo-seal"
          aria-hidden="true"
        />
      </div>

      {showLabels && !isHero ? (
        <div className="report-brand-copy">
          <div className="report-brand-name">1320 Soul Code System</div>
          <div className="report-brand-subtitle">Sacred · Symbolic · Self-Awareness</div>
        </div>
      ) : null}
    </div>
  );
}
