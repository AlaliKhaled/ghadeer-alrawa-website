import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "brand-gradient text-white shadow-lg shadow-cyan/20 hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-0.5",
  outline:
    "border border-border bg-surface text-fg hover:border-cyan hover:text-cyan",
  ghost: "text-fg hover:bg-bg-soft",
  whatsapp:
    "bg-[#25d366] text-white shadow-lg shadow-[#25d366]/25 hover:brightness-105 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/** Shared button/link styling — apply to <a>, <Link> or <button>. */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}
