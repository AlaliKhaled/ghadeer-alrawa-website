"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

/**
 * Inertial smooth scrolling for pointer (desktop) devices only. On touch
 * devices it stays out of the way so the browser's own scrolling works
 * normally — smoothing touch tends to feel "stuck" and can trap scroll after
 * navigating between pages. Also disabled for prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Enable only on fine pointers (mouse/trackpad) that don't prefer reduced
    // motion; touch phones and tablets keep native scrolling.
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
