import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a real optimized image when `src` is provided, otherwise a branded
 * gradient placeholder labelled with what the final photo should be.
 * Swap placeholders for real photos by passing `src` (JPG/PNG is fine —
 * next/image serves WebP/AVIF automatically).
 */
export function Media({
  src,
  alt,
  label,
  Icon,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  fill = true,
}: {
  src?: string;
  alt: string;
  label?: string;
  Icon?: LucideIcon;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-bg-soft",
        !src &&
          "flex items-center justify-center bg-gradient-to-br from-cyan/15 via-aqua/10 to-navy/20",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          {Icon ? <Icon className="h-8 w-8 text-cyan/70" /> : null}
          {label ? (
            <span className="text-xs font-medium text-navy/60 dark:text-aqua/70">
              {label}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
