import {
  personalInfo,
  aboutSections,
  experience,
  education,
  achievements,
} from "@/data/personal";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* Hero — same layout as home hero */}
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-20 sm:pt-32">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_280px]">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
              ABOUT ME
            </p>
            <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {personalInfo.name.toUpperCase()}
            </h1>
            <p className="mt-2 text-base text-muted">{personalInfo.title}</p>
            <div className="mt-6 space-y-4 border-l-2 border-accent pl-5">
              {personalInfo.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-mono text-sm leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
              >
                EMAIL ME
              </a>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
              >
                DOWNLOAD RESUME
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="h-52 w-52 overflow-hidden rounded-full bg-white/[0.04] md:h-64 md:w-64">
              <Image
                src="/profile.webp"
                alt={personalInfo.name}
                width={256}
                height={256}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How I Work / Where I Add Value — stacked cards */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="space-y-6">
          {aboutSections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl bg-white/[0.03] p-8 transition-all duration-200 hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-accent">{section.icon}</span>
                <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
                  {section.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto mt-20 max-w-5xl px-6">
        <div className="flex items-center gap-2">
          <span className="text-accent">⊕</span>
          <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
            EXPERIENCE
          </h2>
        </div>
        <div className="mt-6 space-y-4">
          {experience.map((exp) => (
            <div key={exp.company}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <p className="text-sm text-muted">{exp.company}</p>
                </div>
                <p className="font-mono text-xs text-muted">{exp.duration}</p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {exp.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <div className="flex items-center gap-2">
          <span className="text-accent">⊕</span>
          <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
            EDUCATION
          </h2>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold">{education.degree}</h3>
              <p className="text-sm text-muted">
                {education.university}, {education.location}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-muted">
                {education.duration}
              </p>
              <p className="font-mono text-xs text-accent">
                CGPA: {education.cgpa}
              </p>
            </div>
          </div>
          <p className="mt-3 font-mono text-sm text-muted">
            Coursework: {education.coursework}
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <div className="flex items-center gap-2">
          <span className="text-accent">⊕</span>
          <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
            ACHIEVEMENTS
          </h2>
        </div>
        <div className="mt-6 space-y-4">
          {achievements.map((ach) => (
            <div key={ach.category}>
              <h3 className="font-mono text-xs font-semibold tracking-wider text-accent">
                {ach.category.toUpperCase()}
              </h3>
              <p className="mt-1 font-mono text-sm leading-relaxed text-foreground/70">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-12 font-mono text-sm text-foreground/70">
          Currently available for full-time roles and actively building AI +
          product-focused projects.
        </p>
      </section>
    </div>
  );
}
