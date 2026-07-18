import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import { Media } from "@/components/ui/media";

export function AboutIntro({ locale }: { locale: string }) {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="container-px py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Media
            src="/images/about.jpg"
            alt={t("title")}
            label={t("badge")}
            Icon={Building2}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-4/3 w-full rounded-3xl border border-border shadow-xl shadow-navy/10"
          />
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold text-cyan">
              {t("badge")}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <TypewriterHeading
              text={t("title")}
              className="mt-5 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-fg-muted">{t("body")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline"
            >
              {tCommon("learnMore")}
              <Arrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
