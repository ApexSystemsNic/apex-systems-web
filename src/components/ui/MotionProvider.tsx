"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Applies one global animation policy for the whole site: every Motion
 * animation automatically respects the visitor's `prefers-reduced-motion`
 * setting. Decorative scenes are also paused while the browser tab is
 * hidden or while they are outside the viewport.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const syncVisibility = () => {
      root.dataset.motionPaused = String(document.hidden);
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      delete root.dataset.motionPaused;
    };
  }, []);

  useEffect(() => {
    // Stable illustration containers only. No scroll handler or per-frame
    // React state updates. Without IntersectionObserver, graphics stay still.
    if (!("IntersectionObserver" in window)) return;
    const scenes = document.querySelectorAll<HTMLElement>("[data-motion-scene]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.motionActive = String(entry.isIntersecting);
      }
    }, { threshold: 0 });
    scenes.forEach((scene) => observer.observe(scene));
    return () => {
      observer.disconnect();
      scenes.forEach((scene) => delete scene.dataset.motionActive);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
