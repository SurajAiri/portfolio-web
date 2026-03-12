import { projects, getProjectBySlug } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Suraj Kiran Airi`,
    description: project.result,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pb-20">
      <article className="mx-auto max-w-3xl px-6 pt-28 sm:pt-32">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 font-mono text-xs tracking-wider text-white/40 transition-colors duration-200 hover:text-accent"
        >
          ← BACK TO PROJECTS
        </Link>

        <div className="mt-8">
          <span className="font-mono text-xs tracking-wider text-accent">
            {project.category}
          </span>
          <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title.toUpperCase()}
          </h1>
        </div>

        <div className="mt-10 space-y-8">
          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted mb-2">
              THE PROBLEM
            </h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.problem}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted mb-2">
              THE RESULT
            </h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.result}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted mb-2">
              HOW IT WORKS
            </h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.description}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted mb-3">
              TECH STACK
            </h2>
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
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-8 font-mono text-xs tracking-wider">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-accent"
            >
              LIVE DEMO ↗
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-accent"
            >
              CODE ↗
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
