import { GlassPanel } from "@/components/full-report-v2/glass-panel";
import { PageFooter } from "@/components/full-report-v2/page-footer";
import { PageHeader } from "@/components/full-report-v2/page-header";
import { ReportPage } from "@/components/full-report-v2/report-page";
import { SignatureSegmentCardIcon } from "@/components/full-report-v2/signature-segment-card-icon";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import {
  SIGNATURE_CODE_CARD_META,
  SIGNATURE_EXPLAIN_COPY,
  SIGNATURE_FOOTER_ITEMS,
  SIGNATURE_HERO,
  SIGNATURE_NEXT_ITEMS,
  SIGNATURE_NEXT_NOTE,
  SIGNATURE_WHAT_ITEMS,
  type SignatureCodeCardKey,
} from "@/lib/full-report-v2/signature-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

const CODE_CARD_ORDER: SignatureCodeCardKey[] = ["s1", "s3", "s2", "s0"];

type Page03SignatureProps = {
  payload: FullReportV2Payload;
};

export function Page03Signature({ payload }: Page03SignatureProps) {
  const { client, report, calculation } = payload;

  const signatureLine = [
    calculation.s1.code,
    calculation.s3.code,
    calculation.s2.code,
    calculation.s0.code,
  ].join(" | ");

  return (
    <ReportPage sectionId="page-03-signature" pageIndex={3} className="fr-v2-signature-page">
      <div className="fr-v2-cosmic-lines" />
      <section className="fr-v2-page-shell fr-v2-signature-shell">
        <PageHeader pageIndex={3} />

        <section className="fr-v2-signature-hero">
          <h1 className="fr-v2-signature-hero-title">{SIGNATURE_HERO.title}</h1>
          <p className="fr-v2-signature-hero-subtitle">
            {SIGNATURE_HERO.subtitleLead}{" "}
            <strong>{SIGNATURE_HERO.subtitleHighlight}</strong>{" "}
            {SIGNATURE_HERO.subtitleTail}
          </p>
        </section>

        <section className="fr-v2-signature-main">
          <aside className="fr-v2-signature-left">
            <GlassPanel className="fr-v2-signature-birth-panel">
              <div className="fr-v2-signature-birth-label">Birth Date</div>
              <div className="fr-v2-signature-birth-date">{client.birth_date_display}</div>
              <div className="fr-v2-signature-birth-sub">{report.type}</div>
            </GlassPanel>

            <GlassPanel className="fr-v2-signature-what-panel">
              <div className="fr-v2-small-panel-title">What This Is</div>
              <ul className="fr-v2-signature-what-list">
                {SIGNATURE_WHAT_ITEMS.map((item) => (
                  <li key={item.text} className="fr-v2-signature-what-item">
                    <div className="fr-v2-round-icon">{item.icon}</div>
                    <div className="fr-v2-signature-what-copy">{item.text}</div>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </aside>

          <GlassPanel className="fr-v2-signature-center-panel">
            <div className="fr-v2-signature-center-content">
              <div className="fr-v2-signature-center-label">Core Signature</div>
              <div className="fr-v2-signature-center-code">{signatureLine}</div>
              <div className="fr-v2-signature-center-subtitle">Your four-part blueprint</div>

              <div className="fr-v2-signature-code-grid">
                {CODE_CARD_ORDER.map((key) => {
                  const meta = SIGNATURE_CODE_CARD_META[key];
                  const layer = calculation[key];
                  return (
                    <article key={key} className="fr-v2-signature-code-card">
                      <SignatureSegmentCardIcon
                        imageUrl={getSignatureCardImageUrl(key, calculation)}
                        code={layer.code}
                        title={layer.title}
                        fallbackIcon={meta.icon}
                      />
                      <div>
                        <div className="fr-v2-signature-code-main">{layer.code}</div>
                        <div className="fr-v2-signature-code-title">{layer.title}</div>
                        <div className="fr-v2-signature-code-desc">
                          <strong>{meta.dimension}</strong> · {meta.description}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </GlassPanel>

          <aside className="fr-v2-signature-right">
            <GlassPanel className="fr-v2-signature-explain-panel">
              <div className="fr-v2-small-panel-title">Why We Do Not Reduce You to Numbers</div>
              <p className="fr-v2-signature-explain-copy">{SIGNATURE_EXPLAIN_COPY[0]}</p>
              <p className="fr-v2-signature-explain-copy">
                The code serves as a <strong>symbolic mirror</strong> for awareness,
                integration, and conscious choice.
              </p>
            </GlassPanel>

            <GlassPanel className="fr-v2-signature-next-panel">
              <div className="fr-v2-small-panel-title">What Happens Next</div>
              <ul className="fr-v2-signature-next-list">
                {SIGNATURE_NEXT_ITEMS.map((item) => {
                  const layer = calculation[item.layer];
                  const meta = SIGNATURE_CODE_CARD_META[item.layer];
                  return (
                    <li key={item.text} className="fr-v2-signature-next-item">
                      <SignatureSegmentCardIcon
                        size={48}
                        imageUrl={getSignatureCardImageUrl(item.layer, calculation)}
                        code={layer.code}
                        title={layer.title}
                        fallbackIcon={meta.icon}
                      />
                      <div className="fr-v2-signature-next-copy">{item.text}</div>
                    </li>
                  );
                })}
              </ul>
              <p className="fr-v2-signature-next-note">{SIGNATURE_NEXT_NOTE}</p>
            </GlassPanel>
          </aside>
        </section>

        <PageFooter
          items={SIGNATURE_FOOTER_ITEMS.map((item) => ({
            icon: item.icon,
            content: (
              <>
                {item.lines[0]}
                <br />
                {item.lines[1]}
              </>
            ),
          }))}
        />
      </section>
    </ReportPage>
  );
}
