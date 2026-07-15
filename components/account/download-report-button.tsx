"use client";

import Link from "next/link";
import { useState } from "react";
import {
  buildEntitledReportPrintPath,
} from "@/lib/report-system/report-print-urls";
import { ACCOUNT_COPY } from "@/lib/auth/account-content";

type DownloadReportButtonProps = {
  reportId: string;
  className?: string;
};

function openPrintFallback(reportId: string) {
  const printPath = `${buildEntitledReportPrintPath(reportId)}?autoprint=1`;
  window.open(printPath, "_blank", "noopener,noreferrer");
}

export function DownloadReportButton({ reportId, className }: DownloadReportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPrintFallback, setShowPrintFallback] = useState(false);

  async function handleDownload() {
    setLoading(true);
    setError(null);
    setShowPrintFallback(false);

    try {
      const response = await fetch(`/api/report/${reportId}/pdf`);
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        const message = payload?.error ?? `Download failed (${response.status})`;

        if (response.status === 504 || response.status === 408) {
          openPrintFallback(reportId);
          setShowPrintFallback(true);
          setError(ACCOUNT_COPY.downloadReportOpenedPrintFallback);
          return;
        }

        throw new Error(message);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `1320-full-report-${reportId.slice(0, 8)}.pdf`;
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error ? downloadError.message : ACCOUNT_COPY.downloadReportFailed,
      );
      setShowPrintFallback(true);
    } finally {
      setLoading(false);
    }
  }

  const printPath = `${buildEntitledReportPrintPath(reportId)}?autoprint=1`;

  return (
    <span className="inline-flex flex-col items-start">
      <button
        type="button"
        className={className}
        onClick={handleDownload}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? ACCOUNT_COPY.downloadReportPreparing : ACCOUNT_COPY.downloadReport}
      </button>
      {error ? (
        <span className="mt-2 text-sm text-red-300" role="alert">
          {error}
        </span>
      ) : null}
      {showPrintFallback ? (
        <Link href={printPath} target="_blank" rel="noreferrer" className="blueprint-secondary-link mt-2 text-sm">
          {ACCOUNT_COPY.downloadReportPrintLink}
        </Link>
      ) : null}
    </span>
  );
}
