import { socialLinks } from "@/content/contact-channels";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/MotionPrimitives";

function SocialIcon({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {kind === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>}
      {kind === "facebook" && <path d="M14 22V13h3l.5-4H14V7c0-1 .4-2 2-2h2V1h-3c-4 0-5 3-5 6v2H7v4h3v9"/>}
      {kind === "mail" && <><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></>}
      {kind === "whatsapp" && <><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.4-4.9A8.4 8.4 0 1 1 20.5 11.7Z"/><path d="M8.1 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.8 1.4 1.9 2.5 3.4 3.2.3.1.5.1.7-.1l.8-1c.2-.3.5-.3.8-.2l1.8.9c.3.1.5.2.5.4 0 .2-.1 1.3-.7 1.9-.6.6-1.5.9-2.4.7-1.1-.2-2.8-.8-4.7-2.5-1.5-1.4-2.6-3.1-2.9-4.2-.3-1.1 0-2.3.5-2.9Z"/></>}
    </svg>
  );
}

export default function SocialContact() {
  return <Section id="conecta" className="social-section">
    <Reveal className="social-panel">
      <div className="social-intro">
        <p className="section-kicker section-kicker--light">Estamos a una conversación</p>
        <h2>Tu próxima idea<br/><span>puede empezar aquí.</span></h2>
        <p>Escríbenos por el canal que prefieras. Cuéntanos qué tienes en mente y conversemos sobre tu negocio.</p>
        <a href="#contacto" className="social-project">Prefiero contarles mi proyecto <span aria-hidden="true">↗</span></a>
      </div>
      <div className="social-links">
        {socialLinks.map(link => <a key={link.label} href={link.href} target={link.icon === "mail" ? undefined : "_blank"} rel={link.icon === "mail" ? undefined : "noopener noreferrer"} aria-label={`${link.label}: ${link.detail}${link.icon === "mail" ? "" : " (abre otra pestaña)"}`}>
          <span className={`social-icon social-icon--${link.icon}`}><SocialIcon kind={link.icon}/></span>
          <span className="social-link-text"><strong>{link.label}</strong><small>{link.detail}</small></span>
          <span className="social-arrow" aria-hidden="true">↗</span>
        </a>)}
      </div>
    </Reveal>
  </Section>;
}
