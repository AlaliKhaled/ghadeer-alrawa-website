"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Heading that reveals its words with a soft blur-and-rise as it scrolls into
 * view. Splits on whole words only — never mid-word — so Arabic letter joining
 * stays intact (character-by-character "typing" breaks cursive scripts).
 */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TypewriterHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
  /** Kept for API compatibility; reveal timing is stagger-based now. */
  speed?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.h2
      className={cn("text-balance", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          {i > 0 ? " " : null}
          <motion.span variants={wordVariant} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
