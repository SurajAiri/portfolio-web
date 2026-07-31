"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaItem } from "@/types";

const SWIPE_THRESHOLD = 60;

function youTubeEmbedUrl(src: string) {
  const id = src.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : src;
}

function loomEmbedUrl(src: string) {
  // Accept both share links (loom.com/share/<id>) and already-embed links.
  return src.includes("/embed/") ? src : src.replace("/share/", "/embed/");
}

function MediaSlide({ item }: { item: MediaItem }) {
  // Fades the image in once it's actually decoded, rather than having it pop
  // in abruptly — the rest of the page (title, text) never waits on this,
  // it's already rendered by the time the image arrives. Next/Image's onLoad
  // fires for cache hits too (just near-instantly), so this never gets stuck.
  const [loaded, setLoaded] = useState(false);

  switch (item.kind) {
    case "image":
      return (
        <Image
          key={item.id}
          src={item.src}
          alt={item.caption ?? "Project media"}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className={`object-contain transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoad={() => setLoaded(true)}
        />
      );
    case "gif":
      return (
        // eslint-disable-next-line @next/next/no-img-element -- keep gif animation
        <img
          src={item.src}
          alt={item.caption ?? "Project media"}
          className="h-full w-full object-contain"
        />
      );
    case "video":
      return (
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          className="h-full w-full object-contain"
        />
      );
    case "youtube":
      return (
        <iframe
          src={youTubeEmbedUrl(item.src)}
          title={item.caption ?? "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      );
    case "loom":
      return (
        <iframe
          src={loomEmbedUrl(item.src)}
          title={item.caption ?? "Loom recording"}
          allow="fullscreen; clipboard-write"
          allowFullScreen
          className="h-full w-full"
        />
      );
    default:
      return null;
  }
}

function ThumbStrip({
  item,
  active,
  onClick,
}: {
  item: MediaItem;
  active: boolean;
  onClick: () => void;
}) {
  const isPlayable = item.kind === "video" || item.kind === "youtube" || item.kind === "loom";
  const staticSrc =
    item.kind === "image" || item.kind === "gif" ? item.src : item.poster;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.caption ?? "View media"}
      className={`relative aspect-video w-20 shrink-0 overflow-hidden rounded-md border transition-all duration-200 sm:w-24 ${
        active
          ? "border-accent opacity-100"
          : "border-white/10 opacity-50 hover:opacity-80"
      }`}
    >
      {staticSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny thumb, next/image overhead not worth it
        <img
          src={staticSrc}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/30">
          <Play size={14} />
        </div>
      )}
      {isPlayable && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Play size={12} className="text-white/90" fill="currentColor" />
        </span>
      )}
    </button>
  );
}

export default function ProjectGallery({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (media.length === 0) return;
      const wrapped = (next + media.length) % media.length;
      setDirection(wrapped > index ? 1 : -1);
      setIndex(wrapped);
    },
    [index, media.length]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, goTo]);

  if (media.length === 0) return null;

  const current = media[index];

  const handleDragEnd = (
    _: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
  };

  return (
    <div className="mt-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/[0.03]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            drag={media.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <MediaSlide item={current} />
          </motion.div>
        </AnimatePresence>

        {media.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous media"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-accent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next media"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-accent"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {media.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  aria-label={`Go to media ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index ? "w-5 bg-accent" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {current.caption && (
        <p className="mt-2 text-center font-mono text-xs text-white/40">
          {current.caption}
        </p>
      )}

      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((item, i) => (
            <ThumbStrip
              key={item.id}
              item={item}
              active={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
