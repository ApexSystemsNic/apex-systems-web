import { navLinks, headerCta, newTabHint } from "@/content/site/navigation";
import { whatsappUrl } from "@/content/contact-channels";

/** Overlay: opening the menu must not resize the sticky header or page. */
export default function MobileMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <nav
      id="mobile-menu"
      aria-label="Navegación móvil"
      aria-hidden={!open}
      hidden={!open}
      className="mobile-menu absolute inset-x-0 top-full overflow-y-auto border-t border-white/10 bg-navy shadow-lg xl:hidden"
    >
      <div className="flex min-h-0 flex-col gap-1 px-4 py-4 sm:px-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            tabIndex={open ? 0 : -1}
            onClick={onNavigate}
            className="-mx-3 flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {link.label}
          </a>
        ))}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}
          className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-sky bg-sky px-5 text-center text-base font-semibold text-navy"
        >
          {headerCta}
          <span className="sr-only"> {newTabHint}</span>
        </a>
      </div>
    </nav>
  );
}
