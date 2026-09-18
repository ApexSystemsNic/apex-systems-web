import { finalCta } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/MotionPrimitives";

export default function FinalCTA() {
  return (
    <section
      className="final-cta relative overflow-hidden bg-navy"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--navy) 0%, var(--navy) 82%, var(--background) 100%)",
      }}
    >
      {/* Ambient background motion: a slow, low-contrast drift behind the
          text, never over it — the CTA and its contrast stay the focus. */}
      <div aria-hidden="true" className="final-cta__ambient" />

      <div className="final-cta__grid" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-page gap-8 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <Reveal>
          <p className="section-kicker section-kicker--light">El siguiente paso</p>
          <p className="mt-5 max-w-3xl section-title font-semibold leading-[.98] tracking-[-.05em] text-white">
            {finalCta.text}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <LinkButton href="#contacto" variant="accent" className="flex-none lg:mb-2">
            {finalCta.cta}
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
