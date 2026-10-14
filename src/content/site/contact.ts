import type { SolutionOption } from "@/types/site";

export const contact = {
  title: "Hablemos sobre lo que tu negocio necesita.",
  description:
    "Cuéntanos brevemente tu idea. Revisaremos la información y coordinaremos una conversación para entender tu negocio y preparar una cotización personalizada.",
  submitCta: "Enviar consulta por WhatsApp",
  pendingNotice:
    "Abrimos WhatsApp con tu consulta preparada. Revisa el mensaje y presiona Enviar para compartirlo con Apex Systems.",
  phoneError:
    "Revisa el teléfono: usa de 7 a 15 dígitos; puedes incluir +, espacios, paréntesis, guiones o puntos.",
  fieldErrors: {
    nombre: "Cuéntanos tu nombre.",
    negocio: "Indica el nombre de tu negocio.",
    categoria: "Cuéntanos a qué se dedica tu negocio.",
    solucion: "Selecciona la solución que te interesa.",
    descripcion: "Cuéntanos brevemente qué necesitas.",
    correo: "Revisa el formato del correo (por ejemplo, nombre@dominio.com).",
    medioContacto: "Indica cómo prefieres que te contactemos.",
    contactoWhatsapp: "Añade tu teléfono para contactarte por WhatsApp.",
    contactoCorreo: "Añade tu correo para contactarte por ese medio.",
    contactoCualquiera: "Déjanos al menos un teléfono o un correo.",
  },
  privacyNotice: {
    text: "Al finalizar abriremos WhatsApp con tu consulta preparada; el sitio no almacena tus datos. Más información en la",
    linkLabel: "política de privacidad",
  },
  solutionOptions: [
    { value: "pagina-web", label: "Páginas web" },
    { value: "tienda-catalogo", label: "Tiendas y catálogos digitales" },
    { value: "sistema-personalizado", label: "Sistemas personalizados" },
    { value: "aplicacion-movil", label: "Aplicaciones móviles para negocios" },
    { value: "mantenimiento", label: "Mantenimiento para clientes Apex" },
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
