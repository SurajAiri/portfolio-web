import { personalInfo, valuePropositions } from "@/data/personal";
import { Check } from "lucide-react";
import CopyEmail from "./CopyEmail";
import Reveal from "./motion/Reveal";
import SpotlightCard from "./motion/SpotlightCard";
import { StaggerList, StaggerListItem } from "./motion/Stagger";

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      {/* Same visual language as the hero, quieter: grid + two color blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_40%,black,transparent_75%)]" />
        <div className="aurora -bottom-40 -left-20 h-96 w-96 bg-accent/35" />
        <div
          className="aurora -top-24 right-0 h-72 w-72 bg-accent-2/25"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm">
            <span
              className="relative flex h-2 w-2 items-center justify-center"
              aria-hidden="true"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for full-time roles
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Let&rsquo;s build something <span className="text-flow">impactful.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <CopyEmail email={personalInfo.email} />
        </Reveal>

        <StaggerList
          className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-2"
          delay={0.1}
        >
          {valuePropositions.map((vp) => (
            <StaggerListItem key={vp}>
              <SpotlightCard className="flex h-full items-start gap-3 rounded-xl border border-border bg-card/60 p-4 text-base text-muted backdrop-blur-sm transition-colors duration-300 hover:text-foreground">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                >
                  <Check size={12} strokeWidth={3} />
                </span>
                {vp}
              </SpotlightCard>
            </StaggerListItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
