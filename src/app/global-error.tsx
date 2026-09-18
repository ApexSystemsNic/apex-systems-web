"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="es">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            background: "#f7f9fc",
            color: "#021633",
          }}
        >
          <div style={{ maxWidth: "36rem", textAlign: "center" }}>
            <p style={{ margin: 0, opacity: 0.65 }}>Apex Systems</p>
            <h1 style={{ margin: "0.75rem 0", fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}>
              No pudimos cargar el sitio correctamente.
            </h1>
            <p style={{ lineHeight: 1.6, opacity: 0.8 }}>
              Intenta recargar la página. Si el problema continúa, vuelve a intentarlo en unos minutos.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "1rem",
                minHeight: "44px",
                padding: "0.75rem 1.25rem",
                border: 0,
                borderRadius: "999px",
                background: "#021633",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Intentar de nuevo
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
