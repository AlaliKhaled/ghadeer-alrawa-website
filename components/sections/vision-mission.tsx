import Image from "next/image";
import { useTranslations } from "next-intl";
import { Eye, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function VisionMission() {
  const t = useTranslations("about");

  const cards = [
    { Icon: Eye, title: t("visionTitle"), body: t("vision") },
    { Icon: Target, title: t("missionTitle"), body: t("mission") },
  ];

  return (
    <section className="relative isolate overflow-hidden py-20">
      {/* Vision 2030 desalination facility — decorative background. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/vision-2030-facility.webp"
          alt=""
          fill
          sizes="1280px"
          quality={70}
          className="object-cover object-center"
        />
        {/* Overlay keeps the cards readable over the photo. */}
        <div className="absolute inset-0 bg-navy-deep/70" />
      </div>

      <div className="container-px">
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map(({ Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8">
              <div className="pointer-events-none absolute -top-10 end-0 h-40 w-40 rounded-full bg-cyan/10 blur-2xl" />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-fg">{title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{body}</p>
            </div>
          </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
