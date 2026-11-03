import { personalInfo } from "@/data/personal";
import { certificates } from "@/data/certificates";
import { projects } from "@/data/projects";
import { FileText, Github, Linkedin, Mail, Package } from "lucide-react";
import type { CSSProperties } from "react";
import CountUp from "./motion/CountUp";
import Magnetic from "./motion/Magnetic";
import NeuralBackdrop from "./motion/NeuralBackdrop";
import Portrait from "./motion/Portrait";
import TypedText from "./motion/TypedText";

// Staggers the load-in animations defined in globals.css (.rise, .word-in)
const step = (i: number) => ({ "--i": i }) as CSSProperties;

const iconLink =
  "rounded-lg p-2.5 text-muted transition-colors duration-200 hover:bg-card-hover hover:text-foreground";

// What the typed line cycles through — all drawn from the experience list.
const NOW_BUILDING = [
  "building voice AI agents",
  "shipping RAG assistants",
  "automating workflows with LLMs",
  "designing agent platforms",
];

// Numbers that come from the data files update themselves; the other two are
// the achievements listed on the About page.
const stats: {
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  label: string;
}[] = [
  { value: projects.length, label: "Projects built" },
  { value: certificates.length, label: "Certifications" },
  { prefix: "Top ", value: 12, suffix: "%", label: "Kaggle ML competition" },
  { text: "SIH 2024", label: "Hackathon winner" },
];

export default function HeroSection() {
  // The last two words of the headline ("real problems.") get the flowing
  // gradient; every word rises in one after another on load.
  const words = personalInfo.headline.split(" ");
  const highlightFrom = Math.max(words.length - 2, 0);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop: faint grid, two drifting color blobs, and the live
          network canvas — all fading out toward the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_75%)]" />
        <div className="aurora -top-32 -left-24 h-96 w-96 bg-accent/40" />
        <div
          className="aurora top-10 -right-24 h-80 w-80 bg-accent-2/30"
          style={{ animationDelay: "-9s" }}
        />
        <NeuralBackdrop className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_90%_80%_at_60%_35%,black_35%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="grid gap-8 md:grid-cols-[1fr_260px] md:items-end md:gap-14">
          {/* Photo: a small avatar above the headline on mobile, a full
              portrait beside it on desktop. */}
          <div className="rise md:order-2" style={step(0)}>
            <Portrait
              alt={personalInfo.name}
              sizes="(max-width: 768px) 80px, 260px"
              badges
              priority
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

            <h1 className="mt-5 text-5xl leading-[0.98] font-bold tracking-[-0.035em] sm:text-6xl md:text-7xl">
              {words.map((word, i) => (
                <span key={`${word}-${i}`}>
                  {/* The gradient sits on an inner span: .word-in and
                      .text-flow both set `animation`, so they can't share
                      an element. */}
                  <span className="word-in" style={step(i)}>
                    {i >= highlightFrom ? (
                      <span className="text-flow">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            <p
              className="rise mt-6 max-w-xl text-lg leading-relaxed text-foreground/80"
              style={step(6)}
            >
              {personalInfo.bio[0]}
            </p>

            <p
              className="rise mt-5 font-mono text-sm text-muted"
              style={step(7)}
            >
              <span className="text-accent" aria-hidden="true">
                $
              </span>{" "}
              <TypedText phrases={NOW_BUILDING} />
            </p>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-3"
              style={step(8)}
            >
              <Magnetic>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn-shine inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink shadow-[0_0_0_0_rgba(79,217,160,0)] transition-[background-color,box-shadow] duration-300 hover:bg-foreground hover:shadow-[0_12px_40px_-12px_rgba(79,217,160,0.7)]"
                >
                  <Mail size={16} aria-hidden="true" />
                  Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition-colors duration-200 hover:border-accent/60 hover:text-accent"
                >
                  <FileText size={16} aria-hidden="true" />
                  Resume
                </a>
              </Magnetic>
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

        <dl
          className="rise mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:mt-20 sm:grid-cols-4"
          style={step(9)}
        >
          {stats.map((stat) => (
            // <dt> must come before <dd> in the markup; flex-col-reverse puts
            // the big number on top visually.
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-faint">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {stat.value !== undefined ? (
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                ) : (
                  stat.text
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
