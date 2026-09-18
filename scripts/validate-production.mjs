const rawSiteUrl = process.env.SITE_URL?.trim();

if (!rawSiteUrl) {
  console.error("ERROR: SITE_URL no está definida. Ejemplo: https://www.tudominio.com");
  process.exit(1);
}

let siteUrl;
try {
  siteUrl = new URL(/^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`);
} catch {
  console.error("ERROR: SITE_URL no contiene una URL válida.");
  process.exit(1);
}

if (siteUrl.protocol !== "https:") {
  console.error("ERROR: SITE_URL debe usar HTTPS en producción.");
  process.exit(1);
}

if (["localhost", "127.0.0.1", "::1"].includes(siteUrl.hostname)) {
  console.error("ERROR: SITE_URL no puede apuntar a localhost en producción.");
  process.exit(1);
}

if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  console.error("ERROR: SITE_URL debe contener solo el origen, sin ruta, query ni hash.");
  process.exit(1);
}

console.log(`Configuración de producción válida: ${siteUrl.origin}`);
