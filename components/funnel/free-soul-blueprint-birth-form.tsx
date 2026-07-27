"use client";

import { useEffect, useRef } from "react";
import { BirthDateForm } from "@/components/birthdate-form";
import { trackEvent } from "@/lib/analytics";
import {
  attributionToAnalyticsProps,
  readAttributionFromSearchParams,
  saveFunnelAttribution,
} from "@/lib/funnel/attribution";
import { FREE_SOUL_BLUEPRINT_HERO } from "@/lib/free-soul-blueprint-content";

type FreeSoulBlueprintBirthFormProps = {
  idPrefix: string;
};

export function FreeSoulBlueprintBirthForm({ idPrefix }: FreeSoulBlueprintBirthFormProps) {
  const startedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = readAttributionFromSearchParams(params);
    saveFunnelAttribution({
      ...incoming,
      landingPath: "/free-soul-blueprint",
      capturedAt: new Date().toISOString(),
    });
    trackEvent("free_blueprint_landing_view", attributionToAnalyticsProps(incoming));
  }, []);

  function onFieldFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("free_blueprint_birthdate_started", attributionToAnalyticsProps());
  }

  return (
    <BirthDateForm
      variant="free-soul-blueprint"
      idPrefix={idPrefix}
      submitLabel={FREE_SOUL_BLUEPRINT_HERO.cta}
      onFieldFocus={onFieldFocus}
    />
  );
}
