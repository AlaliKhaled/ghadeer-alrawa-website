import { site } from "@/content/site";

/** LocalBusiness structured data for local SEO (Riyadh). */
export function LocalBusinessJsonLd({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url: site.url,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    image: `${site.url}/logo/icon-512.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.geo.city,
      addressRegion: site.geo.region,
      addressCountry: site.geo.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: "SA",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
