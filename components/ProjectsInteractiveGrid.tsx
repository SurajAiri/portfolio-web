"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Project } from "@/types";

// The dialog (and its ~lucide icons) are only fetched once someone actually
// clicks a card, instead of being bundled into the initial page load.
const ProjectDialog = dynamic(() => import("./ProjectDialog"), {
  ssr: false,
});

interface ProjectsInteractiveGridProps {
  projects: Project[];
  children: ReactNode;
}

export default function ProjectsInteractiveGrid({
  projects,
  children,
}: ProjectsInteractiveGridProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedProject = useMemo(
    () => projects.find((p) => p.slug === selectedSlug) ?? null,
    [projects, selectedSlug]
  );

  const openFromEvent = useCallback((e: { target: EventTarget | null }) => {
    const target = e.target as HTMLElement;
    // Let real links (CODE / LIVE) behave normally instead of opening the dialog.
    if (target.closest("a")) return;
    const card = target.closest<HTMLElement>("[data-project-slug]");
    if (card?.dataset.projectSlug) setSelectedSlug(card.dataset.projectSlug);
  }, []);

  return (
    <>
      <div
        className="mt-12 grid gap-6 lg:grid-cols-3"
        onClick={openFromEvent}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFromEvent(e);
          }
        }}
      >
        {children}
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </>
  );
}
