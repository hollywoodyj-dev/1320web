import Link from "next/link";
import type { FullReportBlock } from "@/lib/full-report/build-full-report-payload";
import { FrequencySeal } from "@/components/full-report/frequency-seal";

type FullReportBlocksProps = {
  blocks: FullReportBlock[];
  layout: string;
  screenId: string;
};

export function FullReportBlocks({ blocks, layout, screenId }: FullReportBlocksProps) {
  if (!blocks.length) return null;

  if (screenId === "soul-archetype") {
    const eyebrow = blocks.find((block): block is Extract<FullReportBlock, { type: "text" }> => block.type === "text" && block.variant === "eyebrow");
    const title = blocks.find((block): block is Extract<FullReportBlock, { type: "text" }> => block.type === "text" && block.variant === "title");
    const subtitle = blocks.find((block): block is Extract<FullReportBlock, { type: "text" }> => block.type === "text" && block.variant === "subtitle");
    const body = blocks.find((block): block is Extract<FullReportBlock, { type: "text" }> => block.type === "text" && block.variant === "body");
    const guidance = blocks.find((block): block is Extract<FullReportBlock, { type: "text" }> => block.type === "text" && block.variant === "guidance");
    const chips = blocks.find((block): block is Extract<FullReportBlock, { type: "chips" }> => block.type === "chips");

    return (
      <div className={`fr-blocks fr-blocks--${layout} fr-blocks--${screenId}`}>
        {eyebrow ? <p className="fr-text fr-text--eyebrow">{eyebrow.text}</p> : null}
        <div className="fr-soul-archetype-panel">
          {title ? <p className="fr-text fr-text--title">{title.text}</p> : null}
          {subtitle ? <p className="fr-text fr-text--subtitle">{subtitle.text}</p> : null}
          {body ? <p className="fr-text fr-text--body">{body.text}</p> : null}
          {chips || guidance ? (
            <div className="fr-soul-archetype-lower">
              {chips ? (
                <div className="fr-chips">
                  {chips.items.map((item) => (
                    <span key={item} className="fr-chip">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
              {guidance ? <p className="fr-text fr-text--guidance">{guidance.text}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`fr-blocks fr-blocks--${layout} fr-blocks--${screenId}`}>
      {blocks.map((block, index) => (
        <BlockRenderer key={`${screenId}-${index}`} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: FullReportBlock }) {
  switch (block.type) {
    case "text":
      return <p className={`fr-text fr-text--${block.variant}`}>{block.text}</p>;
    case "bullets":
      return (
        <div className="fr-glass-card">
          {block.label ? <h3 className="fr-card-label">{block.label}</h3> : null}
          <ul className="fr-bullets">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "chips":
      return (
        <div className="fr-chips">
          {block.items.map((item) => (
            <span key={item} className="fr-chip">
              {item}
            </span>
          ))}
        </div>
      );
    case "fields":
      return (
        <div className="fr-field-stack">
          {block.items.map((f) => (
            <div key={f.label} className="fr-glass-card">
              <h3 className="fr-card-label">{f.label}</h3>
              {f.items?.length ? (
                <ul className="fr-bullets">
                  {f.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="fr-card-body">{f.value}</p>
              )}
            </div>
          ))}
        </div>
      );
    case "dashboard":
      return (
        <div className="fr-dashboard-layout">
          <div className="fr-dashboard-cards">
            {block.cards.map((card) => (
              <div key={card.code} className="fr-dashboard-card fr-glass-card">
                <p className="fr-dashboard-card-code">{card.code}</p>
                <p className="fr-dashboard-card-title">{card.title}</p>
                <p className="fr-dashboard-card-meaning">{card.meaning}</p>
                {card.meta ? <p className="fr-dashboard-card-meta">{card.meta}</p> : null}
              </div>
            ))}
          </div>
          <FrequencySeal
            s1Code={block.cards[0]?.code ?? ""}
            s3Code={block.cards[1]?.code ?? ""}
            s2Code={block.cards[2]?.code ?? ""}
            s0Code={block.cards[3]?.code ?? ""}
            sealCode={block.sealCode}
          />
        </div>
      );
    case "practice-days":
      return (
        <div className="fr-practice-grid">
          {block.days.map((day) => (
            <div key={day.day} className="fr-glass-card fr-practice-card">
              <p className="fr-practice-day">{day.day}</p>
              <h3 className="fr-card-label">{day.title}</h3>
              <p className="fr-card-body">{day.practice}</p>
            </div>
          ))}
        </div>
      );
    case "cta":
      return (
        <div className="fr-cta-stack">
          <Link href={block.primary.href} className="gold-button fr-cta-primary">
            {block.primary.label}
          </Link>
          <Link href={block.secondary.href} className="fr-cta-secondary">
            {block.secondary.label}
          </Link>
          {block.utility ? (
            <Link href={block.utility.href} className="fr-cta-utility">
              {block.utility.label}
            </Link>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}
