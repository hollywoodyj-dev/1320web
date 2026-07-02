import type { ReactNode } from "react";
import { ReportGlyph, type ReportGlyphName } from "@/components/full-report-v2/report-glyph";

type PageFooterItem = {
  icon: ReportGlyphName;
  content: ReactNode;
};

type PageFooterProps = {
  items: PageFooterItem[];
};

export function PageFooter({ items }: PageFooterProps) {
  return (
    <footer className="fr-v2-page-footer-band">
      {items.map((item, i) => (
        <div key={i} className="fr-v2-page-footer-item">
          <div className="fr-v2-round-icon">
            <ReportGlyph name={item.icon} />
          </div>
          <div>{item.content}</div>
        </div>
      ))}
    </footer>
  );
}
