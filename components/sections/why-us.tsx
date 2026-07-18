import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";

type Item = { title: string; desc: string };

export function WhyUs({ backgroundImage }: { backgroundImage?: string }) {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as Item[];

  return (
    <section className="relative isolate overflow-hidden py-20">
      {backgroundImage ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt=""
            fill
            // Decorative, soft-overlaid background — cap the requested size so
            // the optimizer never encodes a huge (slow) 3840px variant.
            sizes="960px"
            quality={70}
            className="object-cover object-center"
          />
          {/* Overlay keeps the cards + white title readable over the image. */}
          <div className="absolute inset-0 bg-navy-deep/55" />
        </div>
      ) : null}

      <div className="container-px">
        <SectionTitle
          badge={t("badge")}
          title={t("title")}
          lead={t("lead")}
          onDark={!!backgroundImage}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full brand-gradient text-white">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-fg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
