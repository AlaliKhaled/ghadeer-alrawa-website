# Ghadeer Al-Rawa — Website

Bilingual (Arabic / English) marketing site for مؤسسة غدير الرواء لتحلية المياه.
Built with **Next.js 16 (App Router) · TypeScript · Tailwind v4 · next-intl · next-themes · Framer Motion**.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → Arabic at /, English at /en
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `app/[locale]/` — pages: home, `about`, `services`, `products`, `sectors`, `contact`.
- `messages/ar.json`, `messages/en.json` — **all site copy** (edit text here; AR/EN stay in sync).
- `content/site.ts` — contact info, socials, legal (CR/VAT), map coordinates.
- `content/icons.ts` — lucide icons matched to services / products / sectors.
- `components/` — `layout/`, `sections/`, `ui/`, `seo/`.
- `public/logo/` — logo assets. `public/images/` — photos (see below).

## Editing content

- **Text:** edit `messages/ar.json` + `messages/en.json`.
- **Contact / legal / socials:** edit `content/site.ts` (placeholders marked `TODO`).
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

## Swapping the placeholder photos

Every image slot currently shows a branded gradient placeholder. To use a real photo,
pass a `src` to the `Media` component (or add an `image` field to a product item).
**Source photos can be plain JPG or PNG** — `next/image` serves optimized WebP/AVIF automatically.

Current images in `public/images/` (`hero.jpg`, `about.jpg`, `services/1..11.jpg`,
`products/1..11.jpg`) are **temporary demo photos from Unsplash** (free license) — replace with the
client's real photos. Paths are mapped in `content/media.ts`. See the photo manifest (counts + sizes)
in `../../.claude/plans/i-have-a-new-dreamy-cookie.md`.

## Before launch (client to provide)

Real WhatsApp number + email, working hours, socials, address, CR + VAT, domain name — all in
`content/site.ts` / `messages/*`. Then deploy to **Vercel** and connect the domain.

## Notes

- Contact uses WhatsApp deep-link + `mailto:` only (no form/back-end → nothing to exploit).
- Security headers are set in `next.config.ts`.
- A feature scroll animation from 21st.dev can be dropped into the Home hero once its link is chosen.
