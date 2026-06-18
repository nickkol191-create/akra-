import type { NextConfig } from "next";

/**
 * Static export — `next build` emits a plain ./out folder of HTML/CSS/JS with
 * no Node server required. Host it anywhere static.
 *
 * Base path:
 *  - Root hosting (Hostinger public_html, custom domain, username.github.io):
 *      npm run build              -> served at "/"
 *  - GitHub Pages project subpath (username.github.io/akra-residences):
 *      set PAGES_BASE_PATH="/akra-residences" before building.
 *      The included GitHub Actions workflow does this automatically.
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  devIndicators: false,
};

export default nextConfig;
