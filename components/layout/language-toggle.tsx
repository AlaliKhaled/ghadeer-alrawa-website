"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next: Locale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label={t("switchLang")}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface/80 px-3 text-sm font-semibold text-fg backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan sm:px-4"
    >
      <Globe className="h-[18px] w-[18px] shrink-0" />
      {/* Full label on larger screens, short code on mobile. */}
      <span className="hidden sm:inline">{t("switchLang")}</span>
      <span className="sm:hidden">{next === "en" ? "EN" : "ع"}</span>
    </button>
  );
}
