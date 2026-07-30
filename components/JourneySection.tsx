import { journey } from "@/data/personal";
import { Milestone } from "lucide-react";

export default function JourneySection() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-6">
      <div className="flex items-center gap-2">
        <span className="text-accent">
          <Milestone size={18} />
        </span>
        <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
          JOURNEY
        </h2>
      </div>

      <div className="mt-8 space-y-8">
        {journey.map((entry, i) => {
          const isSetback = entry.tag === "setback";
          return (
            <div
              key={`${entry.period}-${entry.title}`}
              className="relative flex gap-5 pl-1"
            >
              {/* Rail */}
              <div className="relative flex w-3 shrink-0 flex-col items-center">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    isSetback ? "bg-white/20" : "bg-accent"
                  }`}
                />
                {i !== journey.length - 1 && (
                  <span
                    className={`mt-1.5 w-px flex-1 ${
                      isSetback
                        ? "border-l border-dashed border-white/15"
                        : "bg-white/10"
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-bold">{entry.title}</h3>
                  <p
                    className={`font-mono text-xs ${
                      isSetback ? "text-white/30" : "text-accent"
                    }`}
                  >
                    {entry.period.toUpperCase()}
                  </p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                  {entry.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
