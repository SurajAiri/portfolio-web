"use client";

import { getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/types";
import { useState } from "react";
import Link from "next/link";
import ProjectDialog from "./ProjectDialog";

export default function FeaturedProjectsSection() {
  const projects = getFeaturedProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-muted">
            SELECTED WORK &raquo;
          </p>
          <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            PROOF OF WORK
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Recent products with clear business problems, what I built, and
            measurable outcomes.
          </p>
        </div>
        <Link
          href="/projects"
          className="rounded bg-white/[0.06] px-4 py-2 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
        >
          VIEW ALL PROJECTS
        </Link>
      </div>

      {/* Project cards grid */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group flex flex-col rounded-xl bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)]"
          >
            {/* Category + arrow */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-accent">
                {project.category}
              </span>
              <button
                onClick={() => setSelectedProject(project)}
                className="text-white/20 transition-colors duration-200 group-hover:text-accent"
                aria-label={`View ${project.title}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <h3 className="mt-3 font-mono text-base font-bold tracking-tight transition-colors duration-200 group-hover:text-accent">
              {project.title.toUpperCase()}
            </h3>

            {/* Problem / Result / Tech */}
            <div className="mt-4 space-y-3 text-sm leading-relaxed">
              <p className="text-white/40">
                <span className="font-semibold text-foreground/60">
                  Problem:{" "}
                </span>
                {project.problem}
              </p>
              <p className="text-white/40">
                <span className="font-semibold text-foreground/60">
                  Result:{" "}
                </span>
                {project.result}
              </p>
              {/* <p className="text-white/40">
                <span className="font-semibold text-foreground/60">Tech: </span>
                {project.techSummary}
              </p> */}
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-white/30 line-clamp-3">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-white/40">
                  +{project.techStack.length - 5}
                </span>
              )}
            </div>

            {/* Action links */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-4 font-mono text-xs tracking-wider">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-white/40 transition-colors duration-200 hover:text-accent"
              >
                VIEW PROJECT &raquo;
              </button>
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors duration-200 hover:text-accent"
                >
                  CODE ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors duration-200 hover:text-accent"
                >
                  LIVE ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
