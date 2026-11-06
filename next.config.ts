import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Blogs and images live in /content; include them in the Vercel serverless bundle
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
