import { contactMessageTemplate } from "@/content/site-content";

export type ContactFormData = {
  nombre: string;
  negocio: string;
  categoria: string;
  solucion: string;
  descripcion: string;
  presupuesto: string;
  telefono: string;
  correo: string;
  medioContacto: string;
  aceptaPrivacidad: boolean;
};

export const emptyContactFormData: ContactFormData = {
  nombre: "",
  negocio: "",
  categoria: "",
  solucion: "",
  descripcion: "",
  presupuesto: "",
  telefono: "",
  correo: "",
  medioContacto: "",
  aceptaPrivacidad: false,
};

/** Builds the WhatsApp message from the form data without storing it. */
export function buildContactMessage(data: ContactFormData, solutionLabel: string): string {
  const fields: Record<string, string> = { ...data, aceptaPrivacidad: "", solucion: solutionLabel };
  // Single-pass callback: dollar signs and template-like user text must
  // remain literal, not become replacement syntax or nested placeholders.
  const body = contactMessageTemplate.replace(/\{\{(nombre|negocio|solucion|categoria|descripcion)\}\}/g,
    (_, key: string) => fields[key].trim() || "—");
  const methods: Record<string, string> = { whatsapp: "WhatsApp", correo: "Correo electrónico", cualquiera: "Cualquiera" };
  const method = methods[data.medioContacto];
  const extra = [
    data.presupuesto.trim() && `Presupuesto aproximado: ${data.presupuesto.trim()}`,
    data.telefono.trim() && `Teléfono: ${data.telefono.trim()}`,
    data.correo.trim() && `Correo: ${data.correo.trim()}`,
    method && `Medio preferido: ${method}`,
  ].filter(Boolean);
  return extra.length ? `${body}\n\n${extra.join("\n")}` : body;
}
