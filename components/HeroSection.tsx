import { personalInfo } from "@/data/personal";
import Image from "next/image";
import { Mail, FileText, Github, Package, Linkedin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20 sm:pt-32">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_280px]">
        {/* Left — text + buttons */}
        <div>
          <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {personalInfo.name.toUpperCase()}
          </h1>
          <p className="mt-2 flex items-center gap-1 text-base">
            <span className="font-bold text-accent">
              {personalInfo.primaryTitle}
            </span>
            <span className="text-white/30">+</span>
            <span className="text-muted">{personalInfo.secondaryTitle}</span>
          </p>

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
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
            >
              <Mail size={14} />
              EMAIL ME
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
            >
              <FileText size={14} />
              RESUME
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
            >
              <Linkedin size={14} />
              LINKEDIN
            </a>
          </div>
        </div>

        {/* Right — profile photo + social icons */}
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="h-52 w-52 overflow-hidden rounded-full bg-white/[0.04] md:h-64 md:w-64">
            <Image
              src="/profile.webp"
              alt={personalInfo.name}
              width={256}
              height={256}
              sizes="(max-width: 768px) 208px, 256px"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/[0.06] p-2.5 text-white/40 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            {personalInfo.pypi && (
              <a
                href={personalInfo.pypi}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/[0.06] p-2.5 text-white/40 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
                aria-label="PyPI"
              >
                <Package size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
