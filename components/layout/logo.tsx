import { useId } from "react";
import { cn } from "@/lib/utils";

/** Icon mark — the water drop only (favicon / header / social avatar). */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 116"
      className={cn("h-9 w-auto", className)}
      role="img"
      aria-label="Ghadeer Al-Rawa"
    >
      <defs>
        <linearGradient id={`${id}-drop`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-cyan-soft)" />
          <stop offset="1" stopColor="var(--color-navy-deep)" />
        </linearGradient>
        <linearGradient id={`${id}-wave`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-cyan)" />
          <stop offset="1" stopColor="var(--color-aqua)" />
        </linearGradient>
      </defs>
      <path
        d="M50 6C50 6 88 46 88 74A38 38 0 1 1 12 74C12 46 50 6 50 6Z"
        fill={`url(#${id}-drop)`}
      />
      <path
        d="M18 80q16-13 32 0t32 0v14a38 38 0 0 1-64 0Z"
        fill={`url(#${id}-wave)`}
        opacity="0.92"
      />
      <path
        d="M50 20c9 22 18 40 13 60-4-13-12-24-19-38Z"
        fill="#ffffff"
        opacity="0.3"
      />
    </svg>
  );
}

/** Full lockup — icon mark + company name. */
export function Logo({
  className,
  name,
  tagline,
}: {
  className?: string;
  name: string;
  tagline?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap text-base font-extrabold text-fg">
          {name}
        </span>
        {tagline ? (
          <span className="mt-0.5 hidden whitespace-nowrap text-[11px] font-medium text-cyan lg:block">
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
