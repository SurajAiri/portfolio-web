import { personalInfo } from "@/data/personal";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20 sm:pt-32">
      <div className="grid items-start gap-10 md:grid-cols-[1fr_280px]">
        {/* Left — text */}
        <div>
          <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {personalInfo.name.toUpperCase()}
          </h1>
          <p className="mt-2 text-base text-muted">{personalInfo.title}</p>

          {/* Bio with green left border */}
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

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
            >
              EMAIL ME
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
            >
              RESUME
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
            >
              LINKEDIN
            </a>
          </div>
        </div>

        {/* Right — profile photo */}
        <div className="flex justify-center md:justify-end">
          <div className="h-52 w-52 overflow-hidden rounded-full bg-white/[0.04] md:h-64 md:w-64">
            <Image
              src="/profile.jpg"
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
  );
}
