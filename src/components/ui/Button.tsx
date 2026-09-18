import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse" | "accent";

const base =
  "group/button relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-base font-semibold transition-[color,background-color,border-color,box-shadow] motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy/90",
  secondary: "border border-line bg-surface text-navy shadow-sm hover:border-navy/30 hover:shadow-elevated",
  // For CTAs placed on the dark solution cards.
  inverse: "border border-white/25 bg-white/[0.04] text-white hover:border-white/55 hover:bg-white/[0.09]",
  accent: "border border-sky bg-sky text-navy shadow-[0_12px_32px_-14px_rgba(22,184,255,0.95)] hover:border-white hover:bg-white",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/** Shared call-to-action link. */
export function LinkButton({ href, variant = "primary", className, children, ...rest }: LinkButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </a>
  );
}

export function ActionButton({
  variant = "primary",
  className,
  children,
  disabled,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
