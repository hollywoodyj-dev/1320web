type ReportHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function ReportHero({ eyebrow, title, description }: ReportHeroProps) {
  return (
    <section className="report-hero">
      {eyebrow ? <div className="section-kicker">{eyebrow}</div> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </section>
  );
}
