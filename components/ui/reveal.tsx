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
      // `once: true` reveals each card a single time. With replay (`once:false`)
      // Framer re-arms cards every time they cross the viewport edge, so while
      // you scroll the ones near the edges are permanently mid-animation and
      // promoted to their own GPU layer, which blurs/jitters their text.
      // Animating once keeps them on the main layer and crisp forever after.
      viewport={{ once: true, margin: "-80px" }}
      // Belt-and-suspenders: once the entrance settles, drop any residual
      // `will-change`/`transform` Framer leaves behind so nothing stays
      // GPU-promoted.
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
