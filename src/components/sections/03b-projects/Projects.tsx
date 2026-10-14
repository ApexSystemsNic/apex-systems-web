import { projects, projectsSection } from "@/content/site-content";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";

export default function Projects() {
  return (
    <Section id="proyectos" className="projects-section">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="section-kicker">{projectsSection.kicker}</p>
          <h2 className="mt-4 max-w-3xl section-title font-semibold leading-[1.02] tracking-[-0.045em] text-navy">
            {projectsSection.title}
          </h2>
        </div>
        <p className="max-w-[54ch] text-lg leading-relaxed text-foreground/72 lg:pb-2">{projectsSection.intro}</p>
      </div>

      <div className="projects-grid mt-12">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </Section>
  );
}
