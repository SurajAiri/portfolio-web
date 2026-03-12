import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="pb-20">
      <section className="mx-auto max-w-5xl px-6 pt-28 sm:pt-32">
        <p className="font-mono text-xs tracking-[0.2em] text-muted">
          ALL WORK &raquo;
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          ALL PROJECTS
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
          A collection of projects I&apos;ve built — from AI voice assistants to
          automated video pipelines.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-5xl px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-xl bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-accent">
                  {project.category}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted transition-colors group-hover:text-accent"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <h2 className="mt-3 font-mono text-base font-bold tracking-tight">
                {project.title.toUpperCase()}
              </h2>
              <p className="mt-3 text-sm text-muted">
                <span className="font-semibold text-foreground/70">
                  Problem:{" "}
                </span>
                {project.problem}
              </p>
              <p className="mt-2 text-sm text-muted">
                <span className="font-semibold text-foreground/70">
                  Result:{" "}
                </span>
                {project.result}
              </p>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
