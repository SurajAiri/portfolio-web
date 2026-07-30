"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

const MAX_VISIBLE = 6;

function toLabel(tag: string) {
  return tag.toUpperCase();
}

export default function ProjectTabs({ projects }: { projects: Project[] }) {
  const tabs = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.homeTags?.forEach((t) => tagSet.add(t)));
    return ["overall", ...Array.from(tagSet)];
  }, [projects]);

  const [active, setActive] = useState(tabs[0]);

  const visible = useMemo(() => {
    const filtered =
      active === "overall"
        ? projects.filter((p) => p.featured)
        : projects.filter((p) => p.homeTags?.includes(active));
    return filtered.slice(0, MAX_VISIBLE);
  }, [projects, active]);

  if (tabs.length <= 1) {
    // No homeTags anywhere in the data — just render featured projects,
    // no point showing a single-option tab bar.
    return (
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {projects
          .filter((p) => p.featured)
          .slice(0, MAX_VISIBLE)
          .map((p) => (
            <ProjectCard key={p.id} project={p} originContext="home" />
          ))}
      </div>
    );
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="mt-10 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 ${
              active === tab
                ? "bg-accent/15 text-accent"
                : "bg-white/[0.04] text-muted hover:bg-white/[0.07] hover:text-foreground/70"
            }`}
          >
            {toLabel(tab)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-8 grid gap-6 lg:grid-cols-3"
        >
          {visible.length > 0 ? (
            visible.map((p) => (
              <ProjectCard key={p.id} project={p} originContext="home" />
            ))
          ) : (
            <p className="col-span-full py-8 text-center font-mono text-sm text-muted">
              Nothing tagged here yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
