"use client";

import { useTranslations } from "next-intl";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/social-icons";

export function WhatsAppFab() {
  const t = useTranslations("cta");
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-[#25d366]/30 transition-transform hover:scale-105 ltr:right-5 rtl:left-5"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
