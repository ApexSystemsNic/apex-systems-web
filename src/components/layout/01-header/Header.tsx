"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, headerCta } from "@/content/site-content";
import { LinkButton } from "@/components/ui/Button";
import { whatsappUrl } from "@/content/contact-channels";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreFocus = useRef(false);

  function closeAndRestoreFocus() {
    shouldRestoreFocus.current = true;
    setMenuOpen(false);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");

    const closeOnDesktop = () => {
      if (desktop.matches) {
        setMenuOpen(false);
      }
    };

    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && shouldRestoreFocus.current) {
      shouldRestoreFocus.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAndRestoreFocus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-navy shadow-sm">
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link
          href="/#inicio"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 rounded-md"
        >
          <Image
            src="/apex-logo.png"
            alt="Apex Systems"
            width={40}
            height={40}
            priority
            className="h-9 w-9 rounded-lg sm:h-10 sm:w-10"
          />

          <span className="text-lg font-semibold tracking-tight text-white">
            Apex Systems
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-5 xl:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[0.95rem] font-medium text-white/72 transition-colors hover:text-white"
            >
              {link.label}

              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sky transition-[width] duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <LinkButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
            className="min-h-10 px-5 py-2.5 text-sm"
            title="Abrir WhatsApp para cotizar"
          >
            {headerCta}
          </LinkButton>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() =>
            menuOpen ? closeAndRestoreFocus() : setMenuOpen(true)
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-white xl:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Cerrar menú" : "Abrir menú"}
          </span>

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />
    </header>
  );
}