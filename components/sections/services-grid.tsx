import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";
import { serviceIcons } from "@/content/icons";
import { serviceImages } from "@/content/media";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";

type ServiceItem = { title: string; desc: string };

export function ServicesGrid({
  locale,
  limit,
  showViewAll = false,
  showHeader = true,
  backgroundImage,
}: {
  locale: string;
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
  backgroundImage?: string;
}) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const items = t.raw("items") as ServiceItem[];
  const shown = limit ? items.slice(0, limit) : items;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative isolate overflow-hidden py-20">
      {backgroundImage ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt=""
            fill
            // Cap requested size (avoids slow 3840px encode for a soft bg).
            sizes="960px"
            quality={70}
            className="object-cover blur-[1.5px]"
          />
          <div className="absolute inset-0 bg-bg/55 dark:bg-navy-deep/72" />
        </div>
      ) : null}

      <div className="container-px">
        {showHeader ? (
          <SectionTitle badge={t("badge")} title={t("title")} lead={t("lead")} />
        ) : null}

        <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", showHeader && "mt-12")}>
        {shown.map((item, i) => {
          const Icon = serviceIcons[i] ?? serviceIcons[0];
          return (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.06}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-xl hover:shadow-cyan/10">
                <div className="relative">
                  <Media
                    src={serviceImages[i]}
                    alt={item.title}
                    label={item.title}
                    Icon={Icon}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-video w-full"
                  />
                  <span className="absolute bottom-0 inline-flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-xl bg-cyan text-white shadow-lg shadow-cyan/30 ltr:left-6 rtl:right-6">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="p-6 pt-9">
                  <h3 className="text-lg font-bold text-fg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

        {showViewAll ? (
          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline"
            >
              {tCommon("viewAll")}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
