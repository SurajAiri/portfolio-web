import { skills } from "@/data/skills";
import {
  BrainCircuit,
  Boxes,
  Server,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./motion/SpotlightCard";
import { StaggerList, StaggerListItem } from "./motion/Stagger";

// One icon per category, matched by the name used in data/skills.ts.
// Anything new falls back to a generic box.
const categoryIcons: Record<string, ReactNode> = {
  Languages: <Terminal size={18} aria-hidden="true" />,
  "ML / DL": <BrainCircuit size={18} aria-hidden="true" />,
  "Generative AI": <Sparkles size={18} aria-hidden="true" />,
  Technologies: <Server size={18} aria-hidden="true" />,
  Tools: <Wrench size={18} aria-hidden="true" />,
};

// A bento layout on a 6-column grid (md and up): rows of 2+4, 3+3, then one
// full-width card. Wraps around if more categories are added later.
const spans = [
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-6",
];

export default function SkillsSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Skills"
          description="What I build with, from training a model to deploying it."
        />

        <StaggerList className="mt-12 grid gap-4 md:grid-cols-6">
          {skills.map((category, i) => (
            <StaggerListItem
              key={category.name}
              className={spans[i % spans.length]}
            >
              <SpotlightCard className="h-full rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:bg-card-hover">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {categoryIcons[category.name] ?? (
                      <Boxes size={18} aria-hidden="true" />
                    )}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {category.name}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-foreground/85 transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerListItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
