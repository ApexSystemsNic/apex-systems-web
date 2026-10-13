import { socialLinks, whatsappDisplay } from "@/content/contact-channels";
import { solutions } from "@/content/site-content";

const SERVICE_NAMES = solutions.cards.map((card) => card.title);

// Facebook queda fuera de sameAs: su href actual es un enlace de compartir, no la URL de la página.
const instagramUrl = socialLinks.find((link) => link.icon === "instagram")?.href;
const email = socialLinks.find((link) => link.icon === "mail")?.href.replace("mailto:", "");

// U+2028 y U+2029 se construyen por código para no dejar separadores de línea literales en el archivo.
const UNSAFE_JSON_LD_CHARS = new RegExp(`[<>&${String.fromCharCode(0x2028, 0x2029)}]`, "g");

/** Serializa JSON-LD sin caracteres que puedan cerrar el <script> que lo contiene. */
export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data).replace(
    UNSAFE_JSON_LD_CHARS,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}

export function buildStructuredData(siteUrl: URL) {
  const origin = siteUrl.origin;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Apex Systems",
        alternateName: ["Apex Systems Nicaragua", "Apex Systems Nic"],
        url: origin,
        logo: `${origin}/apex-logo.png`,
        description:
          "Empresa tecnológica de Nicaragua que desarrolla páginas web, sistemas personalizados, aplicaciones móviles y soluciones digitales para negocios.",
        areaServed: { "@type": "Country", name: "Nicaragua" },
        ...(instagramUrl && { sameAs: [instagramUrl] }),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: whatsappDisplay,
          ...(email && { email }),
          areaServed: { "@type": "Country", name: "Nicaragua" },
          availableLanguage: "es",
        },
        makesOffer: SERVICE_NAMES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: "Apex Systems Nicaragua",
        url: origin,
        inLanguage: "es",
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}
