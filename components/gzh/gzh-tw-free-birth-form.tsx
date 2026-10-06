"use client";

import { useEffect, useRef } from "react";
import { BirthDateForm } from "@/components/birthdate-form";
import { trackEvent } from "@/lib/analytics";
import {
  attributionToAnalyticsProps,
  readAttributionFromSearchParams,
  saveFunnelAttribution,
} from "@/lib/funnel/attribution";
import { GZH_TW_FREE } from "@/lib/gzh/tw-content";

type GzhTwFreeBirthFormProps = {
  idPrefix: string;
};

export function GzhTwFreeBirthForm({ idPrefix }: GzhTwFreeBirthFormProps) {
  const startedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = readAttributionFromSearchParams(params);
    if (Object.keys(incoming).length > 0) {
      saveFunnelAttribution(incoming);
    }
    trackEvent("free_blueprint_landing_view", {
      ...attributionToAnalyticsProps(incoming),
      product_track: "gzh",
      market: "tw",
      script: "hant",
    });
  }, []);

  function onFieldFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("free_blueprint_birthdate_started", {
      ...attributionToAnalyticsProps(),
      product_track: "gzh",
      market: "tw",
    });
  }

  return (
    <BirthDateForm
      variant="free-soul-blueprint"
      idPrefix={idPrefix}
      submitLabel={GZH_TW_FREE.cta}
      onFieldFocus={onFieldFocus}
      destination="result"
      resultPath="/tw/result"
      action="/tw/result"
    />
  );
}
