"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Media } from "@/components/ui/media";
import { productIcons } from "@/content/icons";
import { productImages } from "@/content/media";

type ProductItem = { name: string };

export function ProductsGallery() {
  const t = useTranslations("products");
  const items = t.raw("items") as ProductItem[];
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : items[active];
  const CurrentIcon =
    active === null ? null : (productIcons[active] ?? productIcons[0]);
  const activeImage = active === null ? undefined : productImages[active];

  return (
    <section className="container-px py-20">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = productIcons[i] ?? productIcons[0];
          return (
            <Reveal as="li" key={item.name} delay={(i % 4) * 0.05}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface text-start transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
              >
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
              </button>
            </Reveal>
          );
        })}
      </ul>

      {current && CurrentIcon ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.name}
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 ltr:right-4 rtl:left-4"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 ltr:left-4 rtl:right-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 ltr:right-4 rtl:left-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Media
              alt={current.name}
              src={activeImage}
              label={current.name}
              Icon={CurrentIcon}
              sizes="(max-width: 640px) 90vw, 512px"
              className="aspect-square w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-4 text-center text-lg font-semibold text-white">
              {current.name}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
