"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { audience } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/MotionPrimitives";

const accents = ["sky", "coral", "violet", "mint"] as const;

const accentClasses = {
  sky: "text-sky border-sky/30 bg-sky/10",
  coral: "text-coral border-coral/30 bg-coral/10",
  violet: "text-violet border-violet/30 bg-violet/10",
  mint: "text-mint border-mint/30 bg-mint/10",
} as const;

function AudienceScene({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="audience-scene audience-scene--restaurant" aria-hidden="true">
        <div className="audience-phone">
          <span className="audience-phone__top" />
          <div className="audience-menu-item"><i /><span /><b /></div>
          <div className="audience-menu-item"><i /><span /><b /></div>
          <div className="audience-menu-item"><i /><span /><b /></div>
          <div className="audience-phone__action" />
        </div>
        <span className="audience-float audience-float--one">Menú</span>
        <span className="audience-float audience-float--two">Reserva</span>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="audience-scene audience-scene--store" aria-hidden="true">
        <div className="audience-store-grid">
          {[0, 1, 2, 3].map((item) => (
            <span key={item}><i /><b /><em /></span>
          ))}
        </div>
        <div className="audience-cart"><span>+</span></div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="audience-scene audience-scene--local" aria-hidden="true">
        <div className="audience-map">
          <span className="audience-map__road audience-map__road--one" />
          <span className="audience-map__road audience-map__road--two" />
          <span className="audience-map__pin"><i /></span>
        </div>
        <div className="audience-local-card"><i /><span /><span /></div>
      </div>
    );
  }

  return (
    <div className="audience-scene audience-scene--professional" aria-hidden="true">
      <div className="audience-profile"><i /><span /><b /></div>
      <div className="audience-calendar">
        <div />
        {[0, 1, 2, 3, 4, 5].map((item) => <span key={item} className={item === 4 ? "is-active" : ""} />)}
      </div>
    </div>
  );
}

export default function Audience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audience.segments[activeIndex];
  const accent = accents[activeIndex];

  return (
    <Section className="audience-section overflow-hidden" innerClassName="relative">
      <div className="audience-section__wash" aria-hidden="true" />
      <Reveal>
        <div className="relative max-w-5xl">
          <p className="section-kicker">Empieza por tu realidad</p>
          <h2 className="mt-4 max-w-4xl section-title font-semibold leading-[1.02] tracking-[-0.045em] text-navy">
            {audience.title}
          </h2>
          <div className="audience-intro">
            <span>Para negocios de Nicaragua</span>
            <p>{audience.intro}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="relative mt-12">
        <div className="audience-explorer">
          <div className="audience-explorer__tabs" role="group" aria-label="Selecciona tu tipo de negocio">
            {audience.segments.map((segment, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={segment.id}
                  id={`audience-tab-${segment.id}`}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="audience-panel"
                  onClick={() => setActiveIndex(index)}
                  className={selected ? "is-active" : ""}
                >
                  <span className={`audience-explorer__number ${selected ? accentClasses[accents[index]] : ""}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{segment.title}</strong>
                    <small>{segment.description}</small>
                  </span>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
                </button>
              );
            })}
          </div>

          <div
            id="audience-panel"
            aria-live="polite"
            className="audience-explorer__panel"
            data-motion-scene
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="audience-explorer__panel-inner"
              >
                <div className="audience-explorer__visual">
                  <span className={`audience-explorer__badge ${accentClasses[accent]}`}>Vista de solución</span>
                  <AudienceScene index={activeIndex} />
                </div>

                <div className="audience-explorer__content">
                  <span className={`font-mono text-sm font-semibold ${accentClasses[accent].split(" ")[0]}`}>
                    0{activeIndex + 1} / 04
                  </span>
                  <h3>{active.title}</h3>
                  <p>{active.description}</p>
                  <p className="audience-outcomes__label">Lo que buscamos lograr</p>
                  <ul className="audience-outcomes">
                    {active.possibilities.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <LinkButton href="#contacto" variant="accent">{active.cta}</LinkButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <Reveal className="relative mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line/80 bg-white p-5 sm:flex-row sm:items-center sm:px-7">
        <p className="max-w-2xl text-lg font-medium text-navy">{audience.closing.text}</p>
        <LinkButton href="#contacto" variant="secondary" className="flex-none">{audience.closing.cta}</LinkButton>
      </Reveal>
    </Section>
  );
}
