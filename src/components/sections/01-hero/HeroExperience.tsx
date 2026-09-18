"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { solutions } from "@/content/site-content";
import { HeroPointerGlow } from "./HeroPointerGlow";

const modes = [
  { id: "web", short: "Web", solution: solutions.cards[0] },
  { id: "catalogo", short: "Catálogo", solution: solutions.cards[1] },
  { id: "sistema", short: "Sistema", solution: solutions.cards[2] },
] as const;

type ModeId = (typeof modes)[number]["id"];

function WebPreview() {
  return (
    <div className="hero-demo__canvas hero-demo__canvas--web">
      <div className="hero-demo__mini-nav">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-demo__web-copy">
        <span className="hero-demo__eyebrow-line" />
        <span className="hero-demo__title-line" />
        <span className="hero-demo__title-line hero-demo__title-line--short" />
        <div className="hero-demo__actions">
          <span />
          <span />
        </div>
      </div>
      <div className="hero-demo__web-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function CatalogPreview() {
  return (
    <div className="hero-demo__canvas hero-demo__canvas--catalog">
      <div className="hero-demo__catalog-head">
        <span />
        <span />
      </div>
      <div className="hero-demo__products">
        {["mint", "coral", "sky", "violet"].map((tone, index) => (
          <div key={tone} className={`hero-demo__product hero-demo__product--${tone}`}>
            <span className="hero-demo__product-image" />
            <span className="hero-demo__product-line" />
            <span className="hero-demo__product-line hero-demo__product-line--short" />
            <i style={{ animationDelay: `${index * 0.18}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemPreview() {
  return (
    <div className="hero-demo__canvas hero-demo__canvas--system">
      <div className="hero-demo__system-rail">
        <span className="is-active" />
        <span />
        <span />
        <span />
      </div>
      <div className="hero-demo__system-grid">
        <div className="hero-demo__metric hero-demo__metric--wide"><span /><strong /></div>
        <div className="hero-demo__metric"><span /><strong /></div>
        <div className="hero-demo__chart">
          {[34, 62, 45, 78, 58, 88].map((height, index) => (
            <i key={height} style={{ height: `${height}%`, animationDelay: `${index * 0.12}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const previews: Record<ModeId, typeof WebPreview> = {
  web: WebPreview,
  catalogo: CatalogPreview,
  sistema: SystemPreview,
};

export function HeroExperience() {
  const [activeId, setActiveId] = useState<ModeId>("web");
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0];
  const Preview = previews[active.id];

  return (
    <div className="hero-demo group relative" aria-label="Demostración interactiva de soluciones Apex">
      <div className="hero-demo__aura" aria-hidden="true" />
      <HeroPointerGlow />

      <div className="hero-demo__window">
        <div className="hero-demo__toolbar" aria-hidden="true">
          <div className="flex gap-1.5"><span /><span /><span /></div>
          <div className="hero-demo__address">Apex / vista interactiva</div>
          <div className="hero-demo__signal" />
        </div>

        <div className="hero-demo__body">
          <div className="hero-demo__switcher" role="group" aria-label="Explorar tipo de solución">
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                id={`hero-tab-${mode.id}`}
                aria-pressed={mode.id === active.id}
                aria-controls="hero-preview-panel"
                onClick={() => setActiveId(mode.id)}
                className={mode.id === active.id ? "is-active" : ""}
              >
                <span>{mode.short}</span>
              </button>
            ))}
          </div>

          <div
            id="hero-preview-panel"
            aria-live="polite"
            className="hero-demo__preview" data-motion-scene
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Preview />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${active.id}-copy`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              className="hero-demo__caption"
            >
              <span>{active.solution.number}</span>
              <p>{active.solution.hook}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hero-demo__hint" aria-hidden="true">
        <span className="hero-demo__hint-dot" />
        Elige una solución
      </div>
    </div>
  );
}
