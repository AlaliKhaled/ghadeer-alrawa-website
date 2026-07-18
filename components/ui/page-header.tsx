import { Reveal } from "@/components/ui/reveal";

/** Compact hero used at the top of inner pages. */
export function PageHeader({
  badge,
  title,
  lead,
}: {
  badge?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg-soft">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 start-1/3 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />
      </div>
      <div className="container-px py-16 text-center sm:py-20">
        <Reveal className="flex flex-col items-center gap-4">
          {badge ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold text-cyan">
              {badge}
            </span>
          ) : null}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
            {title}
          </h1>
          {lead ? (
            <p className="max-w-2xl text-lg text-fg-muted">{lead}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
