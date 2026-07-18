import Link from "next/link";

type LockedPreviewBlockProps = {
  title: string;
  description: string;
  unlockHref?: string;
  badge?: string;
};

export function LockedPreviewBlock({
  title,
  description,
  unlockHref = "/full-report",
  badge = "Full Report",
}: LockedPreviewBlockProps) {
  return (
    <article className="locked-preview-block">
      <div className="locked-badge">{badge}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={unlockHref} className="locked-cta">
        Unlock Full Report
      </Link>
    </article>
  );
}
