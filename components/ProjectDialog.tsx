"use client";

import type { Project } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";

interface ProjectDialogProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[#111] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-accent transition-colors duration-200"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <span className="font-mono text-xs tracking-wider text-accent">
          {project.category}
        </span>
        <h2 className="mt-2 font-mono text-xl font-bold tracking-tight">
          {project.title.toUpperCase()}
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-muted mb-1">
              PROBLEM
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.problem}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-muted mb-1">
              RESULT
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.result}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-muted mb-1">
              HOW IT WORKS
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted mb-2">
            TECH STACK
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-6 font-mono text-xs tracking-wider">
          <Link
            href={`/projects/${project.slug}`}
            className="text-foreground transition-colors hover:text-accent"
            onClick={onClose}
          >
            VIEW FULL PAGE &raquo;
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-accent"
            >
              LIVE DEMO <ArrowUpRight size={12} />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-accent"
            >
              CODE <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
