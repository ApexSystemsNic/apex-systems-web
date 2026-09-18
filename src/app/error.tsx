"use client";

import { useEffect } from "react";
import { ActionButton, LinkButton } from "@/components/ui/Button";

/**
 * Route-level error boundary (wraps page.tsx and the legal pages, not
 * the root layout — see the Next.js documentation on `global-error.tsx` for
 * that rarer case). This app has no data fetching that can fail at
 * request time; this exists purely as a safety net for an unexpected
 * render-time exception in a Client Component, so a real bug shows a
 * calm, on-brand message instead of a blank page or a raw stack trace.
 *
 * No automatic error reporting: there is no monitoring service
 * connected yet (see docs/PENDIENTES_DE_LANZAMIENTO.md), so this only
 * logs to the browser console for local debugging.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div id="contenido" className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-navy/60">Algo salió mal</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        Ocurrió un error inesperado al cargar esta sección.
      </h1>
      <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-foreground/75">
        Puedes intentarlo de nuevo. Si el problema continúa, vuelve al inicio y navega desde ahí.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ActionButton variant="primary" onClick={reset}>
          Intentar de nuevo
        </ActionButton>
        <LinkButton href="/" variant="secondary">
          Volver al inicio
        </LinkButton>
      </div>
    </div>
  );
}
