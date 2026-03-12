import { personalInfo, valuePropositions } from "@/data/personal";

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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              EMAIL ME
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-4 py-3 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              DOWNLOAD RESUME
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-4 py-3 font-mono text-xs tracking-wider text-foreground/70 transition-all duration-200 hover:bg-accent/15 hover:text-accent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-60"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LINKEDIN
            </a>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/30 transition-colors duration-200 hover:text-accent"
            >
              GITHUB ↗
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/30 transition-colors duration-200 hover:text-accent"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
