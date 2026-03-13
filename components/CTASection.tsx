import { personalInfo, valuePropositions } from "@/data/personal";
import { Mail, FileText, Linkedin, Github } from "lucide-react";

export default function CTASection() {
  return (
    <section className="mt-8">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div>
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent">
            CURRENTLY AVAILABLE
          </span>
          <h2 className="mt-5 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            LET&apos;S BUILD SOMETHING IMPACTFUL.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            I build AI-powered products that convert complex workflows into
            measurable outcomes.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {valuePropositions.map((vp) => (
              <div
                key={vp}
                className="rounded-lg bg-white/[0.03] p-4 text-xs leading-relaxed text-white/50"
              >
                {vp}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — contact */}
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-muted">
            GET IN TOUCH
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-4 py-3 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
            >
              <Mail size={16} />
              EMAIL ME
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-4 py-3 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
            >
              <FileText size={16} />
              DOWNLOAD RESUME
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-4 py-3 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
            >
              <Linkedin size={16} />
              LINKEDIN
            </a>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors duration-200 hover:text-accent"
            >
              <Github size={14} />
              GITHUB
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors duration-200 hover:text-accent"
            >
              <Linkedin size={14} />
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
