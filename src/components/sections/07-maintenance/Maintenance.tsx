import { maintenance } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/MotionPrimitives";

export default function Maintenance() {
  return (
    <section className="maintenance-section relative overflow-hidden bg-navy text-white">
      <div className="maintenance-grid" aria-hidden="true" />
      <div className="maintenance-glow" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-page gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:py-20">
        <Reveal>
          <p className="section-kicker section-kicker--light">Después de publicar</p>
          <h2 className="mt-4 max-w-3xl section-title font-semibold leading-[1.01] tracking-[-0.05em] text-white">
            {maintenance.title}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/68">
            Dejamos claro qué está incluido al entregar y qué puedes contratar después, sin convertir el mantenimiento en una obligación.
          </p>
          <p className="mt-4 text-sm font-medium text-white/85">Servicio exclusivo para clientes con proyectos desarrollados por Apex.</p>

          <div className="mt-9 flex flex-wrap gap-3">
            {[
              "Errores del desarrollo",
              "Copias de seguridad",
              "Optimización",
              "Monitoreo",
            ].map((item) => (
              <span key={item} className="maintenance-pill"><i />{item}</span>
            ))}
          </div>

          <div className="mt-9">
            <LinkButton href="#contacto" variant="accent">{maintenance.cta}</LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="maintenance-console">
            <div className="maintenance-console__top">
              <span>Estado del proyecto</span>
              <span><i /> Acompañamiento claro</span>
            </div>

            <div className="maintenance-console__visual" data-motion-scene aria-hidden="true">
              <span className="maintenance-orbit maintenance-orbit--one" />
              <span className="maintenance-orbit maintenance-orbit--two" />
              <span className="maintenance-orbit maintenance-orbit--three" />
              <div className="maintenance-core"><i>✓</i></div>
              <span className="maintenance-pulse maintenance-pulse--one" />
              <span className="maintenance-pulse maintenance-pulse--two" />
            </div>

            <div className="maintenance-console__cards">
              <article>
                <div><span>01</span><i>Incluido</i></div>
                <h3>{maintenance.included.title}</h3>
                <p>{maintenance.included.description}</p>
              </article>
              <article className="is-optional">
                <div><span>02</span><i>Opcional</i></div>
                <h3>{maintenance.optional.title}</h3>
                <p>{maintenance.optional.description}</p>
              </article>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
