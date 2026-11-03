import { projects } from "@/data/projects";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import ScrollRestore from "@/components/ScrollRestore";

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
