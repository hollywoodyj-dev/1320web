import Link from "next/link";

type ReportFinalCtaProps = {
  title: string;
  body: string;
  book: string;
  waitlist: string;
  profile: string;
  profileNote: string;
};

export function ReportFinalCta({ title, body, book, waitlist, profile, profileNote }: ReportFinalCtaProps) {
  return (
    <section className="report-final-cta">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="report-final-cta-buttons">
        <Link href="/booking" className="gold-button">
          {book}
        </Link>
        <Link href="/full-report" className="report-cta-violet">
          {waitlist}
        </Link>
        <span className="report-cta-teal report-cta-disabled" title="Phase 2">
          {profile} <small>({profileNote})</small>
        </span>
      </div>
    </section>
  );
}
