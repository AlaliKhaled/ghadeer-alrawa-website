"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home", id: "home" },
  { href: "/about", key: "about", id: "about" },
  { href: "/services", key: "services", id: "services" },
  { href: "/products", key: "products", id: "products" },
  { href: "/sectors", key: "sectors", id: "sectors" },
  { href: "/contact", key: "contact", id: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: on the home page the active nav item follows the section
  // crossing a thin band near the top of the viewport.
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-bg/60 backdrop-blur-sm",
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={tMeta("siteName")}>
          <Logo name={tMeta("shortName")} tagline={tMeta("tagline")} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = onHome ? activeId === l.id : pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-cyan/10 text-cyan"
                      : "text-fg-muted hover:bg-bg-soft hover:text-fg",
                  )}
                >
                  {t(l.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(buttonClasses("primary", "md"), "hidden md:inline-flex")}
          >
            {tCommon("getQuote")}
          </Link>
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
            {links.map((l) => {
              const active = onHome ? activeId === l.id : pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium",
                      active
                        ? "bg-cyan/10 text-cyan"
                        : "text-fg hover:bg-bg-soft",
                    )}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 flex items-center gap-2">
              <LanguageToggle />
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
