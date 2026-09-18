import { contact } from "@/content/site-content";
import { CONTACT_LIMITS as MAX_LENGTH } from "@/lib/contact-validation";
import type { ContactFormData } from "@/lib/contact-message";

type UpdateContact = <Key extends keyof ContactFormData>(
  key: Key,
  value: ContactFormData[Key],
) => void;

type ContactFieldsProps = {
  step: number;
  data: ContactFormData;
  update: UpdateContact;
  showError: (field: string) => boolean;
  errorId: (field: string) => string;
  describedBy: (field: string) => string | undefined;
};

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-[#788ba5] bg-surface px-4 py-3 text-base text-foreground placeholder:text-foreground/65 focus-visible:border-navy";

export function ContactFields({
  step,
  data,
  update,
  showError,
  errorId,
  describedBy,
}: ContactFieldsProps) {
  if (step === 1) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-navy">Nombre y apellido</label>
          <input
            id="nombre"
            autoComplete="name"
            maxLength={MAX_LENGTH.nombre}
            className={inputClass}
            value={data.nombre}
            onChange={(event) => update("nombre", event.target.value)}
            aria-invalid={showError("nombre")}
            aria-describedby={describedBy("nombre")}
          />
          {showError("nombre") && <p id={errorId("nombre")} role="alert" className="mt-1 text-xs text-coral">Cuéntanos tu nombre.</p>}
        </div>

        <div>
          <label htmlFor="negocio" className="text-sm font-medium text-navy">Nombre del negocio</label>
          <input
            id="negocio"
            autoComplete="organization"
            maxLength={MAX_LENGTH.negocio}
            className={inputClass}
            value={data.negocio}
            onChange={(event) => update("negocio", event.target.value)}
            aria-invalid={showError("negocio")}
            aria-describedby={describedBy("negocio")}
          />
          {showError("negocio") && <p id={errorId("negocio")} role="alert" className="mt-1 text-xs text-coral">Indica el nombre de tu negocio.</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="categoria" className="text-sm font-medium text-navy">Tipo de negocio</label>
          <input
            id="categoria"
            placeholder="Restaurante, tienda, consultoría..."
            maxLength={MAX_LENGTH.categoria}
            className={inputClass}
            value={data.categoria}
            onChange={(event) => update("categoria", event.target.value)}
            aria-invalid={showError("categoria")}
            aria-describedby={describedBy("categoria")}
          />
          {showError("categoria") && <p id={errorId("categoria")} role="alert" className="mt-1 text-xs text-coral">Cuéntanos a qué se dedica tu negocio.</p>}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="grid gap-5">
        <div>
          <label htmlFor="solucion" className="text-sm font-medium text-navy">Solución de interés</label>
          <select
            id="solucion"
            className={inputClass}
            value={data.solucion}
            onChange={(event) => update("solucion", event.target.value)}
            aria-invalid={showError("solucion")}
            aria-describedby={[
              describedBy("solucion"),
              data.solucion === "mantenimiento" ? "maintenance-scope" : "",
            ].filter(Boolean).join(" ") || undefined}
          >
            <option value="">Selecciona una opción</option>
            {contact.solutionOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {data.solucion === "mantenimiento" && (
            <p id="maintenance-scope" className="mt-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-navy">
              Exclusivo para clientes Apex: solo damos mantenimiento a proyectos desarrollados por nuestro equipo. No recibimos páginas de terceros para este servicio.
            </p>
          )}
          {showError("solucion") && <p id={errorId("solucion")} role="alert" className="mt-1 text-xs text-coral">Selecciona la solución que te interesa.</p>}
        </div>

        <div>
          <label htmlFor="descripcion" className="text-sm font-medium text-navy">Necesidad que quieres resolver</label>
          <textarea
            id="descripcion"
            rows={4}
            maxLength={MAX_LENGTH.descripcion}
            className={inputClass}
            value={data.descripcion}
            onChange={(event) => update("descripcion", event.target.value)}
            aria-invalid={showError("descripcion")}
            aria-describedby={describedBy("descripcion")}
          />
          {showError("descripcion") && <p id={errorId("descripcion")} role="alert" className="mt-1 text-xs text-coral">Cuéntanos brevemente qué necesitas.</p>}
        </div>

        <div>
          <label htmlFor="presupuesto" className="text-sm font-medium text-navy">
            Presupuesto aproximado <span className="font-normal text-foreground/70">(opcional)</span>
          </label>
          <input
            id="presupuesto"
            maxLength={MAX_LENGTH.presupuesto}
            className={inputClass}
            value={data.presupuesto}
            onChange={(event) => update("presupuesto", event.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="telefono" className="text-sm font-medium text-navy">Teléfono</label>
        <input
          id="telefono"
          type="tel"
          autoComplete="tel"
          maxLength={MAX_LENGTH.telefono}
          className={inputClass}
          value={data.telefono}
          onChange={(event) => update("telefono", event.target.value)}
          aria-invalid={showError("contacto")}
          aria-describedby={describedBy("contacto")}
        />
      </div>

      <div>
        <label htmlFor="correo" className="text-sm font-medium text-navy">Correo</label>
        <input
          id="correo"
          type="email"
          autoComplete="email"
          maxLength={MAX_LENGTH.correo}
          className={inputClass}
          value={data.correo}
          onChange={(event) => update("correo", event.target.value)}
          aria-invalid={showError("contacto") || showError("correo")}
          aria-describedby={showError("correo") ? errorId("correo") : describedBy("contacto")}
        />
        {showError("correo") && <p id={errorId("correo")} role="alert" className="mt-1 text-xs text-coral">Revisa el formato del correo (por ejemplo, nombre@dominio.com).</p>}
      </div>

      {showError("contacto") && (
        <p id={errorId("contacto")} role="alert" className="-mt-3 text-xs text-coral sm:col-span-2">
          {data.medioContacto === "whatsapp"
            ? "Añade tu teléfono para contactarte por WhatsApp."
            : data.medioContacto === "correo"
              ? "Añade tu correo para contactarte por ese medio."
              : "Déjanos al menos un teléfono o un correo."}
        </p>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="medioContacto" className="text-sm font-medium text-navy">Medio de contacto preferido</label>
        <select
          id="medioContacto"
          className={inputClass}
          value={data.medioContacto}
          onChange={(event) => update("medioContacto", event.target.value)}
          aria-invalid={showError("medioContacto")}
          aria-describedby={describedBy("medioContacto")}
        >
          <option value="">Selecciona una opción</option>
          {contact.contactMethodOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {showError("medioContacto") && <p id={errorId("medioContacto")} role="alert" className="mt-1 text-xs text-coral">Indica cómo prefieres que te contactemos.</p>}
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 flex-none rounded border-line"
            checked={data.aceptaPrivacidad}
            onChange={(event) => update("aceptaPrivacidad", event.target.checked)}
            aria-invalid={showError("aceptaPrivacidad")}
            aria-describedby={describedBy("aceptaPrivacidad")}
          />
          <span>He leído y acepto la <a href="/privacidad" className="underline">política de privacidad</a>.</span>
        </label>
        {showError("aceptaPrivacidad") && <p id={errorId("aceptaPrivacidad")} role="alert" className="mt-1 text-xs text-coral">Necesitamos tu aceptación para continuar.</p>}
      </div>
    </div>
  );
}
