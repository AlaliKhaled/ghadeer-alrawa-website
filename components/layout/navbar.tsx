"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Every entry maps to a section on the home page (see app/[locale]/page.tsx).
const links = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "sectors", key: "sectors" },
  { id: "why-us", key: "whyUs" },
  { id: "products", key: "products" },
  { id: "contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tMeta = useTranslations("meta");
  const locale = useLocale();
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const onHome = pathname === "/";

  // Locale-aware home URL ("/" for Arabic, "/en" for English).
  const homeHref = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const hrefFor = (id: string) =>
    id === "home"
      ? homeHref
      : `${homeHref === "/" ? "" : homeHref}/#${id}`;

  // Track scroll: give the header a solid background past the top, and hide it
  // when scrolling down / reveal it when scrolling back up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > last && y > 120) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the active nav item follows the section crossing a thin band
  // near the top of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -75% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => setOpen(false), [pathname]);

  // On the home page, smooth-scroll to the section instead of navigating away.
  // Elsewhere, let the browser follow the link to the home page + hash.
  const handleNav =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      setOpen(false);
      if (!onHome) return;
      e.preventDefault();
      if (id === "home") {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", homeHref);
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", hrefFor(id));
    };

  const isActive = (id: string) =>
    onHome ? activeId === id : pathname === `/${id}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[transform,background-color,border-color] duration-300",
        scrolled || open
          ? "border-border bg-bg shadow-sm"
          : "border-transparent bg-transparent",
        // Keep it visible while the mobile menu is open.
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <a href={homeHref} onClick={handleNav("home")} aria-label={tMeta("siteName")}>
          <Logo name={tMeta("shortName")} tagline={tMeta("tagline")} />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={hrefFor(l.id)}
                onClick={handleNav(l.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(l.id)
                    ? "bg-cyan/10 text-cyan"
                    : "text-fg-muted hover:bg-bg-soft hover:text-fg",
                )}
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {/* Wrapper (not the button) carries the responsive visibility, so the
              `hidden` utility isn't overridden by the button's own inline-flex. */}
          <div className="hidden lg:block">
            <Link href="/contact" className={buttonClasses("primary", "md")}>
              {tCommon("getQuote")}
            </Link>
          </div>
          <button
            type="button"
            aria-label={tCommon("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-fg lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open ? (
        <div className="border-t border-border bg-bg lg:hidden">
          <ul className="container-px flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={hrefFor(l.id)}
                  onClick={handleNav(l.id)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium",
                    isActive(l.id)
                      ? "bg-cyan/10 text-cyan"
                      : "text-fg hover:bg-bg-soft",
                  )}
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/contact"
                className={cn(buttonClasses("primary", "md"), "w-full")}
              >
                {tCommon("getQuote")}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
