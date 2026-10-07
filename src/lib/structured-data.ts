import { solutions } from "@/content/site-content";

const SERVICE_NAMES = [
  ...solutions.cards.map((card) => card.title),
  "Desarrollo de software",
];

export function buildStructuredData(siteUrl: URL) {
  const origin = siteUrl.origin;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Apex Systems",
        alternateName: ["Apex Systems Nicaragua", "Apex Nicaragua", "Apex Systems Nic"],
        url: origin,
        logo: `${origin}/apex-logo.png`,
        description:
          "Empresa tecnológica de Nicaragua que desarrolla páginas web, sistemas personalizados, aplicaciones móviles y soluciones digitales para negocios.",
        areaServed: { "@type": "Country", name: "Nicaragua" },
        sameAs: ["https://www.instagram.com/apexsystemsnic/"],
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
