"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

const MAX_VISIBLE = 6;
const gridClass = "mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3";

function toLabel(tag: string) {
  if (tag === "overall") return "Featured";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
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
      <div className={gridClass}>
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
      <div
        role="group"
        aria-label="Filter projects"
        className="mt-10 flex gap-6 border-b border-border"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            aria-pressed={active === tab}
            className={`relative -mb-px pb-3 text-sm font-medium transition-colors duration-200 ${
              active === tab
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {toLabel(tab)}
            {active === tab && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={gridClass}
        >
          {visible.length > 0 ? (
            visible.map((p) => (
              <ProjectCard key={p.id} project={p} originContext="home" />
            ))
          ) : (
            <p className="col-span-full py-8 text-muted">
              No projects in this group yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
