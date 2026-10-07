import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Preloader } from "@/components/sections/00-preloader/Preloader";
import MotionProvider from "@/components/ui/MotionProvider";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getSiteUrl } from "@/lib/site-url";
import { buildStructuredData } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Apex Systems Nicaragua | Desarrollo web y software";

const description =
  "Apex Systems Nicaragua desarrolla páginas web, sistemas personalizados, aplicaciones móviles y soluciones digitales para empresas y negocios.";

// Optional: set GOOGLE_SITE_VERIFICATION at build time to add the Search Console meta tag.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  ...buildPageMetadata({ title, description, path: "/" }),
  ...(googleVerification && { verification: { google: googleVerification } }),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(getSiteUrl())) }}
        />
        <Preloader />

        <a
          href="#contenido"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:rounded-md focus-visible:bg-navy focus-visible:px-4 focus-visible:py-2 focus-visible:font-medium focus-visible:text-white"
        >
          Saltar al contenido
        </a>

        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
