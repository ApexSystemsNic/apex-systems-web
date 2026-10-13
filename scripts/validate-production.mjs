// Validación de despliegue. Sin dependencias, sin red y de solo lectura.
//
//   node scripts/validate-production.mjs         → antes del build: revisa SITE_URL.
//   node scripts/validate-production.mjs --out   → después del build: revisa out/.
//
// `npm run check:deploy` ejecuta ambas con `npm run check` en medio.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// Mismo dominio por defecto que src/lib/site-url.ts.
const OFFICIAL_ORIGIN = "https://apexsystemsnic.com";
const LOCAL_HOSTS = ["localhost", "127.0.0.1", "::1", "[::1]"];

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warn = (message) => console.warn(`AVISO: ${message}`);

/** Origen de SITE_URL si está definida y es válida; `null` si no está definida. */
function readSiteUrl() {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;

  let url;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    errors.push("SITE_URL no contiene una URL válida.");
    return null;
  }

  if (url.username || url.password) errors.push("SITE_URL no puede incluir usuario ni contraseña.");
  if (url.protocol !== "https:") errors.push("SITE_URL debe usar HTTPS en producción.");
  if (LOCAL_HOSTS.includes(url.hostname)) errors.push("SITE_URL no puede apuntar a localhost en producción.");
  if (url.pathname !== "/" || url.search || url.hash) {
    errors.push("SITE_URL debe contener solo el origen, sin ruta, query ni hash.");
  }
  return url.origin;
}

function checkEnvironment() {
  const origin = readSiteUrl();
  if (errors.length > 0) return;

  if (!origin) {
    console.log(`SITE_URL no está definida: el build usará el dominio oficial (${OFFICIAL_ORIGIN}).`);
  } else if (origin !== OFFICIAL_ORIGIN) {
    warn(`SITE_URL (${origin}) no es el dominio oficial (${OFFICIAL_ORIGIN}). Correcto solo en una vista previa o migración.`);
  } else {
    console.log(`Configuración de producción válida: ${origin}`);
  }
}

/** Valor de `attribute` en las etiquetas que cumplen `tagPattern`, sin depender del orden de atributos. */
function attributeValues(html, tagPattern, attribute) {
  return (html.match(tagPattern) ?? [])
    .map((tag) => tag.match(new RegExp(`\\s${attribute}="([^"]*)"`))?.[1])
    .filter((value) => value !== undefined);
}

function checkExport() {
  const out = join(root, "out");
  if (!existsSync(out)) {
    errors.push("No existe out/. Ejecuta `npm run build` antes de verificar la exportación.");
    return;
  }

  const expected = readSiteUrl();
  const read = (file) => readFileSync(join(out, file), "utf8");
  const pages = ["index", "404", "privacidad", "terminos", "cookies"];
  const pageFile = {};

  for (const page of pages) {
    // Según `trailingSlash`, Next exporta `ruta.html` o `ruta/index.html`.
    const file = [`${page}.html`, `${page}/index.html`].find((candidate) => existsSync(join(out, candidate)));
    if (file) pageFile[page] = file;
    else errors.push(`Falta la página exportada: out/${page}.html`);
  }
  for (const file of ["robots.txt", "sitemap.xml", "_headers"]) {
    if (!existsSync(join(out, file))) errors.push(`Falta el archivo exportado: out/${file}`);
  }
  if (errors.length > 0) return;

  // Ningún documento publicado puede apuntar a un entorno local.
  // Solo archivos: Next también crea carpetas llamadas `robots.txt` y `sitemap.xml`.
  const documents = readdirSync(out, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(html|xml|txt)$/i.test(entry.name))
    .map((entry) => relative(out, join(entry.parentPath ?? entry.path, entry.name)));
  for (const file of documents) {
    const match = read(file).match(/localhost|127\.0\.0\.1/);
    if (match) errors.push(`out/${file} contiene "${match[0]}".`);
  }

  // canonical, og:url, sitemap y robots deben compartir un único origen https.
  const urls = [];
  for (const page of pages) {
    const html = read(pageFile[page]);
    const canonical = attributeValues(html, /<link\b[^>]*\srel="canonical"[^>]*>/g, "href");
    const ogUrl = attributeValues(html, /<meta\b[^>]*\sproperty="og:url"[^>]*>/g, "content");
    // La 404 no es indexable: no se le exige canonical ni og:url.
    if (page !== "404") {
      if (canonical.length === 0) errors.push(`out/${pageFile[page]} no tiene <link rel="canonical">.`);
      if (ogUrl.length === 0) errors.push(`out/${pageFile[page]} no tiene <meta property="og:url">.`);
    }
    for (const value of canonical) urls.push([`canonical de ${pageFile[page]}`, value]);
    for (const value of ogUrl) urls.push([`og:url de ${pageFile[page]}`, value]);
  }

  const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (locs.length === 0) errors.push("out/sitemap.xml no contiene ninguna <loc>.");
  for (const value of locs) urls.push(["sitemap.xml", value]);
  for (const match of read("robots.txt").matchAll(/^\s*(?:Sitemap|Host):\s*(\S+)/gim)) {
    urls.push(["robots.txt", match[1]]);
  }

  const origins = new Set();
  for (const [source, value] of urls) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") errors.push(`${source} no usa https: ${value}`);
      origins.add(url.origin);
    } catch {
      errors.push(`${source} no es una URL absoluta: ${value}`);
    }
  }
  if (origins.size > 1) {
    errors.push(`canonical, og:url, sitemap y robots usan orígenes distintos: ${[...origins].join(", ")}`);
  }
  const [origin] = origins;
  if (origin && expected && origin !== expected) {
    errors.push(`out/ se generó con ${origin}, pero SITE_URL es ${expected}. Vuelve a compilar.`);
  } else if (origin && origin !== OFFICIAL_ORIGIN) {
    warn(`out/ usa ${origin}, que no es el dominio oficial (${OFFICIAL_ORIGIN}).`);
  }

  if (!readFileSync(join(out, "_headers")).equals(readFileSync(join(root, "public", "_headers")))) {
    errors.push("out/_headers no es idéntico a public/_headers.");
  }

  if (errors.length === 0) {
    console.log(`Exportación válida: ${documents.length} documentos revisados, origen ${origin}.`);
  }
}

if (process.argv.includes("--out")) checkExport();
else checkEnvironment();

if (errors.length > 0) {
  for (const message of errors) console.error(`ERROR: ${message}`);
  process.exit(1);
}
