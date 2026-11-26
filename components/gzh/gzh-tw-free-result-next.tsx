import Link from "next/link";
import { GZH_TW_RESULT } from "@/lib/gzh/tw-content";

type GzhTwFreeResultNextProps = {
  year: number;
  month: number;
  day: number;
};

/** Free → Chinese Full Report Preview (no checkout). */
export function GzhTwFreeResultNext({ year, month, day }: GzhTwFreeResultNextProps) {
  const copy = GZH_TW_RESULT.nextStep;
  const qs = `year=${year}&month=${month}&day=${day}`;
  const fullHref = `/tw-v2-report?${qs}`;
  const sampleHref = `/tw-v2-report?${qs}&product=sample`;

  return (
    <section className="gzh-next" aria-labelledby="gzh-next-title">
      <p className="gzh-eyebrow">FREE → FULL · ZH-TW PREVIEW</p>
      <h2 id="gzh-next-title" className="gzh-section-title">
        {copy.title}
      </h2>
      <p className="gzh-band-copy">{copy.body}</p>

      <div className="gzh-next-map">
        <div className="gzh-next-col">
          <p className="gzh-next-label">{copy.freeLabel}</p>
          <ul>
            {copy.freeLayers.map((layer) => (
              <li key={layer.code}>
                <strong>{layer.code}</strong> · {layer.title}
              </li>
            ))}
          </ul>
        </div>
        <p className="gzh-next-arrow" aria-hidden="true">
          →
        </p>
        <div className="gzh-next-col">
          <p className="gzh-next-label">{copy.fullLabel}</p>
          <ul>
            {copy.fullLayers.map((layer) => (
              <li key={layer.code}>
                <strong>{layer.code}</strong> · {layer.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="gzh-next-includes">
        {copy.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="gzh-report-note">{copy.languageNote}</p>
      <p className="gzh-boundary">{copy.holdNote}</p>

      <div className="gzh-cta-row">
        <Link className="gzh-btn gzh-btn--navy" href={fullHref}>
          {copy.primaryCta}
        </Link>
        <Link className="gzh-btn gzh-btn--outline-dark" href={sampleHref}>
          {copy.secondaryCta}
        </Link>
      </div>
    </section>
  );
}
