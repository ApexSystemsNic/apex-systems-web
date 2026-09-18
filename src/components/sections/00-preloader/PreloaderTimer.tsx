"use client";

import { useEffect } from "react";
import { PRELOADER_SESSION_KEY } from "./constants";

/**
 * The only client-side piece of the preloader: a timer that dismisses it
 * on a visitor's first page view this session. Returning-visit dismissal
 * is handled synchronously by an inline script before hydration (see
 * Preloader.tsx), so this component has nothing to do — and does
 * nothing — when sessionStorage already marks the preloader as seen.
 */
export function PreloaderTimer() {
  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = !!sessionStorage.getItem(PRELOADER_SESSION_KEY);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fall through
      // and just show the short entrance once for this page view.
    }
    if (alreadySeen) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReduced ? 0 : 450;

    const timer = window.setTimeout(() => {
      const el = document.getElementById("apex-preloader");
      if (el) el.setAttribute("data-hidden", "true");
      try {
        sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      } catch {
        // Nothing to persist to if storage is unavailable; the preloader
        // still dismisses for this page view.
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
