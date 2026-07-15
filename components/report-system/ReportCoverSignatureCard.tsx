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

type ReportCoverSignatureCodeLayout = "inline" | "paired-rows";

type ReportCoverSignatureCardProps = {
  calculation: FullReportV2Calculation;
  codeLayout?: ReportCoverSignatureCodeLayout;
};

function renderCodePart(layer: FoundationLayer) {
  return (
    <span
      className={`report-cover-signature-code-part report-cover-signature-code-part--${layer.key}`}
    >
      {layer.code}
    </span>
  );
}

export function ReportCoverSignatureCard({
  calculation,
  codeLayout = "inline",
}: ReportCoverSignatureCardProps) {
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

        <div
          className={[
            "report-cover-signature-code",
            codeLayout === "paired-rows" ? "report-cover-signature-code--paired-rows" : null,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {codeLayout === "paired-rows" ? (
            <>
              <div className="report-cover-signature-code-row">
                {renderCodePart(layers[0])}
                <span className="report-cover-signature-sep"> | </span>
                {renderCodePart(layers[1])}
              </div>
              <div className="report-cover-signature-code-row">
                {renderCodePart(layers[2])}
                <span className="report-cover-signature-sep"> | </span>
                {renderCodePart(layers[3])}
              </div>
            </>
          ) : (
            layers.map((layer, index) => (
              <span key={layer.key}>
                {index > 0 ? <span className="report-cover-signature-sep"> | </span> : null}
                {renderCodePart(layer)}
              </span>
            ))
          )}
        </div>
      </article>
    </div>
  );
}
