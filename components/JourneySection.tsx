"use client";

import { journey } from "@/data/personal";
import { sentenceCase } from "@/lib/format";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { JourneyMilestone } from "@/types";

function JourneyEntry({ entry }: { entry: JourneyMilestone }) {
  const isSetback = entry.tag === "setback";

  return (
    <li className="relative pb-9 pl-8 last:pb-0">
      {/* Dot on the rail. Setbacks are hollow so they read differently
          from milestones without needing a color the rail doesn't have. */}
      <span
        aria-hidden="true"
        className={`absolute top-[9px] left-0 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-background ${
          isSetback ? "border-2 border-faint bg-background" : "bg-accent"
        }`}
      />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 className="text-lg font-semibold tracking-tight">{entry.title}</h3>
        <p className="text-sm text-faint">
          {entry.period}
          {isSetback && ", setback"}
        </p>
      </div>
      <p className="mt-1.5 max-w-[60ch] text-base leading-relaxed text-muted">
        {entry.description}
      </p>
    </li>
  );
}

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Collapsible "earlier" group, collapsed by default — split at the
  // entry carrying `dividerAfter` (see data/personal.ts). Change or
  // remove that one field to move/hide the split; no index math here.
  const [showEarlier, setShowEarlier] = useState(false);
  const splitIndex = journey.findIndex((entry) => entry.dividerAfter);
  const hasSplit = splitIndex !== -1;
  const mainEntries = hasSplit ? journey.slice(0, splitIndex + 1) : journey;
  const earlierEntries = hasSplit ? journey.slice(splitIndex + 1) : [];
  const dividerLabel = hasSplit ? journey[splitIndex].dividerAfter : null;

  return (
    <div ref={containerRef} className="relative ml-1.5">
      {/* Rail — static track plus a scroll-linked fill that shows how far
          down the story the reader is. */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent"
      />

      <ol>
        {mainEntries.map((entry) => (
          <JourneyEntry key={`${entry.period}-${entry.title}`} entry={entry} />
        ))}
      </ol>

      {dividerLabel && earlierEntries.length > 0 && (
        <div className="relative pt-2 pl-8">
          <button
            type="button"
            onClick={() => setShowEarlier((v) => !v)}
            aria-expanded={showEarlier}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:border-foreground/30 hover:text-foreground"
          >
            {showEarlier ? "Hide" : "Show"} {sentenceCase(dividerLabel).toLowerCase()} (
            {earlierEntries.length})
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                showEarlier ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {showEarlier && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="-ml-8 overflow-hidden"
              >
                <ol className="pt-9">
                  {earlierEntries.map((entry) => (
                    <JourneyEntry
                      key={`${entry.period}-${entry.title}`}
                      entry={entry}
                    />
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
