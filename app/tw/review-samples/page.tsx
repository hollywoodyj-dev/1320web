import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { GzhTwReviewBirthdays } from "@/components/gzh/gzh-tw-review-birthdays";
import { isTwV2ReportEnabled } from "@/lib/gzh/tw-v2-report-access";
import { gzhHref } from "@/lib/gzh/locale";

export const metadata: Metadata = {
  title: "RC3 樣稿審閱｜1320 TW 內部",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

/** Preview-only RC3 sample desk — not customer-publishable. */
export default async function TwReviewSamplesPage() {
  const host = (await headers()).get("host");
  if (!isTwV2ReportEnabled(host)) {
    return (
      <article className="gzh-landing">
        <section className="gzh-band">
          <h1 className="gzh-band-title">這一頁還沒有開放</h1>
          <p className="gzh-band-copy">樣稿審閱僅在 Preview／本機開放；正式站維持關閉。</p>
          <Link className="gzh-btn gzh-btn--outline-dark" href={gzhHref("tw")}>
            回到首頁
          </Link>
        </section>
      </article>
    );
  }

  return (
    <article className="gzh-landing">
      <section className="gzh-band">
        <p className="gzh-eyebrow">INTERNAL REVIEW · RC3 CANDIDATES</p>
        <h1 className="gzh-band-title">RC3 樣稿審閱入口</h1>
        <p className="gzh-band-copy">
          此頁供內部比較 Free Sample 與 Full Report 的閱讀品質。內容皆為 PENDING／HOLD，非正式核准，也不開放購買。本頁
          noindex，正式主機關閉。
        </p>
        <p className="gzh-boundary">
          「生命藍圖」導覽目前暫連首頁四鏡區（#foundation）；獨立內容頁待產品確認後再分拆。
        </p>
        <div className="gzh-cta-row">
          <Link
            className="gzh-btn gzh-btn--navy"
            href="/tw-v2-report?year=1980&month=5&day=22&product=sample"
          >
            1980 Free Sample
          </Link>
          <Link
            className="gzh-btn gzh-btn--outline-dark"
            href="/tw-v2-report?year=1980&month=5&day=22"
          >
            1980 Full
          </Link>
          <Link
            className="gzh-btn gzh-btn--navy"
            href="/tw-v2-report?year=1982&month=2&day=3&product=sample"
          >
            1982 Free Sample
          </Link>
          <Link
            className="gzh-btn gzh-btn--outline-dark"
            href="/tw-v2-report?year=1982&month=2&day=3"
          >
            1982 Full
          </Link>
          <Link
            className="gzh-btn gzh-btn--navy"
            href="/tw-v2-report?year=1983&month=3&day=8&product=sample"
          >
            1983 Free Sample
          </Link>
        </div>
      </section>

      <section className="gzh-band gzh-band--paper">
        <GzhTwReviewBirthdays product="SAMPLE" />
      </section>
    </article>
  );
}
