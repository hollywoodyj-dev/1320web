import Link from "next/link";

type ReportFinalCtaProps = {
  title: string;
  body: string;
  unlock: string;
  unlockHref: string;
  book: string;
  bookHref: string;
  profile: string;
  profileNote: string;
};

export function ReportFinalCta({
  title,
  body,
  unlock,
  unlockHref,
  book,
  bookHref,
  profile,
  profileNote,
}: ReportFinalCtaProps) {
  return (
    <section className="report-final-cta">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="report-final-cta-buttons">
        <Link href={unlockHref} className="gold-button">
          {unlock}
        </Link>
        <Link href={bookHref} className="report-cta-outline">
          {book}
        </Link>
        <span className="report-cta-teal report-cta-disabled" title="Phase 2">
          {profile} <small>({profileNote})</small>
        </span>
      </div>
    </section>
  );
}
