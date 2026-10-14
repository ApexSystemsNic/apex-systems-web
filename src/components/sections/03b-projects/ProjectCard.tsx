import { projectsSection } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import type { Project } from "@/types/site";
import { ProjectVisual } from "./ProjectVisual";

/** Tarjeta de proyecto: se usa en la home y en «Otro proyecto» de cada caso. */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? "project-card--featured" : ""}`}>
      <div className="project-card__visual">
        <ProjectVisual project={project} />
      </div>
      <div className="project-card__body">
        <p className="project-card__category">{project.category}</p>
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <div className="mt-auto pt-7">
          <LinkButton href={`/proyectos/${project.slug}`}>
            {projectsSection.cardCta}
            <span className="sr-only">: {project.name}</span>
            <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
