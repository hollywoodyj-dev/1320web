import { REPORT_SEAL_LOGO } from "@/lib/brand-assets";
import type { FullReportV2Calculation } from "@/lib/full-report-v2/types";

const FOUNDATION_LAYER_KEYS = ["s1", "s3", "s2", "s0"] as const;

type FoundationLayer = {
  key: (typeof FOUNDATION_LAYER_KEYS)[number];
  code: string;
};

function getFoundationLayers(calculation: FullReportV2Calculation): FoundationLayer[] {
  return FOUNDATION_LAYER_KEYS.map((key) => ({
    key,
    code: calculation[key].code,
  }));
}

type ReportCoverSignatureCardProps = {
  calculation: FullReportV2Calculation;
};

export function ReportCoverSignatureCard({ calculation }: ReportCoverSignatureCardProps) {
  const layers = getFoundationLayers(calculation);

  return (
    <div className="report-cover-signature-shell">
      <article className="report-cover-signature-card">
        <div className="report-cover-seal" aria-hidden="true">
          <div className="report-cover-seal-glow" />
          <div className="report-cover-seal-art">
            <img
              className="report-cover-seal-image"
              src={REPORT_SEAL_LOGO}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="report-cover-signature-kicker">Signature</p>
        <h3 className="report-cover-signature-title">Four-Part Foundation</h3>

        <div className="report-cover-signature-code">
          {layers.map((layer, index) => (
            <span key={layer.key}>
              {index > 0 ? <span className="report-cover-signature-sep"> | </span> : null}
              <span
                className={`report-cover-signature-code-part report-cover-signature-code-part--${layer.key}`}
              >
                {layer.code}
              </span>
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
