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
