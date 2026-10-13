import type { ReactNode } from "react";

type Tone = "background" | "surface" | "navy";

const TONE_CLASS: Record<Tone, string> = {
  background: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  navy: "bg-navy text-white",
};

/**
 * Shared section shell: one place that owns background tone, container
 * width, and vertical rhythm, so spacing stays consistent across the page
 * instead of being repeated (and drifting) per section.
 */
export function Section({
  id,
  tone = "background",
  className,
  innerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${TONE_CLASS[tone]} ${className ?? ""}`}>
      <div
        className={`section-inner mx-auto w-full px-4 py-12 sm:px-8 sm:py-16 lg:py-20 max-w-page ${innerClassName ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
