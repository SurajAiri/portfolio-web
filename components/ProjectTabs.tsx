"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

const MAX_VISIBLE = 6;
const gridClass = "mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3";

// Cards rise in one after another whenever the grid appears (on first scroll
// into view, and again after switching tabs).
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function toLabel(tag: string) {
  if (tag === "overall") return "Featured";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

function Cards({ list }: { list: Project[] }) {
  return list.map((p) => (
    <motion.div key={p.id} variants={cardVariants} className="h-full">
      <ProjectCard project={p} originContext="home" />
    </motion.div>
  ));
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
      <motion.div
        className={gridClass}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <Cards
          list={projects.filter((p) => p.featured).slice(0, MAX_VISIBLE)}
        />
      </motion.div>
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
              // Slides from the previous tab to this one.
              <motion.span
                layoutId="project-tab-underline"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className={gridClass}
        >
          {visible.length > 0 ? (
            <Cards list={visible} />
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
