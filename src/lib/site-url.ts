const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://apexsystemsnic.com";

function parseOrigin(value: string, source: string): URL {
  const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const url = new URL(normalized);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${source} debe usar http:// o https://.`);
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`${source} debe contener solo el origen, sin ruta, query ni hash.`);
  }

  return url;
}

/**
 * Public base URL used by metadata, robots and the sitemap.
 *
 * SITE_URL can override the canonical URL for preview or migration builds.
 * Production builds default to the official Apex Systems domain so metadata
 * can never accidentally point to localhost in Cloudflare Pages.
 *
 * Vercel deployments can also resolve their production URL automatically.
 * Local builds intentionally fall back to localhost so `npm run check`
 * remains reproducible before a domain is assigned.
 */
export function getSiteUrl(): URL {
  const configured = process.env.SITE_URL?.trim();
  if (configured) {
    const url = parseOrigin(configured, "SITE_URL");
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
      throw new Error("SITE_URL debe usar HTTPS en producción.");
    }
    return url;
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) {
    return parseOrigin(vercelProductionUrl, "VERCEL_PROJECT_PRODUCTION_URL");
  }

  if (process.env.NODE_ENV === "production") {
    return new URL(PRODUCTION_SITE_URL);
  }

  return new URL(LOCAL_SITE_URL);
}
