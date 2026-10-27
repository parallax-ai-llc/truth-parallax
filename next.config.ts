import type { NextConfig } from "next";

// Static export served as Cloudflare Workers static assets (wrangler.jsonc).
// Content only changes on deploy, so every page is prerendered at build time;
// response headers live in public/_headers.
const nextConfig: NextConfig = {
  output: "export",

  // Pin the workspace root so Turbopack (Next 16 default) doesn't misinfer it
  turbopack: {
    root: __dirname,
  },

  poweredByHeader: false,

  // No image optimizer in a static export: images load from Wikimedia as-is.
  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
