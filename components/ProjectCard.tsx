"use client";

import { formatProjectTimeline, getSortedProjectLinks } from "@/data/projects";
import type { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProjectThumbnail from "./ProjectThumbnail";
import { saveProjectOrigin, type ProjectOrigin } from "@/lib/projectNav";
import { sentenceCase } from "@/lib/format";
import { spotlightMove } from "@/lib/spotlight";

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
    // The card lifts on hover and a mint light follows the cursor across it
    // (.spotlight in globals.css).
    <article
      data-project-slug={project.slug}
      onPointerMove={spotlightMove}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_28px_60px_-32px_rgba(79,217,160,0.4)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent"
    >
      <div className="relative p-2 pb-0">
        <ProjectThumbnail project={project} />
        {/* Appears on hover as a cue that the whole card opens the project */}
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-black/55 text-white/90 opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={16} />
        </span>
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
              className="rounded-md border border-border px-2 py-0.5 text-xs text-muted transition-colors duration-200 group-hover:border-accent/30"
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
                  className="group/link inline-flex items-center gap-1 text-foreground/80 transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
