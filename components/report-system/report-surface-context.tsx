"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ReportSurface } from "@/lib/report-system/report-surface";

const ReportSurfaceContext = createContext<ReportSurface>("web");

export function ReportSurfaceProvider({
  surface,
  children,
}: {
  surface: ReportSurface;
  children: ReactNode;
}) {
  return <ReportSurfaceContext.Provider value={surface}>{children}</ReportSurfaceContext.Provider>;
}

export function useReportSurface(): ReportSurface {
  return useContext(ReportSurfaceContext);
}
