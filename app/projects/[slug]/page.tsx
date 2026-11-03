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
import ProjectMarkdown from "@/components/ProjectMarkdown";
import { ArrowUpRight } from "lucide-react";
import { sentenceCase } from "@/lib/format";
import type { ReactNode } from "react";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

const body = "max-w-[68ch] text-base leading-[1.7] text-foreground/85";

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
    <div className="pb-24">
      <article className="mx-auto max-w-3xl px-6 pt-28 sm:pt-32">
        <ProjectBackNav />

        {/* Title and meta render first in the DOM so the page reads as
            immediately "there"; the media gallery (which has an image or
            video to fetch) comes right after instead of gating the text. */}
        <header className="mt-8">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-faint">
            <span>{project.category.map(sentenceCase).join(", ")}</span>
            <span>{formatProjectTimeline(project)}</span>
            <span>{project.productType.map(sentenceCase).join(", ")}</span>
          </div>
          <h1 className="mt-3 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">
            {project.projectSummary}
          </p>

          {allLinks.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {allLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    i === 0
                      ? "bg-accent text-accent-ink hover:bg-foreground"
                      : "border border-border hover:border-foreground/40"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </header>

        {media.length > 0 && <ProjectGallery media={media} />}

        <Section title="The problem">
          <p className={body}>{project.problem}</p>
        </Section>

        <Section title="The result">
          <p className={body}>{project.result}</p>
        </Section>

        <Section title="How it works">
          <ProjectMarkdown content={project.description} />
        </Section>

        <Section title="Tech stack">
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-sm text-foreground/85"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        {project.tags.length > 0 && (
          <Section title="Tags">
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-border px-2.5 py-1 text-sm text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
    </div>
  );
}
