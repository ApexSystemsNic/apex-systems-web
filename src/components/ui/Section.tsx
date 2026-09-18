import type { ReactNode } from "react";

type Tone = "background" | "surface" | "navy";
type Width = "page" | "narrow" | "legal";

const TONE_CLASS: Record<Tone, string> = {
  background: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  navy: "bg-navy text-white",
};

const WIDTH_CLASS: Record<Width, string> = {
  page: "max-w-page",
  narrow: "max-w-narrow",
  legal: "max-w-legal",
};

/**
 * Shared section shell: one place that owns background tone, container
 * width, and vertical rhythm, so spacing stays consistent across the page
 * instead of being repeated (and drifting) per section.
 */
export function Section({
  id,
  tone = "background",
  width = "page",
  className,
  innerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  width?: Width;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${TONE_CLASS[tone]} ${className ?? ""}`}>
      <div
        className={`section-inner mx-auto w-full px-4 py-12 sm:px-8 sm:py-16 lg:py-20 ${WIDTH_CLASS[width]} ${innerClassName ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
