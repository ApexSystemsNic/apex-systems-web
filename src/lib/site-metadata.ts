import type { Metadata } from "next";

const socialImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Apex Systems",
};

export function buildPageMetadata({
  title,
  description,
  path,
  noindex = false,
  image = socialImage,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: typeof socialImage;
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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
