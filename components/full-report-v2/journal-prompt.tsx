type JournalPromptProps = {
  prompt: string;
};

export function JournalPrompt({ prompt }: JournalPromptProps) {
  return (
    <div className="fr-v2-journal-prompt">
      <div className="fr-v2-journal-prompt__text">{prompt}</div>
      <div className="fr-v2-journal-prompt__lines" aria-hidden="true" />
    </div>
  );
}
