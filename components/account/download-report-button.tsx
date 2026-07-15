"use client";

import { useState } from "react";
import { ACCOUNT_COPY } from "@/lib/auth/account-content";

type DownloadReportButtonProps = {
  reportId: string;
  className?: string;
};

export function DownloadReportButton({ reportId, className }: DownloadReportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/report/${reportId}/pdf`);
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? `Download failed (${response.status})`);
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
    } finally {
      setLoading(false);
    }
  }

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
    </span>
  );
}
