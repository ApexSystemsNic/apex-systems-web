import type { ContactFormData } from "@/lib/contact-message";

export function ContactPreview({
  data,
  message,
  submitted,
}: {
  data: ContactFormData;
  message: string;
  submitted: boolean;
}) {
  return (
    <aside
      className="contact-preview relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-navy p-6 text-white"
      aria-label="Cómo funciona la consulta"
    >
      <div className="contact-preview__grid" aria-hidden="true" />
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky">Preparemos tu idea</p>
        <h3 className="mt-3 text-xl font-semibold">Una consulta clara, paso a paso.</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/85">
          Completa los tres pasos y revisa el resumen. Puedes volver atrás sin perder lo escrito.
        </p>
        <p className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4 text-sm leading-relaxed text-white/85">
          Al finalizar abriremos WhatsApp con tu consulta preparada. Tú podrás revisarla antes de presionar Enviar; el sitio no almacena tus datos.
        </p>
        {data.nombre.trim() && !submitted && (
          <details className="mt-4 border-t border-white/20">
            <summary className="text-sm font-semibold text-white">Ver borrador de mi consulta</summary>
            <pre className="mt-2 rounded-xl bg-white/5 p-4 font-sans text-sm leading-relaxed text-white/85">{message}</pre>
          </details>
        )}
      </div>
    </aside>
  );
}
