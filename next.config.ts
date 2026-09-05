import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["sprint-huntress-boundless.ngrok-free.dev", "demographical-wren-unglibly.ngrok-free.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Wildcard subdomain — covers any bucket under this Cloudflare
        // account (currently just sg-fit-media), not just the one bucket.
        hostname: "*.2130355488899b24486ad80b3532d62d.r2.cloudflarestorage.com",
        // No `search` restriction — R2 signed URLs carry a unique, one-time
        // signature query string every time, so it can't be pinned to a fixed value.
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
