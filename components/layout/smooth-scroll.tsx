"use client";

import type { ReactNode } from "react";

/**
 * Native scrolling only.
 *
 * We previously used Lenis for inertial smooth scrolling, but Lenis scrolls to
 * fractional pixel positions, which makes the browser rasterize text at
 * sub-pixel offsets: body text and card titles blur / "pixel snap" while
 * scrolling and only snap back sharp once it stops. Native scrolling keeps
 * every glyph on whole pixels, so the text stays crisp in every situation.
 *
 * Kept as a thin pass-through wrapper so `layout.tsx` doesn't need to change,
 * and so smooth in-page navigation still works: `useLenis()` now returns
 * undefined everywhere, and the callers already fall back to the browser's
 * native `scrollTo({ behavior: "smooth" })` / scroll locking.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
