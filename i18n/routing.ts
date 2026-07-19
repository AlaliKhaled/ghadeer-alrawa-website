import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  // Arabic is served at "/" without a prefix; English at "/en".
  localePrefix: "as-needed",
  // Always open in Arabic (the primary language); never auto-switch to English
  // from the browser's Accept-Language. Visitors change language via the toggle.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
