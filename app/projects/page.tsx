import { projects } from "@/data/projects";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import ScrollRestore from "@/components/ScrollRestore";
import Reveal from "@/components/motion/Reveal";

export default function ProjectsPage() {
  return (
    <div className="pb-24">
      <ScrollRestore path="/projects" />
      <PageHeader
        title="Projects"
        description="Everything I've built, from AI voice assistants to automated video pipelines."
      />

      <section className="mx-auto mt-14 max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            // Two columns: stagger the pair in each row slightly.
            <Reveal key={project.id} className="h-full" delay={(i % 2) * 0.08}>
              <ProjectCard project={project} originContext="projects" />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
