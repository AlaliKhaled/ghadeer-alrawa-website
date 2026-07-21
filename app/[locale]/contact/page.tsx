import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { site, whatsappLink, mailtoLink } from "@/content/site";
import {
  WhatsAppIcon,
  InstagramIcon,
  XIcon,
  SnapchatIcon,
  TikTokIcon,
} from "@/components/ui/social-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("badge"), description: t("lead") };
}

const socials = [
  { key: "instagram", href: site.social.instagram, Icon: InstagramIcon },
  { key: "x", href: site.social.x, Icon: XIcon },
  { key: "snapchat", href: site.social.snapchat, Icon: SnapchatIcon },
  { key: "tiktok", href: site.social.tiktok, Icon: TikTokIcon },
] as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const activeSocials = socials.filter((s) => s.href);

  const mapSrc = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=11&output=embed`;

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} lead={t("lead")} />

      <section className="container-px py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Details */}
          <Reveal className="flex flex-col gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "lg", "w-full")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t("whatsappLabel")} · <span dir="ltr">{site.contact.phoneDisplay}</span>
            </a>

            <InfoCard
              Icon={Mail}
              label={t("emailLabel")}
              value={site.contact.email}
              href={mailtoLink()}
            />
            <InfoCard
              Icon={Clock}
              label={t("hoursLabel")}
              value={t("hoursValue")}
            />
            <InfoCard
              Icon={MapPin}
              label={t("addressLabel")}
              value={t("addressValue")}
            />

            {activeSocials.length > 0 ? (
              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm font-bold text-fg">{t("followUs")}</p>
                <div className="mt-3 flex gap-2">
                  {activeSocials.map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-cyan hover:text-cyan"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>

          {/* Map */}
          <Reveal delay={0.08}>
            <div className="h-full min-h-80 overflow-hidden rounded-3xl border border-border">
              <iframe
                title={t("addressValue")}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-80 w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-fg-muted">{label}</p>
        <p className="font-semibold text-fg">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-90">
      {inner}
    </a>
  ) : (
    inner
  );
}
