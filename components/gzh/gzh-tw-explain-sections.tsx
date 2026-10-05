import {
  GZH_TW_EXAMPLE,
  GZH_TW_HOW,
  GZH_TW_WHAT_YOU_GET,
} from "@/lib/gzh/tw-content";

/** Shared comprehension-first blocks for /tw landing and free flow. */
export function GzhTwExplainSections() {
  return (
    <div className="gzh-explain">
      <section className="gzh-section" aria-labelledby="gzh-how-title">
        <h2 id="gzh-how-title" className="gzh-section-title">
          {GZH_TW_HOW.title}
        </h2>
        <ol className="gzh-steps">
          {GZH_TW_HOW.steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="gzh-section" aria-labelledby="gzh-get-title">
        <h2 id="gzh-get-title" className="gzh-section-title">
          {GZH_TW_WHAT_YOU_GET.title}
        </h2>
        <ul className="gzh-list">
          {GZH_TW_WHAT_YOU_GET.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="gzh-section gzh-example" aria-labelledby="gzh-example-title">
        <h2 id="gzh-example-title" className="gzh-section-title">
          {GZH_TW_EXAMPLE.title}
        </h2>
        <p className="gzh-example-parts">{GZH_TW_EXAMPLE.parts}</p>
        {GZH_TW_EXAMPLE.sampleLines.map((line) => (
          <p key={line} className="gzh-example-line">
            {line}
          </p>
        ))}
        <p className="gzh-example-takeaway">{GZH_TW_EXAMPLE.takeaway}</p>
      </section>
    </div>
  );
}
