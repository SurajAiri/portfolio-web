import { Bot, Boxes, Play, Radar, Terminal, Video, Wrench } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/types";
import { getSortedProjectMedia } from "@/data/projects";
import { sentenceCase } from "@/lib/format";

// Small deterministic hash so the same project always renders the same
// placeholder pattern (no randomness -> no hydration mismatch).
function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// One representative icon per category so the placeholder at least hints at
// what the project is, instead of being pure decoration. Renders the element
// directly (rather than resolving to a capitalized component reference
// during render) to avoid the react-hooks/static-components lint rule.
function renderProjectIcon(project: Project) {
  const cat = project.category[0];
  const iconProps = {
    size: 40,
    strokeWidth: 1.25,
    className:
      "text-white/[0.14] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:text-accent/25",
  };
  if (project.title.toLowerCase().includes("video"))
    return <Video {...iconProps} />;
  if (cat === "AI") return <Bot {...iconProps} />;
  if (cat === "BACKEND") return <Terminal {...iconProps} />;
  if (project.productType.includes("LIBRARY")) return <Boxes {...iconProps} />;
  if (project.homeTags?.includes("agents")) return <Radar {...iconProps} />;
  return <Wrench {...iconProps} />;
}

function GeneratedPlaceholder({ project }: { project: Project }) {
  const seed = hashString(project.id);

  // Deterministic but varied: rotation, dot spacing, line pattern per project
  // — same accent-on-dark palette everywhere, only the geometry changes.
  const rotate = (seed % 8) * 5 - 17.5; // -17.5..17.5 deg
  const spacing = 22 + (seed % 5) * 4; // 22..38
  const usesGrid = seed % 2 === 0;

  const patternId = `pat-${project.id}`;

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-foreground/[0.04]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 225"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${rotate})`}
          >
            {usesGrid ? (
              <path
                d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-accent/[0.10]"
              />
            ) : (
              <circle
                cx={spacing / 2}
                cy={spacing / 2}
                r="1.4"
                fill="currentColor"
                className="text-accent/[0.18]"
              />
            )}
          </pattern>
          <radialGradient id={`glow-${project.id}`} cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#4fd9a0" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#4fd9a0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="225" fill={`url(#pat-${project.id})`} />
        <rect width="400" height="225" fill={`url(#glow-${project.id})`} />
      </svg>

      {/* Centered category icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {renderProjectIcon(project)}
      </div>

      {/* Corner label so it's honest about being a placeholder, not a screenshot */}
      <span className="absolute bottom-2 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[11px] text-white/50">
        {sentenceCase(project.productType[0])}
      </span>
    </div>
  );
}

// Derives a static preview image for any media item, including video/youtube/
// loom kinds that need an explicit poster frame rather than the raw src.
function resolvePreviewImage(
  item: NonNullable<Project["media"]>[number]
): string | null {
  if (item.kind === "image" || item.kind === "gif") return item.src;
  if (item.poster) return item.poster;
  if (item.kind === "youtube") {
    const id = item.src.match(
      /(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/
    )?.[1];
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return null;
}

export default function ProjectThumbnail({ project }: { project: Project }) {
  const media = getSortedProjectMedia(project);
  const cover =
    media.find((m) => m.role === "thumbnail") ?? media[0] ?? undefined;

  if (!cover) return <GeneratedPlaceholder project={project} />;

  const previewSrc = resolvePreviewImage(cover);
  const isPlayable =
    cover.kind === "video" || cover.kind === "youtube" || cover.kind === "loom";

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-foreground/[0.04]">
      {previewSrc ? (
        cover.kind === "gif" ? (
          // Gifs must stay unoptimized so the animation isn't flattened to one frame.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt={cover.caption ?? project.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={previewSrc}
            alt={cover.caption ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )
      ) : (
        <GeneratedPlaceholder project={project} />
      )}

      {isPlayable && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-sm">
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </span>
        </div>
      )}

      {media.length > 1 && (
        <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[11px] text-white/80">
          +{media.length - 1} more
        </span>
      )}
    </div>
  );
}
