import Header from "@/components/layout/01-header/Header";
import Footer from "@/components/layout/02-footer/Footer";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { buildPageMetadata } from "@/lib/site-metadata";

const title = "Política de cookies | Apex Systems";
const description = "Qué cookies usa este sitio y cómo puedes gestionarlas.";

export const metadata = buildPageMetadata({ title, description, path: "/cookies", noindex: true });

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="bg-background">
        <div className="mx-auto w-full max-w-legal px-6 py-16 sm:px-8 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Política de cookies</h1>
          <div className="mt-6">
            <DraftNotice />
          </div>

          <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/80">
            <section>
              <h2 className="text-lg font-semibold text-navy">Cookies necesarias</h2>
              <p className="mt-3">
                Este sitio, en su versión actual, no requiere cookies necesarias distintas a las que el
                propio navegador o el framework puedan establecer para su funcionamiento básico. Esta
                sección se ampliará si en el futuro se vuelven imprescindibles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Cookies opcionales</h2>
              <p className="mt-3">
                Apex prevé usar cookies opcionales de analítica en una etapa posterior, únicamente para
                entender cómo se usa el sitio y mejorar la experiencia. Ninguna cookie opcional está activa
                todavía.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Aceptar, rechazar y configurar</h2>
              <p className="mt-3">
                Cuando el consentimiento de cookies esté disponible, esta página incluirá controles para
                aceptar, rechazar o configurar cookies opcionales, y ninguna cookie opcional se activará
                antes de que tomes esa decisión.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
