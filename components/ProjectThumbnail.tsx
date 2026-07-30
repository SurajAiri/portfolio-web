import { Bot, Boxes, Radar, Terminal, Video, Wrench } from "lucide-react";
import type { Project } from "@/types";

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

export default function ProjectThumbnail({ project }: { project: Project }) {
  const seed = hashString(project.id);

  // Deterministic but varied: rotation, dot spacing, line pattern per project
  // — same accent-on-dark palette everywhere, only the geometry changes.
  const rotate = (seed % 8) * 5 - 17.5; // -17.5..17.5 deg
  const spacing = 22 + (seed % 5) * 4; // 22..38
  const usesGrid = seed % 2 === 0;

  const patternId = `pat-${project.id}`;

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-white/[0.03]"
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
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
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
      <span className="absolute bottom-2 right-2 rounded bg-black/40 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-white/25">
        {project.productType[0]}
      </span>
    </div>
  );
}
