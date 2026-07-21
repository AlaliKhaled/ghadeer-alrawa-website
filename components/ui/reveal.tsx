"use client";

import { motion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/** Fade + slide-up on scroll into view. Respects reduced-motion via CSS. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const MotionTag = motion[as];
  const ref = useRef<HTMLElement>(null);

  return (
    <MotionTag
      // `as` widens the element union, so the ref type collapses to `never`;
      // the runtime node is always a plain HTMLElement.
      ref={ref as never}
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      // Once the entrance settles, drop the residual `will-change`/`transform`
      // Framer leaves behind. Otherwise the element stays promoted to its own
      // GPU layer and the compositor moves it at sub-pixel offsets while the
      // page scrolls — which blurs/jitters the text inside cards until scroll
      // stops. Clearing it lets the browser re-rasterize the text sharply.
      // (When it scrolls back out of view, Framer re-applies the hidden state
      // and the replay animation runs again as before.)
      onAnimationComplete={(definition) => {
        if (definition !== "visible") return;
        const el = ref.current;
        if (!el) return;
        el.style.willChange = "auto";
        el.style.transform = "none";
      }}
    >
      {children}
    </MotionTag>
  );
}
