import Image from "next/image";

type IntegratedSummaryCardProps = {
  title: string;
  lead: string;
  body: string;
};

export function IntegratedSummaryCard({ title, lead, body }: IntegratedSummaryCardProps) {
  return (
    <section className="report-integrated glass-card">
      <div className="report-integrated-ring" aria-hidden>
        <div className="report-integrated-ring-glow" />
        <div className="report-integrated-ring-art">
          <Image
            src="/generating-1320-ring.png"
            alt=""
            width={1254}
            height={1254}
            sizes="140px"
            className="report-integrated-ring-image"
          />
        </div>
      </div>
      <div className="report-integrated-copy">
        <h2 className="report-integrated-title text-gold-gradient">{title}</h2>
        <p className="report-integrated-lead">{lead}</p>
        <p className="report-integrated-body">{body}</p>
      </div>
    </section>
  );
}
