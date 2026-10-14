export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-navy/70">{eyebrow}</p>
      )}
      <h2 className="mt-3 section-title font-semibold leading-[1.04] tracking-[-0.04em] text-navy">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-[62ch] text-base leading-relaxed sm:text-lg text-foreground/70">{intro}</p>}
    </div>
  );
}
