import { projects } from "@/data/projects";
import ProjectTabs from "./ProjectTabs";
import ScrollRestore from "./ScrollRestore";
import SectionHeading from "./SectionHeading";

export default function FeaturedProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl border-t border-border px-6 py-24"
    >
      <ScrollRestore path="/" />
      <SectionHeading
        title="Selected projects"
        description="Each one starts with a real problem and shows what I built to solve it."
        href="/projects"
        hrefLabel="All projects"
      />

      {/* Tabbed subset — "Featured" shows featured work, other tabs are
          derived from data/projects.ts `homeTags` so the homepage doesn't
          dump the entire catalog on the visitor at once. */}
      <ProjectTabs projects={projects} />
    </section>
  );
}
