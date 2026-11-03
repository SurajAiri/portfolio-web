"use client";

import { formatProjectTimeline, getSortedProjectLinks } from "@/data/projects";
import type { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProjectThumbnail from "./ProjectThumbnail";
import { saveProjectOrigin, type ProjectOrigin } from "@/lib/projectNav";
import { sentenceCase } from "@/lib/format";

const MAX_TECH = 4;

export default function ProjectCard({
  project,
  originContext,
}: {
  project: Project;
  // Which page this card lives on, so the detail page's back button can
  // return here (and to this exact scroll position) instead of always
  // landing on /projects.
  originContext: ProjectOrigin["from"];
}) {
  // The card stays compact: two links at most, picked by type priority
  // (demo > code > docs > case-study > article > other). The problem and
  // result write-up lives on the detail page.
  const topLinks = getSortedProjectLinks(project).slice(0, 2);
  const extraTech = project.techStack.length - MAX_TECH;

  return (
    // The title link is stretched over the whole card (after:inset-0), so the
    // card is one big click target while the external links below stay real,
    // separate <a> elements. No interactive element is nested in another.
    <article
      data-project-slug={project.slug}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-foreground/25 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent"
    >
      <div className="p-2 pb-0">
        <ProjectThumbnail project={project} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-sm text-faint">
          <span>{project.category.map(sentenceCase).join(", ")}</span>
          <span className="shrink-0">{formatProjectTimeline(project)}</span>
        </div>

        <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            prefetch
            onClick={() => saveProjectOrigin(originContext)}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          {project.projectSummary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, MAX_TECH).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2 py-0.5 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
          {extraTech > 0 && (
            <li className="px-1 py-0.5 text-xs text-faint">+{extraTech} more</li>
          )}
        </ul>

        {topLinks.length > 0 && (
          <div className="relative z-10 mt-auto pt-5">
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm font-medium">
              {topLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground/80 transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
