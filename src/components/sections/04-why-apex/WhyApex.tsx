"use client";

import { useState } from "react";
import { whyApex } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerList, StaggerItem } from "@/components/ui/MotionPrimitives";

export default function WhyApex() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="por-que-apex" tone="surface" className="why-section overflow-hidden" innerClassName="relative">
      <div className="why-section__mark" aria-hidden="true">A</div>
      <div className="relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="lg:self-start">
          <p className="section-kicker">Por qué Apex</p>
          <h2 className="mt-4 section-title font-semibold leading-[1.02] tracking-[-0.045em] text-navy">
            {whyApex.title}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground/72">{whyApex.intro}</p>
          <div className="why-section__quote">
            <span aria-hidden="true">↳</span>
            <p>{whyApex.closing.text}</p>
          </div>
          <div className="mt-8">
            <LinkButton href="#contacto" variant="accent">
              {whyApex.closing.cta}
            </LinkButton>
          </div>
        </Reveal>

        <div className="relative pt-1">
          <span aria-hidden="true" className="absolute -left-5 inset-y-0 hidden w-px bg-gradient-to-b from-sky via-violet to-mint sm:block" />

          <StaggerList className="why-grid">
            {whyApex.blocks.map((block, i) => (
              <StaggerItem
                key={block.title}
                className={`why-card why-card--${(i % 3) + 1} ${activeIndex === i ? "is-active" : ""}`}
              >
                <button
                  type="button"
                  aria-expanded={activeIndex === i}
                  aria-controls={`why-detail-${i}`}
                  onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                >
                  <span className="why-card__topline">
                    <span className="why-card__number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="why-card__hint">
                      {activeIndex === i ? "Abierto" : "Explorar"}
                    </span>
                  </span>
                  <span className="why-card__icon" aria-hidden="true"><i /><i /></span>
                  <span className="why-card__title">{block.title}</span>
                </button>
                <p id={`why-detail-${i}`} className="why-card__description" hidden={activeIndex !== i}>
                  {block.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </div>
    </Section>
  );
}
