import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/tw-full-report": [
      "./docs/gzh/1320_S0_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S1_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S2_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S3_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S4_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S5_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S5_RELATIONSHIP_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S5_EXPRESSION_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S5_PATTERN_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S6_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S7_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S8_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_S9_EDITORIAL_PASS_v0.1.md",
      "./docs/gzh/1320_SEVEN_DAY_EDITORIAL_PASS_v0.1.md",
    ],
  },
  // Coze / Blueprint Experience OpenAPI paths (`/v1/...`) → Next route handlers.
  async rewrites() {
    return [
      { source: "/v1/health", destination: "/api/v1/health" },
      { source: "/v1/blueprints/resolve", destination: "/api/v1/blueprints/resolve" },
      {
        source: "/v1/blueprints/:blueprint_id/experience-profile",
        destination: "/api/v1/blueprints/:blueprint_id/experience-profile",
      },
      {
        source: "/free-soul-blueprint/result",
        destination: "/result",
      },
    ];
  },
  // Allow phone/tablet on LAN IP to load dev assets (fixes broken client router + HMR).
  allowedDevOrigins: [
    "127.0.0.1",
    "127.0.0.1:3000",
    "localhost",
    "localhost:3000",
    "172.16.0.21",
    "172.16.0.21:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://172.16.0.21:3000",
  ],
  async redirects() {
    return [
      // Page 01 canonical is root; never index a duplicate under /guides.
      // statusCode 301 required (permanent: true alone emits 308 in Next.js).
      {
        source: "/guides/what-is-a-soul-blueprint",
        destination: "/what-is-a-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/what-is-a-soul-blueprint/",
        destination: "/what-is-a-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/life-path-number-vs-soul-blueprint",
        destination: "/life-path-number-vs-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/life-path-number-vs-soul-blueprint/",
        destination: "/life-path-number-vs-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/what-is-my-life-path-number",
        destination: "/what-is-my-life-path-number",
        statusCode: 301,
      },
      {
        source: "/guides/what-is-my-life-path-number/",
        destination: "/what-is-my-life-path-number",
        statusCode: 301,
      },
      {
        source: "/guides/numerology-by-date-of-birth-vs-soul-blueprint",
        destination: "/numerology-by-date-of-birth-vs-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/numerology-by-date-of-birth-vs-soul-blueprint/",
        destination: "/numerology-by-date-of-birth-vs-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/birthday-number-vs-life-path-number-vs-soul-blueprint",
        destination: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/birthday-number-vs-life-path-number-vs-soul-blueprint/",
        destination: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
        statusCode: 301,
      },
      {
        source: "/guides/what-does-your-birthday-mean",
        destination: "/what-does-your-birthday-mean",
        statusCode: 301,
      },
      {
        source: "/guides/what-does-your-birthday-mean/",
        destination: "/what-does-your-birthday-mean",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/tw-full-report",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/integration/facilitator",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/api/personal-integration/facilitator/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
