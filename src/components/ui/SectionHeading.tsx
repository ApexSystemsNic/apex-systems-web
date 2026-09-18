type Tone = "light" | "dark";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-navy";
  const introColor = tone === "dark" ? "text-white/75" : "text-foreground/70";
  const eyebrowColor = tone === "dark" ? "text-sky" : "text-navy/70";

  return (
    <div className={className}>
      {eyebrow && (
        <p className={`text-sm font-semibold tracking-wide ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <Heading
        className={`mt-3 section-title font-semibold leading-[1.04] tracking-[-0.04em] ${titleColor}`}
      >
        {title}
      </Heading>
      {intro && <p className={`mt-6 max-w-[62ch] text-base leading-relaxed sm:text-lg ${introColor}`}>{intro}</p>}
    </div>
  );
}
