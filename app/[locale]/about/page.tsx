import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Media } from "@/components/ui/media";
import { VisionMission } from "@/components/sections/vision-mission";
import { WhyUs } from "@/components/sections/why-us";
import { CTA } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("badge"), description: t("body") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} lead={t("lead")} />

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
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-fg-muted">{t("body")}</p>
          </Reveal>
        </div>
      </section>

      <VisionMission />
      <WhyUs backgroundImage="/images/why-us-drop.webp" />
      <CTA />
    </>
  );
}
