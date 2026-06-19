type ReflectionBoxProps = {
  label?: string;
  children: React.ReactNode;
};

export function ReflectionBox({ label = "Reflection", children }: ReflectionBoxProps) {
  return (
    <div className="fr-v2-reflection-box">
      <div className="fr-v2-reflection-box__label">{label}</div>
      <div className="fr-v2-reflection-box__text">{children}</div>
    </div>
  );
}
