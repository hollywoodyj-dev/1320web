type ModuleBadgeProps = {
  moduleCode: string;
  moduleName: string;
  codeTitle?: string;
};

export function ModuleBadge({ moduleCode, moduleName, codeTitle }: ModuleBadgeProps) {
  return (
    <div className="fr-v2-module-badge">
      <div className="fr-v2-module-badge__module">{moduleCode}</div>
      <div className="fr-v2-module-badge__title">{moduleName}</div>
      {codeTitle ? (
        <div className="fr-v2-module-badge__code">{codeTitle}</div>
      ) : null}
    </div>
  );
}
