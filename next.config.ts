import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Cloudflare Pages serves this project as static HTML/CSS/JS from /out.
  output: "export",
  // Static exports do not include the default Next.js image optimization
  // server. The two local logos remain optimized source assets and are copied
  // directly into the export instead.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
