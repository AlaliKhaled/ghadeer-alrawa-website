import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WorkStages } from "@/components/sections/work-stages";
import { CTA } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("badge"), description: t("lead") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} lead={t("lead")} />
      <ServicesGrid
        locale={locale}
        showHeader={false}
        backgroundImage="/images/services-hall.webp"
      />
      <WorkStages />
      <CTA />
    </>
  );
}
