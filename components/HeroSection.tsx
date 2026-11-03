import { personalInfo } from "@/data/personal";
import Image from "next/image";
import { FileText, Github, Linkedin, Mail, Package } from "lucide-react";
import type { CSSProperties } from "react";

// Staggers the load-in animation defined in globals.css (.rise)
const step = (i: number) => ({ "--i": i }) as CSSProperties;

const iconLink =
  "rounded-lg p-2.5 text-muted transition-colors duration-200 hover:bg-card-hover hover:text-foreground";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="grid gap-8 md:grid-cols-[1fr_260px] md:items-end md:gap-14">
        {/* Photo: a small avatar above the headline on mobile, a full
            portrait beside it on desktop. */}
        <div className="rise md:order-2" style={step(0)}>
          <Image
            src="/profile.webp"
            alt={personalInfo.name}
            width={512}
            height={512}
            sizes="(max-width: 768px) 80px, 260px"
            priority
            className="h-20 w-20 rounded-2xl object-cover ring-1 ring-border md:h-auto md:w-full"
          />
        </div>

        <div className="md:order-1">
          <p className="rise text-base text-muted" style={step(1)}>
            <span className="font-medium text-foreground">
              {personalInfo.name}
            </span>
            , {personalInfo.primaryTitle} and {personalInfo.secondaryTitle}{" "}
            Developer
          </p>

          <h1
            className="rise mt-5 text-5xl leading-[0.98] font-bold tracking-[-0.035em] sm:text-6xl md:text-7xl"
            style={step(2)}
          >
            {personalInfo.headline}
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-foreground/80"
            style={step(3)}
          >
            {personalInfo.bio[0]}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={step(4)}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-foreground"
            >
              <Mail size={16} />
              Email me
            </a>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors duration-200 hover:border-foreground/40"
            >
              <FileText size={16} />
              Resume
            </a>
            <div className="flex items-center sm:ml-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={iconLink}
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconLink}
              >
                <Linkedin size={20} />
              </a>
              {personalInfo.pypi && (
                <a
                  href={personalInfo.pypi}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PyPI"
                  className={iconLink}
                >
                  <Package size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
