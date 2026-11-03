import type { CSSProperties } from "react";

// Top of every inner page (Projects, Certificates): one h1 and one sentence,
// over the same faint grid and drifting color as the home hero.
export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_55%_80%_at_25%_30%,black,transparent_80%)]" />
        <div className="aurora -top-28 -left-16 h-72 w-72 bg-accent/35" />
        <div
          className="aurora -top-20 right-10 h-60 w-60 bg-accent-2/25"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <section className="mx-auto max-w-5xl px-6 pt-28 pb-2 sm:pt-36">
        <h1 className="rise text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p
          className="rise mt-4 max-w-xl text-lg leading-relaxed text-muted"
          style={{ "--i": 2 } as CSSProperties}
        >
          {description}
        </p>
      </section>
    </div>
  );
}
