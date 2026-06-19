import type { ReactNode } from "react";

type PageFooterItem = {
  icon: string;
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
          <div className="fr-v2-round-icon">{item.icon}</div>
          <div>{item.content}</div>
        </div>
      ))}
    </footer>
  );
}
