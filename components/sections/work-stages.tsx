import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";

type Item = { title: string; desc: string };

export function WorkStages() {
  const t = useTranslations("workStages");
  const items = t.raw("items") as Item[];

  return (
    <section className="border-y border-border bg-bg-soft py-20">
      <div className="container-px">
        <SectionTitle badge={t("badge")} title={t("title")} lead={t("lead")} />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.06}>
              <div className="relative h-full rounded-2xl border border-border bg-surface p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-lg font-extrabold text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-bold text-fg">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
