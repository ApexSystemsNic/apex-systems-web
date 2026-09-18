export const STEP_LABELS = ["Tú y tu negocio", "Tu proyecto", "Cómo contactarte"];

export const STEP_HELP = [
  "Empecemos con tu nombre y el negocio para el que buscas una solución.",
  "Elige una solución y cuéntanos qué necesitas. El presupuesto es opcional.",
  "Indica un teléfono para WhatsApp o un correo, según el medio que prefieras.",
];

export function ContactProgress({ step }: { step: number }) {
  return (
    <ol className="contact-steps text-sm text-foreground/75" aria-label="Progreso del formulario">
      {STEP_LABELS.map((label, index) => {
        const number = index + 1;
        const active = number === step;
        const done = number < step;

        return (
          <li key={label} aria-current={active ? "step" : undefined}>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs ${
                active
                  ? "border-navy bg-navy text-white"
                  : done
                    ? "border-navy/40 text-navy"
                    : "border-line text-foreground/70"
              }`}
            >
              {number}
            </span>
            <span className={active ? "font-medium text-navy" : ""}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
