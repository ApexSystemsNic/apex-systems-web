/** Decorative cue, with no scroll listener or perpetual animation. */
export function ScrollIndicator() {
  return (
    <div aria-hidden="true" className="scroll-indicator pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-white/70 sm:flex">
      <span className="text-[0.65rem] uppercase tracking-[0.15em]">Explora Apex</span>
      <span>↓</span>
    </div>
  );
}
