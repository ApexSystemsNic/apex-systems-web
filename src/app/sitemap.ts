import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const routes = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/privacidad", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/terminos", changeFrequency: "yearly" as const, priority: 0.4 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency,
    priority,
  }));
}
