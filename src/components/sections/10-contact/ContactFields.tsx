import { contact, newTabHint } from "@/content/site-content";
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
            aria-required="true"
            autoComplete="name"
            maxLength={MAX_LENGTH.nombre}
            className={inputClass}
            value={data.nombre}
            onChange={(event) => update("nombre", event.target.value)}
            aria-invalid={showError("nombre")}
            aria-describedby={describedBy("nombre")}
          />
          {showError("nombre") && <p id={errorId("nombre")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="negocio" className="text-sm font-medium text-navy">Nombre del negocio</label>
          <input
            id="negocio"
            aria-required="true"
            autoComplete="organization"
            maxLength={MAX_LENGTH.negocio}
            className={inputClass}
            value={data.negocio}
            onChange={(event) => update("negocio", event.target.value)}
            aria-invalid={showError("negocio")}
            aria-describedby={describedBy("negocio")}
          />
          {showError("negocio") && <p id={errorId("negocio")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.negocio}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="categoria" className="text-sm font-medium text-navy">Tipo de negocio</label>
          <input
            id="categoria"
            aria-required="true"
            placeholder="Restaurante, tienda, consultoría..."
            maxLength={MAX_LENGTH.categoria}
            className={inputClass}
            value={data.categoria}
            onChange={(event) => update("categoria", event.target.value)}
            aria-invalid={showError("categoria")}
            aria-describedby={describedBy("categoria")}
          />
          {showError("categoria") && <p id={errorId("categoria")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.categoria}</p>}
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
            aria-required="true"
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
          {showError("solucion") && <p id={errorId("solucion")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.solucion}</p>}
        </div>

        <div>
          <label htmlFor="descripcion" className="text-sm font-medium text-navy">Necesidad que quieres resolver</label>
          <textarea
            id="descripcion"
            aria-required="true"
            rows={4}
            maxLength={MAX_LENGTH.descripcion}
            className={inputClass}
            value={data.descripcion}
            onChange={(event) => update("descripcion", event.target.value)}
            aria-invalid={showError("descripcion")}
            aria-describedby={describedBy("descripcion")}
          />
          {showError("descripcion") && <p id={errorId("descripcion")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.descripcion}</p>}
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

  // El error "contacto" solo marca el campo que falta según el medio elegido.
  const phoneMissing = showError("contacto") && !data.telefono.trim() && data.medioContacto !== "correo";
  const emailMissing = showError("contacto") && !data.correo.trim() && data.medioContacto !== "whatsapp";
  const contactError = (className: string) => (
    <p id={errorId("contacto")} role="alert" className={`text-xs text-coral ${className}`}>
      {data.medioContacto === "whatsapp"
        ? contact.fieldErrors.contactoWhatsapp
        : data.medioContacto === "correo"
          ? contact.fieldErrors.contactoCorreo
          : contact.fieldErrors.contactoCualquiera}
    </p>
  );

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="telefono" className="text-sm font-medium text-navy">Teléfono</label>
        <input
          id="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={MAX_LENGTH.telefono}
          className={inputClass}
          value={data.telefono}
          onChange={(event) => update("telefono", event.target.value)}
          aria-invalid={phoneMissing || showError("telefono")}
          aria-describedby={showError("telefono") ? errorId("telefono") : phoneMissing ? errorId("contacto") : undefined}
        />
        {phoneMissing && !emailMissing && contactError("mt-1")}
        {showError("telefono") && <p id={errorId("telefono")} role="alert" className="mt-1 text-xs text-coral">{contact.phoneError}</p>}
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
          aria-invalid={emailMissing || showError("correo")}
          aria-describedby={showError("correo") ? errorId("correo") : emailMissing ? errorId("contacto") : undefined}
        />
        {emailMissing && !phoneMissing && contactError("mt-1")}
        {showError("correo") && <p id={errorId("correo")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.correo}</p>}
      </div>

      {phoneMissing && emailMissing && contactError("-mt-3 sm:col-span-2")}

      <div className="sm:col-span-2">
        <label htmlFor="medioContacto" className="text-sm font-medium text-navy">Medio de contacto preferido</label>
        <select
          id="medioContacto"
          aria-required="true"
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
        {showError("medioContacto") && <p id={errorId("medioContacto")} role="alert" className="mt-1 text-xs text-coral">{contact.fieldErrors.medioContacto}</p>}
      </div>

      <p className="text-sm leading-relaxed text-foreground/80 sm:col-span-2">
        {contact.privacyNotice.text}{" "}
        <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="underline">
          {contact.privacyNotice.linkLabel}
          <span className="sr-only"> {newTabHint}</span>
        </a>.
      </p>
    </div>
  );
}
