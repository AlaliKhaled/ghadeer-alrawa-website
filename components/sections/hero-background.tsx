"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Full-bleed hero background that auto-crossfades between images. */
export function HeroBackground({
  images,
  interval = 5000,
}: {
  images: { src: string; alt: string }[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-navy-deep">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </div>
      ))}
      {/* Readability overlay — darker at the bottom/start where the text sits. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/70 to-navy-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 to-transparent" />
    </div>
  );
}
