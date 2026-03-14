"use client";

import { formatProjectTimeline, getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/types";
import { useState } from "react";
import Link from "next/link";
import ProjectDialog from "./ProjectDialog";
import { ArrowUpRight } from "lucide-react";

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
          className="rounded bg-white/6 px-4 py-2 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
        >
          VIEW ALL PROJECTS
        </Link>
      </div>

      {/* Project cards grid */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            className="group flex cursor-pointer flex-col rounded-xl bg-white/3 p-6 transition-all duration-300 hover:bg-white/6 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)]"
          >
            {/* Category + arrow */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.category.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span
                className="text-white/20 transition-colors duration-200 group-hover:text-accent"
                aria-hidden="true"
              >
                <ArrowUpRight size={16} />
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-3 font-mono text-base font-bold tracking-tight transition-colors duration-200 group-hover:text-accent">
              {project.title.toUpperCase()}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-white/35">
              <span>{formatProjectTimeline(project)}</span>
              <span className="text-white/20">•</span>
              <span>{project.productType.join(" / ")}</span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-white/40 line-clamp-3">
              {project.projectSummary}
            </p>

            {/* Problem / Result */}
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
            </div>

            {/* Tech pills */}
            <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40"
                >
                  {tag}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Action links */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/6 pt-4 font-mono text-xs tracking-wider">
              <span className="text-white/40 transition-colors duration-200 group-hover:text-accent">
                VIEW PROJECT &raquo;
              </span>
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-white/40 transition-colors duration-200 hover:text-accent"
                >
                  CODE <ArrowUpRight size={12} />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-white/40 transition-colors duration-200 hover:text-accent"
                >
                  LIVE <ArrowUpRight size={12} />
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
