/**
 * Central site configuration.
 * TODO(before launch): replace the placeholder contact details with the
 * client's real WhatsApp number, email, legal info and social links.
 */
export const site = {
  // Production URL — override via NEXT_PUBLIC_SITE_URL at deploy time.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ghadeer-alrawa.com",

  contact: {
    // Placeholder — Saudi WhatsApp number, digits only, no "+".
    whatsapp: "966500000000",
    email: "info@ghadeer-alrawa.com",
    phoneDisplay: "+966 50 000 0000",
  },

  // Placeholder legal info shown in the footer (KSA credibility).
  legal: {
    cr: "0000000000",
    vat: "000000000000000",
  },

  // Leave a social entry empty ("") to hide it.
  social: {
    instagram: "",
    x: "",
    snapchat: "",
    tiktok: "",
  },

  // Riyadh — used for the map + LocalBusiness schema. Update to the real address.
  geo: {
    city: "Riyadh",
    region: "Riyadh Province",
    country: "SA",
    lat: 24.7136,
    lng: 46.6753,
  },
} as const;

/** Pre-built WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Pre-built mailto link. */
export function mailtoLink(subject?: string): string {
  const base = `mailto:${site.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
