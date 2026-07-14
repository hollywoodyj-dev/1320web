export type MobileReportTip = {
  icon: string;
  lines: string[];
};

type MobileReportTipsPanelProps = {
  title: string;
  tips: MobileReportTip[];
};

export function MobileReportTipsPanel({ title, tips }: MobileReportTipsPanelProps) {
  return (
    <section className="mr-density-tips-panel">
      <h2 className="mr-density-tips-title">{title}</h2>
      <div className="mr-density-tips-grid">
        {tips.map((tip) => (
          <div key={tip.icon + tip.lines.join("-")} className="mr-density-tip">
            <span className="mr-density-tip-icon" aria-hidden="true">
              {tip.icon}
            </span>
            {tip.lines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
