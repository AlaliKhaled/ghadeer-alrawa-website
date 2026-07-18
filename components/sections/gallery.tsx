import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/reveal";
import { MagneticCarousel } from "@/components/ui/magnetic-carousel";
import { galleryImages } from "@/content/media";

export function Gallery() {
  const t = useTranslations("gallery");
  const images = galleryImages.map((src) => ({ src, alt: t("title") }));

  return (
    <section className="container-px py-20">
      <SectionTitle badge={t("badge")} title={t("title")} lead={t("lead")} />
      <Reveal className="mt-12">
        <MagneticCarousel images={images} />
      </Reveal>
    </section>
  );
}
