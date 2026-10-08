const svg = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const steps = [
  {
    day: "DÍA 0",
    badge: "Publicado",
    title: "Proyecto en línea",
    note: "Entrega y lanzamiento",
    icon: <svg {...svg}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>,
  },
  {
    day: "DÍA 1–30",
    badge: "Incluido",
    title: "30 días incluidos",
    note: "Ajustes del desarrollo",
    icon: <svg {...svg}><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>,
  },
  {
    day: "DÍA 31+",
    badge: "Opcional",
    title: "Continuidad opcional",
    note: "Tú decides si seguir",
    icon: <svg {...svg}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  },
];

export default function MaintenanceTimeline() {
  return (
    <ol className="maintenance-timeline" aria-label="Línea de tiempo después de publicar">
      {steps.map((step, index) => (
        <li key={step.day} className={`maintenance-step${index === 2 ? " is-optional" : ""}`}>
          <span className="maintenance-step__icon">{step.icon}</span>
          <div className="maintenance-step__body">
            <span className="maintenance-step__day">{step.day}</span>
            <span className="maintenance-step__badge">{step.badge}</span>
            <strong>{step.title}</strong>
            <small>{step.note}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}
