import { aboutApex } from "@/content/site-content";
import { mission, vision } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/MotionPrimitives";

export default function AboutApex() {
  return (
    <Section id="nosotros" tone="navy" className="about-section">
      <Reveal>
        <p className="section-kicker section-kicker--light">{aboutApex.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl section-title font-semibold leading-[1.06] tracking-[-.04em]">{aboutApex.title}</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-story">
          <span className="about-label">01 / Nuestra historia</span>
          <h3>{aboutApex.story.title}</h3>
          <p>{aboutApex.story.description}</p>
          <div className="about-path" aria-hidden="true"><span>Escuchar</span><i>→</i><span>Diseñar</span><i>→</i><span>Construir</span></div>
        </Reveal>
        <div className="about-pillars">
          {[mission, vision].map((item, index) => (
            <Reveal key={item.heading} delay={index * .08} className="about-pillar">
              <span className="about-label">0{index + 2} / Hacia dónde vamos</span>
              <h3>{item.heading}</h3><p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
