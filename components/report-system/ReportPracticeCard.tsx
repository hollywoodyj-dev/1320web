type ReportPracticeCardProps = {
  dayLabel: string;
  title: string;
  subtitle: string;
};

export function ReportPracticeCard({ dayLabel, title, subtitle }: ReportPracticeCardProps) {
  return (
    <article className="report-practice-card">
      <div className="report-practice-day">{dayLabel}</div>
      <div className="report-practice-body">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}
