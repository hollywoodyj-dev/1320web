import { PILLAR_TONE } from "@/lib/pillar-tone";

type SymbolBlock = {
  digit: string;
  name: string;
  text: string;
};

const DIGIT_TONE: Record<string, (typeof PILLAR_TONE)[keyof typeof PILLAR_TONE]> = {
  "1": "gold",
  "3": "violet",
  "2": "blue",
  "0": "teal",
};

type SymbolPillarGridProps = {
  blocks: SymbolBlock[];
};

export function SymbolPillarGrid({ blocks }: SymbolPillarGridProps) {
  return (
    <div className="pillar-grid inner-symbol-pillar-grid">
      {blocks.map((block) => {
        const tone = DIGIT_TONE[block.digit] ?? "gold";
        return (
          <article key={block.digit} className={`pillar-card pillar-${tone} report-pillar-card`}>
            <p className="pillar-code">{block.digit}</p>
            <div className="pillar-card-body">
              <h2>{block.name.toUpperCase()}</h2>
              <p className="report-pillar-essence">{block.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
