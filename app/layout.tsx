import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getSiteUrl } from "@/lib/platform-config";
import "./globals.css";
import "@/styles/site-density-v1.css";
import "@/styles/about-density-v1.css";
import "@/styles/blueprint-density-v1.css";
import "@/styles/your-code-density-v1.css";
import "@/styles/full-report-v2/report-global.css";
import "@/styles/full-report-v2/report-theme-dark.css";
import "@/styles/full-report-v2/report-components.css";
import "@/styles/full-report-v2/report-pages.css";
import "@/styles/full-report-v2/report-responsive.css";
import "@/styles/full-report-v2/report-print.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "1320 Soul Origin Code System",
    template: "%s | 1320 Soul Origin Code",
  },
  description:
    "Discover your 1320 Soul Origin Code — a four-part frequency-based blueprint for self-awareness, reflection, and conscious integration.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "1320 Soul Origin Code System",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
