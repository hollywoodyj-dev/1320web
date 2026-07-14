type MobileReportInsightCardProps = {
  kicker: string;
  title: string;
  body: string;
  icon?: string;
};

export function MobileReportInsightCard({
  kicker,
  title,
  body,
  icon = "✦",
}: MobileReportInsightCardProps) {
  return (
    <article className="report-insight-card">
      <div className="report-card-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="report-card-body">
        <p className="report-card-kicker">{kicker}</p>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
