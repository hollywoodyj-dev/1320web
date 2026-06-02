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
};

export default nextConfig;
