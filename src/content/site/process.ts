import type { ProcessStep } from "@/types/site";

export const process = {
  title: "Un proceso claro desde la primera conversación hasta la publicación.",
  steps: [
    {
      number: "01",
      title: "Cuéntanos qué necesitas",
      description: "Solicitud breve y continuación por WhatsApp.",
    },
    {
      number: "02",
      title: "Agendamos una reunión",
      description: "Comprender el negocio, aclarar dudas y priorizar.",
    },
    {
      number: "03",
      title: "Preparamos una propuesta personalizada",
      description: "Alcance, funciones, precio, tiempo, etapas, revisiones, pago y mantenimiento.",
    },
    {
      number: "04",
      title: "Formalizamos el proyecto",
      description: "Acuerdo, 50 % de adelanto, recopilación de contenido y fecha de inicio.",
    },
    {
      number: "05",
      title: "Diseñamos y desarrollamos",
      description: "Avances y revisiones acordadas.",
    },
    {
      number: "06",
      title: "Revisamos y publicamos",
      description:
        "Funcionamiento, responsive, formularios, velocidad, seguridad, analítica y SEO básico. Tras aprobación se completa el pago pendiente.",
    },
    {
      number: "07",
      title: "Continuamos acompañándote",
      description: "Un mes para errores del desarrollo entregado y mantenimiento mensual opcional.",
    },
  ] satisfies ProcessStep[],
};
