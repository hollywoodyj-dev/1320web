type ReflectionJournalProps = {
  prompts: string[];
};

export function ReflectionJournal({ prompts }: ReflectionJournalProps) {
  return (
    <section className="report-journal" id="reflection">
      <h2 className="report-section-title">Reflection Journal</h2>
      <ul className="report-journal-list">
        {prompts.map((prompt) => (
          <li key={prompt}>{prompt}</li>
        ))}
      </ul>
    </section>
  );
}
