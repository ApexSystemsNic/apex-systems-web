import type { AudienceSegment } from "@/types/site";

export const audience = {
  title: "Soluciones creadas para negocios que quieren crecer y trabajar mejor.",
  intro:
    "Apex está dirigido a emprendimientos, profesionales y negocios de Nicaragua que buscan fortalecer su presencia digital, facilitar la atención a sus clientes o mejorar sus procesos internos.",
  segments: [
    {
      id: "restaurantes",
      title: "Restaurantes y cafeterías",
      description:
        "Creamos experiencias digitales que permiten presentar el menú, compartir promociones y facilitar pedidos o solicitudes de reservación.",
      possibilities: [
        "Presentar su propuesta con claridad",
        "Facilitar la decisión del cliente",
        "Acercar la conversación o reservación",
      ],
      cta: "Digitalizar mi restaurante",
    },
    {
      id: "tiendas",
      title: "Tiendas y comercios",
      description:
        "Ayudamos a organizar y presentar productos de manera profesional para facilitar que los clientes encuentren lo que necesitan.",
      possibilities: [
        "Ordenar productos de forma clara",
        "Ayudar a encontrar lo necesario",
        "Preparar solicitudes de pedido",
      ],
      cta: "Crear mi catálogo",
    },
    {
      id: "negocios-locales",
      title: "Negocios locales",
      description:
        "Construimos una presencia digital que explique claramente qué hace el negocio, dónde está ubicado y cómo pueden contactarlo.",
      possibilities: [
        "Explicar qué hace el negocio",
        "Hacer visible dónde encontrarlo",
        "Facilitar consultas y cotizaciones",
      ],
      cta: "Presentar mi negocio",
    },
    {
      id: "profesionales",
      title: "Profesionales independientes",
      description:
        "Diseñamos páginas que ayudan a presentar experiencia, servicios y formas de contacto de manera profesional.",
      possibilities: [
        "Presentar experiencia y servicios",
        "Construir confianza profesional",
        "Facilitar solicitudes y citas",
      ],
      cta: "Impulsar mi presencia digital",
    },
  ] satisfies AudienceSegment[],
  closing: {
    text: "Si tu negocio tiene una necesidad particular, podemos construir una solución alrededor de ella.",
    cta: "Cuéntanos tu idea",
  },
};
