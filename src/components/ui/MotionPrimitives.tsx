import type { ReactNode } from "react";

/**
 * Wrappers ligeros para mantener el contenido visible sin observadores de scroll.
 * `delay` se conserva para que las secciones compartan la misma interfaz.
 */
type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function MaskReveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function WordReveal({ text, className, as: Wrapper = "span" }: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "p" | "h1" | "h2";
}) {
  return <Wrapper className={className}>{text}</Wrapper>;
}

export function StaggerList({ children, className, as: Wrapper = "ul" }: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol";
}) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

export function StaggerItem({ children, className }: RevealProps) {
  return <li className={className}>{children}</li>;
}
