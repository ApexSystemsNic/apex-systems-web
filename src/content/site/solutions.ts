import type { SolutionCard } from "@/types/site";

export const solutions = {
  title: "Tecnología diseñada alrededor de tu negocio.",
  intro:
    "No todos los negocios tienen las mismas necesidades. En Apex analizamos cada proyecto para crear una solución completamente personalizada, práctica y preparada para crecer contigo.",
  cards: [
    {
      number: "01",
      title: "Páginas web",
      hook: "Convierte tu presencia digital en una herramienta para generar oportunidades.",
      description:
        "Diseñamos páginas empresariales, portafolios profesionales y landing pages que presentan claramente el negocio y facilitan el contacto.",
      includes: [
        "Diseño personalizado",
        "Adaptación responsive",
        "WhatsApp",
        "Formularios",
        "Analítica",
        "SEO",
        "Dominio durante el primer año cuando esté en la propuesta",
      ],
      cta: "Quiero una página web",
      accent: "sky",
      visual: "web",
    },
    {
      number: "02",
      title: "Tiendas y catálogos digitales",
      hook: "Muestra tus productos y facilita que tus clientes realicen pedidos.",
      description:
        "Creamos catálogos para restaurantes y comercios que necesitan presentar productos, recibir pedidos o gestionar solicitudes de reservación.",
      includes: [
        "Categorías",
        "Buscador",
        "Carrito para preparar pedidos",
        "Pedidos por WhatsApp",
        "Reservaciones",
        "Panel de productos",
        "Control básico de solicitudes",
      ],
      note: "No ofrecemos pagos en línea por el momento.",
      cta: "Digitalizar mi negocio",
      accent: "coral",
      visual: "catalog",
    },
    {
      number: "03",
      title: "Sistemas personalizados",
      hook: "Una solución construida según la manera en que funciona tu negocio.",
      description:
        "Desarrollamos herramientas para organizar información, automatizar tareas y mejorar procesos que actualmente se realizan manualmente.",
      includes: [
        "Inventario",
        "Clientes",
        "Solicitudes",
        "Citas",
        "Pedidos",
        "Reportes",
        "Estadísticas",
        "Paneles",
        "Automatización de procesos",
      ],
      cta: "Necesito una solución personalizada",
      accent: "violet",
      visual: "system",
    },
    {
      number: "04",
      title: "Aplicaciones móviles para negocios",
      hook: "Lleva las operaciones y servicios de tu negocio directamente al celular.",
      description:
        "Desarrollamos aplicaciones móviles personalizadas para empresas que necesitan digitalizar procesos, gestionar operaciones, ofrecer servicios o conectarse mejor con sus clientes y equipos.",
      includes: [
        "Android y iOS",
        "Diseño personalizado",
        "Panel administrativo",
        "Usuarios y accesos",
        "Notificaciones",
        "Integración con APIs",
        "Bases de datos",
        "Integración con sistemas",
      ],
      cta: "Quiero una aplicación",
      accent: "sky",
      visual: "mobile",
    },
    {
      number: "05",
      title: "Soporte y mantenimiento",
      badge: "Exclusivo para clientes Apex",
      hook: "Tu proyecto no termina cuando publicamos la página.",
      description:
        "Servicio mensual que puede incluir actualizaciones, optimización, solución de errores, contenido, copias de seguridad, monitoreo y revisión de seguridad según el alcance contratado.",
      includes: [],
      cta: "Conocer el mantenimiento",
      accent: "mint",
      visual: "support",
    },
  ] satisfies SolutionCard[],
};
