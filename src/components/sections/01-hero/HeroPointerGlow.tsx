"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle glow that follows the pointer inside the hero visual — only on
 * devices with a precise pointer (a real mouse), never on touch, and
 * never for visitors who prefer reduced motion. Pure CSS custom
 * properties updated via rAF-throttled listeners; no continuous
 * animation loop runs while the pointer is idle, and everything is torn
 * down on unmount.
 */
export function HeroPointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = el.parentElement ?? el;

    const canHover = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || prefersReduced) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    function apply() {
      frame = 0;
      if (!pending || !el) return;
      if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motionPaused === "true") return;
      // One layout read per animation frame, not per pointer event.
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      el.style.setProperty("--glow-x", `${((pending.x - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--glow-y", `${((pending.y - rect.top) / rect.height) * 100}%`);
    }

    function onMove(event: PointerEvent) {
      if (!el) return;
      pending = {
        x: event.clientX,
        y: event.clientY,
      };
      if (!frame) frame = requestAnimationFrame(apply);
    }

    function onLeave() {
      // Cancel any move update still queued for the next frame — without
      // this, a pointermove right before pointerleave could re-apply a
      // stale position a frame after the properties below remove it,
      // making the glow appear to stick at the last point.
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      pending = null;
      el?.style.removeProperty("--glow-x");
      el?.style.removeProperty("--glow-y");
    }

    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", onLeave);
    el.classList.add("hero-visual--interactive");

    return () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="hero-visual__glow" aria-hidden="true" />;
}
