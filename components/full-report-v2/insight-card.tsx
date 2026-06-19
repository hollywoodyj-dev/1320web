type InsightCardProps = {
  title: string;
  children: React.ReactNode;
};

export function InsightCard({ title, children }: InsightCardProps) {
  return (
    <div className="fr-v2-insight-card">
      <div className="fr-v2-insight-card__title">{title}</div>
      <div className="fr-v2-insight-card__body">{children}</div>
    </div>
  );
}
