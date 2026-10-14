export type NavLink = {
  label: string;
  href: string;
};

export type AudienceSegment = {
  id: string;
  title: string;
  description: string;
  possibilities: string[];
  cta: string;
};

export type SolutionCard = {
  number: string;
  title: string;
  hook: string;
  description: string;
  includes: string[];
  note?: string;
  cta: string;
  /** Destino del CTA; por defecto, el formulario de contacto. */
  href?: string;
  accent: "sky" | "coral" | "violet" | "mint";
  visual: "web" | "catalog" | "system" | "mobile" | "support";
  badge?: string;
};

export type WhyApexBlock = {
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SolutionOption = {
  value: string;
  label: string;
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectFeatureGroup = {
  title: string;
  items: string[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** 1–2 frases para la tarjeta de la home. */
  summary: string;
  /** Descripción para metadatos (~150 caracteres). */
  metaDescription: string;
  intro: string;
  context: string;
  built: string;
  featureGroups: ProjectFeatureGroup[];
  capabilities: string[];
  visual: {
    /** Define la composición: editorial (logo + etiquetas) o capturas reales. */
    theme: "body-factory" | "montecristo";
    /** Solo composiciones editoriales; con capturas no se usa. */
    logo?: ProjectImage;
    tags: string[];
    /** Solo proyectos con capturas reales del sitio publicado. */
    desktop?: ProjectImage;
    /** Versión ligera de `desktop` para las tarjetas. */
    preview?: ProjectImage;
    mobile?: ProjectImage;
    gallery?: ProjectImage;
  };
  externalUrl?: string;
  externalLabel?: string;
};
