import { faq } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerList, StaggerItem } from "@/components/ui/MotionPrimitives";

export default function FAQ() {
  return (
    <Section id="faq" tone="background" className="faq-section" innerClassName="faq-layout">
      <Reveal className="faq-heading">
        <SectionHeading eyebrow="Antes de empezar" title="Preguntas frecuentes" />
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">Conoce cómo cotizamos, qué incluye cada proyecto y cómo te acompañamos después de la entrega.</p>
        <a href="#contacto" className="mt-6 inline-block font-semibold text-navy underline underline-offset-4">¿Tienes otra pregunta? Conversemos ↗</a>
      </Reveal>

      {/*
        Native <details>/<summary>: fully keyboard-operable, has real
        aria-expanded semantics for free, and keeps the answers readable
        with no JavaScript at all. The opening fade (globals.css,
        `.faq-answer`) is a plain CSS animation triggered by the `[open]`
        attribute — no Motion involved, so there's nothing here that can
        get stuck behind a scroll observer or a hydration mismatch.
      */}
      <StaggerList className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-card">
        {faq.map((item) => (
          <StaggerItem key={item.question} className="border-b border-line p-1 last:border-b-0">
            <details className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 text-left text-base font-semibold text-navy transition-colors marker:content-none hover:bg-background sm:px-5">
                {item.question}
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-5 w-5 flex-none text-navy/60 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="faq-answer max-w-[62ch] px-4 pb-5 text-sm leading-relaxed text-foreground/70 sm:px-5">
                {item.answer}
              </p>
            </details>
          </StaggerItem>
        ))}
      </StaggerList>
    </Section>
  );
}
