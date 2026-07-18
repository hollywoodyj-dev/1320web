import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  async headers() {
    return [
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
