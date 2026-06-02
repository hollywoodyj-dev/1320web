type Practice = {
  number: string;
  title: string;
  body: string;
};

type IntegrationPracticeGridProps = {
  practices: Practice[];
};

export function IntegrationPracticeGrid({ practices }: IntegrationPracticeGridProps) {
  return (
    <section className="report-practices" id="integration">
      <h2 className="report-section-title">Integration Practices</h2>
      <div className="report-practices-grid">
        {practices.map((practice) => (
          <article key={practice.number} className="report-practice-card glass-card">
            <p className="report-practice-num">{practice.number}</p>
            <h3>{practice.title}</h3>
            <p>{practice.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
