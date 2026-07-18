"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";

export type CarouselImage = { src: string; alt?: string };

/**
 * Magnetic Carousel — a row of thin image bars that magnify (width + height)
 * as the cursor nears, macOS-dock style (desktop). Tap/click any bar to open it
 * in a full centered lightbox; the backdrop, the close button or Escape closes
 * it. On touch devices the bars stay evenly sized and act as a tappable strip.
 *
 * Fully responsive: sizing is derived from the measured container width, so it
 * adapts from small phones up to desktop with no horizontal overflow.
 */
export function MagneticCarousel({
  images,
  className,
}: {
  images: CarouselImage[];
  className?: string;
}) {
  const items = images.length ? images : [];
  const count = items.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [factors, setFactors] = useState<number[]>(() => items.map(() => 0));
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();

  // Continuous easing loop state for the magnify effect.
  const targetRef = useRef<number[]>(items.map(() => 0));
  const curRef = useRef<number[]>(items.map(() => 0));
  const loopRef = useRef(0);

  // Responsive sizing derived from the measured container width.
  const s = useMemo(() => {
    const w = width || 960;
    const gap = w < 640 ? 6 : 14;
    const collapsedWidth = Math.max(
      24,
      Math.min(120, (w - (count - 1) * gap) / count),
    );
    const hoverWidth = Math.min(collapsedWidth * 2.1, w * 0.6);
    const collapsedHeight = Math.min(380, Math.max(180, w * 0.42));
    const hoverHeight = collapsedHeight * 1.12;
    const influence = collapsedWidth * 3.2;
    return { gap, collapsedWidth, hoverWidth, collapsedHeight, hoverHeight, influence };
  }, [width, count]);

  // Measure container width.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    targetRef.current = items.map(() => 0);
    curRef.current = items.map(() => 0);
    setFactors(items.map(() => 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => () => cancelAnimationFrame(loopRef.current), []);

  // While the lightbox is open: lock background scroll and wire Escape to close.
  useEffect(() => {
    if (open === null) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const startLoop = () => {
    if (loopRef.current) return;
    const step = () => {
      const tgt = targetRef.current;
      const cur = curRef.current;
      let moving = false;
      for (let i = 0; i < cur.length; i++) {
        const d = (tgt[i] ?? 0) - cur[i];
        if (Math.abs(d) > 0.001) {
          cur[i] += d * 0.2;
          moving = true;
        } else {
          cur[i] = tgt[i] ?? 0;
        }
      }
      setFactors([...cur]);
      loopRef.current = moving ? requestAnimationFrame(step) : 0;
    };
    loopRef.current = requestAnimationFrame(step);
  };

  const setTargetFromCursor = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = clientX - rect.left;
    const n = count;
    const totalBase = n * s.collapsedWidth + (n - 1) * s.gap;
    const startX = (rect.width - totalBase) / 2;
    targetRef.current = items.map((_, i) => {
      const center =
        startX + i * (s.collapsedWidth + s.gap) + s.collapsedWidth / 2;
      const dist = Math.abs(cx - center);
      const f = Math.max(0, 1 - dist / s.influence);
      return f * f * (3 - 2 * f); // smoothstep
    });
    startLoop();
  };

  const onMove = (e: React.MouseEvent) => setTargetFromCursor(e.clientX);

  const onLeave = () => {
    targetRef.current = items.map(() => 0);
    startLoop();
  };

  const sizeFor = (i: number) => {
    const f = factors[i] ?? 0;
    return {
      width: s.collapsedWidth + (s.hoverWidth - s.collapsedWidth) * f,
      height: s.collapsedHeight + (s.hoverHeight - s.collapsedHeight) * f,
    };
  };

  if (!count) return null;

  return (
    <>
      {/* The dock row. */}
      <div
        ref={containerRef}
        data-carousel
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: s.gap,
          position: "relative",
          minHeight: s.hoverHeight,
        }}
      >
        {items.map((img, i) => {
          const { width: w, height: h } = sizeFor(i);
          return (
            <button
              type="button"
              key={img.src + i}
              aria-label={img.alt ?? `image ${i + 1}`}
              onClick={() => setOpen(i)}
              style={{
                flex: "none",
                width: w,
                height: h,
                overflow: "hidden",
                cursor: "pointer",
                transition: "none",
                willChange: "width, height",
                position: "relative",
                borderRadius: 16,
              }}
              className="border border-border"
            >
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                fill
                quality={90}
                sizes="(max-width: 640px) 40vw, 260px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox — centered, responsive, no layout overflow. */}
      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
          className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/85 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-zoom-in relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
          >
            <Image
              src={items[open].src}
              alt={items[open].alt ?? ""}
              fill
              quality={90}
              sizes="(max-width: 1024px) 92vw, 1024px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
