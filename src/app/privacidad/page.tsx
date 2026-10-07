import Header from "@/components/layout/01-header/Header";
import Footer from "@/components/layout/02-footer/Footer";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { buildPageMetadata } from "@/lib/site-metadata";

const title = "Política de privacidad | Apex Systems";
const description = "Cómo Apex Systems maneja la información que recibe a través de este sitio.";

export const metadata = buildPageMetadata({ title, description, path: "/privacidad", noindex: true });

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="bg-background">
        <div className="mx-auto w-full max-w-legal px-6 py-16 sm:px-8 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Política de privacidad</h1>
          <div className="mt-6">
            <DraftNotice />
          </div>

          <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/80">
            <section>
              <h2 className="text-lg font-semibold text-navy">Responsable y canal de contacto</h2>
              <p className="mt-3">
                Apex Systems es responsable del tratamiento de la información que recibe a través de este
                sitio. Puedes comunicarte mediante WhatsApp al +505 8582-9219 o por los demás canales
                oficiales publicados en la sección de contacto.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Datos que recogemos</h2>
              <p className="mt-3">
                El formulario de contacto solicita nombre, nombre del negocio, tipo de negocio, la solución
                de interés, una descripción de la necesidad, un presupuesto aproximado opcional, teléfono
                y/o correo, y el medio de contacto preferido. El sitio prepara el mensaje localmente y abre
                WhatsApp para que la persona lo revise y decida si desea enviarlo. Apex no almacena estos
                datos en un servidor propio mediante el formulario.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Finalidad</h2>
              <p className="mt-3">
                La información enviada por WhatsApp se usa exclusivamente para responder solicitudes de
                cotización y coordinar una conversación sobre el proyecto del negocio que contacta a Apex.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Proveedores</h2>
              <p className="mt-3">
                Al abrir y enviar la consulta mediante WhatsApp, la comunicación también queda sujeta a las
                condiciones y políticas de privacidad de WhatsApp. Actualmente no hay servicios externos de
                analítica conectados al sitio.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Conservación</h2>
              <p className="mt-3">
                El sitio no conserva automáticamente la información escrita en el formulario. Si la persona
                envía el mensaje, la conversación permanece en WhatsApp según la configuración de las cuentas
                participantes y las políticas de ese servicio.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Seguridad</h2>
              <p className="mt-3">
                El formulario valida la información en el navegador y no la envía a un servidor propio. La
                protección de la conversación enviada también depende de las medidas ofrecidas por WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">Solicitud de corrección o eliminación</h2>
              <p className="mt-3">
                Cualquier persona puede solicitar la corrección o eliminación de su información mediante los
                canales oficiales publicados en el sitio.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
