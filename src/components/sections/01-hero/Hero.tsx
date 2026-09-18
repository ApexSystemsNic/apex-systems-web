import { hero } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Reveal, WordReveal, MaskReveal } from "@/components/ui/MotionPrimitives";
import { HeroExperience } from "./HeroExperience";
import { ScrollIndicator } from "./ScrollIndicator";

// Coordinates the hero entrance with the short brand preloader.
const PRELOADER_HANDOFF = 1.05;

export default function Hero() {
  return (
    <section id="inicio" className="hero-section relative overflow-hidden border-b border-white/10 bg-navy text-white">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-page items-center gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <div className="relative z-10">
          <Reveal delay={PRELOADER_HANDOFF}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold tracking-wide text-sky">
              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_16px_rgba(41,199,164,0.9)]" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <WordReveal
            as="h1"
            text={hero.title}
            delay={PRELOADER_HANDOFF + 0.15}
            className="mt-6 block max-w-3xl hero-title font-semibold leading-[0.98] tracking-[-0.055em] text-white"
          />

          <Reveal delay={PRELOADER_HANDOFF + 0.55}>
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-white/80 sm:text-lg">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={PRELOADER_HANDOFF + 0.7}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton href="#contacto" variant="accent">
                {hero.primaryCta}
              </LinkButton>
              <LinkButton href="#soluciones" variant="inverse">
                {hero.secondaryCta}
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={PRELOADER_HANDOFF + 0.82}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm text-white/60">
              <span>Diseño a medida</span>
              <span className="h-1 w-1 rounded-full bg-sky" />
              <span>Atención en Nicaragua</span>
              <span className="h-1 w-1 rounded-full bg-coral" />
              <span>Proceso transparente</span>
            </div>
          </Reveal>
        </div>

        <MaskReveal className="relative z-10">
          <HeroExperience />
        </MaskReveal>
      </div>

      <ScrollIndicator />
    </section>
  );
}
