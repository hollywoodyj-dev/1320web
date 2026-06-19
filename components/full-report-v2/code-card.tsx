type CodeCardProps = {
  label?: string;
  code: string;
  subtitle?: string;
};

export function CodeCard({ label, code, subtitle }: CodeCardProps) {
  return (
    <div className="fr-v2-code-card">
      {label ? <div className="fr-v2-code-card__label">{label}</div> : null}
      <div className="fr-v2-code-card__code">{code}</div>
      {subtitle ? <div className="fr-v2-code-card__sub">{subtitle}</div> : null}
    </div>
  );
}
