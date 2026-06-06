import Image from "next/image";
import { REPORT_HEADER_ACTIONS } from "@/lib/report/report-static-content";

type ReportHeaderProps = {
  title: string;
  subtitle: string;
  codeString: string;
  fictionBanner?: string;
};

export function ReportHeader({ title, subtitle, codeString, fictionBanner }: ReportHeaderProps) {
  const codes = codeString.split(" / ");

  return (
    <header className="report-header" id="overview">
      <div className="report-header-actions report-header-actions--utility">
        <button type="button" className="report-action-btn report-action-btn--quiet">
          {REPORT_HEADER_ACTIONS.email}
        </button>
        <button type="button" className="report-action-btn report-action-btn--quiet" disabled title="Coming soon">
          {REPORT_HEADER_ACTIONS.download}
        </button>
        <button type="button" className="report-action-btn report-action-btn--quiet">
          {REPORT_HEADER_ACTIONS.save}
        </button>
      </div>

      {fictionBanner ? <p className="report-fiction-banner">{fictionBanner}</p> : null}

      <div className="report-header-hero !border-0 !bg-transparent shadow-none backdrop-blur-none">
        <div className="report-header-copy">
          <h1 className="report-header-title text-gold-gradient">{title}</h1>
          <p className="report-header-subtitle">{subtitle}</p>
          <p className="report-code-strip">
            {codes.map((part, index) => (
              <span key={part} className={`report-code-part report-code-part-${index}`}>
                {part}
                {index < codes.length - 1 ? " / " : ""}
              </span>
            ))}
          </p>
        </div>
        <div className="report-header-ring" aria-hidden>
          <div className="report-header-ring-glow" />
          <div className="report-header-ring-art">
            <Image
              src="/generating-1320-ring.webp"
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 720px) 300px, 390px"
              className="report-header-ring-image"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
