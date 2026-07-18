import { Reveal } from "@/components/ui/reveal";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import { cn } from "@/lib/utils";

/** Consistent section header: badge + title + optional lead. */
export function SectionTitle({
  badge,
  title,
  lead,
  align = "center",
  className,
  onDark = false,
}: {
  badge?: string;
  title: string;
  lead?: string;
  align?: "center" | "start";
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {badge ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold",
            onDark
              ? "border border-white/25 bg-white/10 text-white"
              : "border border-cyan/30 bg-cyan/10 text-cyan",
          )}
        >
          {badge}
        </span>
      ) : null}
      <TypewriterHeading
        text={title}
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl",
          onDark ? "text-white" : "text-fg",
        )}
      />
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-base",
            onDark ? "text-white/85" : "text-fg-muted",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
