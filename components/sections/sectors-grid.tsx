import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";
import { sectorIcons } from "@/content/icons";

export function SectorsGrid({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const t = useTranslations("sectors");
  const items = t.raw("items") as string[];

  return (
    <section className="border-y border-border bg-bg-soft py-20">
      <div className="container-px">
        {showHeader ? (
          <SectionTitle badge={t("badge")} title={t("title")} lead={t("lead")} />
        ) : null}

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((name, i) => {
            const Icon = sectorIcons[i] ?? sectorIcons[0];
            return (
              <Reveal as="li" key={name} delay={(i % 3) * 0.05}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-cyan/40">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold text-fg">{name}</span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
