import type { Metadata } from "next";

const socialImage = {
  url: "/apex-logo.png",
  width: 1254,
  height: 1254,
  alt: "Apex Systems",
};

export function buildPageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    ...(noindex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      siteName: "Apex Systems",
      locale: "es_NI",
      type: "website",
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
