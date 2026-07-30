"use client";

import { journey } from "@/data/personal";
import { ChevronDown, Milestone } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { JourneyMilestone } from "@/types";

function JourneyEntry({ entry, index }: { entry: JourneyMilestone; index: number }) {
  const isSetback = entry.tag === "setback";
  const isRight = index % 2 === 0; // alternate sides on desktop

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? -18 : 18, y: 6 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-10 md:pl-0"
    >
      {/* Dot on the rail — vertically centered against the card, not
          pinned to its top */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.35,
          delay: (index % 4) * 0.08 + 0.15,
          ease: "backOut",
        }}
        className={`absolute left-4 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background md:left-1/2 ${
          isSetback ? "bg-white/30" : "bg-accent"
        }`}
      />

      {/* Card — alternates left/right on desktop, always right of the
          rail on mobile */}
      <div className={isRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}>
        <div
          className={`group rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-white/[0.05] hover:shadow-[0_8px_24px_-12px_rgba(34,197,94,0.25)] md:max-w-md ${
            isRight ? "md:ml-2" : "md:mr-2 md:ml-auto md:text-right"
          }`}
        >
          <div
            className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
              isRight ? "" : "md:justify-end"
            }`}
          >
            <h3 className="text-base font-bold transition-colors duration-200 group-hover:text-accent">
              {entry.title}
            </h3>
            <p
              className={`font-mono text-xs ${
                isSetback ? "text-white/30" : "text-accent"
              }`}
            >
              {entry.period.toUpperCase()}
            </p>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
            {entry.description}
          </p>
        </div>
      </div>
    </motion.div>
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
    <section className="mx-auto mt-16 max-w-5xl px-6">
      <div className="flex items-center gap-2">
        <span className="text-accent">
          <Milestone size={18} />
        </span>
        <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
          JOURNEY
        </h2>
      </div>

      <div ref={containerRef} className="relative mt-10">
        {/* Center rail — track (static) + progress fill (scroll-linked) */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-4 top-0 bottom-0 w-px origin-top bg-accent/60 md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-5 md:space-y-6">
          {mainEntries.map((entry, i) => (
            <JourneyEntry key={`${entry.period}-${entry.title}`} entry={entry} index={i} />
          ))}
        </div>

        {/* Dotted divider doubles as the collapse toggle for everything
            after it — collapsed by default so the section stays short. */}
        {dividerLabel && (
          <div className="relative z-10 mt-5 md:mt-6">
            <button
              type="button"
              onClick={() => setShowEarlier((v) => !v)}
              aria-expanded={showEarlier}
              className="group flex w-full items-center gap-3"
            >
              <span className="h-px flex-1 border-t border-dashed border-white/15 transition-colors duration-200 group-hover:border-white/30" />
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-background px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-white/35 ring-1 ring-white/10 transition-colors duration-200 group-hover:text-accent group-hover:ring-accent/30">
                {dividerLabel.toUpperCase()}
                {earlierEntries.length > 0 && ` · ${earlierEntries.length}`}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    showEarlier ? "rotate-180" : ""
                  }`}
                />
              </span>
              <span className="h-px flex-1 border-t border-dashed border-white/15 transition-colors duration-200 group-hover:border-white/30" />
            </button>

            <AnimatePresence initial={false}>
              {showEarlier && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-7 pt-7 md:space-y-9 md:pt-9">
                    {earlierEntries.map((entry, i) => (
                      <JourneyEntry
                        key={`${entry.period}-${entry.title}`}
                        entry={entry}
                        index={mainEntries.length + i}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
