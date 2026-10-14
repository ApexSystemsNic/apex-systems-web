const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://apexsystemsnic.com";

function parseOrigin(value: string, source: string): URL {
  const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const url = new URL(normalized);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${source} debe usar http:// o https://.`);
  }

  if (url.username || url.password) {
    throw new Error(`${source} no puede incluir usuario ni contraseña.`);
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`${source} debe contener solo el origen, sin ruta, query ni hash.`);
  }

  return url;
}

/**
 * URL pública base usada por los metadatos, robots y el sitemap.
 *
 * SITE_URL permite sobrescribirla en builds de vista previa o de migración.
 * Sin SITE_URL, todo build (`next build`, local o en Cloudflare Pages) usa el
 * dominio oficial, de modo que los metadatos nunca apuntan a localhost.
 * Solo `npm run dev` cae a localhost.
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

  if (process.env.NODE_ENV === "production") {
    return new URL(PRODUCTION_SITE_URL);
  }

  return new URL(LOCAL_SITE_URL);
}
