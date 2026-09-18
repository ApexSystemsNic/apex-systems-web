import { PreloaderTimer } from "./PreloaderTimer";
import { PRELOADER_SESSION_KEY } from "./constants";

// Runs synchronously as the browser parses this point in the HTML — before
// React hydrates anything — so a returning visitor in the same tab never
// sees the preloader flash back in on an internal reload.
const INLINE_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(PRELOADER_SESSION_KEY)})){var el=document.getElementById('apex-preloader');if(el){el.setAttribute('data-hidden','true');el.style.transition='none';}}}catch(e){}})();`;

/**
 * Brand entrance: a short, honest moment with the logo before the page
 * settles, shown once per tab/session. Deliberately built without Motion
 * or React state for its own visibility — a plain DOM attribute toggled
 * by a blocking inline script (for returning visits) and a timer (for
 * the first visit) — so it can never get stuck behind a hydration
 * mismatch, and a `<noscript>` rule removes it outright if JavaScript
 * never runs. Server component: only the timer needs the client.
 */
export function Preloader() {
  return (
    <>
      {/* suppressHydrationWarning: on a returning visit, the inline
          script below sets `data-hidden` and an inline `transition`
          override on this exact element before React hydrates (see
          INLINE_SCRIPT above) — an intentional, documented mismatch
          (Next.js docs: "Preventing flash before hydration"), not a
          bug. Without it, React logs a hydration-mismatch error for a
          change it correctly should not undo. */}
      <div
        id="apex-preloader"
        className="apex-preloader"
        role="presentation"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {/* Plain <img>, not next/image: this element must render and be
            hidden correctly even before hydration, with no dependency on
            React's image loading lifecycle. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/apex-logo-preloader.png" alt="" width={96} height={96} className="apex-preloader__logo" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
      <noscript>
        <style>{".apex-preloader{display:none !important;}"}</style>
      </noscript>
      <PreloaderTimer />
    </>
  );
}
