import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { whatsappLink, mailtoLink } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/social-icons";

export function CTA() {
  const t = useTranslations("cta");
  return (
    <section className="container-px py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl brand-gradient px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -top-16 start-10 h-56 w-56 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 end-10 h-64 w-64 rounded-full bg-aqua blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("whatsapp", "lg")}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t("whatsapp")}
              </a>
              <a
                href={mailtoLink()}
                className={buttonClasses("outline", "lg", "!bg-white/10 !text-white !border-white/40 hover:!text-white hover:!border-white")}
              >
                <Mail className="h-5 w-5" />
                {t("email")}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
