import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { site, mailtoLink, whatsappLink } from "@/content/site";

type Section = { heading: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), description: t("lead") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} lead={t("lead")} />

      <section className="container-px py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-fg-muted/70">{t("updated")}</p>

          <div className="mt-10 flex flex-col gap-10">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={(i % 3) * 0.05}>
                <h2 className="text-xl font-bold text-fg sm:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-fg-muted">{s.body}</p>
              </Reveal>
            ))}

            {/* Contact block — single source of truth from content/site.ts. */}
            <Reveal>
              <div className="rounded-2xl border border-border bg-bg-soft p-6 sm:p-8">
                <h2 className="text-xl font-bold text-fg sm:text-2xl">
                  {t("contactHeading")}
                </h2>
                <p className="mt-3 leading-relaxed text-fg-muted">
                  {t("contactBody")}
                </p>
                <div className="mt-5 flex flex-col gap-3 text-sm">
                  <a
                    href={mailtoLink()}
                    className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-cyan"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-cyan" />
                    {site.contact.email}
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-cyan"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-cyan" />
                    <span dir="ltr">{site.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
