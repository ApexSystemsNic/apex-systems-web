export type SocialLink = {
  label: string;
  detail: string;
  href: string;
  icon: "instagram" | "facebook" | "mail" | "whatsapp";
};

// Numero oficial de Apex Systems: codigo de Nicaragua + numero local.
// `wa.me` requiere solo digitos, sin +, espacios ni guiones.
export const whatsappNumber = "50585829219";
export const whatsappDisplay = "+505 8582-9219";

export function buildWhatsAppUrl(
  message = "Hola, quiero información sobre los servicios de Apex Systems.",
) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappUrl = buildWhatsAppUrl();

const whatsappLink: SocialLink[] = whatsappNumber
  ? [
      {
        label: "WhatsApp",
        detail: whatsappDisplay,
        href: whatsappUrl,
        icon: "whatsapp",
      },
    ]
  : [];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", detail: "@apexsystemsnic", href: "https://www.instagram.com/apexsystemsnic/", icon: "instagram" },
  { label: "Facebook", detail: "Apex Systems", href: "https://www.facebook.com/share/19TaNWchNL/?mibextid=wwXIfr", icon: "facebook" },
  { label: "Correo", detail: "ApexSystemsNic@outlook.com", href: "mailto:ApexSystemsNic@outlook.com", icon: "mail" },
  ...whatsappLink,
];
