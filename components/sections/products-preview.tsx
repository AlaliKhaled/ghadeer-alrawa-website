import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";
import { Media } from "@/components/ui/media";
import { productIcons } from "@/content/icons";
import { productImages } from "@/content/media";

type ProductItem = { name: string };

export function ProductsPreview({
  locale,
  limit,
}: {
  locale: string;
  limit?: number;
}) {
  const t = useTranslations("products");
  const tCommon = useTranslations("common");
  const items = t.raw("items") as ProductItem[];
  const shown = limit ? items.slice(0, limit) : items;
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="container-px py-20">
      <SectionTitle badge={t("badge")} title={t("title")} lead={t("lead")} />

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((item, i) => {
          const Icon = productIcons[i] ?? productIcons[0];
          return (
            <Reveal as="li" key={item.name} delay={(i % 4) * 0.05}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg">
                <Media
                  alt={item.name}
                  src={productImages[i]}
                  label={item.name}
                  Icon={Icon}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="aspect-square w-full"
                />
                <h3 className="p-4 text-center text-sm font-semibold text-fg">
                  {item.name}
                </h3>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-10 flex justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline"
        >
          {tCommon("viewAll")}
          <Arrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
