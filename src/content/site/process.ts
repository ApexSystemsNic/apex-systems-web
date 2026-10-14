import type { ProcessStep } from "@/types/site";

export const process = {
  title: "Un proceso claro desde la primera conversación hasta la publicación.",
  steps: [
    {
      number: "01",
      title: "Cuéntanos qué necesitas",
      description: "Completas una solicitud breve y continuamos la conversación por WhatsApp.",
    },
    {
      number: "02",
      title: "Agendamos una reunión",
      description: "Conversamos para comprender tu negocio, aclarar dudas y definir prioridades.",
    },
    {
      number: "03",
      title: "Preparamos una propuesta personalizada",
      description: "Te presentamos el alcance, las funciones, el precio, el tiempo estimado, las etapas, las revisiones, la forma de pago y el mantenimiento.",
    },
    {
      number: "04",
      title: "Formalizamos el proyecto",
      description: "Confirmamos el acuerdo, recibimos el 50 % de adelanto, reunimos el contenido y fijamos la fecha de inicio.",
    },
    {
      number: "05",
      title: "Diseñamos y desarrollamos",
      description: "Desarrollamos tu proyecto, te compartimos avances y hacemos las revisiones acordadas.",
    },
    {
      number: "06",
      title: "Revisamos y publicamos",
      description:
        "Verificamos el funcionamiento, la adaptación a distintas pantallas, los formularios, la velocidad, la seguridad, la analítica y el SEO básico. Tras tu aprobación se completa el pago pendiente y, después, publicamos o entregamos el proyecto.",
    },
    {
      number: "07",
      title: "Continuamos acompañándote",
      description: "Incluimos 30 días para corregir errores relacionados con el desarrollo entregado y ofrecemos mantenimiento mensual opcional.",
    },
  ] satisfies ProcessStep[],
};
