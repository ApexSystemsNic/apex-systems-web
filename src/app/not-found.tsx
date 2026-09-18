import type { Metadata } from "next";
import Header from "@/components/layout/01-header/Header";
import Footer from "@/components/layout/02-footer/Footer";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada | Apex Systems",
  description: "La página que buscas no existe o cambió de dirección.",
  robots: { index: false, follow: false },
};

/**
 * Replaces Next.js's default boilerplate not-found page (unbranded,
 * in English, and — because it carries its own <title> independent of
 * the root layout's metadata — was rendering two <title> tags at once).
 * Honest, on-brand, and offers only a real, working path: back to the
 * page that actually exists. No invented contact channel.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <div className="mx-auto flex w-full max-w-legal flex-col items-start px-6 py-24 sm:px-8 sm:py-32">
          <p className="font-mono text-sm text-navy/60">Error 404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            No encontramos esta página.
          </h1>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-foreground/75">
            El enlace que seguiste puede estar roto o la página cambió de dirección. Puedes volver al
            inicio y navegar desde ahí.
          </p>
          <div className="mt-8">
            <LinkButton href="/">Volver al inicio</LinkButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
