type ReportInsightCardProps = {
  icon?: string;
  kicker?: string;
  title: string;
  body: string;
};

export function ReportInsightCard({
  icon = "✦",
  kicker,
  title,
  body,
}: ReportInsightCardProps) {
  return (
    <article className="report-insight-card">
      <div className="card-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="card-body">
        {kicker ? <p className="card-kicker">{kicker}</p> : null}
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
