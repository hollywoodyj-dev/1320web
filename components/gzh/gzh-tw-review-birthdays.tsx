import Link from "next/link";
import { TW_V2_REVIEW_BIRTHDAYS } from "@/lib/gzh/tw-v2-report";

type GzhTwReviewBirthdaysProps = {
  currentBirth?: string;
  product?: "FULL" | "SAMPLE";
  compact?: boolean;
};

/** Internal review queue — only birthdays with Chinese narrative fixtures. */
export function GzhTwReviewBirthdays({
  currentBirth,
  product = "FULL",
  compact = false,
}: GzhTwReviewBirthdaysProps) {
  return (
    <section
      className={`gzh-review-birthdays${compact ? " gzh-review-birthdays--compact" : ""}`}
      aria-labelledby="gzh-review-birthdays-title"
    >
      <p className="gzh-eyebrow">REVIEW QUEUE · 可審閱生日</p>
      <h2 id="gzh-review-birthdays-title" className="gzh-section-title">
        目前有中文敘事可審的生日
      </h2>
      {!compact ? (
        <p className="gzh-band-copy">
          其他生日可算編碼，但正文尚未入庫。請用下列生日切換完整報告／四碼試讀，方便核准比對。皆為
          Preview／PENDING，非正式顧客交付。
        </p>
      ) : null}
      <ul className="gzh-review-list">
        {TW_V2_REVIEW_BIRTHDAYS.map((item) => {
          const qs = `year=${item.year}&month=${item.month}&day=${item.day}`;
          const fullHref = `/tw-v2-report?${qs}`;
          const sampleHref = `/tw-v2-report?${qs}&product=sample`;
          const active = currentBirth === item.birth;
          return (
            <li key={item.birth} className={active ? "is-active" : undefined}>
              <div className="gzh-review-meta">
                <strong>{item.label}</strong>
                <span>{item.role}</span>
                {item.ageGate ? <span className="gzh-review-gate">未滿18 · 僅內部</span> : null}
              </div>
              <div className="gzh-review-actions">
                <Link
                  className={product === "FULL" && active ? "gzh-btn gzh-btn--navy gzh-btn--tiny" : "gzh-btn gzh-btn--outline-dark gzh-btn--tiny"}
                  href={fullHref}
                  aria-current={product === "FULL" && active ? "page" : undefined}
                >
                  完整報告
                </Link>
                <Link
                  className={product === "SAMPLE" && active ? "gzh-btn gzh-btn--navy gzh-btn--tiny" : "gzh-btn gzh-btn--outline-dark gzh-btn--tiny"}
                  href={sampleHref}
                  aria-current={product === "SAMPLE" && active ? "page" : undefined}
                >
                  四碼試讀
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
