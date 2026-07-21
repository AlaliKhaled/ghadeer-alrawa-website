"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

export type CarouselImage = { src: string; alt?: string };

/**
 * Responsive project gallery.
 *  - Touch / small screens: a swipeable, snap-scrolling strip of large cards.
 *  - Desktop (fine pointer): a macOS-dock "magnetic" row that magnifies on hover.
 * Any card opens a shared centered lightbox (backdrop / close button / Escape).
 */
export function MagneticCarousel({
  images,
  className,
}: {
  images: CarouselImage[];
  className?: string;
}) {
  const items = images.length ? images : [];
  const [open, setOpen] = useState<number | null>(null);
  const [useDock, setUseDock] = useState(false);

  // Decide layout after mount (SSR + mobile render the swipe strip by default).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setUseDock(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // While the lightbox is open: lock background scroll and wire Escape to close.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!items.length) return null;

  return (
    <>
      {useDock ? (
        <MagneticDock items={items} className={className} onOpen={setOpen} />
      ) : (
        <SwipeStrip items={items} className={className} onOpen={setOpen} />
      )}

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

/** Mobile / touch: horizontal snap-scrolling strip of large, tappable cards. */
function SwipeStrip({
  items,
  className,
  onOpen,
}: {
  items: CarouselImage[];
  className?: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div
      className={
        "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
        (className ?? "")
      }
    >
      {items.map((img, i) => (
        <button
          type="button"
          key={img.src + i}
          aria-label={img.alt ?? `image ${i + 1}`}
          onClick={() => onOpen(i)}
          className="relative aspect-[4/3] w-[78vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-2xl border border-border"
        >
          <Image
            src={img.src}
            alt={img.alt ?? ""}
            fill
            quality={90}
            sizes="80vw"
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );
}

/** Desktop: macOS-dock row of thin bars that magnify near the cursor. */
function MagneticDock({
  items,
  className,
  onOpen,
}: {
  items: CarouselImage[];
  className?: string;
  onOpen: (i: number) => void;
}) {
  const count = items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [factors, setFactors] = useState<number[]>(() => items.map(() => 0));

  const targetRef = useRef<number[]>(items.map(() => 0));
  const curRef = useRef<number[]>(items.map(() => 0));
  const loopRef = useRef(0);

  const s = useMemo(() => {
    const w = width || 960;
    const gap = 14;
    const collapsedWidth = Math.max(
      40,
      Math.min(120, (w - (count - 1) * gap) / count),
    );
    const hoverWidth = Math.min(collapsedWidth * 2.1, w * 0.6);
    const collapsedHeight = Math.min(400, Math.max(220, w * 0.42));
    const hoverHeight = collapsedHeight * 1.12;
    const influence = collapsedWidth * 3.2;
    return { gap, collapsedWidth, hoverWidth, collapsedHeight, hoverHeight, influence };
  }, [width, count]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => cancelAnimationFrame(loopRef.current), []);

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

  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const totalBase = count * s.collapsedWidth + (count - 1) * s.gap;
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

  const onLeave = () => {
    targetRef.current = items.map(() => 0);
    startLoop();
  };

  return (
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
        const f = factors[i] ?? 0;
        const w = s.collapsedWidth + (s.hoverWidth - s.collapsedWidth) * f;
        const h = s.collapsedHeight + (s.hoverHeight - s.collapsedHeight) * f;
        return (
          <button
            type="button"
            key={img.src + i}
            aria-label={img.alt ?? `image ${i + 1}`}
            onClick={() => onOpen(i)}
            style={{
              flex: "none",
              width: w,
              height: h,
              overflow: "hidden",
              cursor: "pointer",
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
              sizes="(max-width: 1280px) 30vw, 320px"
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
