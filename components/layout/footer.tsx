import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/layout/logo";
import { site, whatsappLink, mailtoLink } from "@/content/site";
import {
  InstagramIcon,
  XIcon,
  SnapchatIcon,
  TikTokIcon,
} from "@/components/ui/social-icons";

const navLinks = [
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/sectors", key: "sectors" },
  { href: "/products", key: "products" },
  { href: "/contact", key: "contact" },
] as const;

const socials = [
  { key: "instagram", href: site.social.instagram, Icon: InstagramIcon },
  { key: "x", href: site.social.x, Icon: XIcon },
  { key: "snapchat", href: site.social.snapchat, Icon: SnapchatIcon },
  { key: "tiktok", href: site.social.tiktok, Icon: TikTokIcon },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const tContact = useTranslations("contact");
  const activeSocials = socials.filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-border bg-bg-soft">
      <div className="container-px grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + about */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-10" />
            <span className="text-lg font-extrabold text-fg">
              {tMeta("shortName")}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
            {t("about")}
          </p>
          {activeSocials.length > 0 ? (
            <div className="mt-5 flex gap-2">
              {activeSocials.map(({ key, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:border-cyan hover:text-cyan"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold text-fg">{t("quickLinks")}</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-fg-muted transition-colors hover:text-cyan"
                >
                  {tNav(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold text-fg">{t("contactTitle")}</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-fg-muted">
            <li>
              <a
                href={whatsappLink()}
                className="inline-flex items-center gap-2 transition-colors hover:text-cyan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4 shrink-0 text-cyan" />
                <span dir="ltr">{site.contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={mailtoLink()}
                className="inline-flex items-center gap-2 transition-colors hover:text-cyan"
              >
                <Mail className="h-4 w-4 shrink-0 text-cyan" />
                {site.contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-cyan" />
              {tContact("addressValue")}
            </li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-border">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-fg-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {tMeta("siteName")} — {t("rights")}.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              {t("crLabel")}: {site.legal.cr}
            </span>
            {site.legal.vat ? (
              <span>
                {t("vatLabel")}: {site.legal.vat}
              </span>
            ) : null}
            <Link
              href="/privacy"
              className="transition-colors hover:text-cyan"
            >
              {t("privacy")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
