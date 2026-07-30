import Link from "next/link";
import { SectionCard } from "@/components/section-card";

type FaqItem = {
  q: string;
  a: string;
  href?: string;
  linkLabel?: string;
};

type FaqSectionProps = {
  id?: string;
  title?: string;
  items: FaqItem[];
};

export function FaqSection({
  id,
  title = "Frequently Asked Questions",
  items,
}: FaqSectionProps) {
  return (
    <SectionCard id={id} title={title}>
      <div className="blueprint-faq">
        {items.map((item) => (
          <details key={item.q} className="blueprint-faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
            {item.href && item.linkLabel ? (
              <p>
                <Link href={item.href} className="blueprint-secondary-link">
                  {item.linkLabel}
                </Link>
              </p>
            ) : null}
          </details>
        ))}
      </div>
    </SectionCard>
  );
}
