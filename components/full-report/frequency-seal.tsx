type FrequencySealProps = {
  s1Code: string;
  s3Code: string;
  s2Code: string;
  s0Code: string;
  sealCode: string;
};

/** Layered SVG token — fixed geometry, dynamic code labels (spec v1.1 MVP). */
export function FrequencySeal({ s1Code, s3Code, s2Code, s0Code, sealCode }: FrequencySealProps) {
  return (
    <div className="fr-frequency-seal" aria-label={`Frequency Seal ${sealCode}`}>
      <svg viewBox="0 0 120 120" className="fr-frequency-seal-svg" aria-hidden>
        <circle cx="60" cy="60" r="54" className="fr-seal-ring fr-seal-ring--s1" />
        <circle cx="60" cy="60" r="40" className="fr-seal-ring fr-seal-ring--s3" />
        <ellipse cx="60" cy="60" rx="46" ry="18" className="fr-seal-axis fr-seal-axis--s2" />
        <circle cx="60" cy="60" r="14" className="fr-seal-portal fr-seal-portal--s0" />
        <circle cx="60" cy="60" r="4" className="fr-seal-core" />
      </svg>
      <p className="fr-frequency-seal-label">Your Frequency Seal</p>
      <p className="fr-frequency-seal-codes">{sealCode}</p>
      <ul className="fr-frequency-seal-legend" aria-hidden>
        <li>{s1Code}</li>
        <li>{s3Code}</li>
        <li>{s2Code}</li>
        <li>{s0Code}</li>
      </ul>
    </div>
  );
}
