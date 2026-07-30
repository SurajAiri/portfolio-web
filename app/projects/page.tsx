import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ScrollRestore from "@/components/ScrollRestore";

export default function ProjectsPage() {
  return (
    <div className="pb-20">
      <ScrollRestore path="/projects" />
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
            <ProjectCard
              key={project.id}
              project={project}
              originContext="projects"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
