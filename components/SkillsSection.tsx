import { skills } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Skills
        </h2>
        {/* Grouping is shown by structure (a label column and a value
            column), so the tools themselves can be plain readable text. */}
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {skills.map((category) => (
            <div
              key={category.name}
              className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8"
            >
              <dt className="text-sm font-medium text-muted sm:pt-0.5">
                {category.name}
              </dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-1.5 text-base">
                {category.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
