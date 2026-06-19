type CalculationRowProps = {
  label: string;
  value: string;
  formula?: string;
};

export function CalculationRow({ label, value, formula }: CalculationRowProps) {
  return (
    <div className="fr-v2-calculation-row">
      <div>
        <div className="fr-v2-calculation-row__label">{label}</div>
        {formula ? <div className="fr-v2-calculation-row__formula">{formula}</div> : null}
      </div>
      <div className="fr-v2-calculation-row__value">{value}</div>
    </div>
  );
}
