/**
 * Central site configuration.
 * TODO(before launch): replace the placeholder contact details with the
 * client's real WhatsApp number, email, legal info and social links.
 */
export const site = {
  // Production URL — override via NEXT_PUBLIC_SITE_URL at deploy time.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ghadeer-alrawa.com",

  contact: {
    // Saudi WhatsApp number, digits only, no "+".
    whatsapp: "966555943421",
    email: "ghadiralrawa@gmail.com",
    phoneDisplay: "+966 55 594 3421",
  },

  // Legal info shown in the footer (KSA credibility). Leave a field empty
  // ("") to hide its line in the footer.
  legal: {
    cr: "7054509588",
    vat: "",
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
