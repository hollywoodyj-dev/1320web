type DisclaimerBoxProps = {
  children: React.ReactNode;
};

export function DisclaimerBox({ children }: DisclaimerBoxProps) {
  return <div className="fr-v2-disclaimer-box">{children}</div>;
}
