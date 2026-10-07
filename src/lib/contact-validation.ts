import type { ContactFormData } from "./contact-message";

export const CONTACT_LIMITS = {
  nombre: 80, negocio: 100, categoria: 80, descripcion: 600,
  presupuesto: 60, telefono: 20, correo: 150,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Local UX validation only; a future endpoint must validate independently. */
export function getContactErrors(step: number, data: ContactFormData): string[] {
  const errors: string[] = [];
  if (step === 1) {
    for (const key of ["nombre", "negocio", "categoria"] as const) {
      if (!data[key].trim() || data[key].length > CONTACT_LIMITS[key]) errors.push(key);
    }
  }
  if (step === 2) {
    if (!["pagina-web", "tienda-catalogo", "sistema-personalizado", "aplicacion-movil", "mantenimiento", "otro"].includes(data.solucion)) errors.push("solucion");
    if (!data.descripcion.trim() || data.descripcion.length > CONTACT_LIMITS.descripcion) errors.push("descripcion");
  }
  if (step === 3) {
    const phoneRequired = data.medioContacto === "whatsapp";
    const emailRequired = data.medioContacto === "correo";
    if ((!data.telefono.trim() && !data.correo.trim()) || (phoneRequired && !data.telefono.trim()) || (emailRequired && !data.correo.trim())) errors.push("contacto");
    if (data.telefono.length > CONTACT_LIMITS.telefono) errors.push("telefono");
    if (data.correo.length > CONTACT_LIMITS.correo || (data.correo.trim() && !EMAIL_PATTERN.test(data.correo.trim()))) errors.push("correo");
    if (!["whatsapp", "correo", "cualquiera"].includes(data.medioContacto)) errors.push("medioContacto");
    if (!data.aceptaPrivacidad) errors.push("aceptaPrivacidad");
  }
  return errors;
}
