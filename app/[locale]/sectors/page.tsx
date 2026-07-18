import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/page-header";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { CTA } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectors" });
  return { title: t("badge"), description: t("lead") };
}

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sectors" });

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} lead={t("lead")} />
      <SectorsGrid showHeader={false} />
      <CTA />
    </>
  );
}
