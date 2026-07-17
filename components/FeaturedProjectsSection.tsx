import { getFeaturedProjects } from "@/data/projects";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ProjectsInteractiveGrid from "./ProjectsInteractiveGrid";

// Computed once at module load (build time for a static page) instead of
// on every render.
const featuredProjects = getFeaturedProjects();

export default function FeaturedProjectsSection() {
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

      {/* Project cards grid — server-rendered content, one small client
          boundary for the click-to-open-dialog interaction */}
      <ProjectsInteractiveGrid projects={featuredProjects}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectsInteractiveGrid>
    </section>
  );
}
