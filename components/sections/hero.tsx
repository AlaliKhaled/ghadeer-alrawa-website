import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Droplets } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { HeroBackground } from "@/components/sections/hero-background";
import { buttonClasses } from "@/components/ui/button";

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const backgrounds = [
    { src: "/images/hero-1-indoor-plant.webp", alt: t("title") },
    { src: "/images/hero-2-outdoor-station.webp", alt: t("title") },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground images={backgrounds} />

      <div className="container-px flex min-h-[600px] flex-col justify-center py-24 text-white md:min-h-[86vh]">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Droplets className="h-4 w-4 text-aqua" />
              {t("badge")}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonClasses("primary", "lg")}>
                {t("ctaPrimary")}
                <Arrow className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className={buttonClasses(
                  "outline",
                  "lg",
                  "!border-white/40 !bg-white/10 !text-white backdrop-blur-sm hover:!border-white hover:!bg-white/20",
                )}
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-extrabold text-aqua sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-white/75 sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
