import Image from "next/image";
import { footer, navLinks } from "@/content/site-content";
import { socialLinks } from "@/content/contact-channels";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#021633] text-white">
      <div className="mx-auto w-full max-w-page px-4 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/apex-logo-96.png"
                alt="Apex Systems"
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg"
              />

              <span className="font-semibold text-white">
                Apex Systems
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/62">
              {footer.promise}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/75">
              <span className="h-2 w-2 rounded-full bg-mint" />
              {footer.region}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Navegación
            </p>

            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/58 underline-offset-4 transition-colors hover:text-sky hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Soluciones
            </p>

            <ul className="mt-3 space-y-2">
              {footer.solutionsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/58 underline-offset-4 transition-colors hover:text-sky hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={footer.maintenanceLink.href}
                  className="text-sm text-white/58 underline-offset-4 transition-colors hover:text-sky hover:underline"
                >
                  {footer.maintenanceLink.label}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Contacto
            </p>

            <ul className="mt-3 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="inline-block py-1 text-sm text-white/80 hover:text-sky"
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={
                      link.icon === "mail"
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    {link.label}
                    {link.icon !== "mail" && <><span aria-hidden="true"> ↗</span><span className="sr-only"> (abre otra pestaña)</span></>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-center text-xs text-white/60 sm:text-left">
            © {year} Apex Systems. Todos los derechos reservados.
          </p>

          <nav aria-label={footer.legalLabel}>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-xs text-white/75 underline-offset-4 transition-colors hover:text-sky hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}