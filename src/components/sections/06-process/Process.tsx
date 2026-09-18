"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { process } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/MotionPrimitives";

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = process.steps[activeIndex];
  const progress = ((activeIndex + 1) / process.steps.length) * 100;

  function selectStep(index: number) {
    setActiveIndex(Math.max(0, Math.min(process.steps.length - 1, index)));
  }

  return (
    <Section id="proceso" className="process-section overflow-hidden" innerClassName="relative">
      <div className="process-orb" aria-hidden="true" />
      <Reveal>
        <div className="relative grid gap-7 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
          <div>
            <p className="section-kicker">Cómo trabajamos</p>
            <h2 className="mt-4 max-w-4xl section-title font-semibold leading-[1.01] tracking-[-0.05em] text-navy">
              {process.title}
            </h2>
          </div>
          <p className="max-w-[48ch] text-lg leading-relaxed text-foreground/70 lg:pb-2">
            Selecciona cada etapa para entender qué ocurre, qué definimos contigo y cómo avanzamos sin sorpresas.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="relative mt-12">
        <div className="process-workspace">
          <div className="process-workspace__nav" aria-label="Etapas del proceso">
            <div className="process-workspace__progress" aria-hidden="true">
              <span style={{ height: `${progress}%` }} />
            </div>
            <ol>
              {process.steps.map((step, index) => {
                const selected = index === activeIndex;
                const complete = index < activeIndex;
                return (
                  <li key={step.number}>
                    <button
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-pressed={selected}
                      aria-controls="process-detail"
                      className={selected ? "is-active" : complete ? "is-complete" : ""}
                    >
                      <span>{complete ? "✓" : step.number}</span>
                      <strong>{step.title}</strong>
                      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div id="process-detail" className="process-workspace__detail" aria-live="polite">
            <div className="process-workspace__topline">
              <span>Paso {activeIndex + 1} de {process.steps.length}</span>
              <div><i style={{ width: `${progress}%` }} /></div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.number}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="process-workspace__active"
              >
                <span className="process-workspace__giant-number">{active.number}</span>
                <div className="process-workspace__icon" aria-hidden="true">
                  <span>{active.number}</span>
                  <i /><i /><i />
                </div>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="process-workspace__controls">
              <button type="button" onClick={() => selectStep(activeIndex - 1)} disabled={activeIndex === 0}>
                <span aria-hidden="true">←</span> Anterior
              </button>
              {activeIndex < process.steps.length - 1 ? (
                <button type="button" onClick={() => selectStep(activeIndex + 1)}>
                  Siguiente <span aria-hidden="true">→</span>
                </button>
              ) : (
                <LinkButton href="#contacto" variant="accent">Cuéntanos tu idea</LinkButton>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
