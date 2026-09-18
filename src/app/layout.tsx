import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Preloader } from "@/components/sections/00-preloader/Preloader";
import MotionProvider from "@/components/ui/MotionProvider";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title =
  "Apex Systems | Transformamos tu negocio en soluciones digitales";

const description =
  "Apex Systems diseña páginas web, tiendas digitales y sistemas personalizados para emprendimientos, profesionales y negocios de Nicaragua.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  ...buildPageMetadata({ title, description, path: "/" }),
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
