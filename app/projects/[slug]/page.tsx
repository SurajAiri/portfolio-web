import {
  formatProjectTimeline,
  projects,
  getProjectBySlug,
  getSortedProjectLinks,
  getSortedProjectMedia,
} from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectBackNav from "@/components/ProjectBackNav";
import ProjectGallery from "@/components/ProjectGallery";

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
    description: project.projectSummary,
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

  // Full page has room for everything; group by type-priority order.
  const allLinks = getSortedProjectLinks(project);
  const media = getSortedProjectMedia(project);

  return (
    <div className="pb-20">
      <article className="mx-auto max-w-3xl px-6 pt-28 sm:pt-32">
        <ProjectBackNav />

        {media.length > 0 && <ProjectGallery media={media} />}

        <div className="mt-8">
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
          <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight text-accent sm:text-3xl">
            {project.title.toUpperCase()}
          </h1>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
            {formatProjectTimeline(project)} • {project.productType.join(" / ")}
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <div>
            <p className="leading-relaxed text-accent/80 font-semibold">
              {project.projectSummary}
            </p>
          </div>

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
                  className="rounded bg-white/6 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted mb-3">
              TAGS
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/6 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {allLinks.length > 0 && (
            <div>
              <h2 className="font-mono text-xs tracking-[0.2em] text-muted mb-3">
                LINKS
              </h2>
              <div className="flex flex-wrap gap-2">
                {allLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/6 pt-8 font-mono text-xs tracking-wider">
          {allLinks.slice(0, 2).map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}
