import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Incluir los JSON de la Biblia en el output de Vercel
  outputFileTracingIncludes: {
    "/**": ["./src/data/bible/*.json"],
  },
};

export default nextConfig;
