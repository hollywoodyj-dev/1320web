import { SectionCard } from "@/components/section-card";

type FaqItem = { q: string; a: string };

type FaqSectionProps = {
  title?: string;
  items: FaqItem[];
};

export function FaqSection({ title = "Frequently Asked Questions", items }: FaqSectionProps) {
  return (
    <SectionCard title={title}>
      <div className="blueprint-faq">
        {items.map((item) => (
          <details key={item.q} className="blueprint-faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </SectionCard>
  );
}
