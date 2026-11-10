import type { Metadata } from "next";
import { headers } from "next/headers";
import { sampleFullDifference } from "@/lib/gzh/tw-v2-blueprint";
import { isTwV2ReportEnabled } from "@/lib/gzh/tw-v2-report-access";
import "../v2-report.css";

export const metadata: Metadata = {
  title: "1320 免費與完整差異",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function TwV2DifferencePage() {
  const host = (await headers()).get("host");
  if (!isTwV2ReportEnabled(host)) {
    return (
      <main className="v2-report">
        <div className="v2-report-inner">
          <h1>這一頁還沒有開放</h1>
        </div>
      </main>
    );
  }

  const rows = sampleFullDifference();

  return (
    <main className="v2-report">
      <article className="v2-report-inner">
        <p className="v2-kicker">1320 Soul Code</p>
        <h1>免費與完整差異</h1>
        <p className="v2-lead">
          這一頁只說明兩種閱讀各自包含什麼。價格與結帳流程不在這裡改動。顧客主動提供的關注主題，必須標成他自己的選擇，不能寫成生日算出來的經歷。
        </p>
        <div className="v2-table-wrap">
          <table>
            <thead>
              <tr>
                <th>內容</th>
                <th>免費試讀</th>
                <th>完整報告</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.sample}</td>
                  <td>{row.full}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <a href="/tw-v2-report?year=1980&month=5&day=22&product=sample">看四碼試讀</a>
          {" · "}
          <a href="/tw-v2-report?year=1980&month=5&day=22">看完整樣本</a>
        </p>
      </article>
    </main>
  );
}
