import type { MetadataRoute } from "next";
import { projects } from "@/content/site-content";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  // Legal pages are noindex drafts: add them back once their final versions are published.
  const routes = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
    ...projects.map(({ slug }) => ({
      path: `/proyectos/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency,
    priority,
  }));
}
