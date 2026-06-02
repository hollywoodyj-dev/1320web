import { PILLAR_TONE } from "@/lib/pillar-tone";
import { SEGMENTS } from "@/lib/segments";

type ReceiveItem = {
  code: string;
  title: string;
  text: string;
};

type ReceivePillarGridProps = {
  items: ReceiveItem[];
};

export function ReceivePillarGrid({ items }: ReceivePillarGridProps) {
  return (
    <div className="pillar-grid inner-receive-pillar-grid">
      {items.map((item) => {
        const segment = SEGMENTS.find((s) => s.code === item.code);
        const tone = segment ? PILLAR_TONE[segment.id] : "gold";
        return (
          <article key={item.code} className={`pillar-card pillar-${tone} report-pillar-card`}>
            <p className="pillar-code">{item.code}</p>
            <div className="pillar-card-body">
              <h3>{item.title.toUpperCase()}</h3>
              <p className="report-pillar-essence">{item.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
