import Link from "next/link";
import { GeneratingChamber } from "@/components/generating/generating-chamber";
import {
  GENERATING_REDIRECT_DELAY_MS,
  GENERATING_STEP_MS,
  GENERATING_STEPS,
} from "@/lib/generating-content";
import { absoluteUrl } from "@/lib/site-url";
import { buildResultHref } from "@/lib/session1320";
import { isValidBirthDate } from "@/lib/validateBirthDate";

const REDIRECT_SECONDS = Math.max(
  1,
  Math.ceil(
    (GENERATING_STEPS.length * GENERATING_STEP_MS + GENERATING_REDIRECT_DELAY_MS) / 1000,
  ),
);

type GeneratingPageProps = {
  searchParams: Promise<{ year?: string; month?: string; day?: string }>;
};

export default async function GeneratingPage({ searchParams }: GeneratingPageProps) {
  const params = await searchParams;
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);

  if (!isValidBirthDate(year, month, day)) {
    return (
      <div className="generating-page glass-card">
        <h1 className="generating-title">
          <span>Unable to open your</span>
          <span>1320 Soul Blueprint</span>
        </h1>
        <p className="generating-body">Please enter a valid birth date to open your blueprint.</p>
        <Link href="/your-code" className="gold-button generating-cta mt-6">
          BACK TO YOUR CODE
        </Link>
      </div>
    );
  }

  const resultHref = buildResultHref(year, month, day);
  const resultAbsolute = await absoluteUrl(resultHref);
  // WebKit meta refresh truncates unescaped & in query strings — entity-escape for mobile Safari.
  const metaRefresh = `${REDIRECT_SECONDS};url=${resultAbsolute.replace(/&/g, "&amp;")}`;

  return (
    <>
      {/* Server HTML — works even when mobile dev client router is broken (172.16.x LAN). */}
      <meta httpEquiv="refresh" content={metaRefresh} />
      <GeneratingChamber
        year={year}
        month={month}
        day={day}
        resultHref={resultHref}
        redirectSeconds={REDIRECT_SECONDS}
      />
    </>
  );
}
