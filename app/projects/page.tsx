import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-xl bg-white/3 p-6 transition-all duration-300 hover:bg-white/6 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)]"
            >
              <div className="flex items-center justify-between gap-3">
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
                <ArrowUpRight
                  size={16}
                  className="text-white/20 transition-colors duration-200 group-hover:text-accent"
                />
              </div>
              <h2 className="mt-3 font-mono text-base font-bold tracking-tight transition-colors duration-200 group-hover:text-accent">
                {project.title.toUpperCase()}
              </h2>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                {project.productType.join(" / ")}
              </p>
              <p className="mt-3 text-sm text-white/45 line-clamp-2">
                {project.projectSummary}
              </p>
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
                {project.techStack.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40"
                  >
                    {tag}
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
