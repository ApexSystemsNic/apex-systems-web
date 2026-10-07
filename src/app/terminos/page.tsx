import Header from "@/components/layout/01-header/Header";
import Footer from "@/components/layout/02-footer/Footer";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { buildPageMetadata } from "@/lib/site-metadata";

const title = "Términos de uso | Apex Systems";
const description = "Condiciones orientativas de uso de este sitio y del proceso de cotización.";

export const metadata = buildPageMetadata({ title, description, path: "/terminos", noindex: true });

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="bg-background">
        <div className="mx-auto w-full max-w-legal px-6 py-16 sm:px-8 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Términos de uso</h1>
          <div className="mt-6">
            <DraftNotice />
          </div>

          <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/80">
            <section>
              <h2 className="text-lg font-semibold text-navy">Información orientativa</h2>
              <p className="mt-3">
                La información publicada en este sitio (servicios, proceso y condiciones) es orientativa y
                describe cómo trabaja Apex en general. Este sitio no publica precios: cada proyecto se
                cotiza de forma personalizada y se rige por su propia propuesta.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Solicitar una cotización no crea un contrato</h2>
              <p className="mt-3">
                Completar el formulario de contacto o escribir por WhatsApp no genera ningún compromiso ni
                contrato. Un proyecto solo queda formalizado cuando ambas partes aceptan una propuesta y un
                acuerdo específico.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Propuesta y acuerdo por proyecto</h2>
              <p className="mt-3">
                Cada proyecto tendrá su propia propuesta con alcance, precio, plazos y revisiones incluidas.
                El precio, el tiempo de entrega, el número de revisiones y el alcance dependen de las
                características de cada proyecto y se definen antes de iniciar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Uso legítimo del formulario</h2>
              <p className="mt-3">
                El formulario de contacto debe usarse únicamente para solicitudes reales relacionadas con
                los servicios de Apex. Nos reservamos la posibilidad de ignorar solicitudes que no cumplan
                con este propósito.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Propiedad intelectual y licencias</h2>
              <p className="mt-3">
                La propiedad intelectual del trabajo entregado, los componentes reutilizables de Apex y las
                licencias de herramientas externas se definirán específicamente en el acuerdo de cada
                proyecto.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
