import { solutions } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/MotionPrimitives";
import type { SolutionCard } from "@/types/site";
import type { ReactNode } from "react";

const ACCENT_TEXT: Record<SolutionCard["accent"], string> = {
  sky: "text-sky",
  coral: "text-coral",
  violet: "text-violet",
  mint: "text-mint",
};

function WebGraphic() {
  const bars = [42, 68, 88, 56, 76];
  return (
    <div className="service-graphic service-graphic--web" aria-hidden="true">
      <div className="service-browser">
        <div className="service-browser__top"><span /><span /><span /><i /></div>
        <div className="service-browser__body">
          <div className="service-browser__rail"><span /><span /><span /></div>
          <div className="service-bars">
            {bars.map((height, index) => (
              <i key={height} style={{ height: `${height}%`, animationDelay: `${index * 0.16}s` }} />
            ))}
          </div>
        </div>
      </div>
      <span className="service-cursor">↗</span>
    </div>
  );
}

function CatalogGraphic() {
  return (
    <div className="service-graphic service-graphic--catalog" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <div key={index} className={`catalog-layer catalog-layer--${index + 1}`}>
          <span className="catalog-layer__image" />
          <span className="catalog-layer__line" />
          <span className="catalog-layer__line catalog-layer__line--short" />
          <i>+</i>
        </div>
      ))}
      <span className="catalog-chip catalog-chip--one">Categorías</span>
      <span className="catalog-chip catalog-chip--two">Pedido</span>
    </div>
  );
}

function SystemGraphic() {
  return (
    <div className="service-graphic service-graphic--system" aria-hidden="true">
      <svg viewBox="0 0 480 280" fill="none" preserveAspectRatio="xMidYMid meet">
        <path d="M96 74 238 140 382 70M238 140 372 222M238 140 100 220" />
        <path d="M96 74 100 220M382 70 372 222" />
      </svg>
      {[
        ["20%", "20%", "Clientes"],
        ["72%", "18%", "Pedidos"],
        ["44%", "43%", "Panel"],
        ["18%", "72%", "Citas"],
        ["70%", "72%", "Reportes"],
      ].map(([left, top, label], index) => (
        <span key={label} className={`system-node system-node--${index + 1}`} style={{ left, top }}>
          <i />
          <b>{label}</b>
        </span>
      ))}
    </div>
  );
}

function ShieldGraphic() {
  return (
    <div className="service-graphic service-graphic--shield" aria-hidden="true">
      <span className="shield-ring shield-ring--outer" />
      <span className="shield-ring shield-ring--inner" />
      <span className="shield-pulse" />
      <span className="shield-core"><i>✓</i></span>
      <span className="shield-status shield-status--top"><i /> Monitoreo</span>
      <span className="shield-status shield-status--bottom"><i /> Respaldo</span>
    </div>
  );
}

function MobileGraphic() {
  const stats = [
    ["Pedidos", "128"],
    ["Citas", "34"],
  ];
  return (
    <div className="service-graphic service-graphic--mobile" aria-hidden="true">
      <svg className="mobile-link" viewBox="0 0 480 280" fill="none" preserveAspectRatio="xMidYMid meet">
        <path d="M240 140 92 70M240 140 392 78M240 140 96 212M240 140 394 208" />
      </svg>
      <span className="mobile-sync mobile-sync--one"><i /><b>Panel</b></span>
      <span className="mobile-sync mobile-sync--two"><i /><b>API</b></span>
      <span className="mobile-sync mobile-sync--three"><i /><b>Base de datos</b></span>
      <span className="mobile-sync mobile-sync--four"><i /><b>Sistema</b></span>
      <div className="mobile-phone">
        <span className="mobile-phone__notch" />
        <div className="mobile-phone__screen">
          <div className="mobile-phone__head">
            <b>Operación</b>
            <span className="mobile-phone__bell"><i /></span>
          </div>
          <div className="mobile-phone__stats">
            {stats.map(([label, value]) => (
              <span key={label}><small>{label}</small><b>{value}</b></span>
            ))}
          </div>
          <div className="mobile-phone__chart">
            {[40, 62, 50, 84, 70].map((height) => <i key={height} style={{ height: `${height}%` }} />)}
          </div>
          <div className="mobile-phone__row"><i /><span /><em /></div>
          <div className="mobile-phone__row"><i /><span /><em /></div>
          <div className="mobile-phone__nav"><i /><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

const GRAPHICS: Record<SolutionCard["visual"], () => ReactNode> = {
  web: WebGraphic,
  catalog: CatalogGraphic,
  system: SystemGraphic,
  mobile: MobileGraphic,
  support: ShieldGraphic,
};

export default function Solutions() {
  return (
    <Section id="soluciones" className="solutions-section overflow-clip" innerClassName="relative">
      <div className="solutions-grid" aria-hidden="true" />

      <Reveal>
        <div className="relative grid gap-7 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="section-kicker section-kicker--light">Lo que podemos construir</p>
            <h2 className="mt-4 max-w-4xl section-title font-semibold leading-[0.99] tracking-[-0.05em] text-white">
              {solutions.title}
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[56ch] text-lg leading-relaxed text-white/70">{solutions.intro}</p>
            <p className="mt-5 hidden items-center gap-2 text-sm font-medium text-sky lg:flex">
              <span className="scroll-cue-line" aria-hidden="true" />
              Desplázate para explorar cada solución
            </p>
          </div>
        </div>
      </Reveal>

      <div className="relative mt-14 flex flex-col gap-7 lg:gap-0">
        {solutions.cards.map((card, index) => {
          const Graphic = GRAPHICS[card.visual];
          return (
            <div key={card.number} className="solution-stack-item" style={{ zIndex: index + 1 }}>
              <Reveal>
                <article className={`solution-card solution-card--${card.accent} group`}>
                  <span className="solution-card__index" aria-hidden="true">{card.number}</span>
                  <div className="solution-card__content">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`font-mono text-sm font-semibold ${ACCENT_TEXT[card.accent]}`}>
                        {card.number} / {String(solutions.cards.length).padStart(2, "0")}
                      </span>
                      {card.badge && <span className="solution-card__badge">{card.badge}</span>}
                    </div>
                    <h3>{card.title}</h3>
                    <p className="solution-card__hook">{card.hook}</p>
                    <p className="solution-card__description">{card.description}</p>

                    {card.includes.length > 0 && (
                      <ul className="solution-card__tags">
                        {card.includes.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}

                    {card.note && <p className="solution-card__note">{card.note}</p>}

                    <div className="mt-8">
                      <LinkButton href="#contacto" variant="inverse">{card.cta}</LinkButton>
                    </div>
                  </div>

                  <div className="solution-card__visual" data-motion-scene>
                    <div className="solution-card__visual-label">
                      <span>Exploración visual</span>
                      <i />
                    </div>
                    <Graphic />
                  </div>
                </article>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
