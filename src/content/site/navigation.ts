import type { NavLink } from "@/types/site";

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Cómo trabajamos", href: "/#proceso" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Preguntas frecuentes", href: "/#faq" },
  { label: "Contacto", href: "/#contacto" },
];

export const headerCta = "Cotizar por WhatsApp";

/** Aviso para lectores de pantalla en los enlaces que abren otra pestaña. */
export const newTabHint = "(abre otra pestaña)";
