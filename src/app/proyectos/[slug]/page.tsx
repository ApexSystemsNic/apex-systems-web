import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/layout/01-header/Header";
import Footer from "@/components/layout/02-footer/Footer";
import { ProjectCard } from "@/components/sections/03b-projects/ProjectCard";
import { ProjectVisual } from "@/components/sections/03b-projects/ProjectVisual";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { newTabHint, projectPage, projects } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import type { Project } from "@/types/site";

type Params = Promise<{ slug: string }>;

// Export estático: solo existen los slugs declarados en el contenido.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  // Solo los proyectos con captura real usan su propia imagen social; el resto, la de Apex.
  const shot = project.visual.preview;
  return buildPageMetadata({
    title: `${project.name} | ${projectPage.metaTitleSuffix}`,
    description: project.metaDescription,
    path: `/proyectos/${project.slug}`,
    ...(shot && { image: { url: shot.src, width: shot.width, height: shot.height, alt: shot.alt } }),
  });
}

function ExternalLink({ project, variant }: { project: Project; variant: "secondary" | "inverse" }) {
  if (!project.externalUrl) return null;
  return (
    <LinkButton href={project.externalUrl} target="_blank" rel="noopener noreferrer" variant={variant}>
      {project.externalLabel}
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> {newTabHint}</span>
    </LinkButton>
  );
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const others = projects.filter((item) => item.slug !== slug);
  const { gallery } = project.visual;

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 bg-background">
        <section className="project-hero">
          <div className="mx-auto w-full max-w-page px-4 pt-10 pb-12 sm:px-8 sm:pt-14 lg:pb-16">
            {/* <a> y no next/link, como en Header: la navegación suave no reactiva las escenas de MotionProvider. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#proyectos" className="project-back">
              <span aria-hidden="true">←</span> {projectPage.backLabel}
            </a>
            <p className="section-kicker mt-8">{projectPage.kicker}</p>
            <h1 className="mt-4 hero-title font-semibold tracking-[-0.05em] text-navy">{project.name}</h1>
            <p className="project-hero__category">{project.category}</p>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-foreground/75">{project.intro}</p>
            {project.externalUrl && (
              <div className="mt-8">
                <ExternalLink project={project} variant="secondary" />
              </div>
            )}
            <div className="project-hero__visual">
              <ProjectVisual project={project} hero />
            </div>
          </div>
        </section>

        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="section-kicker">01</p>
              <h2 className="project-heading">{projectPage.contextTitle}</h2>
              <p className="project-text">{project.context}</p>
            </div>
            <div>
              <p className="section-kicker">02</p>
              <h2 className="project-heading">{projectPage.builtTitle}</h2>
              <p className="project-text">{project.built}</p>
            </div>
          </div>
          {gallery && (
            <div className="project-browser project-gallery">
              <div className="project-browser__bar" aria-hidden="true"><span /><span /><span /></div>
              <Image
                src={gallery.src}
                alt={gallery.alt}
                width={gallery.width}
                height={gallery.height}
                style={{ aspectRatio: `${gallery.width} / ${gallery.height}` }}
                sizes="(min-width: 1280px) 1176px, 92vw"
                loading="lazy"
              />
            </div>
          )}
        </Section>

        <Section>
          <p className="section-kicker">{projectPage.featuresKicker}</p>
          <h2 className="mt-4 section-title font-semibold tracking-[-0.045em] text-navy">{projectPage.featuresTitle}</h2>
          <div className="project-features mt-10">
            {project.featureGroups.map((group) => (
              <section key={group.title} className="project-feature">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </Section>

        <Section tone="navy">
          <p className="section-kicker section-kicker--light">{projectPage.capabilitiesKicker}</p>
          <h2 className="mt-4 section-title font-semibold tracking-[-0.045em] text-white">{projectPage.capabilitiesTitle}</h2>
          <ol className="project-capabilities mt-10">
            {project.capabilities.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </Section>

        <section className="final-cta relative overflow-hidden bg-navy">
          <div className="final-cta__grid" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-page gap-8 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="section-kicker section-kicker--light">{projectPage.ctaKicker}</p>
              <p className="mt-5 max-w-3xl section-title font-semibold leading-[.98] tracking-[-.05em] text-white">
                {projectPage.ctaText}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:mb-2">
              <LinkButton href="/#contacto" variant="accent">{projectPage.ctaLabel}</LinkButton>
              <ExternalLink project={project} variant="inverse" />
            </div>
          </div>
        </section>

        <Section>
          <h2 className="section-title font-semibold tracking-[-0.045em] text-navy">{projectPage.otherTitle}</h2>
          <div className="projects-grid mt-10">
            {/* Con un solo caso relacionado, la tarjeta ancha evita media grilla vacía. */}
            {others.map((item) => <ProjectCard key={item.slug} project={item} featured={others.length === 1} />)}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
