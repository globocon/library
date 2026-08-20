import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare tunnel domains for dev resources
  // @ts-ignore
  allowedDevOrigins: ["*.trycloudflare.com", "xbox-analyst-students-findings.trycloudflare.com"],
};

export default nextConfig;
