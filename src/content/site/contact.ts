import type { SolutionOption } from "@/types/site";

export const contact = {
  title: "Hablemos sobre lo que tu negocio necesita.",
  description:
    "Cuéntanos brevemente tu idea. Revisaremos la información y coordinaremos una conversación para entender tu negocio y preparar una cotización completamente personalizada.",
  submitCta: "Enviar consulta por WhatsApp",
  pendingNotice:
    "Abrimos WhatsApp con tu consulta preparada. Revisa el mensaje y presiona Enviar para compartirlo con Apex Systems.",
  solutionOptions: [
    { value: "pagina-web", label: "Páginas web" },
    { value: "tienda-catalogo", label: "Tiendas y catálogos digitales" },
    { value: "sistema-personalizado", label: "Sistemas personalizados" },
    { value: "aplicacion-movil", label: "Aplicaciones móviles para negocios" },
    { value: "mantenimiento", label: "Mantenimiento — solo para clientes Apex" },
    { value: "otro", label: "Otro / no estoy seguro" },
  ] satisfies SolutionOption[],
  contactMethodOptions: [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "correo", label: "Correo electrónico" },
    { value: "cualquiera", label: "Cualquiera" },
  ] satisfies SolutionOption[],
};

export const contactMessageTemplate = `Hola, equipo de Apex. Mi nombre es {{nombre}} y represento a {{negocio}}.

Me interesa: {{solucion}}.
Tipo de negocio: {{categoria}}.
Necesito ayuda con: {{descripcion}}.

Me gustaría recibir información y coordinar una reunión.`;
