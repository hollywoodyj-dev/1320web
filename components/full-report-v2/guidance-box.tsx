type GuidanceBoxProps = {
  children: React.ReactNode;
  label?: string;
};

export function GuidanceBox({ children, label = "Wisewave Guidance" }: GuidanceBoxProps) {
  return (
    <div className="fr-v2-guidance-box">
      <div className="fr-v2-guidance-box__label">{label}</div>
      <div className="fr-v2-guidance-box__text">{children}</div>
    </div>
  );
}
