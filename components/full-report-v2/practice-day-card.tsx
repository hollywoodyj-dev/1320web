type PracticeDayCardProps = {
  day: number;
  theme: string;
  practice: string;
  reflection: string;
};

export function PracticeDayCard({ day, theme, practice, reflection }: PracticeDayCardProps) {
  return (
    <article className="fr-v2-practice-day-card">
      <div className="fr-v2-practice-day-card__theme">Day {day} · {theme}</div>
      <div className="fr-v2-practice-day-card__section">
        <strong>Practice:</strong> {practice}
      </div>
      <div className="fr-v2-practice-day-card__section">
        <strong>Reflection:</strong> {reflection}
      </div>
    </article>
  );
}
