type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  sections: LegalSection[];
  notice?: string;
};

export function LegalDocument({ sections, notice }: LegalDocumentProps) {
  return (
    <div className="legal-document space-y-5">
      {notice ? <p className="legal-placeholder-notice">{notice}</p> : null}
      {sections.map((section) => (
        <section key={section.title} className="legal-section glass-card">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
