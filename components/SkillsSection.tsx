import { skills } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section className="bg-white/[0.02] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          Skills
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <div key={category.name}>
              <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-muted">
                {category.name.toUpperCase()}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-white/[0.06] px-3 py-1 font-mono text-xs text-foreground/70 transition-colors duration-200 hover:bg-accent/15 hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
