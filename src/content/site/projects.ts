import type { Project } from "@/types/site";

/** Textos del bloque «Proyectos» de la home. */
export const projectsSection = {
  kicker: "Proyectos",
  title: "Proyectos reales que ya construimos",
  intro:
    "Una muestra del trabajo de Apex Systems: un catálogo digital con panel administrativo y un sitio web institucional.",
  cardCta: "Conocer el proyecto",
};

/** Textos comunes de las páginas de caso. */
export const projectPage = {
  kicker: "Proyecto desarrollado por Apex Systems",
  backLabel: "Volver a proyectos",
  contextTitle: "La necesidad",
  builtTitle: "Qué construimos",
  featuresKicker: "Funciones destacadas",
  featuresTitle: "Lo que incluye el proyecto",
  capabilitiesKicker: "Lo que aporta Apex",
  capabilitiesTitle: "Qué demuestra este proyecto",
  ctaKicker: "El siguiente paso",
  ctaText: "¿Tienes un proyecto parecido en mente? Cuéntanos qué necesita tu negocio.",
  ctaLabel: "Cuéntanos tu idea",
  otherTitle: "Otro proyecto",
  metaTitleSuffix: "Proyecto de Apex Systems",
};

// El orden define la home.
export const projects: Project[] = [
  {
    slug: "body-factory-gym",
    name: "Body Factory Gym",
    category: "Catálogo digital y gestión comercial",
    summary:
      "Catálogo de suplementos con precio regular y mayorista, pedidos por WhatsApp, panel administrativo e instalación como app en el teléfono.",
    metaDescription:
      "Catálogo digital de Body Factory Gym desarrollado por Apex Systems: precio regular y mayorista, pedidos por WhatsApp, panel administrativo y app instalable.",
    intro:
      "Body Factory Gym es un gimnasio en Managua, Nicaragua, que también vende suplementos. Apex Systems desarrolló su catálogo digital y las herramientas internas para administrar esa venta.",
    context:
      "Vender suplementos además de atender un gimnasio exige mostrar los productos con sus precios, recibir pedidos de forma ordenada y llevar el control del inventario, todo con una experiencia cómoda desde el celular.",
    built:
      "Un catálogo público con precio regular y precio mayorista, un carrito que prepara el pedido y lo envía por WhatsApp, y un panel administrativo para el día a día del negocio. Además, se puede instalar en el teléfono como una app.",
    featureGroups: [
      {
        title: "Catálogo público",
        items: ["Productos con precio regular y precio mayorista", "Diseño pensado primero para móvil"],
      },
      {
        title: "Pedidos por WhatsApp",
        items: [
          "Carrito que reúne los productos elegidos",
          "Pedido preparado y enviado por WhatsApp",
          "Sin pago en línea: el pedido se atiende por WhatsApp",
        ],
      },
      {
        title: "Panel administrativo",
        items: ["Productos", "Inventario", "Pedidos", "Reseñas"],
      },
      {
        title: "Experiencia tipo app",
        items: ["Instalable en el teléfono (PWA)", "Acceso desde la pantalla de inicio"],
      },
    ],
    capabilities: [
      "Construimos experiencias comerciales completas: la parte que ve el público y las herramientas internas para administrarla.",
      "Adaptamos el proceso de venta a la forma de trabajar del negocio, como los pedidos por WhatsApp.",
      "Diseñamos primero para el celular.",
      "Desarrollamos aplicaciones web instalables (PWA).",
    ],
    visual: {
      theme: "body-factory",
      logo: { src: "/projects/body-factory-gym/logo-300.webp", width: 300, height: 242, alt: "" },
      tags: ["Precio mayorista", "Pedidos por WhatsApp", "Panel administrativo", "App instalable"],
    },
  },
  {
    slug: "finca-montecristo",
    name: "Finca Montecristo",
    category: "Sitio web institucional",
    summary:
      "Sitio institucional para una finca cafetalera familiar de Nueva Segovia, con portada en video, galería y una experiencia móvil propia.",
    metaDescription:
      "Sitio web institucional de Finca Montecristo, finca cafetalera familiar de Murra, Nueva Segovia, desarrollado por Apex Systems con video, galería y SEO.",
    intro:
      "Finca Montecristo es una finca cafetalera familiar en Murra, Nueva Segovia, Nicaragua. Apex Systems desarrolló su sitio web institucional, centrado en la marca y en contar la historia de la finca.",
    context:
      "Una finca familiar con historia se beneficia de un espacio propio en internet para presentar su marca y mostrar quiénes son, con una presentación visual cuidada que se vea bien en cualquier pantalla.",
    built:
      "Un sitio visual con portada en video, animaciones y galería, con un diseño adaptable que incluye una experiencia específica para móvil y una base de SEO para que el sitio pueda encontrarse en buscadores.",
    featureGroups: [
      {
        title: "Marca e historia",
        items: ["Sitio orientado a la marca", "Espacio para contar la historia de la finca"],
      },
      {
        title: "Experiencia visual",
        items: ["Portada con video", "Animaciones", "Galería de imágenes"],
      },
      {
        title: "Pensado para cada pantalla",
        items: ["Diseño adaptable", "Experiencia móvil específica"],
      },
      {
        title: "Visibilidad en buscadores",
        items: ["Optimización para buscadores (SEO)"],
      },
    ],
    capabilities: [
      "Creamos sitios institucionales que cuentan la historia de una marca.",
      "Combinamos video, animación e imagen en una experiencia visual ordenada.",
      "Diseñamos experiencias específicas para móvil, no solo versiones reducidas del escritorio.",
      "Cuidamos el SEO desde el desarrollo.",
    ],
    visual: {
      theme: "montecristo",
      tags: [],
      desktop: {
        src: "/projects/finca-montecristo/hero-desktop.webp",
        width: 1600,
        height: 1000,
        alt: "Portada del sitio de Finca Montecristo en escritorio",
      },
      preview: {
        src: "/projects/finca-montecristo/hero-preview.jpg",
        width: 960,
        height: 600,
        alt: "Portada del sitio de Finca Montecristo en escritorio",
      },
      mobile: {
        src: "/projects/finca-montecristo/hero-mobile.webp",
        width: 440,
        height: 952,
        alt: "Portada del sitio de Finca Montecristo en móvil",
      },
      gallery: {
        src: "/projects/finca-montecristo/gallery-desktop.webp",
        width: 1600,
        height: 1000,
        alt: "Sección de galería del sitio de Finca Montecristo en escritorio",
      },
    },
    externalUrl: "https://montecristonic.com/",
    externalLabel: "Visitar sitio",
  },
];
