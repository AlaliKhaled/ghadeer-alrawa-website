import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { WhyUs } from "@/components/sections/why-us";
import { ProductsPreview } from "@/components/sections/products-preview";
import { Gallery } from "@/components/sections/gallery";
import { WorkStages } from "@/components/sections/work-stages";
import { VisionMission } from "@/components/sections/vision-mission";
import { CTA } from "@/components/sections/cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // enable static rendering

  return (
    <>
      <div id="home">
        <Hero locale={locale} />
      </div>
      <div id="about" className="scroll-mt-20">
        <AboutIntro locale={locale} />
      </div>
      <div id="services" className="scroll-mt-20">
        <ServicesGrid
          locale={locale}
          limit={6}
          showViewAll
          backgroundImage="/images/services-hall.webp"
        />
      </div>
      <div id="sectors" className="scroll-mt-20">
        <SectorsGrid />
      </div>
      <div id="why-us" className="scroll-mt-20">
        <WhyUs backgroundImage="/images/why-us-drop.webp" />
      </div>
      <div id="products" className="scroll-mt-20">
        <ProductsPreview locale={locale} limit={8} />
      </div>
      <Gallery />
      <WorkStages />
      <VisionMission />
      <div id="contact" className="scroll-mt-20">
        <CTA />
      </div>
    </>
  );
}
