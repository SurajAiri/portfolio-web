"use client";

import { journey } from "@/data/personal";
import { Milestone } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

      <div ref={containerRef} className="relative mt-12">
        {/* Center rail — track (static) + progress fill (scroll-linked) */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-4 top-0 bottom-0 w-px origin-top bg-accent/60 md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-10 md:space-y-14">
          {journey.map((entry, i) => {
            const isSetback = entry.tag === "setback";
            const isRight = i % 2 === 0; // alternate sides on desktop

            return (
              <motion.div
                key={`${entry.period}-${entry.title}`}
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-10 md:pl-0"
              >
                {/* Dot on the rail */}
                <span
                  className={`absolute left-4 top-1.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-background md:left-1/2 ${
                    isSetback ? "bg-white/30" : "bg-accent"
                  }`}
                />

                {/* Card — alternates left/right on desktop, always right of
                    the rail on mobile */}
                <div className={isRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}>
                  <div
                    className={`rounded-xl bg-white/[0.03] p-5 transition-colors duration-200 hover:bg-white/[0.05] md:max-w-md ${
                      isRight ? "md:ml-2" : "md:mr-2 md:ml-auto md:text-right"
                    }`}
                  >
                    <div
                      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
                        isRight ? "" : "md:justify-end"
                      }`}
                    >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
