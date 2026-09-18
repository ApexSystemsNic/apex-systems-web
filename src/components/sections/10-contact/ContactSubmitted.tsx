import type { RefObject } from "react";
import { contact } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";

export function ContactSubmitted({
  message,
  whatsappHref,
  titleRef,
  onEdit,
}: {
  message: string;
  whatsappHref: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
  onEdit: () => void;
}) {
  return (
    <div>
      <h3 ref={titleRef} tabIndex={-1} className="contact-step-title">
        Tu consulta está lista para enviarse
      </h3>
      <p role="status" className="rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-foreground/75">
        {contact.pendingNotice}
      </p>
      <pre className="mt-4 whitespace-pre-wrap break-words rounded-xl border border-line bg-white p-4 font-sans text-sm leading-relaxed text-navy">
        {message}
      </pre>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <LinkButton href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="accent">
          Abrir WhatsApp nuevamente
        </LinkButton>
        <button type="button" onClick={onEdit} className="text-sm font-medium text-navy underline">
          Editar información
        </button>
      </div>
    </div>
  );
}
