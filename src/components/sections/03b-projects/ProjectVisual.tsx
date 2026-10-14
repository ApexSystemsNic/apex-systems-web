import Image from "next/image";
import type { Project } from "@/types/site";

/**
 * Presentación visual de un proyecto. Con capturas reales (Montecristo) las
 * muestra en un marco sencillo; sin capturas arma una composición editorial
 * con el logo y etiquetas, nunca una interfaz simulada.
 * `hero` es la versión de la página de caso: más grande, con la captura
 * móvil y carga prioritaria.
 */
export function ProjectVisual({ project, hero = false }: { project: Project; hero?: boolean }) {
  const { visual } = project;
  const loading = hero ? undefined : "lazy";

  const screenshot = hero ? visual.desktop : (visual.preview ?? visual.desktop);

  if (screenshot) {
    return (
      <div className={`project-visual project-visual--${visual.theme}`}>
        <div className="project-browser">
          <div className="project-browser__bar" aria-hidden="true"><span /><span /><span /></div>
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            style={{ aspectRatio: `${screenshot.width} / ${screenshot.height}` }}
            sizes={hero ? "(min-width: 1280px) 1100px, 92vw" : "(min-width: 1024px) 560px, 92vw"}
            loading={loading}
            preload={hero}
            fetchPriority={hero ? "high" : undefined}
          />
        </div>
        {hero && visual.mobile && (
          <div className="project-phone">
            <Image
              src={visual.mobile.src}
              alt={visual.mobile.alt}
              width={visual.mobile.width}
              height={visual.mobile.height}
              style={{ aspectRatio: `${visual.mobile.width} / ${visual.mobile.height}` }}
              sizes="(min-width: 768px) 220px, 34vw"
            />
          </div>
        )}
      </div>
    );
  }

  // Composición decorativa: solo logo y etiquetas; el nombre y la categoría ya están en texto junto a ella.
  return (
    <div className={`project-visual project-visual--${visual.theme}`} aria-hidden="true">
      <div className="project-visual__poster">
        {visual.logo && (
          <Image
            src={visual.logo.src}
            alt=""
            width={visual.logo.width}
            height={visual.logo.height}
            style={{ aspectRatio: `${visual.logo.width} / ${visual.logo.height}` }}
            loading={loading}
            preload={hero}
            className="project-visual__logo"
          />
        )}
        <ul className="project-visual__tags">
          {visual.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </div>
  );
}
